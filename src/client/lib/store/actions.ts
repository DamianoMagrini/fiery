import { Action, ActionCreator } from 'redux';

import { ThemeName } from '../themes';

// #region Action types

/** See {@link set_timer} */
export const SET_TIMER = 'SET_TIMER';

/** See {@link set_theme} */
export const SET_THEME = 'SET_THEME';

// #endregion

// #region Action creators

/**
 * Update the duration of the timer.
 *
 * @param duration The timer's new duration in milliseconds.
 */
export const set_timer: ActionCreator<Action<typeof SET_TIMER>> = (
  duration: number
) => ({
  type: SET_TIMER,
  duration
});

/**
 * Update the theme.
 *
 * @param theme The new theme.
 */
export const set_theme: ActionCreator<Action<string>> = (theme: ThemeName) => ({
  type: SET_THEME,
  theme
});

// #endregion
