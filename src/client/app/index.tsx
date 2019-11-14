import { FunctionalComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { Router } from 'preact-router';
import { StateProvider } from '../lib/state';

import { Home, Timer, GivenUp, Finished } from './routes';

import { ThemeContext } from '../lib/state';
import { save_state } from '../lib/state/storage';

import { THEME_TUPLE_INDICES, THEMES } from '../lib/themes';

const RootStyle: FunctionalComponent = () => (
  <style>{`#root {background: ${
    THEMES[useContext(ThemeContext)[0]][THEME_TUPLE_INDICES.BACKGROUND]
  };}`}</style>
);

const SaveTheme = (): null => {
  const [theme] = useContext(ThemeContext);
  useEffect(() => {
    save_state({ theme });
  }, [theme]);
  return null;
};

const App: FunctionalComponent = () => (
  <StateProvider>
    <Router>
      <Home default />
      <Timer path={'/timer'} />
      <GivenUp path={'/given-up'} />
      <Finished path={'/finished'} />
    </Router>

    <RootStyle />
    <SaveTheme />
  </StateProvider>
);

export default App;
