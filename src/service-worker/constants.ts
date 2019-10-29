/**
 * The name of the cache to use. This should be changed every time the service
 * worker is updated.
 */
export const CACHE_NAME = 'cache-v1';

/**
 * An array of the URLs to cache as soon as the worker starts.
 */
export const URLS_TO_CACHE = ['/', '/main.bundle.js', '/main.css'];
