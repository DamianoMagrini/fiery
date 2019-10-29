import { ExtensibleEvent } from '../extensible-event';

import { CACHE_NAME, URLS_TO_CACHE } from '../constants';

/**
 * The `install` event handler, which adds the specified URLs to the service
 * worker's cache.
 */
const generate_install_event = (event: ExtensibleEvent): void => {
  // Prevent the worker from being deactivated at this time.
  event.waitUntil(
    // Open the current version of the cache.
    caches.open(CACHE_NAME).then((cache) => {
      // Add each specified URL to the cache.
      cache.addAll(URLS_TO_CACHE);
    })
  );
};

export default generate_install_event;
