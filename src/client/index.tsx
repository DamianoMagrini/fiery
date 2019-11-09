/// <reference path="../webpack-constants.d.ts" />
/// <reference path="index.d.ts" />

if (__DEBUG__) {
  require('preact/debug');
}

import { h, render } from 'preact';

import App from './app';

import './index.scss';

// Render the app into #root.
render(<App />, document.getElementById('root'));

if (!__DEBUG__) {
  /*
    If the browser supports service workers, try to register one as soon as the
    page has finished loading.
  */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`/service_worker.v${__VERSION__}.bundle.js`)
        .then((_registration) => {})
        .catch((_error) => {});
    });
  }
}
