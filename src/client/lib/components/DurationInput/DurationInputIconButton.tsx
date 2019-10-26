import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import * as icons from './icons';

import styles from './DurationInputIconButton.scss';

import { AppState } from '../../store';
import { ThemeName } from '../../themes';

interface DurationInputIconButtonProps {
  label: string;
  icon: keyof (typeof icons['LIGHT'] & typeof icons['DARK']);
  on_click(): void;
}

const DurationInputIconButton: FunctionalComponent<
  DurationInputIconButtonProps
> = ({ label, icon, on_click }) => {
  const theme = useSelector<AppState, ThemeName>((store) => store.theme);

  return (
    <button class={styles.container} aria-label={label} onClick={on_click}>
      <img src={icons[theme][icon]} alt={''} />
    </button>
  );
};

export default DurationInputIconButton;
