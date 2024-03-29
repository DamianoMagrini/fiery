import { analytics } from '../../firebase';
import { FunctionalComponent, h } from 'preact';

import styles from './Home.scss';

import {
  Button,
  DurationInput,
  ThemeSelector,
  VerticalSeparator
} from '../../lib/components';

// The state-indipendent Typography component.
import { Typography } from '../../lib/components/Typography';

import { store } from '../../lib/store';
import { THEMES } from '../../lib/themes';

import { route } from 'preact-router';

import { enter_fullscreen } from '../../lib/fullscreen';

const Home: FunctionalComponent = () => (
  <div class={styles.wrapper}>
    <img src={'/images/branding/logo.svg'} alt={'Fiery'} />

    <VerticalSeparator dekstop_height={96} mobile_height={72} />

    <DurationInput label={'focus for'} />

    <VerticalSeparator dekstop_height={72} mobile_height={36} />

    <ThemeSelector label={'screen color'} />

    <VerticalSeparator dekstop_height={96} mobile_height={72} />

    <Button
      on_click={(): void => {
        analytics.logEvent('timer_started', {
          duration: store.getState().duration
        });
        enter_fullscreen();
        route('/timer');
      }}>
      start
    </Button>

    <div class={styles.footer}>
      <Typography theme={THEMES.LIGHT} variant={'caption'}>
        Made with <span style={{ fontFamily: '' }}>❤</span> by Damiano Magrini
      </Typography>
    </div>
  </div>
);

export default Home;
