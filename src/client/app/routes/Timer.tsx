import { analytics } from '../../firebase';

import { createRef, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import styles from './Timer.scss';

import { DurationContext, set_duration } from '../../lib/state';

import { Button, CountDown as CountDownConnected } from '../../lib/components';
import { CountDown } from '../../lib/components/CountDown';

import { exit_fullscreen } from '../../lib/fullscreen';
import { route } from 'preact-router';
import { to_ms } from '../../lib/time';

const Timer: FunctionalComponent = () => {
  const [duration, dispatch_duration] = useContext(DurationContext);

  const countdown_ref = createRef<CountDown>();

  return (
    <div class={styles.wrapper}>
      <CountDownConnected
        countdown_ref={countdown_ref}
        duration={duration}
        on_complete={(): void => {
          analytics.logEvent('timer_completed', { duration });
          exit_fullscreen();
          dispatch_duration(set_duration(to_ms({ minutes: 30 })));
          route('/finished');
        }}
      />

      <Button
        on_click={(): void => {
          const { time_remaining } = countdown_ref.current;
          analytics.logEvent('timer_canceled', { time_remaining, duration });
          exit_fullscreen();
          dispatch_duration(set_duration(time_remaining));
          route('/given-up');
        }}
        variant={'outlined'}>
        give up
      </Button>

      <img
        class={styles.bottom_icon}
        src={'/images/branding/icon.svg'}
        alt='Fiery'
      />
    </div>
  );
};

export default Timer;
