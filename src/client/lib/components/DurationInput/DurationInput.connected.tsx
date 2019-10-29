import { FunctionalComponent, h } from 'preact';
import { useSelector } from 'react-redux';

import DurationInput from './DurationInput';

import { store, AppState } from '../../store';
import { set_timer } from '../../store/actions';
import { ThemeName, THEMES } from '../../themes';

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

const DurationInputConnected: FunctionalComponent<
  DurationInputConnectedProps
> = ({ label }) => (
  <DurationInput
    label={label}
    theme={THEMES[useSelector<AppState, ThemeName>((state) => state.theme)]}
    update_duration={(new_duration): void => {
      store.dispatch(set_timer(new_duration));
    }}
    initial_duration={useSelector<AppState, number>((state) => state.duration)}
  />
);

export default DurationInputConnected;
