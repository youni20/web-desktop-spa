export class MemoryGame {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('memory-game')

        // 4 pairs + 1 center
        this.icons = ['🍎', '🍌', '🍒', '🍇']
        this.cards = []
        this.flippedCards = []
        this.matchedCount = 0
        this.isLocked = false

        this.initGame()
    }

    initGame() {
        this.element.innerHTML = ''
        this.matchedCount = 0
        this.flippedCards = []
        this.isLocked = false

        // Create pairs
        const deck = [...this.icons, ...this.icons]
        // Shuffle
        deck.sort(() => 0.5 - Math.random())

        // Insert Center card at index 4 (middle of 0-8)
        deck.splice(4, 0, '🔄')

        this.cards = deck.map((icon, index) => {
            const card = document.createElement('div')
            card.classList.add('memory-card')
            card.dataset.index = index
            card.dataset.icon = icon

            const front = document.createElement('div')
            front.classList.add('front')
            front.textContent = '❓' // or blank/pattern

            const back = document.createElement('div')
            back.classList.add('back')
            back.textContent = icon

            card.appendChild(front)
            card.appendChild(back)

            if (icon === '🔄') {
                card.classList.add('center-card')
            }

            card.addEventListener('click', () => this.handleCardClick(card, icon))
            this.element.appendChild(card)
            return card
        })
    }

    handleCardClick(card, icon) {
        if (this.isLocked) return
        if (card.classList.contains('flipped')) return
        if (card.classList.contains('matched')) return

        // Center card resets game
        if (icon === '🔄') {
            this.restartAnimation()
            return
        }

        this.flipCard(card)
        this.flippedCards.push({ card, icon })

        if (this.flippedCards.length === 2) {
            this.checkMatch()
        }
    }

    flipCard(card) {
        card.classList.add('flipped')
    }

    unflipCard(card) {
        card.classList.remove('flipped')
    }

    checkMatch() {
        this.isLocked = true
        const [first, second] = this.flippedCards

        if (first.icon === second.icon) {
            // Match
            first.card.classList.add('matched')
            second.card.classList.add('matched')
            this.matchedCount++
            this.flippedCards = []
            this.isLocked = false

            if (this.matchedCount === 4) {
                setTimeout(() => alert('You Won!'), 500)
            }
        } else {
            // No Match
            setTimeout(() => {
                this.unflipCard(first.card)
                this.unflipCard(second.card)
                this.flippedCards = []
                this.isLocked = false
            }, 1000)
        }
    }

    restartAnimation() {
        this.element.classList.add('shake')
        setTimeout(() => {
            this.element.classList.remove('shake')
            this.initGame()
        }, 500)
    }
}
