import { FunctionalComponent, h } from 'preact';

import ThemeSelector from './ThemeSelector';

import { store } from '../../store';
import { set_theme } from '../../store/actions';
import { THEMES, ThemeName } from '../../themes';

/**
 * Props for {@link ThemeSelectorConnected}.
 *
 * @interface ThemeSelectorConnectedProps
 */
interface ThemeSelectorConnectedProps {
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
const ThemeSelectorConnected: FunctionalComponent<
  ThemeSelectorConnectedProps
> = ({ label, default_theme }) => (
  <ThemeSelector
    label={label}
    themes={THEMES}
    default_theme={default_theme}
    on_update={(new_theme): void => {
      store.dispatch(set_theme(new_theme));
    }}
  />
);

export default ThemeSelectorConnected;
