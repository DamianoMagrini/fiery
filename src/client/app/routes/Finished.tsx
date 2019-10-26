import { FunctionalComponent, h } from 'preact';

import styles from './Finished.scss';

import { Button, Typography, VerticalSeparator } from '../../lib/components';

import { route } from 'preact-router';

const Finished: FunctionalComponent = () => (
  <div class={styles.wrapper}>
    <Typography variant={'headline'}>Great!</Typography>
    <VerticalSeparator height={12} />
    <Typography variant={'paragraph'}>You managed to stay focused</Typography>

    <Button on_click={() => route('/')}>finish</Button>

    <img
      class={styles.bottom_icon}
      src={'/images/branding/icon.svg'}
      alt='Fiery'
    />
  </div>
);

export default Finished;
