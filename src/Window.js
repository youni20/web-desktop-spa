export class Window {
    constructor(title, content, manager) {
        this.manager = manager
        this.element = document.createElement('div')
        this.element.classList.add('window')
        this.element.style.top = '50%'
        this.element.style.left = '50%'
        this.element.style.transform = 'translate(-50%, -50%)'

        this.element.innerHTML = `
      <div class="window-header">
        <div class="window-controls">
            <button class="close-btn" title="Close"></button>
            <button class="minimize-btn" title="Minimize"></button>
            <button class="maximize-btn" title="Maximize"></button>
        </div>
        <span class="window-title">${title}</span>
      </div>
      <div class="window-content">
        ${content}
      </div>
    `

        this.header = this.element.querySelector('.window-header')
        this.closeBtn = this.element.querySelector('.close-btn')
        this.minimizeBtn = this.element.querySelector('.minimize-btn')
        this.maximizeBtn = this.element.querySelector('.maximize-btn')

        this.isMaximized = false
        this.preMaximizeState = {} // To store rect

        this.setupEvents()
    }

    setupEvents() {
        // Dragging
        let isDragging = false
        let startX, startY, initialLeft, initialTop

        this.header.addEventListener('mousedown', (e) => {
            // Handle centering removal on first drag
            if (this.element.style.transform && this.element.style.transform.includes('translate')) {
                const rect = this.element.getBoundingClientRect()
                this.element.style.transform = 'none'
                this.element.style.left = rect.left + 'px'
                this.element.style.top = rect.top + 'px'
            }

            isDragging = true
            startX = e.clientX
            startY = e.clientY
            initialLeft = this.element.offsetLeft
            initialTop = this.element.offsetTop
            this.manager.focusWindow(this)
            e.preventDefault() // Prevent text selection
        })

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - startX
                const dy = e.clientY - startY
                this.element.style.left = `${initialLeft + dx}px`
                this.element.style.top = `${initialTop + dy}px`
            }
        })

        document.addEventListener('mouseup', () => {
            isDragging = false
        })

        // Focus on click
        this.element.addEventListener('mousedown', () => {
            this.manager.focusWindow(this)
        })

        // Prevent drag start on buttons
        this.closeBtn.addEventListener('mousedown', (e) => e.stopPropagation())
        this.minimizeBtn.addEventListener('mousedown', (e) => e.stopPropagation())

        // Close
        this.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation() // Prevent focus event if needed
            this.close()
        })

        // Maximize
        this.maximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            this.toggleMaximize()
        })
        this.maximizeBtn.addEventListener('mousedown', (e) => e.stopPropagation())

        // Minimize
        this.minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            this.minimize()
        })
    }

    toggleMaximize() {
        if (this.isMaximized) {
            // Restore
            this.element.style.top = this.preMaximizeState.top
            this.element.style.left = this.preMaximizeState.left
            this.element.style.width = this.preMaximizeState.width
            this.element.style.height = this.preMaximizeState.height
            this.element.style.transform = this.preMaximizeState.transform
            this.element.classList.remove('maximized')
            this.isMaximized = false
        } else {
            // Maximize
            const rect = this.element.getBoundingClientRect()
            this.preMaximizeState = {
                top: this.element.style.top,
                left: this.element.style.left,
                width: this.element.style.width,
                height: this.element.style.height,
                transform: this.element.style.transform
            }

            this.element.style.top = '0'
            this.element.style.left = '0'
            this.element.style.width = '100vw'
            this.element.style.height = 'calc(100vh - 80px)' // Leave space for Dock
            this.element.style.transform = 'none'
            this.element.classList.add('maximized')
            this.isMaximized = true
        }
    }

    minimize() {
        this.element.style.display = 'none'
        if (this.onMinimize) this.onMinimize()
    }

    restore() {
        this.element.style.display = 'flex'
        this.manager.focusWindow(this) // Ensure focus on restore
        if (this.onRestore) this.onRestore()
    }

    close() {
        this.element.remove()
        if (this.onClose) this.onClose()
    }
}
