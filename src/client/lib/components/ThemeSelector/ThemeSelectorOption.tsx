import { h } from 'preact';
import { memo } from 'preact/compat';

import styles from './ThemeSelectorOption.scss';
import clsx from '../../clsx';

/**
 * Props for {@link ThemeSelectorOption}.
 *
 * @interface ThemeSelectorOptionProps
 */
interface ThemeSelectorOptionProps {
  /**
   * Whether the option is currently selected.
   *
   * @memberof ThemeSelectorOptionProps
   */
  selected: boolean;
  /**
   * The hex color to be shown.
   *
   * @memberof ThemeSelectorOptionProps
   */
  color: string;
  /**
   * The callback to be run when this option is clicked.
   *
   * @memberof ThemeSelectorOptionProps
   */
  on_click(): void;
}

/**
 * Internally used component. Represents one of the clickable options of the
 * theme selector.
 */
const ThemeSelectorOption = memo(
  ({ selected, color, on_click }: ThemeSelectorOptionProps) => (
    <input
      type={'button'}
      style={{ background: color }}
      class={clsx(styles.container, { [styles.selected]: selected })}
      onClick={on_click}
    />
  )
);

export default ThemeSelectorOption;
