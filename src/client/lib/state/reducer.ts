import {
  SET_DURATION,
  SET_THEME,
  DurationAction,
  ThemeAction
} from './actions';

import { ThemeName } from '../themes';

export const duration_reducer = (
  current: number,
  action: DurationAction
): number => {
  switch (action.type) {
    case SET_DURATION:
      return action.duration;
    default:
      return current;
  }
};

export const theme_reducer = (
  current: ThemeName,
  action: ThemeAction
): ThemeName => {
  let new_theme: ThemeName;

  switch (action.type) {
    case SET_THEME:
      new_theme = action.theme;
      break;
    default:
      new_theme = current;
      break;
  }

  return new_theme;
};
