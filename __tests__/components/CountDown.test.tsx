import { createRef, h } from 'preact';
import { ReactElement } from 'react';
import { mount } from 'enzyme';

import CountDown from '../../src/client/lib/components/CountDown';

import { to_ms, from_ms } from '../../src/client/lib/time';

describe('CountDown', () => {
  // Data and functions for testing
  const countdown_ref = createRef<CountDown>();

  const duration = to_ms({ seconds: 4 });

  let completed = false;
  const on_complete = () => {
    completed = true;
  };

  // Component and ref initialization
  const countdown = mount((
    <CountDown
      ref={countdown_ref}
      duration={duration}
      on_complete={on_complete}
    />
  ) as ReactElement);

  // Tests
  it('displays the correct initial time', () => {
    expect(countdown_ref.current.time_remaining).toBe(duration);
  });
});
