import { ComponentChildren, FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';

import { ThemeName, THEMES } from '../../themes';
import Typography from './Typography';

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
    theme={THEMES[useSelector<AppState, ThemeName>((state) => state.theme)]}>
    {children}
  </Typography>
);

export default TypographyConnected;
