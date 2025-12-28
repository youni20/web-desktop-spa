export class MusicPlayer {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('music-player')
        this.isPlaying = false
        this.audio = new Audio('src/audio/ABBA Dancing Queen Lyrics.mp3') // Hardcoded for demo

        this.element.innerHTML = `
            <div class="album-art">
                <div class="vinyl"></div>
            </div>
            <div class="track-info">
                <h3>Dancing Queen</h3>
                <p>ABBA</p>
            </div>
            <div class="controls">
                <button class="control-btn" id="prev-btn">⏮</button>
                <button class="control-btn play-btn" id="play-btn">▶</button>
                <button class="control-btn" id="next-btn">⏭</button>
            </div>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
        `

        this.playBtn = this.element.querySelector('#play-btn')
        this.progressBar = this.element.querySelector('.progress-bar')

        this.setupEvents()
    }

    setupEvents() {
        this.playBtn.addEventListener('click', () => this.togglePlay())

        this.audio.addEventListener('timeupdate', () => {
            const progress = (this.audio.currentTime / this.audio.duration) * 100
            this.progressBar.style.width = `${progress}%`
        })

        this.audio.addEventListener('ended', () => {
            this.isPlaying = false
            this.playBtn.textContent = '▶'
            this.element.querySelector('.vinyl').style.animationPlayState = 'paused'
        })
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause()
            this.playBtn.textContent = '▶'
            this.element.querySelector('.vinyl').style.animationPlayState = 'paused'
        } else {
            this.audio.play()
            this.playBtn.textContent = '⏸'
            this.element.querySelector('.vinyl').style.animationPlayState = 'running'
        }
        this.isPlaying = !this.isPlaying
    }
    stop() {
        this.audio.pause()
        this.audio.currentTime = 0
        this.isPlaying = false
        this.playBtn.textContent = '▶'
        this.element.querySelector('.vinyl').style.animationPlayState = 'paused'
    }
}
