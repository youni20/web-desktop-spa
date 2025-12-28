/**
 * Main entry point for the Personal Web Desktop (PWD).
 * Initializes WindowManager, Dock, and registers applications.
 */
import { WindowManager } from './WindowManager.js'
import { Dock } from './Dock.js'
import { MemoryGame } from './MemoryGame.js'
import { Chat } from './Chat.js'
import { Calculator } from './Calculator.js'

function updateTime() {
  const date = new Date()
  // Format: "Sat 28 Dec 18:24"
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  document.getElementById('time').innerHTML = `${dayName} ${dayNum} ${month} &nbsp; ${time}`;
}

setInterval(updateTime, 1000)
updateTime()

// Initialize Window Manager
const content = document.querySelector('.content')
const windowManager = new WindowManager(content)

// Initialize Dock
const dock = new Dock(windowManager)

// Add Apps
dock.addApp('Chat', '💬', () => {
  const chat = new Chat()
  const win = windowManager.openWindow({
    title: 'Chat',
    content: chat.element
  })

  win.onMinimize = () => {
    dock.addMinimizedWindow(win, '💬')
  }
})

dock.addApp('Memory', '🧠', () => {
  const game = new MemoryGame()
  const win = windowManager.openWindow({
    title: 'Memory Game',
    content: game.element
  })

  win.onMinimize = () => {
    dock.addMinimizedWindow(win, '🧠')
  }
})

dock.addApp('Calc', '🔢', () => {
  const calc = new Calculator()
  const win = windowManager.openWindow({
    title: 'Calculator',
    content: calc.element
  })

  win.onMinimize = () => {
    dock.addMinimizedWindow(win, '🔢')
  }
})

console.log("OS Initialized")
