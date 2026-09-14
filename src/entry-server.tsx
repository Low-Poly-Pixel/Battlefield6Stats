import {MantineProvider} from '@mantine/core';
import {renderToString} from 'react-dom/server';

import App from './App.tsx';
import {mantineCssVariableResolver} from './cssVariablesResolver.ts';
import {mantineTheme} from './theme.ts';

export const render = () =>
  renderToString(
    <MantineProvider
      theme={mantineTheme}
      cssVariablesResolver={mantineCssVariableResolver}
      forceColorScheme="dark"
    >
      <App />
    </MantineProvider>,
  );
