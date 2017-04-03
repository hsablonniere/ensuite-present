#!/usr/bin/env node

'use strict'

const path = require('path')
const http = require('http')
const nodeStatic = require('node-static')
const socketIo = require('socket.io')

const PORT = 4320

process.title = path.basename(__filename, '.js')

let webRoot
try {
  webRoot = path.dirname(path.dirname(require.resolve('ensuite-present')))
}
catch (e) {
  // used when running script out of project
  webRoot = path.dirname(__dirname)
}
const fileServer = new nodeStatic.Server(webRoot)

const server = http.createServer((request, response) => {
  // A quick and dirty router ;-)
  // /pages/viewer/ => /pages/viewer/viewer-page.html
  // /pages/console/?slide-deck-url=... => /pages/console/console-page.html?slide-deck-url=...
  request.url = request.url.replace(/^(\/pages\/)([^\/]+)\/(\?.*)?$/, '$1$2/$2-page.html$3')
  request
    .addListener('end', () => fileServer.serve(request, response))
    .resume()
})

const io = socketIo(server)
io.on('connection', function (client) {
  console.log('connection'/*, client*/)
  client.on('command', function (data) {
    console.log('command', data)
    client.broadcast.emit('command', data)
  })
  client.on('disconnect', function (client) {
    console.log('disconnection'/*, client*/)
  })
})

server.listen(PORT, '0.0.0.0')

console.log(`ensuite-present viewer available at http://localhost:${PORT}/pages/viewer/`)
console.log(`ensuite-present console available at http://localhost:${PORT}/pages/console/?slide-deck-url=<slide-deck-url>`)

// keylogger stuffs

const Keyboard = require('node-keylogger')

const k = new Keyboard('event3')
// 'event0' is the file corresponding to my keyboard in /dev/input/

k.on('keyup', keyHandler)
// k.on('keydown', keyHandler)
k.on('keypress', keyHandler)
k.on('error', console.error)

let ctrlDown = false

function keyHandler(e) {

  if (e.type === 'keypress' && e.keyId === 'KEY_LEFTCTRL') {
    ctrlDown = true
    console.log('CTRL_DOWN')
  }

  if (e.type === 'keyup' && e.keyId === 'KEY_LEFTCTRL') {
    ctrlDown = false
    console.log('CTRL_UP')
  }

  if (e.type === 'keypress' && ctrlDown) {
    if (e.keyId === 'KEY_F7') {
      console.log('go-to-previous-step')
      io.sockets.emit('command', { command: 'go-to-previous-step', commandArgs: {} })
    }
    if (e.keyId === 'KEY_F8') {
      console.log('go-to-next-step')
      io.sockets.emit('command', { command: 'go-to-next-step', commandArgs: {} })
    }
  }
}
