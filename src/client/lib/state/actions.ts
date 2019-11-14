import { ThemeName } from '../themes';

// #region Action types

/** See {@link set_duration} */
export const SET_DURATION = 'SET_DURATION';

/** See {@link set_theme} */
export const SET_THEME = 'SET_THEME';

interface BaseAction {
  type: string;
}
export interface DurationAction extends BaseAction {
  type: typeof SET_DURATION;
  duration: number;
}
export interface ThemeAction extends BaseAction {
  type: typeof SET_THEME;
  theme: ThemeName;
}

// #endregion

// #region Action creators

/**
 * Generates an action to update the duration of the timer.
 *
 * @param duration The timer's new duration in milliseconds.
 *
 * @returns A SET_TIMER action
 */
export const set_duration = (duration: number): DurationAction => ({
  type: SET_DURATION,
  duration
});

/**
 * Generates an action to update the theme.
 *
 * @param theme The new theme.
 *
 * @returns A SET_THEME action
 */
export const set_theme = (theme: ThemeName): ThemeAction => ({
  type: SET_THEME,
  theme
});

// #endregion
