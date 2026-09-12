import {MantineProvider} from '@mantine/core';
import {renderToString} from 'react-dom/server';

import App from './App.tsx';
import {theme} from './theme.ts';

export const render = () =>
  renderToString(
    <MantineProvider theme={theme} forceColorScheme="dark">
      <App />
    </MantineProvider>,
  );
