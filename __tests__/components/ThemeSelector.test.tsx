import { h } from 'preact';
import { ReactElement } from 'react';
import { mount } from 'enzyme';

import { ThemeSelector } from '../../src/client/lib/components/ThemeSelector';
import ThemeSelectorOption from '../../src/client/lib/components/ThemeSelector/ThemeSelectorOption';

describe('ThemeSelector', () => {
  // Data and functions for testing
  const THEMES: {
    [theme_name: string]: [string, string, string];
  } = {
    LIGHT: ['#ffffff', '#ffffff', '#000000'],
    DARK: ['#000000', '#000000', '#ffffff']
  };

  const DEFAULT_THEME: keyof typeof THEMES = 'LIGHT';

  const other_theme_index = 0;

  let change_count = 0;
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
    <ThemeSelector
      label={'Test'}
      themes={THEMES}
      default_theme={DEFAULT_THEME}
      on_update={on_change}
    />
  ) as ReactElement);

  // Tests
  it('has the correct number of options', () => {
    /*
      Expect the number of options to correspond to the number of provided
      themes.
    */
    expect(theme_selector.find(ThemeSelectorOption).children().length).toBe(
      Object.keys(THEMES).length // The number of themes.
    );
  });

  it('has the correct default theme', () => {
    theme_selector.find(ThemeSelectorOption).forEach((wrapper, index) => {
      /*
        Expect the option corresponding to the default theme to have the
        `selected` attribute set to `true`, and `false` otherwise.
      */
      expect(wrapper.props().selected).toBe(
        Object.keys(THEMES)[index] === DEFAULT_THEME
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

  it('runs the callback properly', () => {
    // Reset selected option and counters.
    click_option(0);
    change_count = 0;

    // Click the selected option, and expect the change count to still be 0.
    click_option(0);
    expect(change_count).toBe(0);

    // Click the other option, and expect the change count to have increased.
    click_option(1);
    expect(change_count).toBe(1);
  });
});
