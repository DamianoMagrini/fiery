/// <reference path="index.d.ts" />

import 'preact/debug';

import { h, render } from 'preact';

import App from './app';

import './index.scss';

// Render the app into #root.
render(<App />, document.getElementById('root'));

// The service worker is not included in the development build.
