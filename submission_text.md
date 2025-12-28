
# Personal Web Desktop (PWD) - Submission

**Presentation Video:** [INSERT YOUR VIDEO URL HERE]

## Reflection on Features

### F1: PWD Functional Requirements
I have implemented a complete Single Page Application (SPA) that functions as a desktop environment. Users can open multiple windows, drag them around, and manage focus with z-indexing ensuring the active window is always on top. I used a custom `WindowManager` class to handle the DOM manipulation and state management for all windows, ensuring they are independent instances.

### F2: PWD Non-functional Requirements
I prioritized visual appeal by implementing a "Glassmorphism" design using CSS backdrop-filters and a high-quality abstract wallpaper. The code is modularized into ES6 classes (`Window.js`, `Dock.js`, etc.) and fully documented with JSDoc. I maintained a clean git commit history and ensured the project passes all linting (`npm run lint`) and builds successfully (`npm run build`).

### F3: Memory Game Window Application
The Memory Game is a fully functional windowed app. I implemented keyboard accessibility by adding `tabindex` to cards and listening for `Enter`/`Space` keys to flip them, allowing gameplay without a mouse. For the extended feature, I added a custom "Win Overlay" animation and a 3D flip effect using CSS transforms.

### F4: Chat Window Application
The Chat app connects to the course WebSocket server. I used `localStorage` to persist the username and current channel, so they remain after a refresh. The interface allows sending messages and displays the history. I ensured users can have multiple chat windows open simultaneously, all synchronized to the same session.

### F5: An Additional Window Application
I developed **two** additional applications:
1.  **Calculator**: Features a layout inspired by the iOS calculator, with circular buttons and a clean display.
2.  **Music Player**: An audio player that loads a track from the server. It features a custom "vinyl" animation that spins when music plays and a progress bar that updates in real-time.

### F6: An Enhanced Chat Application (Optional)
I implemented four enhancements:
1.  **Channel Selection**: Users can switch between different chat channels.
2.  **Message Caching**: The last 50 messages are cached in `localStorage` to show history immediately upon opening.
3.  **Emoji Support**: I added a custom emoji picker to insert emojis into messages.
4.  **Username Switching**: A generic "Logout" button allows users to change their username.

### F7: Additional Enhancements (Optional)
I improved the PWD user experience in three key ways:
1.  **Window Maximize/Normalize**: I added a "Green" maximize button to the window controls. Clicking it expands the window to fill the available desktop space (respecting the Dock and Status Bar), and clicking again restores it to its previous size and position.
2.  **Window Centering**: New windows are calculated to open exactly in the center of the viewport.
3.  **Spotlight Search**: I integrated a persistent search bar in the status bar for quick app launching.

### F8: Documentation on Code Structure (Optional)
I have written a detailed explanation of the code structure in the `README.md`, describing the roles of `main.js`, `WindowManager.js`, `Dock.js`, and the individual app classes. I also included a Mermaid class diagram to visualize the relationships between these modules.

## Concluding Text
Implementing the Personal Web Desktop was a challenging but rewarding experience. The hardest part was managing the z-index stacking context and ensuring the drag-and-drop logic worked smoothly without losing focus or selection issues. I solved this by centralizing the focus logic in the `WindowManager`. I significantly improved my understanding of DOM manipulation and event propagation (especially handling the "double click" bugs I encountered). Overall, the modular class-based structure made extending the application with new apps like the Calculator very straightforward.

## TIL (Today I Learned)
I learned how to effectively use `CustomEvent` for communication between decoupled components (like the Dock and Windows) and how to implement a polished "Glassmorphism" UI using modern CSS properties like `backdrop-filter`.

## Overall TIL
Throughout this course, I have transitioned from writing simple scripts to building complex, modular web applications. I have mastered the concept of SPAs, asynchronous programming with WebSockets/Fetch, and the importance of a well-structured build pipeline using tools like Vite and ESLint.
