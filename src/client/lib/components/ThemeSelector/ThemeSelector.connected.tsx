import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import ThemeSelector from './ThemeSelector';

import { store, AppState } from '../../store';
import { set_theme } from '../../store/actions';
import { ThemeName, THEMES } from '../../themes';

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
const ThemeSelectorConnected: FunctionalComponent<
  ThemeSelectorConnectedProps
> = ({ label }) => (
  <ThemeSelector
    label={label}
    themes={THEMES}
    default_theme={useSelector<AppState, ThemeName>((state) => state.theme)}
    on_update={(new_theme): void => {
      store.dispatch(set_theme(new_theme));
    }}
  />
);

export default ThemeSelectorConnected;
