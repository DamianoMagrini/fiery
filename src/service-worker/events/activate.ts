import { ExtensibleEvent } from '../extensible-event';

import { CACHE_NAME } from '../constants';

/**
 * The `activate` event handler, which deletes the old, not whitelisted caches.
 */
const handle_activate = (event: ExtensibleEvent): void => {
  const cache_whitelist = [CACHE_NAME];

  // Prevent the worker from being deactivated at this time.
  event.waitUntil(
    // Asynchronously iterate through every cache.
    caches.keys().then((cache_names) =>
      Promise.all(
        cache_names.map((cache_name) => {
          // If the cache is not whitelisted, delete it.
          if (cache_whitelist.includes(cache_name))
            return caches.delete(cache_name);
          return undefined;
        })
      )
    )
  );
};

export default handle_activate;
