const readline = require("readline");
const { JokeGenerator } = require("./utils/JokeGenerator");

const jokeGenerator = new JokeGenerator();
const fruits = jokeGenerator.getFruits();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log("\nPick a fruit to hear a joke:\n");
  fruits.forEach((fruit, i) => {
    console.log(`  ${i + 1}. ${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`);
  });
  console.log(`  0. Quit`);
  console.log();
}

function askForFruit() {
  displayMenu();
  rl.question("Enter a number (1-5, or 0 to quit): ", (answer) => {
    const choice = parseInt(answer, 10);

    if (choice === 0) {
      console.log("\nThanks for playing! Goodbye! 👋\n");
      rl.close();
      return;
    }

    if (isNaN(choice) || choice < 1 || choice > fruits.length) {
      console.log("\nInvalid choice. Please pick a number between 1 and 5.");
    } else {
      const fruit = fruits[choice - 1];
      const joke = jokeGenerator.getJoke(fruit);
      console.log(`\n🤣 ${joke}`);
    }

    askForFruit();
  });
}

console.log("\n🍎 Welcome to the Fruit Joke Teller!");
askForFruit();
