import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import Button from './Button';

import { ThemeContext } from '../../state';
import { THEMES } from '../../themes';

/**
 * Props for {@link ButtonConnected}.
 *
 * @interface ButtonConnectedProps
 */
interface ButtonConnectedProps {
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
const ButtonConnected: FunctionalComponent<ButtonConnectedProps> = ({
  children,
  on_click,
  variant
}) => (
  <Button
    on_click={on_click}
    variant={variant}
    theme={THEMES[useContext(ThemeContext)[0]]}>
    {children}
  </Button>
);

export default ButtonConnected;
