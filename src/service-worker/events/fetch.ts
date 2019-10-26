import { ExtensibleEvent } from '../extensible-event';

/**
 * Generates the function to be run when the service worker's `fetch` event
 * fires.
 *
 * @returns The `fetch` event handler, which adds the specified URLs to the
 *   service worker's cache.
 */
const generate_fetch_event = (CACHE_NAME: string) => (
  event: ExtensibleEvent
) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((response) => {
        // If the requested resource was cached, send the version from cache.
        if (response) {
          return response;
        }

        // Otherwise, if the user is offline, return the index.
        if (!navigator.onLine) {
          return cache.match('/');
        }

        /*
          Finally, if no other condition is true, just fetch the resource and
          cache it.
        */
        return fetch(event.request)
          .then((response) => {
            // If the response is not valid, return without caching it.
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response;
            }

            /*
              Clone the response to not interfere with scripts that may need to
              use it.
            */
            const cloned_response = response.clone();

            // Add the cloned response to the cache, at its url.
            cache.put(event.request, cloned_response);

            // Return the original response.
            return response;
          })
          .catch(() => cache.match('/'));
      })
    )
  );
};

export default generate_fetch_event;
