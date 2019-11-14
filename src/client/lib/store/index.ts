import { combineReducers, createStore } from 'redux';

import { duration_reducer, theme_reducer } from './reducers';

import { ThemeName } from '../themes';

export interface AppState {
  duration: number;
  theme: ThemeName;
}

export const store = createStore(
  combineReducers({
    duration: duration_reducer,
    theme: theme_reducer
  }),

  '__REDUX_DEVTOOLS_EXTENSION__' in window &&
    (window as Window &
      typeof globalThis & {
        __REDUX_DEVTOOLS_EXTENSION__: Function;
      }).__REDUX_DEVTOOLS_EXTENSION__()
);
