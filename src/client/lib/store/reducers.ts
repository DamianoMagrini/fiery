import { Action, Reducer } from 'redux';

import { to_ms } from '../time';

import {
  SET_TIMER,
  INCREMENT_TIMER,
  DECREMENT_TIMER,
  SET_THEME
} from './actions';

import { ThemeName } from '../themes';
import { save_state, load_state } from './storage';

type DurationActionTypes =
  | Action<typeof SET_TIMER> & { duration: number }
  | Action<typeof INCREMENT_TIMER | typeof DECREMENT_TIMER> & { by: number };
export const duration_reducer: Reducer<number, DurationActionTypes> = (
  duration = to_ms({ minutes: 30 }),
  action
) => {
  switch (action.type) {
    case SET_TIMER:
      return action.duration;
    case INCREMENT_TIMER:
      return duration + action.by;
    case DECREMENT_TIMER:
      return duration - action.by;
    default:
      return duration;
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
