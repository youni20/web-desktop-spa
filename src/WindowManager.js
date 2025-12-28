import { Window } from './Window.js'

export class WindowManager {
    constructor(container) {
        this.container = container
        this.windows = []
        this.baseZIndex = 100
    }

    openWindow(config) {
        const { title, content } = config
        const win = new Window(title, content, this)
        this.container.appendChild(win.element)
        this.windows.push(win)
        this.focusWindow(win)
    }

    focusWindow(activeWindow) {
        // Remove from current pos
        this.windows = this.windows.filter(w => w !== activeWindow)
        // Add to end
        this.windows.push(activeWindow)

        // Apply z-indexes
        this.windows.forEach((win, index) => {
            win.element.style.zIndex = this.baseZIndex + index
        })
    }
}
