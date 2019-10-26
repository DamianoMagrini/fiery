import { ComponentChildren, FunctionalComponent, h } from 'preact';

import clsx from '../../clsx';
import styles from './Typography.scss';

import { THEME_TUPLE_INDICES } from '../../themes';

/**
 * Props for {@link Typography}
 *
 * @interface TypographyProps
 */
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
   * The component's theme.
   *
   * @memberof TypographyProps
   */
  theme: [string, string, string];
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
  theme
}) =>
  h(
    MAP_VARIANT_TO_ELEMENT[variant],
    {
      class: clsx(styles.text, `variant_${variant}`),
      style: {
        ...(inline && { display: 'inline-block' }),
        color: theme[THEME_TUPLE_INDICES.TEXT]
      }
    },
    children
  );

export default Typography;
