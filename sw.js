/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

'use strict';

console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
  var msg = ["open","http://naver.com"];
  event.waitUntil(self.clients.claim().then(function() {
    console.log('matchAll executing..');
    return self.clients.matchAll({type: 'wearable'});
  })
  .then(function(clients) {
    clients.forEach(function(client) {
      console.log('postMessage executing..');
      client.postMessage(msg);
    })
  }));
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);

  var title = 'Instant Web App Test';

  event.waitUntil(
    self.registration.showNotification(title, {
      'body': 'The Message',
      'icon': 'icon.png'
    }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close();
  var msg = ["open","http://naver.com"];
  event.waitUntil(self.clients.claim().then(function() {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
    console.log('matchAll executing..');
    return self.clients.matchAll({type: 'wearable});
    //return self.clients.matchAll({type: 'window'});
  })
  .then(function(clients) {
    clients.forEach(function(client) {
      console.log('postMessage executing..');
    var myFrameType = client.frameType;
    var clientId = client.id
      client.postMessage(msg);
    })
  }));
});
