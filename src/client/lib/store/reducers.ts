import { Action, Reducer } from 'redux';

import { to_ms } from '../time';

import { SET_TIMER, SET_THEME } from './actions';

import { ThemeName } from '../themes';
import { save_state, load_state } from './storage';

export const duration_reducer: Reducer<
  number,
  Action<typeof SET_TIMER> & { duration: number }
> = (duration_ms = to_ms({ minutes: 30 }), action) => {
  switch (action.type) {
    case SET_TIMER:
      return action.duration;
    default:
      return duration_ms;
  }
};

export const theme_reducer: Reducer<
  ThemeName,
  Action<typeof SET_THEME> & { theme: ThemeName }
> = (
  theme = load_state().theme ||
  matchMedia('(prefers-color-scheme: dark)').matches
    ? 'DARK'
    : 'LIGHT',
  action
) => {
  let new_theme: ThemeName;

  switch (action.type) {
    case SET_THEME:
      new_theme = action.theme;
      break;
    default:
      new_theme = theme;
      break;
  }

  save_state({ theme: new_theme });
  return new_theme;
};
