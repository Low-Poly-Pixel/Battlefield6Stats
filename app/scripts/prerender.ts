import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const entryServerUrl = pathToFileURL(resolve('dist-ssr/entry-server.js')).href;
const {render} = (await import(entryServerUrl)) as {render: () => string};

const template = readFileSync('dist/index.html', 'utf-8');
const html = template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

writeFileSync('dist/index.html', html);
