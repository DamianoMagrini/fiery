/// <reference path="index.d.ts" />

import { h, render } from 'preact';

import App from './app';

import './index.scss';

// Render the app into #root.
render(<App />, document.getElementById('root'));

/*
  If the browser supports service workers, try to register one as soon as the
  page has finished loading.
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service_worker.bundle.js')
      .then((_registration) => {})
      .catch((_error) => {});
  });
}
