import { h } from 'preact';
import { ReactElement } from 'react';
import { mount } from 'enzyme';

import CountDown from '../../src/client/lib/components/CountDown/CountDown';

import { to_ms } from '../../src/client/lib/time';

import { THEMES } from '../test_data';

describe('CountDown', () => {
  // Data and functions for testing
  const duration = to_ms({ seconds: 4 });

  let completed = false;
  const on_complete = () => {
    completed = true;
  };

  // Component and ref initialization
  const countdown = mount((
    <CountDown
      duration={duration}
      on_complete={on_complete}
      theme={THEMES.LIGHT}
    />
  ) as ReactElement);

  // Tests
  it('displays the correct initial time', () => {
    expect(
      countdown
        .childAt(0)
        .childAt(0)
        .text()
    ).toBe('00:04');
  });

  it('runs the callback upon completion', () => {
    setTimeout(() => {
      expect(completed).toBe(true);
    }, to_ms({ seconds: 4 }));
  });
});
