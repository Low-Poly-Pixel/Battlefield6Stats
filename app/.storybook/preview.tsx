import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@mantine/core/styles.css';
import '../src/index.css';

import {MantineProvider} from '@mantine/core';
import type {Preview} from '@storybook/react-vite';

import {mantineCssVariableResolver} from '../src/cssVariablesResolver.ts';
import {mantineTheme} from '../src/theme.ts';

const preview: Preview = {
  decorators: [
    Story => (
      <MantineProvider theme={mantineTheme} cssVariablesResolver={mantineCssVariableResolver} forceColorScheme="dark">
        <Story />
      </MantineProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'mantine-dark',
      values: [{name: 'mantine-dark', value: 'var(--mantine-color-body)'}],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  tags: ['autodocs'],
};

export default preview;
