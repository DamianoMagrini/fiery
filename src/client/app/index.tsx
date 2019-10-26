import { FunctionalComponent, h } from 'preact';
import { Provider, useSelector } from 'react-redux';

import { Router } from 'preact-router';

import { Home, Timer, GivenUp, Finished } from './routes';

import { store, AppState } from '../lib/store';

import { ThemeName, THEME_TUPLE_INDICES, THEMES } from '../lib/themes';

const RootStyle = () => (
  <style>{`#root {background: ${
    THEMES[useSelector<AppState, ThemeName>((state) => state.theme)][
      THEME_TUPLE_INDICES.BACKGROUND
    ]
  };}`}</style>
);

const App: FunctionalComponent = () => (
  <Provider store={store}>
    <Router>
      <Home default />
      <Timer path={'/timer'} />
      <GivenUp path={'/given-up'} />
      <Finished path={'/finished'} />
    </Router>

    <RootStyle />
  </Provider>
);

export default App;
