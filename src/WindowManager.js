import { Window } from './Window.js'

export class WindowManager {
    constructor(container) {
        this.container = container
        this.windows = []
        this.baseZIndex = 100
    }

    openWindow(config) {
        const { title, content } = config
        // Pass empty string initially to Window constructor if it's not a string
        const win = new Window(title, typeof content === 'string' ? content : '', this)
        this.container.appendChild(win.element)

        // If content is DOM element, append it
        if (content instanceof HTMLElement) {
            const contentArea = win.element.querySelector('.window-content')
            contentArea.appendChild(content)
        }

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
