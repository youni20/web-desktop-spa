export class Window {
    constructor(title, content, manager) {
        this.manager = manager
        this.element = document.createElement('div')
        this.element.classList.add('window')
        this.element.style.top = '50px'
        this.element.style.left = '50px'

        this.element.innerHTML = `
      <div class="window-header">
        <span class="window-title">${title}</span>
        <button class="close-btn">X</button>
      </div>
      <div class="window-content">
        ${content}
      </div>
    `

        this.header = this.element.querySelector('.window-header')
        this.closeBtn = this.element.querySelector('.close-btn')

        this.setupEvents()
    }

    setupEvents() {
        // Dragging
        let isDragging = false
        let startX, startY, initialLeft, initialTop

        this.header.addEventListener('mousedown', (e) => {
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
            e.stopPropagation() // Prevent focus event if needed, though focus before close isn't bad
            this.close()
        })
    }

    close() {
        this.element.remove()
    }
}
