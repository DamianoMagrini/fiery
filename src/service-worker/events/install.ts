import { ExtensibleEvent } from '../extensible-event';

/**
 * Generates the function to be run when the service worker's `install` event
 * fires.
 *
 * @returns The `install` event handler, which adds the specified URLs to the
 *   service worker's cache.
 */
const generate_install_event = (
  CACHE_NAME: string,
  urls_to_cache: string[]
) => (event: ExtensibleEvent) => {
  // Prevent the worker from being deactivated at this time.
  event.waitUntil(
    // Open the current version of the cache.
    caches.open(CACHE_NAME).then((cache) => {
      // Add each specified URL to the cache.
      cache.addAll(urls_to_cache);
    })
  );
};

export default generate_install_event;
