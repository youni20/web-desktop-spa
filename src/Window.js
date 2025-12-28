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
        <span class="window-title">${title}</span>
        <div class="window-controls">
            <button class="minimize-btn">_</button>
            <button class="close-btn">X</button>
        </div>
      </div>
      <div class="window-content">
        ${content}
      </div>
    `

        this.header = this.element.querySelector('.window-header')
        this.closeBtn = this.element.querySelector('.close-btn')
        this.minimizeBtn = this.element.querySelector('.minimize-btn')

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

        // Close
        this.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation() // Prevent focus event if needed
            this.close()
        })

        // Minimize
        this.minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            this.minimize() // Force minimize, don't toggle
        })
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
