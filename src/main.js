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

/* Spotlight Search Logic */
const searchIcon = document.getElementById('search-icon')
const spotlight = document.getElementById('spotlight')
const spotlightInput = document.getElementById('spotlight-input')
const spotlightResults = document.getElementById('spotlight-results')

const apps = [
  { name: 'Chat', icon: '💬', action: () => document.querySelector('[title="Chat"]').click() },
  { name: 'Memory Game', icon: '🧠', action: () => document.querySelector('[title="Memory"]').click() },
  { name: 'Calculator', icon: '🔢', action: () => document.querySelector('[title="Calc"]').click() }
]

searchIcon.addEventListener('click', () => {
  spotlight.classList.toggle('hidden')
  if (!spotlight.classList.contains('hidden')) {
    spotlightInput.value = ''
    renderResults(apps)
    spotlightInput.focus()
  }
})

spotlightInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase()
  const filtered = apps.filter(app => app.name.toLowerCase().includes(term))
  renderResults(filtered)
})

spotlightInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    spotlight.classList.add('hidden')
  }
  if (e.key === 'Enter') {
    const first = spotlightResults.querySelector('.spotlight-result')
    if (first) first.click()
  }
})

function renderResults(list) {
  spotlightResults.innerHTML = ''
  list.forEach(app => {
    const div = document.createElement('div')
    div.classList.add('spotlight-result')
    div.innerHTML = `<span>${app.icon}</span> <span>${app.name}</span>`
    div.addEventListener('click', () => {
      app.action()
      spotlight.classList.add('hidden')
    })
    spotlightResults.appendChild(div)
  })
}

// Close spotlight when clicking outside
document.addEventListener('click', (e) => {
  if (!spotlight.contains(e.target) && e.target !== searchIcon) {
    spotlight.classList.add('hidden')
  }
})
