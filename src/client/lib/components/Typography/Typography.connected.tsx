import { ComponentChildren, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import Typography from './Typography';

import { ThemeContext } from '../../state';
import { THEMES } from '../../themes';

/**
 * Props for {@link TypographyConnected}
 *
 * @interface TypographyConnectedProps
 */
interface TypographyConnectedProps {
  /**
   * The text content.
   *
   * @memberof TypographyProps
   */
  children: ComponentChildren;
  /**
   * The text variant, following the style guide.
   *
   * @memberof TypographyProps
   */
  variant: 'hero' | 'headline' | 'paragraph' | 'button' | 'caption';
  /**
   * Whether the text should be inline (as opposed to block).
   *
   * @memberof TypographyProps
   */
  inline?: boolean;
}

const TypographyConnected: FunctionalComponent<TypographyConnectedProps> = ({
  children,
  variant,
  inline
}) => (
  <Typography
    variant={variant}
    inline={inline}
    theme={THEMES[useContext(ThemeContext)[0]]}>
    {children}
  </Typography>
);

export default TypographyConnected;
