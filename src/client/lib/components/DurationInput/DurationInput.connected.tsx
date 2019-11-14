import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import DurationInput from './DurationInput';

import { DurationContext, set_duration, ThemeContext } from '../../state';
import { THEMES } from '../../themes';

/**
 * Props for {@link DurationInputConnected}.
 *
 * @interface DurationInputConnectedProps
 */
interface DurationInputConnectedProps {
  /**
   * The label to be shown above the field.
   *
   * @memberof DurationInputProps
   */
  label: string;
}

const DurationInputConnected: FunctionalComponent<DurationInputConnectedProps> = ({
  label
}) => (
  <DurationInput
    label={label}
    theme={THEMES[useContext(ThemeContext)[0]]}
    update_duration={(new_duration): void => {
      useContext(DurationContext)[1](set_duration(new_duration));
    }}
    initial_duration={useContext(DurationContext)[0]}
  />
);

export default DurationInputConnected;
