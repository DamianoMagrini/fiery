import { createRef, FunctionalComponent, h } from 'preact';

import styles from './Timer.scss';

import { Button, CountDown as CountDownConnected } from '../../lib/components';
import { CountDown } from '../../lib/components/CountDown';
import { useSelector } from 'react-redux';
import { AppState, store } from '../../lib/store';

import { route } from 'preact-router';

import { exit_fullscreen } from '../../lib/fullscreen';
import { set_timer } from '../../lib/store/actions';
import { to_ms } from '../../lib/time';

const Timer: FunctionalComponent = () => {
  const duration = useSelector<AppState, number>((state) => state.duration);

  const countdown_ref = createRef<CountDown>();

  return (
    <div class={styles.wrapper}>
      <CountDownConnected
        countdown_ref={countdown_ref}
        duration={duration}
        on_complete={(): void => {
          exit_fullscreen();
          store.dispatch(set_timer(to_ms({ minutes: 30 })));
          route('/finished');
        }}
      />

      <Button
        on_click={(): void => {
          exit_fullscreen();
          store.dispatch(set_timer(countdown_ref.current.time_remaining));
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
