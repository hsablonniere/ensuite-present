(function () {

  'use strict'

  const socket = io()

  const componentsChannel = new BroadcastChannel(`COMPONENTS_CHANNEL(default)`)

  componentsChannel.addEventListener('message', ({ data: { command, commandArgs } }) => {
    console.log(command, commandArgs)
    socket.emit('command', { command, commandArgs })
  })

  socket.on('command', function ({ command, commandArgs }) {
    componentsChannel.postMessage({ command, commandArgs })
  })
})()
