const { JokeGenerator } = require("../utils/JokeGenerator");

describe("JokeGenerator", () => {
  let generator;

  beforeEach(() => {
    generator = new JokeGenerator();
  });

  describe("constructor", () => {
    test("initializes with empty remaining object", () => {
      expect(generator.remaining).toEqual({});
    });
  });

  describe("getFruits", () => {
    test("returns an array of fruit names", () => {
      const fruits = generator.getFruits();
      expect(Array.isArray(fruits)).toBe(true);
      expect(fruits.length).toBe(5);
    });

    test("contains all expected fruits", () => {
      const fruits = generator.getFruits();
      expect(fruits).toContain("apple");
      expect(fruits).toContain("banana");
      expect(fruits).toContain("orange");
      expect(fruits).toContain("grape");
      expect(fruits).toContain("strawberry");
    });
  });

  describe("getJoke", () => {
    test("returns a string for a valid fruit", () => {
      const joke = generator.getJoke("apple");
      expect(typeof joke).toBe("string");
      expect(joke.length).toBeGreaterThan(0);
    });

    test("returns null for an invalid fruit", () => {
      expect(generator.getJoke("mango")).toBeNull();
      expect(generator.getJoke("")).toBeNull();
      expect(generator.getJoke(undefined)).toBeNull();
    });

    test("returns a joke for each valid fruit", () => {
      const fruits = generator.getFruits();
      fruits.forEach((fruit) => {
        const joke = generator.getJoke(fruit);
        expect(joke).not.toBeNull();
        expect(typeof joke).toBe("string");
      });
    });

    test("returns all 5 jokes for a fruit before repeating", () => {
      const jokes = new Set();
      for (let i = 0; i < 5; i++) {
        jokes.add(generator.getJoke("banana"));
      }
      expect(jokes.size).toBe(5);
    });

    test("reshuffles and continues after all jokes are exhausted", () => {
      // Exhaust all 5 jokes
      for (let i = 0; i < 5; i++) {
        generator.getJoke("grape");
      }

      // Should still return valid jokes after exhaustion
      const joke = generator.getJoke("grape");
      expect(typeof joke).toBe("string");
      expect(joke.length).toBeGreaterThan(0);
    });

    test("tracks jokes independently per fruit", () => {
      const appleJoke = generator.getJoke("apple");
      const bananaJoke = generator.getJoke("banana");

      expect(typeof appleJoke).toBe("string");
      expect(typeof bananaJoke).toBe("string");
      // They should be from different joke sets
      expect(appleJoke).not.toBe(bananaJoke);
    });

    test("remaining indices are populated after first call", () => {
      generator.getJoke("orange");
      // After popping one, 4 should remain
      expect(generator.remaining["orange"]).toBeDefined();
      expect(generator.remaining["orange"].length).toBe(4);
    });

    test("remaining indices deplete with each call", () => {
      generator.getJoke("strawberry");
      expect(generator.remaining["strawberry"].length).toBe(4);

      generator.getJoke("strawberry");
      expect(generator.remaining["strawberry"].length).toBe(3);

      generator.getJoke("strawberry");
      expect(generator.remaining["strawberry"].length).toBe(2);

      generator.getJoke("strawberry");
      expect(generator.remaining["strawberry"].length).toBe(1);

      generator.getJoke("strawberry");
      expect(generator.remaining["strawberry"].length).toBe(0);
    });

    test("second cycle returns all 5 jokes again", () => {
      // First cycle
      for (let i = 0; i < 5; i++) {
        generator.getJoke("apple");
      }

      // Second cycle
      const secondCycleJokes = new Set();
      for (let i = 0; i < 5; i++) {
        secondCycleJokes.add(generator.getJoke("apple"));
      }
      expect(secondCycleJokes.size).toBe(5);
    });
  });
});
