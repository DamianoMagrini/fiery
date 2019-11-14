import { analytics } from '../../../firebase';

import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import ThemeSelector from './ThemeSelector';

import { set_theme, ThemeContext } from '../../state';
import { THEMES } from '../../themes';

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
}

/**
 * The theme selector component, which allows the user to select a theme. Note
 * that it does not contain the logic to change the app's theme, but will run
 * the specified callbacks instead.
 */
const ThemeSelectorConnected: FunctionalComponent<ThemeSelectorConnectedProps> = ({
  label
}) => (
  <ThemeSelector
    label={label}
    themes={THEMES}
    default_theme_name={useContext(ThemeContext)[0]}
    on_update={(new_theme): void => {
      useContext(ThemeContext)[1](set_theme(new_theme));
      analytics.setUserProperties({ theme: new_theme });
    }}
  />
);

export default ThemeSelectorConnected;
