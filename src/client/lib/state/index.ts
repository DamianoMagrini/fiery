import { ThemeName } from '../themes';

export interface AppState {
  duration: number;
  theme: ThemeName;
}

export { StateProvider, DurationContext, ThemeContext } from './provider';

export { set_duration, set_theme } from './actions';
