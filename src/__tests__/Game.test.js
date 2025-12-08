/**
 * @jest-environment jest-environment-jsdom
 */

import Game from '../js/Game';

jest.mock('../img/goblin.png', () => 'goblin.png');

describe('Game class tests', () => {
  let root;

  beforeEach(() => {
    document.body.innerHTML = '<div id="game-root"></div>';
    root = '#game-root';
  });

  test('4x4 game field is created correctly', () => {
    const game = new Game(root);
    game.createField();

    const cells = document.querySelectorAll('.cell');
    expect(cells.length).toBe(16);
  });

  test('Goblin appears in one of the cells', () => {
    const game = new Game(root);
    game.createField();
    game.spawnGoblin();

    const goblin = document.querySelector('.goblin');

    expect(goblin).not.toBeNull();
    expect(goblin.parentElement.classList.contains('cell')).toBe(true);
  });

  test('getRandomIndex never returns the same previous index (data-driven)', () => {
    const game = new Game(root);

    const previousIndexes = [0, 5, 10, 15];

    previousIndexes.forEach((prev) => {
      const next = game.getRandomIndex(prev);
      expect(next).not.toBe(prev);
      expect(next).toBeGreaterThanOrEqual(0);
      expect(next).toBeLessThan(16);
    });
  });
});

describe('Game movement tests with fake timers', () => {
  let root;

  beforeEach(() => {
    document.body.innerHTML = '<div id="game-root"></div>';
    root = '#game-root';
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('Goblin moves to a different cell over time', () => {
    const game = new Game(root);
    game.init();

    const initialIndex = game.currentIndex;

    jest.advanceTimersByTime(2000);

    expect(game.currentIndex).not.toBeNull();
    expect(game.currentIndex).not.toBe(initialIndex);

    const goblin = document.querySelector('.goblin');
    expect(goblin).not.toBeNull();
    expect(goblin.parentElement.classList.contains('cell')).toBe(true);
  });
});
