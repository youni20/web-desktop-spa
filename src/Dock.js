export class Dock {
    constructor(manager) {
        this.manager = manager
        this.element = document.querySelector('.dock')
        // Clear existing "app dock" text if any, or just append. 
        // Let's clear for cleaner state.
        this.element.innerHTML = ''
    }

    addApp(name, icon, action) {
        const appIcon = document.createElement('div')
        appIcon.classList.add('dock-icon')
        appIcon.title = name
        // Simple colored box or image if icon is URL
        if (icon.includes('.')) {
            appIcon.style.backgroundImage = `url(${icon})`
            appIcon.style.backgroundSize = 'cover'
        } else {
            appIcon.textContent = icon // Emoji or text
            appIcon.style.display = 'flex'
            appIcon.style.justifyContent = 'center'
            appIcon.style.alignItems = 'center'
            appIcon.style.fontSize = '24px'
        }

        appIcon.style.width = '40px'
        appIcon.style.height = '40px'
        appIcon.style.backgroundColor = '#444'
        appIcon.style.borderRadius = '10px'
        appIcon.style.margin = '0 5px'
        appIcon.style.cursor = 'pointer'
        appIcon.style.transition = 'transform 0.1s'

        appIcon.addEventListener('mouseenter', () => {
            appIcon.style.transform = 'scale(1.1)'
        })
        appIcon.addEventListener('mouseleave', () => {
            appIcon.style.transform = 'scale(1)'
        })

        appIcon.addEventListener('click', action)
        this.element.appendChild(appIcon)
    }
}
