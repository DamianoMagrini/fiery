import { FunctionalComponent, h } from 'preact';

import styles from './Button.scss';
import clsx from '../../clsx';

import Typography from '../Typography/Typography';

import { THEMES } from '../../themes';

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
  /**
   * The component's theme.
   *
   * @memberof ButtonProps
   */
  theme: [string, string, string];
}

/**
 * The button component. It renders a styled button and runs the specified
 * callback when clicked.
 */
const Button: FunctionalComponent<ButtonProps> = ({
  children,
  on_click,
  variant,
  theme
}) => {
  const outlined = variant === 'outlined';
  return (
    <button class={clsx(styles.container, { outlined })} onClick={on_click}>
      <Typography variant={'button'} theme={outlined ? theme : THEMES.LIGHT}>
        {children}
      </Typography>
    </button>
  );
};

export default Button;
