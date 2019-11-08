import {
  to_ms,
  from_ms,
  pad,
  TimeInMinutesAndSeconds
} from '../../src/client/lib/time';

describe('to_ms', () => {
  it('converts milliseconds to minutes and seconds correctly', () => {
    expect(to_ms({ minutes: 1, seconds: 26 })).toBe(86000);
  });

  it('rounds up correctly', () => {
    expect(to_ms({ minutes: 1, seconds: 25.9 })).toBe(86000);
    expect(to_ms({ minutes: 1, seconds: 25.5 })).toBe(86000);
  });

  it('rounds down correctly', () => {
    expect(to_ms({ minutes: 1, seconds: 26.1 })).toBe(86000);
    expect(to_ms({ minutes: 1, seconds: 26.499 })).toBe(86000);
  });
});

describe('from_ms', () => {
  it('converts milliseconds to minutes and seconds correctly', () => {
    expect(from_ms(86000)).toMatchObject<TimeInMinutesAndSeconds>({
      minutes: 1,
      seconds: 26
    });
  });

  it('rounds up correctly', () => {
    expect(from_ms(85900)).toMatchObject<TimeInMinutesAndSeconds>({
      minutes: 1,
      seconds: 26
    });
    expect(from_ms(85500)).toMatchObject<TimeInMinutesAndSeconds>({
      minutes: 1,
      seconds: 26
    });
    expect(from_ms(539999)).toMatchObject<TimeInMinutesAndSeconds>({
      minutes: 9,
      seconds: 0
    }); // Rather than 8:60.
  });

  it('rounds down correctly', () => {
    expect(from_ms(86100)).toMatchObject<TimeInMinutesAndSeconds>({
      minutes: 1,
      seconds: 26
    });
    expect(from_ms(86499)).toMatchObject<TimeInMinutesAndSeconds>({
      minutes: 1,
      seconds: 26
    });
  });
});

describe('pad', () => {
  it('pads number appropriately without a length provided', () => {
    expect(pad(7)).toBe('07');
    expect(pad(25)).toBe('25');
    expect(pad(246)).toBe('246');
  });

  it('pads number appropriately with a length provided', () => {
    expect(pad(7, 1)).toBe('7');
    expect(pad(7, 3)).toBe('007');
    expect(pad(7, 4)).toBe('0007');

    expect(pad(25, 1)).toBe('25');
    expect(pad(25, 3)).toBe('025');
    expect(pad(25, 4)).toBe('0025');

    expect(pad(246, 1)).toBe('246');
    expect(pad(246, 3)).toBe('246');
    expect(pad(246, 4)).toBe('0246');
  });
});
