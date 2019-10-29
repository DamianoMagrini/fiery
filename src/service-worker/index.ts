import on_fetch from './events/fetch';
import on_activate from './events/activate';
import on_install from './events/install';

/*
  Code to run as soon as the service worker is installed. This will cache the
  URLs specified above.
*/
self.addEventListener('install', on_install);

/*
  Code to run when the service worker is activated; that is, when it has been
  successfully installed and any previous service workers have been removed.
  This will clear the old caches, used by previous versions of the service
  worker, unless otherwise specified.
*/
self.addEventListener('activate', on_activate);

/*
  Track and cache each fetched resource. If it is already in cache, just return
  the cached version. If, instead, a requested resource is not available
  because it was not yet cached and the client is offline, return the index.
*/
self.addEventListener('fetch', on_fetch);
