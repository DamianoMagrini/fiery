import { h } from 'preact';
import { useState } from 'preact/hooks';

import ThemeSelectorOption from './ThemeSelectorOption';
import Typography from '../Typography';

import { THEME_TUPLE_INDICES } from '../../themes';

/**
 * Props for {@link ThemeSelector}.
 *
 * @interface ThemeSelectorProps
 */
interface ThemeSelectorProps<ThemeNames extends string> {
  /**
   * The label to show above the selector
   *
   * @memberof ThemeSelectorProps
   */
  label: string;
  themes: { [theme_name in ThemeNames]: [string, string, string] };
  /**
   * The index of the initially selected theme, presumably from local/session
   * storage or the user's preferred theme.
   *
   * @memberof ThemeSelectorProps
   */
  default_theme: ThemeNames;
  /**
   * Function to run whenever a new theme is selected.
   *
   * @memberof ThemeSelectorProps
   */
  on_update: (new_theme: ThemeNames) => void;
}

/**
 * The theme selector component, which allows the user to select a theme. Note
 * that it does not contain the logic to change the app's theme, but will run
 * the specified callbacks instead.
 */
const ThemeSelector = <ThemeNames extends string>({
  label,
  themes,
  default_theme,
  on_update
}: ThemeSelectorProps<ThemeNames>) => {
  const [theme, set_theme_internal] = useState(default_theme);

  /**
   * The function to run when setting a theme. It runs the appropriate
   * callbacks and updates state internally.
   *
   * @param new_theme The newly selected theme.
   */
  const update_theme = (new_theme: ThemeNames) => {
    if (theme !== new_theme) {
      set_theme_internal(new_theme);
      on_update(new_theme);
    }
  };

  return (
    <div>
      <Typography variant={'paragraph'}>{label}</Typography>

      {Object.keys(themes).map((theme_name: ThemeNames) => (
        <ThemeSelectorOption
          selected={theme_name === theme}
          color={themes[theme_name][THEME_TUPLE_INDICES.PRIMARY]}
          on_click={() => update_theme(theme_name)}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
