import { Component, h } from 'preact';

import Typography from '../Typography/Typography';

import { from_ms, pad } from '../../time';

/**
 * Props for {@link CountDown}.
 *
 * @interface CountDownProps
 */
interface CountDownProps {
  /**
   * The countdown's duration in milliseconds.
   *
   * @memberof CountDownProps
   */
  duration: number;
  /**
   * The function to call when the countdown has ended.
   *
   * @memberof ButtonProps
   */
  on_complete?(): void;
  /**
   * The component's theme.
   *
   * @memberof ButtonProps
   */
  theme: [string, string, string];
}

/**
 * The countdown component, which counts to zero starting from the given time.
 *
 * @class CountDown
 * @extends {Component<CountDownProps>}
 */
class CountDown extends Component<CountDownProps> {
  private interval_id: number;

  state = {
    time_remaining: this.props.duration,
    start_time: Date.now()
  };

  /**
   * Advance the timer by one second, and call the `on_complete` callback if
   * the countdown has ended.
   *
   * @memberof CountDown
   */
  private tick = () => {
    if (this.state.time_remaining <= 1000) {
      this.props.on_complete();
      clearInterval(this.interval_id);
    } else {
      /*
        Note that this does not depend on the previous `state.time_remaining`
        value, as it is possible that the function will not be run exactly
        every 1000 ms. Therefore, every time the remaining time is updated,
        `Date.now()` is called, to make up for any inaccuracy.
      */
      this.setState(() => ({
        time_remaining: this.state.start_time + this.props.duration - Date.now()
      }));
    }
  };

  // TODO resolve conflicts with @types/node (when testing with Jest).
  // @ts-ignore
  componentWillMount = () => (this.interval_id = setInterval(this.tick, 1_000));
  componentWillUnmount = () => clearInterval(this.interval_id);

  render = () => (
    <Typography variant={'hero'} theme={this.props.theme}>
      {pad(from_ms(this.state.time_remaining).minutes)}:
      {pad(from_ms(this.state.time_remaining).seconds)}
    </Typography>
  );

  /**
   * The remaining time.
   *
   * @readonly
   * @memberof CountDown
   */
  public get time_remaining(): number {
    return this.state.time_remaining;
  }
}

export default CountDown;
