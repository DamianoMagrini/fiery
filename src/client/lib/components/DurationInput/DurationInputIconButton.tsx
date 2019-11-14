import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import * as icons from './icons';

import styles from './DurationInputIconButton.scss';

import { ThemeContext } from '../../state';

interface DurationInputIconButtonProps {
  label: string;
  icon: keyof (typeof icons['LIGHT'] & typeof icons['DARK']);
  on_click(): void;
}

const DurationInputIconButton: FunctionalComponent<DurationInputIconButtonProps> = ({
  label,
  icon,
  on_click
}) => (
  <button class={styles.container} aria-label={label} onClick={on_click}>
    <img src={icons[useContext(ThemeContext)[0]][icon]} alt={''} />
  </button>
);

export default DurationInputIconButton;
