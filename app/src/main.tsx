import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@mantine/core/styles.css';
import './index.css';

import {MantineProvider} from '@mantine/core';
import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';

import App from './App.tsx';
import {mantineCssVariableResolver} from './cssVariablesResolver.ts';
import {mantineTheme} from './theme.ts';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <MantineProvider theme={mantineTheme} cssVariablesResolver={mantineCssVariableResolver} forceColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
