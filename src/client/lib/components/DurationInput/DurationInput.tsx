import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import clsx from '../../clsx';
import styles from './DurationInput.scss';

import DurationInputIconButton from './DurationInputIconButton';
import Typography from '../Typography/Typography';

import { to_ms, from_ms, pad, TimeInMinutesAndSeconds } from '../../time';

import { THEME_TUPLE_INDICES } from '../../themes';

/**
 * Props for {@link DurationInput}.
 *
 * @interface DurationInputProps
 */
interface DurationInputProps {
  /**
   * The label to be shown above the field.
   *
   * @memberof DurationInputProps
   */
  label: string;
  /**
   * The component's theme.
   *
   * @memberof ButtonProps
   */
  theme: [string, string, string];
  /**
   * Callback that will run whenever the duration is updated.
   *
   * @param duration The updated duration.
   * @memberof DurationInputProps
   */
  update_duration(duration: number): void;
  /**
   * The component's default duration to display.
   *
   * @memberof DurationInputProps
   */
  initial_duration: number;
}

const IGNORED_KEYS = ['ArrowLeft', 'ArrowRight', 'Tab', 'Shift'];
const NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const DurationInput: FunctionalComponent<DurationInputProps> = ({
  label,
  theme,
  update_duration,
  initial_duration
}) => {
  const [duration, set_duration_internal] = useState(from_ms(initial_duration));

  const set_duration = (new_duration: TimeInMinutesAndSeconds): void => {
    if (
      new_duration.minutes !== duration.minutes ||
      new_duration.seconds !== duration.seconds
    ) {
      set_duration_internal(new_duration);
      update_duration(to_ms(new_duration));
    }
  };

  /**
   * Return a function that handles key presses into a time input field.
   *
   * @param property Whether key presses is being handled for minutes or seconds.
   *
   * @returns The generated function.
   */
  const handle_key_down = (property: 'minutes' | 'seconds') => (
    event: KeyboardEvent
  ): void => {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    const selection_start = target.selectionStart;
    const selection_length = target.selectionEnd - target.selectionStart;

    event.stopImmediatePropagation();
    let should_prevent_default = true;
    if (IGNORED_KEYS.includes(event.key)) should_prevent_default = false;

    if (NUMBER_KEYS.includes(event.key)) {
      /*
      PSEUDOCODE TO CLARIFY WHAT HAPPENS BELOW

      IF the selection is two characters long,
        THEN insert the number and append a 0 before it;


      ELSE, IF the selection is one character long,
        THEN don't do anything (one character will be replaced with one
          character, so the length will stay the same);


      ELSE, IF no character is selected,
        - IF the cursor is at the last position (2),
          - IF the last character is a 0,
            - IF the typed character is not a 0,
                THEN replace the last character with the typed one;
            - ELSE,
                THEN set the value to 0;
          - ELSE,
              THEN shift the number to the left, and insert the typed character
              on the right;

        - ELSE,
            THEN replace the next character with the typed one and advance the
            cursor;
    */
      switch (selection_length) {
        case 2:
          target.value = `0${event.key}`;
          target.selectionStart = 2;
          break;
        case 1:
          // Don't do anything.
          should_prevent_default = false;
          break;
        case 0:
          if (selection_start === 2) {
            if (value[1] === '0') {
              if (event.key !== '0') target.value = target.value[0] + event.key;
              else target.value = '00';
            } else {
              target.value = target.value[1] + event.key;
            }
          } else {
            target.value =
              value.substring(0, selection_start) +
              event.key +
              value.substring(selection_start + 1, 2);
            target.selectionStart = target.selectionEnd = selection_start + 1;
          }
          break;
      }
    } else if (event.key === 'Backspace') {
      switch (selection_length) {
        case 2:
          target.value = '00';
          target.selectionStart = 2;
          break;
        case 1:
          // Don't do anything.
          should_prevent_default = false;
          break;
        case 0:
          switch (selection_start) {
            case 2:
              target.value = `0${target.value[0]}`;
              break;
            case 1:
              target.value = `0${target.value[1]}`;
              target.selectionStart = target.selectionEnd = 0;
              break;
            default:
              break;
          }
          break;
      }
    }

    if (should_prevent_default) event.preventDefault();

    // If the seconds value is more than 59, set it back to the limit.
    if (property === 'seconds' && Number(target.value) > 59)
      target.value = '59';

    // If the seconds value is less than 5, set it back to the limit.
    if (property === 'minutes' && Number(target.value) < 1) target.value = '01';

    // Update the component's state.
    if (target.value !== value)
      set_duration(
        property === 'minutes'
          ? {
              minutes: Number(target.value),
              seconds: duration.seconds
            }
          : {
              minutes: duration.minutes,
              seconds: Number(target.value)
            }
      );
  };

  const input_style = { color: theme[THEME_TUPLE_INDICES.TEXT] };

  return (
    <div class={styles.container}>
      <Typography variant={'paragraph'} theme={theme}>
        {label}
      </Typography>

      <div>
        <label htmlFor={'minutes-input'}>Your timer's minutes.</label>
        <input
          id={'minutes-input'}
          value={pad(duration.minutes)}
          class={clsx(styles.number_input, styles.minutes_input)}
          style={input_style}
          onKeyDown={handle_key_down('minutes')}
        />

        <Typography variant={'hero'} inline theme={theme}>
          :
        </Typography>

        <label htmlFor={'seconds-input'}>Your timer's seconds.</label>
        <input
          id={'seconds-input'}
          value={pad(duration.seconds)}
          class={clsx(styles.number_input, styles.seconds_input)}
          style={input_style}
          onKeyDown={handle_key_down('seconds')}
        />
      </div>

      <DurationInputIconButton
        label={'Remove five minutes from the timer'}
        icon={'minus'}
        on_click={(): void => {
          const { minutes, seconds } = duration;
          if (minutes > 5) set_duration({ minutes: minutes - 5, seconds });
          else set_duration({ minutes: 0, seconds });
        }}
      />
      <DurationInputIconButton
        label={'Add five minutes to the timer'}
        icon={'plus'}
        on_click={(): void => {
          const { minutes, seconds } = duration;
          if (minutes < 94) set_duration({ minutes: minutes + 5, seconds });
          else set_duration({ minutes: 99, seconds });
        }}
      />
    </div>
  );
};

export default DurationInput;
