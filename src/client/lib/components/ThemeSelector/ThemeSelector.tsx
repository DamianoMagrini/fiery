import { h } from 'preact';
import { useState } from 'preact/hooks';

import ThemeSelectorOption from './ThemeSelectorOption';
import Typography from '../Typography';

import { THEMES, ThemeName, THEME_TUPLE_INDICES } from '../../themes';
import { store } from '../../store';
import { set_theme } from '../../store/actions';

/**
 * Props for {@link ThemeSelector}.
 *
 * @interface ThemeSelectorProps
 */
interface ThemeSelectorProps {
  /**
   * The label to show above the selector
   *
   * @memberof ThemeSelectorProps
   */
  label: string;
  /**
   * The index of the initially selected theme, presumably from local/session
   * storage or the user's preferred theme.
   *
   * @memberof ThemeSelectorProps
   */
  default_theme: ThemeName;
}

/**
 * The theme selector component, which allows the user to select a theme. Note
 * that it does not contain the logic to change the app's theme, but will run
 * the specified callbacks instead.
 */
const ThemeSelector = ({ label, default_theme }: ThemeSelectorProps) => {
  const [theme, set_theme_internal] = useState(default_theme);

  /**
   * The function to run when setting a theme. It runs the appropriate
   * callbacks and updates state internally.
   *
   * @param new_theme The newly selected theme.
   */
  const update_theme = (new_theme: ThemeName) => {
    if (theme !== new_theme) {
      set_theme_internal(new_theme);
      store.dispatch(set_theme(new_theme));
    }
  };

  return (
    <div>
      <Typography variant={'paragraph'}>{label}</Typography>

      {Object.keys(THEMES).map((theme_name: ThemeName) => (
        <ThemeSelectorOption
          selected={theme_name === theme}
          color={THEMES[theme_name][THEME_TUPLE_INDICES.PRIMARY]}
          on_click={() => update_theme(theme_name)}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
