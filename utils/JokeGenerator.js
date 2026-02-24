const jokes = {
  apple: [
    "Why did the apple go to the doctor? Because it wasn't peeling well!",
    "What do you call an apple that plays the trumpet? A tooty fruity!",
    "Why did the apple cry? Because its feelings were bruised!",
    "What's worse than finding a worm in your apple? Finding half a worm!",
    "Why did the apple turn red? Because it saw the salad dressing!",
  ],
  banana: [
    "Why did the banana go to the hospital? Because it wasn't peeling well!",
    "What do you call two banana peels? A pair of slippers!",
    "Why don't bananas ever feel lonely? Because they hang around in bunches!",
    "What's yellow and always points north? A magnetic banana!",
    "Why was the banana so popular? Because it had a-peel!",
  ],
  orange: [
    "What did the orange say to the banana? Nothing, oranges can't talk!",
    "Why did the orange stop rolling down the hill? It ran out of juice!",
    "Knock knock. Who's there? Orange. Orange who? Orange you glad I didn't say banana?",
    "Why did the orange lose the race? It ran out of juice!",
    "What do you call a lazy orange? A procrastifruit!",
  ],
  grape: [
    "What did the grape say when it got stepped on? Nothing, it just let out a little wine!",
    "Why did the grape stop in the middle of the road? Because it ran out of juice!",
    "What do you call a grape who's had too much sun? A raisin!",
    "Why are grapes never lonely? Because they come in bunches!",
    "What did the green grape say to the purple grape? Breathe, man! Breathe!",
  ],
  strawberry: [
    "Why was the strawberry sad? Because its mom was in a jam!",
    "What do you call a sad strawberry? A blueberry!",
    "Why did the strawberry cross the road? Because its mother was in a jam!",
    "What's a scarecrow's favorite fruit? Strawberries!",
    "How do you make a strawberry shake? Put it in the freezer until it shivers!",
  ],
};

class JokeGenerator {
  constructor() {
    this.remaining = {};
  }

  getFruits() {
    return Object.keys(jokes);
  }

  getJoke(fruit) {
    const fruitJokes = jokes[fruit];
    if (!fruitJokes) {
      return null;
    }

    if (!this.remaining[fruit] || this.remaining[fruit].length === 0) {
      this.remaining[fruit] = [...Array(fruitJokes.length).keys()];
      // Shuffle using Fisher-Yates
      for (let i = this.remaining[fruit].length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.remaining[fruit][i], this.remaining[fruit][j]] =
          [this.remaining[fruit][j], this.remaining[fruit][i]];
      }
    }

    const index = this.remaining[fruit].pop();
    return fruitJokes[index];
  }
}

module.exports = { JokeGenerator };
