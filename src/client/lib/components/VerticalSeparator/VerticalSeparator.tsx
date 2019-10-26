import { h, Fragment, FunctionalComponent } from 'preact';

import styles from './VerticalSeparator.scss';

/**
 * Props for {@link VerticalSeparator}, without varying height between multiple
 * screen sizes.
 *
 * @interface VerticalSeparatorSingleHeightProps
 */
interface VerticalSeparatorSingleHeightProps {
  height: number;
}
/**
 * Props for {@link VerticalSeparator}, specifying two different heights
 * depending on screen size.
 *
 * @interface VerticalSeparatorMultipleHeightProps
 */
interface VerticalSeparatorMultipleHeightProps {
  mobile_height: number;
  dekstop_height: number;
}

/**
 * A component that takes up a set amount of vertical space.
 */
const VerticalSeparator: FunctionalComponent<
  VerticalSeparatorSingleHeightProps | VerticalSeparatorMultipleHeightProps
> = (props) =>
  'height' in props ? (
    <div role={'separator'} style={{ height: props.height }} />
  ) : (
    <Fragment>
      <div
        role={'separator'}
        class={styles.separator_mobile}
        style={{ height: props.mobile_height }}
      />
      <div
        role={'separator'}
        class={styles.separator_desktop}
        style={{ height: props.dekstop_height }}
      />
    </Fragment>
  );

export default VerticalSeparator;
