# Canvas Shooting Game

A web-based shooting game built with HTML5 Canvas and vanilla JavaScript. Defend yourself from colorful enemies that spawn around the screen and move toward your position in the center!

## 🎮 Game Overview

You play as a white dot positioned at the center of the screen. Colorful enemies of varying sizes spawn from outside the canvas and move toward you. Click anywhere on the screen to shoot red projectiles toward that direction. Your goal is to destroy enemies before they reach you!

## ✨ Features

- **Static Player**: White dot at the center that shoots projectiles on click
- **Dynamic Enemies**: Colorful enemies (yellow, blue, green, purple) spawn randomly from outside the canvas
- **Projectile System**: Click to shoot projectiles toward your mouse cursor
- **Collision Detection**: Enemies shrink when hit and are destroyed when their radius becomes too small
- **Particle Effects**: Explosion animations when enemies or the player are hit
- **Score System**: Earn 100 points for each enemy destroyed
- **Game Over**: Game ends when your radius shrinks below a certain threshold

## 🚀 How to Play

1. Click the **"Start Game"** button to begin
2. Click anywhere on the screen to shoot projectiles toward that direction
3. Destroy enemies by hitting them with projectiles
4. Avoid letting enemies touch you - each collision reduces your size
5. Survive as long as possible and achieve the highest score!

## 📦 Installation

No installation required! Simply open the `index.html` file in a modern web browser.

### Local Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd "Game 2"
   ```

3. Open `index.html` in your web browser

## 🛠️ Technologies Used

- **HTML5** - Structure
- **JavaScript** - Game logic and mechanics
- **HTML5 Canvas** - Rendering
- **Tailwind CSS** (via CDN) - Styling for UI elements

## 📁 File Structure

```
Game 2/
├── index.html      # Main HTML file with game canvas and UI
├── index.js        # Game logic, classes, and game loop
└── README.md       # Project documentation
```

## 🎯 Game Mechanics

### Player
- Position: Center of the screen
- Color: White
- Radius: Starts at 20 pixels, decreases by 5 when hit by enemies
- Game Over: When radius falls below 10 pixels

### Enemies
- Spawn: Randomly from outside the canvas boundaries
- Colors: Yellow, Blue, Green, Purple (randomly assigned)
- Size: Random radius between 5-35 pixels
- Behavior: Move directly toward the player
- Damage: Reduce player radius by 5 on collision

### Projectiles
- Color: Red
- Radius: 5 pixels
- Speed: Fixed velocity based on click angle
- Damage: Reduce enemy radius by 4 per hit

### Particles
- Visual effect created when enemies or player are hit
- Fade out over time (alpha transparency)
- Color matches the hit entity

## 🔧 Known Issues / Future Improvements

The following improvements are planned for future versions:

1. **setInterval Issue**: The enemy spawn interval continues running even when the game is paused/stopped. This needs to be managed properly.

2. **High Score System**: Implementation of a high score system that stores and compares personal best scores (potentially using localStorage).

## 📝 License

This project is open source and available for personal and educational use.

---

Enjoy the game! 🎮

