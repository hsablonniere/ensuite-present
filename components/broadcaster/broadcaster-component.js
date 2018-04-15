(function () {

  'use strict'

  const socket = io()

  const componentsChannel = new BroadcastChannel(`COMPONENTS_CHANNEL(default)`)

  componentsChannel.addEventListener('message', ({ data: { event, eventData, command, commandArgs } }) => {
    socket.emit('command', { event, eventData, command, commandArgs })
  })

  socket.on('command', function ({ event, eventData, command, commandArgs }) {
    componentsChannel.postMessage({ event, eventData, command, commandArgs })
  })
})()
