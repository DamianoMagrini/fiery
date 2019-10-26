/**
 * A way of expressing a duration of time, in minutes and seconds.
 *
 * @interface TimeInMinutesAndSeconds
 */
export interface TimeInMinutesAndSeconds {
  /**
   * The minutes component of the time. Always an integer.
   *
   * @memberof TimeInMinutesAndSeconds
   */
  minutes?: number;
  /**
   * The seconds componennt of the time. Always an integer.
   *
   * @memberof TimeInMinutesAndSeconds
   */
  seconds?: number;
}

/**
 * Converts time from minutes and seconds to milliseconds
 *
 * @param time The time to convert, expressed in minutes and seconds.
 *
 * @returns The same amount of time, expressed in milliseconds.
 */
export const to_ms = (time: TimeInMinutesAndSeconds): number =>
  ((time.minutes || 0) * 60 + (time.seconds || 0)) * 1000;

/**
 * Converts time from milliseconds to minutes and seconds.
 *
 * @param ms The time to convert, expressed in milliseconds.
 *
 * @returns The same amount of time, expressed in minutes and seconds.
 */
export const from_ms = (ms: number): TimeInMinutesAndSeconds => ({
  minutes: Math.floor(ms / 60_000),
  seconds: Math.round(Math.floor(ms % 60_000) / 1_000)
});

/**
 * Add zeros to the start of a length of time until the desired length (which
 * defaults to 2) is reached.
 *
 * @param time The number to pad.
 * @param [length=2] The desired maximum length.
 * @returns {string}
 */
export const pad = (time: number, length: number = 2): string =>
  time.toString().padStart(length, '0');
