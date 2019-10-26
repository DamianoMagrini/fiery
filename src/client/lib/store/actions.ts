import { Action, ActionCreator } from 'redux';

import { to_ms } from '../time';

import { ThemeName } from '../themes';

// #region Action types

/** See {@link set_timer} */
export const SET_TIMER = 'SET_TIMER';

/** See {@link increment_timer} */
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

/** See {@link decrement_timer} */
export const DECREMENT_TIMER = 'DECREMENT_TIMER';

/** See {@link set_theme} */
export const SET_THEME = 'SET_THEME';

// #endregion

// #region Action creators

/**
 * Update the duration of the timer.
 *
 * @param duration The timer's new duration in milliseconds.
 */
export const set_timer: ActionCreator<
  Action<
    (typeof SET_TIMER) | (typeof INCREMENT_TIMER) | (typeof DECREMENT_TIMER)
  >
> = (duration: number) => ({
  type: SET_TIMER,
  duration
});

/**
 * Increment the duration of the timer.
 *
 * @param [by] By how much (in milliseconds) to increment the timer.
 */
export const increment_timer: ActionCreator<Action<string>> = (
  by?: number
) => ({
  type: INCREMENT_TIMER,
  by: by || to_ms({ minutes: 5 })
});

/**
 * Decrement the duration of the timer.
 *
 * @param [by] By how much (in milliseconds) to decrement the timer.
 */
export const decrement_timer: ActionCreator<Action<string>> = (
  by?: number
) => ({
  type: DECREMENT_TIMER,
  by: by || to_ms({ minutes: 5 })
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
