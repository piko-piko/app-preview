/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';





/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","21cd30c752f21f263821f2cde18c5888"],["/bower_components/app-layout/app-drawer/app-drawer.html","f86acd181e09523554f08e2844d04b33"],["/bower_components/app-layout/app-header/app-header.html","e596b7503aa629069cea0a582f83e54b"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","8d45e04a72bd81fa3213d81864968395"],["/bower_components/app-layout/helpers/helpers.html","c3e82580bbb4c5e4ac5ebf5c22647016"],["/bower_components/app-route/app-location.html","d87d3ba9436f8da88cbb6ecf5dcde63e"],["/bower_components/app-route/app-route-converter-behavior.html","f0a18330f445ccaead183e1e379635e5"],["/bower_components/app-route/app-route.html","27014edb928c071473f5de170ac78211"],["/bower_components/iron-flex-layout/iron-flex-layout.html","98da82570410cf19e8867b3518e065a5"],["/bower_components/iron-icon/iron-icon.html","531c4dce3ccc0ca17182d137fb82e2f7"],["/bower_components/iron-icons/iron-icons.html","1725d27cab6003c7571e9a96702f77e1"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","c8791804fccbe693b772a37cd0bfd0ed"],["/bower_components/iron-location/iron-location.html","632fb5f2d963b7096f3ee6786bef3bf4"],["/bower_components/iron-location/iron-query-params.html","08130e8e735b9d30b7dca61ccb79d0d8"],["/bower_components/iron-media-query/iron-media-query.html","65ec581bf71b4acffa3703a5964e1232"],["/bower_components/iron-meta/iron-meta.html","9a240eda67672e29b82e15898a9619d1"],["/bower_components/iron-pages/iron-pages.html","82d5debc56ced36961be39a181280795"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e22494690a6d3affa8dbb051c4822641"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","26d4d006432567d14daec5c8f4defef8"],["/bower_components/iron-selector/iron-multi-selectable.html","c3a5407e403189d9ffbb26a94253cac9"],["/bower_components/iron-selector/iron-selectable.html","a179d62580cfdf7c022dcdf24841487a"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-selector/iron-selector.html","eaec85c290f2dfa24f778a676bf56e15"],["/bower_components/polymer/polymer-micro.html","77c86a26d7f8db611b9233d1cd11bac2"],["/bower_components/polymer/polymer-mini.html","14d11d812e0805aa93403d7139cd11a5"],["/bower_components/polymer/polymer.html","9590667dd53b00fd75e5a130c0856593"],["/index.html","e72684107df02cd146c2ece478b52e20"],["/src/app-setting.html","00740fca9e45a676126633f090c9da35"],["/src/bootstrap-css.html","7fe75c244989e963f9fc400f7f5338c7"],["/src/data-log.html","6582aaba0ee99e993610c8438d1552ef"],["/src/floor-manage.html","b30ec9340b3bf7b4ee692c3e26d83f08"],["/src/floor-map.html","bd80ff7869136b34168eae4e2d8cbbec"],["/src/floor-view-content.html","9b6b80cdd2ef20cdc73a22205424950b"],["/src/floor-view.html","80451d60296f963671112287e50e1d7f"],["/src/main-setting.html","eee5dba39e160241c8b02cca5018c2dc"],["/src/my-app.html","85818f0a6ceca8d477d005bb67586d96"],["/src/my-view1.html","82aa76b087cec18dcfac6cbe0b3bc78e"],["/src/my-view2.html","36fea8db70acbf77f9e1001325c101e3"],["/src/my-view3.html","c60d7af3d3c735de7912f80164ac7a6a"],["/src/my-view404.html","1a868308b2e49a6682f39b7bc87ce374"],["/src/shared-styles.html","5354fb626af957c3ca5f7be0fb60e73b"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '/index.html';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




