import { FunctionalComponent, h, Ref } from 'preact';
import { useContext } from 'preact/hooks';

import CountDown from './CountDown';

import { ThemeContext } from '../../state';
import { THEMES } from '../../themes';

/**
 * Props for {@link CountDownConnected}.
 *
 * @interface CountConnectedDownProps
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
   *
   * @memberof CountDownConnectedProps
   */
  on_complete?(): void;
  /**
   * The `ref` to be passed in to the wrapped `CountDown` component.
   * @memberof CountDownConnectedProps
   */
  countdown_ref: Ref<CountDown>;
}

/**
 * The countdown component, which counts to zero starting from the given time.
 */
const CountDownConnected: FunctionalComponent<CountDownConnectedProps> = ({
  duration,
  on_complete,
  countdown_ref
}) => (
  <CountDown
    duration={duration}
    on_complete={on_complete}
    theme={THEMES[useContext(ThemeContext)[0]]}
    ref={countdown_ref}
  />
);

export default CountDownConnected;
