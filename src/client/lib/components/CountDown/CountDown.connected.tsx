import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import CountDown from './CountDown';

import { AppState } from '../../store';
import { ThemeName, THEMES } from '../../themes';

/**
 * Props for {@link CountDownConnected}.
 *
 * @interface CountDownProps
 */
interface CountDownConnectedProps {
  /**
   * The countdown's duration in milliseconds.
   *
   * @memberof CountDownProps
   */
  duration: number;
  /**
   * The function to call when the countdown has ended.
   */
  on_complete?(): void;
}

/**
 * The countdown component, which counts to zero starting from the given time.
 */
const CountDownConnected: FunctionalComponent<CountDownConnectedProps> = ({
  duration,
  on_complete
}) => (
  <CountDown
    duration={duration}
    on_complete={on_complete}
    theme={THEMES[useSelector<AppState, ThemeName>((state) => state.theme)]}
  />
);

export default CountDownConnected;
