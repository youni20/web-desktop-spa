export class Chat {
    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('chat-app')

        this.username = localStorage.getItem('chat_username') || null
        this.channel = localStorage.getItem('chat_channel') || 'General'
        this.apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        this.socket = null
        this.messages = [] // Local cache usage if needed, or just DOM

        this.initUI()
    }

    initUI() {
        this.element.innerHTML = ''
        if (!this.username) {
            this.renderLogin()
        } else {
            this.renderChat()
            this.connect()
        }
    }

    renderLogin() {
        const loginContainer = document.createElement('div')
        loginContainer.classList.add('chat-login')
        loginContainer.innerHTML = `
            <h3>Welcome to Chat</h3>
            <p>Please enter your username:</p>
            <input type="text" class="username-input" placeholder="Username" />
            <button class="login-btn">Join Chat</button>
        `

        const input = loginContainer.querySelector('.username-input')
        const btn = loginContainer.querySelector('.login-btn')

        btn.addEventListener('click', () => {
            const val = input.value.trim()
            if (val) {
                this.username = val
                localStorage.setItem('chat_username', val)
                this.initUI()
            }
        })

        this.element.appendChild(loginContainer)
    }

    renderChat() {
        this.element.innerHTML = `
            <div class="chat-header-bar">
                <span>Channel:</span>
                <input class="channel-input" type="text" value="${this.channel}">
                <button class="change-channel-btn">Set</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input-area">
                <textarea class="chat-text" placeholder="Type a message..."></textarea>
                <button class="send-btn">Send</button>
            </div>
        `

        this.messagesContainer = this.element.querySelector('.chat-messages')
        this.textarea = this.element.querySelector('.chat-text')
        this.sendBtn = this.element.querySelector('.send-btn')
        this.channelInput = this.element.querySelector('.channel-input')
        this.channelBtn = this.element.querySelector('.change-channel-btn')

        this.sendBtn.addEventListener('click', () => this.sendMessage())

        // Send on Enter (but Shift+Enter for newline)
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                this.sendMessage()
            }
        })

        this.channelBtn.addEventListener('click', () => {
            const newChannel = this.channelInput.value.trim()
            if (newChannel && newChannel !== this.channel) {
                this.channel = newChannel
                localStorage.setItem('chat_channel', newChannel)
                this.messagesContainer.innerHTML = '' // Clear current view
                // Reconnect or just start sending to new channel? 
                // Assignment says "connected to other students chat clients". 
                // Usually web socket is one connection, messages have properties.
            }
        })
    }

    connect() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) return

        this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

        this.socket.addEventListener('open', () => {
            console.log('Connected to Chat Server')
        })

        this.socket.addEventListener('message', (event) => {
            try {
                const msg = JSON.parse(event.data)
                this.handleMessage(msg)
            } catch (e) {
                console.error('Invalid JSON', event.data)
            }
        })

        this.socket.addEventListener('close', () => {
            console.log('Disconnected from Chat Server')
        })

        this.socket.addEventListener('error', (err) => {
            console.error('Socket Error', err)
        })
    }

    handleMessage(msg) {
        if (msg.type === 'message') {
            // Check channel ?? The server broadcasts everything?
            // "The properties type, data, username and channel... Additionally, all properties sent... will be echoed"
            // So we should filter by channel if we want channels to work properly.
            if (msg.channel === this.channel) {
                this.addMessageToDOM(msg)
            }
        }
        // Improve: Handle heartbeat? "Your application can simply ignore those messages completely."
        // heartbeats are type: 'heartbeat'
    }

    sendMessage() {
        const text = this.textarea.value.trim()
        if (!text) return
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            alert('Not connected to chat server')
            return
        }

        const payload = {
            type: 'message',
            data: text,
            username: this.username,
            channel: this.channel,
            key: this.apiKey
        }

        this.socket.send(JSON.stringify(payload))
        this.textarea.value = ''
        // Optimistic append? Or wait for echo? 
        // "all properties sent from one user will be echoed to all receiving clients."
        // So we wait for echo to avoid duplicates.
    }

    addMessageToDOM(msg) {
        const isMe = msg.username === this.username
        const div = document.createElement('div')
        div.classList.add('message')
        div.classList.add(isMe ? 'message-sent' : 'message-received')

        div.innerHTML = `
            <div class="message-meta">${msg.username}</div>
            <div class="message-content">${msg.data}</div>
        `

        this.messagesContainer.appendChild(div)
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }
}
