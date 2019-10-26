import { ExtensibleEvent } from '../extensible-event';

/**
 * Generates the function to be run when the service worker's `activate` event
 * fires.
 *
 * @returns The `activate` event handler, which deletes the old, not
 *   whitelisted caches.
 */
const generate_activate_event = (CACHE_NAME: string) => (
  event: ExtensibleEvent
) => {
  const cache_whitelist = [CACHE_NAME];

  // Prevent the worker from being deactivated at this time.
  event.waitUntil(
    // Asynchronously iterate through every cache.
    caches.keys().then((cache_names) =>
      Promise.all(
        // @ts-ignore - TypeScript doesn't seem to like this line (why?).
        cache_names.map((cache_name) => {
          // If the cache is not whitelisted, delete it.
          if (cache_whitelist.indexOf(cache_name) === -1) {
            return caches.delete(cache_name);
          }
        })
      )
    )
  );
};

export default generate_activate_event;
