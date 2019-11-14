import { createContext, FunctionalComponent, h } from 'preact';
import { useReducer } from 'preact/hooks';

import { AppState } from './index';

import { to_ms } from '../time';
import { load_state } from './storage';
import { DurationAction, ThemeAction } from './actions';
import { duration_reducer, theme_reducer } from './reducer';

const default_state: AppState = {
  duration: to_ms({ minutes: 30 }),
  theme:
    load_state().theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT')
};

export const DurationContext = createContext<
  [AppState['duration'], (action: DurationAction) => void]
>(null);
export const ThemeContext = createContext<
  [AppState['theme'], (action: ThemeAction) => void]
>(null);

export const StateProvider: FunctionalComponent = ({ children }) => {
  const [duration, dispatch_duration] = useReducer(
    duration_reducer,
    default_state.duration
  );
  const [theme, dispatch_theme] = useReducer(
    theme_reducer,
    default_state.theme
  );

  return (
    <DurationContext.Provider value={[duration, dispatch_duration]}>
      <ThemeContext.Provider value={[theme, dispatch_theme]}>
        {children}
      </ThemeContext.Provider>
    </DurationContext.Provider>
  );
};
