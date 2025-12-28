import { WindowManager } from './WindowManager.js'
import { Dock } from './Dock.js'
import { MemoryGame } from './MemoryGame.js'
import { Chat } from './Chat.js'

function updateTime() {
  const date = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const time = date.toLocaleTimeString();
  const day = date.toLocaleDateString(undefined, options);
  document.getElementById('time').innerHTML = `${day} <br> ${time}`;
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

console.log("OS Initialized")
