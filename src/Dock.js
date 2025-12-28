export class Dock {
    constructor(manager) {
        this.manager = manager
        this.element = document.querySelector('.dock')
        this.element.innerHTML = ''

        // Create containers
        this.launchers = document.createElement('div')
        this.launchers.classList.add('dock-launchers')

        this.divider = document.createElement('div')
        this.divider.classList.add('dock-divider')

        this.running = document.createElement('div')
        this.running.classList.add('dock-running')

        this.element.appendChild(this.launchers)
        this.element.appendChild(this.divider)
        this.element.appendChild(this.running)
    }

    addApp(name, icon, action) {
        const appIcon = document.createElement('div')
        appIcon.classList.add('dock-icon')
        appIcon.title = name

        this.styleIcon(appIcon, icon)

        appIcon.addEventListener('mouseenter', () => {
            appIcon.style.transform = 'scale(1.1)'
        })
        appIcon.addEventListener('mouseleave', () => {
            appIcon.style.transform = 'scale(1)'
        })

        // Always launch new instance
        appIcon.addEventListener('click', action)
        this.launchers.appendChild(appIcon)
    }

    addMinimizedWindow(win, icon) {
        const minIcon = document.createElement('div')
        minIcon.classList.add('dock-icon', 'minimized-icon')
        minIcon.title = win.title || 'Window'

        this.styleIcon(minIcon, icon)

        minIcon.addEventListener('click', () => {
            win.restore()
            minIcon.remove()
        })

        this.running.appendChild(minIcon)
        return minIcon
    }

    styleIcon(element, icon) {
        if (icon.includes('.')) {
            element.style.backgroundImage = `url(${icon})`
            element.style.backgroundSize = 'cover'
        } else {
            element.textContent = icon
            element.style.display = 'flex'
            element.style.justifyContent = 'center'
            element.style.alignItems = 'center'
            element.style.fontSize = '24px'
        }

        element.style.width = '40px'
        element.style.height = '40px'
        element.style.backgroundColor = '#444'
        element.style.borderRadius = '10px'
        element.style.margin = '0 5px'
        element.style.cursor = 'pointer'
        element.style.transition = 'transform 0.1s'
    }
}
