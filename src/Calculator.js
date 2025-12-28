/**
 * A simple Calculator application (F5).
 */
export class Calculator {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('calculator-app')
        this.displayValue = ''
        this.initUI()
    }

    initUI() {
        this.element.innerHTML = `
            <div class="calc-display">0</div>
            <div class="calc-buttons">
                <button class="calc-btn operator">C</button>
                <button class="calc-btn operator">/</button>
                <button class="calc-btn operator">*</button>
                <button class="calc-btn operator">-</button>
                <button class="calc-btn">7</button>
                <button class="calc-btn">8</button>
                <button class="calc-btn">9</button>
                <button class="calc-btn operator">+</button>
                <button class="calc-btn">4</button>
                <button class="calc-btn">5</button>
                <button class="calc-btn">6</button>
                <button class="calc-btn equals operator">=</button>
                <button class="calc-btn">1</button>
                <button class="calc-btn">2</button>
                <button class="calc-btn">3</button>
                <button class="calc-btn zero">0</button>
                <button class="calc-btn">.</button>
            </div>
        `

        this.display = this.element.querySelector('.calc-display')
        this.element.addEventListener('click', (e) => {
            if (e.target.matches('button')) {
                this.handleInput(e.target.textContent)
            }
        })
    }

    handleInput(value) {
        if (value === 'C') {
            this.displayValue = ''
        } else if (value === '=') {
            try {
                // Safe enough for this assignment context
                // eslint-disable-next-line
                this.displayValue = eval(this.displayValue).toString()
            } catch {
                this.displayValue = 'Error'
            }
        } else {
            if (this.displayValue === 'Error') this.displayValue = ''
            this.displayValue += value
        }
        this.display.textContent = this.displayValue || '0'
    }
}
