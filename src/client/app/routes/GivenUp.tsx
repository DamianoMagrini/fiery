import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import styles from './GivenUp.scss';

import { Button, Typography, VerticalSeparator } from '../../lib/components';

import { AppState, store } from '../../lib/store';

import { set_timer } from '../../lib/store/actions';
import { route } from 'preact-router';

import { from_ms, to_ms } from '../../lib/time';

const GivenUp: FunctionalComponent = () => {
  const duration = useSelector<AppState, number>((state) => state.duration);

  return (
    <div class={styles.wrapper}>
      <Typography variant={'headline'}>Maybe next time?</Typography>
      <VerticalSeparator height={12} />
      <Typography variant={'paragraph'}>
        Just {from_ms(duration).minutes} minutes left this time!
      </Typography>

      <Button
        variant={'outlined'}
        on_click={(): void => {
          store.dispatch(set_timer(to_ms({ minutes: 30 })));
          route('/');
        }}>
        close
      </Button>

      <img
        class={styles.bottom_icon}
        src={'/images/branding/icon.svg'}
        alt='Fiery'
      />
    </div>
  );
};

export default GivenUp;
