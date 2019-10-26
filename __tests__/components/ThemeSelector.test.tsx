import { h } from 'preact';
import { ReactElement } from 'react';
import { mount } from 'enzyme';

import ThemeSelector from '../../src/client/lib/components/ThemeSelector';
import ThemeSelectorOption from '../../src/client/lib/components/ThemeSelector/ThemeSelectorOption';

import { ThemeName, THEMES } from '../../src/client/lib/themes';

describe('ThemeSelector', () => {
  // Data and functions for testing
  const default_theme: ThemeName = 'LIGHT';

  const themes_number = Object.keys(THEMES).length;

  const other_theme_index = 0;

  let interact_count = 0,
    change_count = 0;

  const on_interact = () => interact_count++;
  const on_change = () => change_count++;

  // Utility functions
  const click_option = (option_index: number) => {
    theme_selector
      .find(ThemeSelectorOption) // `ThemeSelectorOption` components
      .children() // `Memo` components
      .children() // `div`s
      .at(option_index)
      .simulate('click');
  };

  // Component initialization
  const theme_selector = mount((
    <ThemeSelector label={'Test'} default_theme={default_theme} />
  ) as ReactElement);

  // Tests
  it('has the correct number of options', () => {
    /*
      Expect the number of options to correspond to the number of provided
      themes.
    */
    expect(theme_selector.find(ThemeSelectorOption).children().length).toBe(
      themes_number
    );
  });

  it('has the correct default theme', () => {
    theme_selector.find(ThemeSelectorOption).forEach((wrapper, index) => {
      /*
        Expect the option corresponding to the default theme to have the
        `selected` attribute set to `true`, and `false` otherwise.
      */
      expect(wrapper.props().selected).toBe(
        Object.keys(THEMES)[index] === default_theme
      );
    });
  });

  it('changes theme when a different option is selected', () => {
    click_option(other_theme_index);

    theme_selector.find(ThemeSelectorOption).forEach((wrapper, index) => {
      /*
        Expect the option corresponding to the newly selected theme to have the
        `selected` attribute set to `true`, and `false` otherwise.
      */
      expect(wrapper.props().selected).toBe(index === other_theme_index);
    });
  });

  it('runs the appropriate callbacks', () => {
    // Reset selected option and counters.
    click_option(0);
    interact_count = change_count = 0;

    /*
      Click the selected option, and expect:
      - the interact count to have increased;
      - the change count to have stayed the same.
    */

    click_option(0);

    expect(interact_count).toBe(1);
    expect(change_count).toBe(0);

    /*
      Click the other option, and expect:
      - the interact count to have increased;
      - the change count to have increased as well.
    */
    click_option(1);

    expect(interact_count).toBe(2);
    expect(change_count).toBe(1);
  });
});
