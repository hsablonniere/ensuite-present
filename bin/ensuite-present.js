#!/usr/bin/env node

'use strict';

const path = require('path');
const http = require('http');
const nodeStatic = require('node-static');
const socketIo = require('socket.io');
const exec = require('child_process').exec;

const PORT = 4320;

process.title = path.basename(__filename, '.js');

let webRoot;
try {
  webRoot = path.dirname(path.dirname(require.resolve('ensuite-present')));
}
catch (e) {
  // used when running script out of project
  webRoot = path.dirname(__dirname);
}
const fileServer = new nodeStatic.Server(webRoot, { cache: 0 });

const server = http.createServer((request, response) => {
  // A quick and dirty router ;-)
  // /pages/viewer/ => /pages/viewer/viewer-page.html
  // /pages/console/?slide-deck-url=... => /pages/console/console-page.html?slide-deck-url=...
  request.url = request.url.replace(/^(\/pages\/)([^\/]+)\/(\?.*)?$/, '$1$2/$2-page.html$3');
  request
    .addListener('end', () => fileServer.serve(request, response))
    .resume();
});

let lastViewport;

const io = socketIo(server);
io.on('connection', function (client) {
  console.log('connection'/*, client*/);
  client.on('command', function (data) {
    console.log(data)
    if (data.event === 'set-viewport') {
      if (lastViewport !== data.eventData.viewport) {
        exec(`wmctrl -s ${data.eventData.viewport}`);
        lastViewport = data.eventData.viewport;
      }
    }
    client.broadcast.emit('command', data);
  });
  client.on('disconnect', function (client) {
    console.log('disconnection'/*, client*/);
  });
});

server.listen(PORT, '0.0.0.0');

console.log(`ensuite-present viewer available at http://localhost:${PORT}/pages/viewer/`);
console.log(`ensuite-present console available at http://localhost:${PORT}/pages/console/?slide-deck-url=<slide-deck-url>`);
