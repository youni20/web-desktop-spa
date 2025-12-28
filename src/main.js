/**
 * Main entry point for the Personal Web Desktop (PWD).
 * Initializes WindowManager, Dock, and registers applications.
 */
import { WindowManager } from './WindowManager.js'
import { Dock } from './Dock.js'
import { MemoryGame } from './MemoryGame.js'
import { Chat } from './Chat.js'
import { MusicPlayer } from './MusicPlayer.js'



console.log("OS Initialized")

/**
 *
 */
function updateTime() {
  const date = new Date()
  // Format: "Sat 28 Dec 18:24"
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
  const dayNum = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

  document.getElementById('time').innerHTML = `${dayName} ${dayNum} ${month} &nbsp; ${time}`
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

dock.addApp('Music', '🎵', () => {
  const music = new MusicPlayer()
  const win = windowManager.openWindow({
    title: 'Music Player',
    content: music.element
  })

  win.onMinimize = () => {
    dock.addMinimizedWindow(win, '🎵')
  }

  win.onClose = () => {
    music.stop()
  }
})

console.log('OS Initialized')

/* Search Logic */
const searchInput = document.getElementById('status-search')
const searchResults = document.getElementById('search-results')

if (searchInput) {
  const apps = [
    { name: 'Chat', icon: '💬', action: () => document.querySelector('[title="Chat"]').click() },
    { name: 'Memory Game', icon: '🧠', action: () => document.querySelector('[title="Memory"]').click() },
    { name: 'Calculator', icon: '🔢', action: () => document.querySelector('[title="Calc"]').click() },
    { name: 'Music Player', icon: '🎵', action: () => document.querySelector('[title="Music"]').click() }
  ]

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim()
    if (!term) {
      searchResults.classList.add('hidden')
      return
    }

    const filtered = apps.filter(app => app.name.toLowerCase().includes(term))
    renderResults(filtered)
  })

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      searchResults.classList.remove('hidden')
    }
  })

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden')
    }
  })

  // Enter key support
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = searchResults.querySelector('.search-result-item')
      if (first) first.click()
    }
    if (e.key === 'Escape') {
      searchResults.classList.add('hidden')
      searchInput.blur()
    }
  })

  /**
   *
   * @param list
   */
  function renderResults(list) {
    searchResults.innerHTML = ''
    if (list.length === 0) {
      searchResults.innerHTML = '<div style="padding:10px;color:#666;">No apps found</div>'
    } else {
      list.forEach(app => {
        const div = document.createElement('div')
        div.classList.add('search-result-item')
        div.innerHTML = `<span>${app.icon}</span> <span>${app.name}</span>`
        div.addEventListener('click', () => {
          app.action()
          searchResults.classList.add('hidden')
          searchInput.value = ''
        })
        searchResults.appendChild(div)
      })
    }
    searchResults.classList.remove('hidden')
  }
}
