import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import styles from './Home.scss';

import {
  Button,
  DurationInput,
  ThemeSelector,
  Typography,
  VerticalSeparator
} from '../../lib/components';

import { AppState, store } from '../../lib/store';
import { ThemeName, THEMES, THEME_TUPLE_INDICES } from '../../lib/themes';

import { set_timer } from '../../lib/store/actions';
import { route } from 'preact-router';

import { enter_fullscreen } from '../../lib/fullscreen';

const Home: FunctionalComponent = () => {
  const duration = useSelector<AppState, number>((state) => state.duration);
  const theme = useSelector<AppState, ThemeName>((state) => state.theme);

  return (
    <div class={styles.wrapper}>
      <img src={'/images/branding/logo.svg'} alt='Fiery' />

      <VerticalSeparator dekstop_height={96} mobile_height={72} />

      <DurationInput label={'focus for'} />

      <VerticalSeparator dekstop_height={72} mobile_height={36} />

      <ThemeSelector label={'screen color'} default_theme={theme} />

      <VerticalSeparator dekstop_height={96} mobile_height={72} />

      <Button
        on_click={() => {
          enter_fullscreen();
          route('/timer');
        }}>
        start
      </Button>

      <div class={styles.footer}>
        <Typography
          color={THEMES.LIGHT[THEME_TUPLE_INDICES.TEXT]}
          variant={'caption'}>
          Made with <span style={{ fontFamily: '' }}>❤</span> by Damiano Magrini
        </Typography>
      </div>
    </div>
  );
};

export default Home;
