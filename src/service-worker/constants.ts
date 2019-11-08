/// <reference path="../webpack-constants.d.ts" />

/**
 * The name of the cache to use. This should be changed every time the app
 * receives an update.
 */
export const CACHE_NAME = `cache-v${__VERSION__}`;

/**
 * An array of the URLs to cache as soon as the worker starts.
 */
export const URLS_TO_CACHE = [
  '/index.html',
  `/main.v${__VERSION__}.bundle.js`,
  `/main.v${__VERSION__}.bundle.css`
];
