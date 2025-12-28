import { WindowManager } from './WindowManager.js'
import { Dock } from './Dock.js'

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

// Add Placeholder Apps
dock.addApp('Chat', '💬', () => {
  windowManager.openWindow({
    title: 'Chat',
    content: '<div style="padding: 20px;">This is the chat application placeholder.</div>'
  })
})

dock.addApp('Memory', '🧠', () => {
  windowManager.openWindow({
    title: 'Memory Game',
    content: '<div style="padding: 20px;">Memory Game placeholder.</div>'
  })
})

console.log("OS Initialized")
