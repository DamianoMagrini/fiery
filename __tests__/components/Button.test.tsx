import { h } from 'preact';
import { ReactElement } from 'react';
import { mount } from 'enzyme';

import Button from '../../src/client/lib/components/Button';

describe('Button', () => {
  // Data and functions for testing
  const label_text = `Test label ${Math.random()}`;

  let clicked = false;
  const click_handler = () => {
    clicked = true;
  };

  // Component initialization
  const button = mount((
    <Button on_click={click_handler}>{label_text}</Button>
  ) as ReactElement);

  // Tests
  it('displays the specified label', () => {
    expect(button.text()).toEqual(label_text);
  });

  it('runs the click event handler', () => {
    button.find('button').simulate('click');
    expect(clicked).toBe(true);
  });
});
