import { FunctionalComponent, h } from 'preact';

import styles from './Button.scss';
import clsx from '../../clsx';

import Typography from '../Typography';

import { THEMES, THEME_TUPLE_INDICES } from '../../themes';

/**
 * Props for {@link Button}.
 *
 * @interface ButtonProps
 */
interface ButtonProps {
  /**
   * The button's label.
   *
   * @memberof ButtonProps
   */
  children: string;
  /**
   * The callback to be run when the button is pressed.
   *
   * @memberof ButtonProps
   */
  on_click?: (event: MouseEvent) => void;
  /**
   * Whether the button should appear with a colored fill or outline.
   *
   * @memberof ButtonProps
   */
  variant?: 'outlined' | 'filled';
}

/**
 * The button component. It renders a styled button and runs the specified
 * callback when clicked.
 */
const Button: FunctionalComponent<ButtonProps> = ({
  children,
  on_click,
  variant
}) => {
  const outlined = variant === 'outlined';
  return (
    <button class={clsx(styles.container, { outlined })} onClick={on_click}>
      <Typography
        color={outlined ? null : THEMES.LIGHT[THEME_TUPLE_INDICES.TEXT]}
        variant={'button'}>
        {children}
      </Typography>
    </button>
  );
};

export default Button;
