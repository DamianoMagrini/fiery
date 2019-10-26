/**
 * A frozen object which contains tuples, made up of, in order:
 * 1. the theme's primary color, i.e. the one to display on the theme selector;
 * 2. the background color;
 * 3. the text color.
 *
 * @readonly
 */
export const THEMES: Readonly<
  {
    [theme_name in ThemeName]: [string, string, string];
  }
> = Object.freeze({
  LIGHT: ['#fafafa', '#ffffff', '#141414'],
  DARK: ['#141414', '#060606', '#fafafafa']
});

/**
 * Indices for a theme tuple.
 */
export const enum THEME_TUPLE_INDICES {
  PRIMARY = 0,
  BACKGROUND = 1,
  TEXT = 2
}

export type ThemeName = 'LIGHT' | 'DARK';
