# Pokemon Memory Card Game

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![The Odin Project](https://img.shields.io/badge/The%20Odin%20Project-Lesson-red)](https://www.theodinproject.com/)

> A React-based memory card game featuring Pokemon from the PokeAPI. Test your memory by clicking each Pokemon only once - click the same card twice and you lose! Built with modern React hooks, comprehensive test coverage, and TDD methodology as part of The Odin Project curriculum.

## 📋 Table of Contents

- [Pokemon Memory Card Game](#pokemon-memory-card-game)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🎮 How to Play](#-how-to-play)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Game](#running-the-game)
    - [Running Tests](#running-tests)
    - [Building for Production](#building-for-production)
  - [💡 Future Improvements](#-future-improvements)
  - [📚 What I Learned](#-what-i-learned)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [� Acknowledgments](#-acknowledgments)

## ✨ Features

- **Dynamic Pokemon Cards** - Fetches 12 random Pokemon from the PokeAPI on each game load
- **Score Tracking** - Tracks both current score and best score across game sessions
- **Card Shuffling** - Cards randomize position after every click to increase difficulty
- **Duplicate Detection** - Click the same Pokemon twice and the game resets
- **Responsive Design** - Fully responsive layout optimized for mobile and desktop
- **Modern UI** - Glass-morphism effects, smooth animations, and gradient backgrounds
- **Error Handling** - Graceful error messages if Pokemon API is unavailable
- **Comprehensive Tests** - 100% test coverage with Vitest and React Testing Library
- **Loading States** - Smooth loading experience while fetching Pokemon data

## 🎮 How to Play

1. The game starts by fetching 12 random Pokemon from the PokeAPI
2. Click on any Pokemon card to earn a point
3. After each click, all cards shuffle to new positions
4. **Goal**: Click each Pokemon exactly once without repeating
5. **Win**: Successfully click all 12 unique Pokemon
6. **Lose**: Click the same Pokemon twice - score resets to 0
7. Your best score is saved and displayed throughout the game

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/top-submissions/fullstackjs-memory-card.git
cd fullstackjs-memory-card
```

1. Install dependencies

```bash
npm install
```

### Running the Game

Start the development server:

```bash
npm run dev
```

The game will open at `http://localhost:5173`

### Running Tests

Run the test suite:

```bash
npm test
```

### Building for Production

```bash
npm run build
npm run preview
```

## 💡 Future Improvements

If I were to continue working on this project, here's what I'd add:

- [ ] Difficulty levels (6, 12, or 18 cards)
- [ ] Sound effects for clicks and game events
- [ ] Pokemon type filtering (water, fire, grass, etc.)
- [ ] Leaderboard with localStorage persistence
- [ ] Dark mode toggle
- [ ] Accessibility improvements (keyboard navigation)
- [ ] More elaborate win/loss animations
- [ ] Option to choose specific Pokemon generations

## 📚 What I Learned

- **Test-Driven Development** - Built the entire game using TDD methodology, writing tests before implementation
- **React Hooks** - Mastered useState, useEffect for state management and side effects
- **External API Integration** - Fetching and transforming data from the Pokemon API
- **Error Handling** - Implementing robust error states for network failures
- **CSS Modules** - Component-scoped styling with CSS modules
- **Fisher-Yates Shuffle** - Implementing an unbiased array shuffling algorithm
- **Async Testing** - Testing asynchronous operations with waitFor and mocked fetch
- **Component Composition** - Breaking down UI into reusable, testable components

## 🛠️ Technologies Used

- **React 19** - UI library with modern hooks
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **CSS Modules** - Scoped component styling
- **PokeAPI** - Pokemon data and sprites
- **React Router** - Client-side routing
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting

## 🙏 Acknowledgments

- **The Odin Project** - For providing an amazing free curriculum and project requirements
- **The TOP Community** - For being supportive and helpful throughout the learning journey
- **PokeAPI** - For providing free Pokemon data and sprites
- **React Team** - For creating an amazing library and comprehensive documentation

Special thanks to everyone who maintains open-source projects that made this possible!

---

<div align="center">

Built with 💡 and ☕ as part of my journey through [The Odin Project](https://www.theodinproject.com/)

[Live Demo](https://top-submissions.github.io/fullstackjs-memory-card/) • [Report Bug](https://github.com/top-submissions/fullstackjs-memory-card/issues) • [Request Feature](https://github.com/top-submissions/fullstackjs-memory-card/issues)

</div>
