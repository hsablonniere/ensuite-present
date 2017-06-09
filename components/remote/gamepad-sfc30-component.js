(function () {

  'use strict'

  // ADD a prefix in the name
  const componentsChannel = new BroadcastChannel(`COMPONENTS_CHANNEL(default)`)

  const gamepad = new Gamepad()

  gamepad.setCustomMapping('gamepad', {
    'start': 7,
    'select': 6,
    'shoulder_top_left': 4,
    'shoulder_top_right': 5,
    'd_pad_up': 12,
    'd_pad_down': 13,
    'd_pad_left': 14,
    'd_pad_right': 15,
    'button_1': 0,
    'button_2': 1,
    'button_3': 2,
    'button_4': 3,
  })

  gamepad.setCustomMapping('keyboard', {})

  gamepad.on('press', 'shoulder_top_left', () => {
    componentsChannel.postMessage({
      command: 'go-to-previous-step',
      commandArgs: { secret: false },
    })
  })

  gamepad.on('press', 'shoulder_top_right', () => {
    componentsChannel.postMessage({
      command: 'go-to-next-step',
      commandArgs: { secret: false },
    })
  })

  gamepad.on('press', 'd_pad_left', () => {
    componentsChannel.postMessage({
      command: 'go-to-previous-step',
      commandArgs: { secret: true },
    })
  })

  gamepad.on('press', 'd_pad_right', () => {
    componentsChannel.postMessage({
      command: 'go-to-next-step',
      commandArgs: { secret: true },
    })
  })

  gamepad.on('press', 'd_pad_up', () => {
    componentsChannel.postMessage({
      command: 'move-notes',
      commandArgs: { amount: -90 },
    })
  })

  gamepad.on('press', 'd_pad_down', () => {
    componentsChannel.postMessage({
      command: 'move-notes',
      commandArgs: { amount: 90 },
    })
  })

  gamepad.on('hold', 'button_3', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'one', enabled: true },
    })
  })
  gamepad.on('release', 'button_3', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'one', enabled: false },
    })
  })
  gamepad.on('hold', 'button_4', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'two', enabled: true },
    })
  })
  gamepad.on('release', 'button_4', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'two', enabled: false },
    })
  })
  gamepad.on('hold', 'button_1', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'three', enabled: true },
    })
  })
  gamepad.on('release', 'button_1', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'three', enabled: false },
    })
  })
  gamepad.on('hold', 'button_2', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'four', enabled: true },
    })
  })
  gamepad.on('release', 'button_2', () => {
    componentsChannel.postMessage({
      command: 'toggle-slide-deck-state',
      commandArgs: { state: 'four', enabled: false },
    })
  })

  gamepad.on('press', 'select', () => {
    console.log('select')
    componentsChannel.postMessage({
      command: 'reset-stopwatch',
      commandArgs: {},
    })
    componentsChannel.postMessage({
      command: 'reset-timer',
      commandArgs: {},
    })
  })
  gamepad.on('press', 'start', () => {
    console.log('start')
    componentsChannel.postMessage({
      command: 'toggle-stopwatch',
      commandArgs: {},
    })
    componentsChannel.postMessage({
      command: 'toggle-timer',
      commandArgs: {},
    })
  })
})()
