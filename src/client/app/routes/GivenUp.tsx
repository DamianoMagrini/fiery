import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import styles from './GivenUp.scss';

import { Button, Typography, VerticalSeparator } from '../../lib/components';

import { DurationContext, set_duration } from '../../lib/state';

import { from_ms, to_ms } from '../../lib/time';
import { route } from 'preact-router';

const GivenUp: FunctionalComponent = () => {
  const [duration, dispatch_duration] = useContext(DurationContext);

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
          dispatch_duration(set_duration(to_ms({ minutes: 30 })));
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
