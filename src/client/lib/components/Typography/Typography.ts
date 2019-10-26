import { h, ComponentChildren, FunctionalComponent } from 'preact';
import { useSelector } from 'react-redux';

import styles from './Typography.scss';
import clsx from '../../clsx';

import { AppState } from '../../store';

import { ThemeName, THEMES, THEME_TUPLE_INDICES } from '../../themes';

interface TypographyProps {
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
  /**
   * Hex color override.
   *
   * @memberof TypographyProps
   */
  color?: string;
}

/**
 * A map of typography variants to the elements they should be contained in.
 */
const MAP_VARIANT_TO_ELEMENT: {
  [variant in TypographyProps['variant']]: string;
} = {
  hero: 'h1',
  headline: 'h2',
  paragraph: 'p',
  button: 'span',
  caption: 'p'
};

const Typography: FunctionalComponent<TypographyProps> = ({
  children,
  variant,
  inline,
  color
}) =>
  h(
    MAP_VARIANT_TO_ELEMENT[variant],
    {
      class: clsx(styles.text, `variant_${variant}`),
      style: {
        ...(inline && { display: 'inline-block' }),
        color:
          color ||
          THEMES[useSelector<AppState, ThemeName>((state) => state.theme)][
            THEME_TUPLE_INDICES.TEXT
          ]
      }
    },
    children
  );

export default Typography;
