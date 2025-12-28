import { Window } from './Window.js'

/**
 * Manages the creation and state of window instances.
 * Handles z-indexing and focus management.
 */
export class WindowManager {
    /**
     * @param {HTMLElement} container - The DOM element to contain windows
     */
    constructor(container) {
        this.container = container
        this.windows = []
        this.baseZIndex = 100
    }

    /**
     * Opens a new window with the specified configuration.
     * @param {Object} config - Window configuration
     * @param {string} config.title - Title of the window
     * @param {string|HTMLElement} config.content - Content to display
     * @returns {Window} The created window instance
     */
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
        return win
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

    toggleWindow(win) {
        if (win.element.style.display === 'none') {
            win.restore()
            this.focusWindow(win)
        } else {
            // If it's the active window, minimize it.
            // If it's NOT the active window (but visible), focus it.
            // Simplified check: is it the last one in the list? (Assume list order = z-index order)
            // But focusWindow moves to end. So yes.

            const isActive = this.windows[this.windows.length - 1] === win;

            if (isActive) {
                win.minimize()
            } else {
                this.focusWindow(win)
            }
        }
    }
}
