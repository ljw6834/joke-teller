# Joke Teller

A fun CLI app that tells fruit jokes. Pick a fruit and get a random joke.

## Getting Started

```bash
npm start
```

## How It Works

1. The app displays 5 fruits (Apple, Banana, Orange, Grape, Strawberry)
2. You pick one by entering a number (1-5)
3. A random joke about that fruit is displayed

Each fruit has 5 jokes, for 25 total.

## Project Structure

```
joke-teller/
├── index.js                # Entry point — CLI interaction
└── utils/
    └── JokeGenerator.js    # Utility class — fruit data and joke selection
```

## Tech Stack

- Node.js
- readline (built-in)
