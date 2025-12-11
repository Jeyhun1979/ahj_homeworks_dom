import goblinImage from '../img/goblin.png';

export default class Game {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.fieldSize = 4; 
    this.cells = [];
    this.goblin = null;
    this.currentIndex = null;
    this.intervalId = null;
  }

  init() {
    this.createField();
    this.spawnGoblin();
    this.startMoving();
  }

  createField() {
    const field = document.createElement('div');
    field.classList.add('game-field');

    for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      field.append(cell);
      this.cells.push(cell);
    }

    this.root.append(field);
  }

  spawnGoblin() {
    const img = document.createElement('img');
    img.src = goblinImage;
    img.classList.add('goblin');
    this.goblin = img;

    const index = this.getRandomIndex(null);
    this.currentIndex = index;
    this.cells[index].append(this.goblin);
  }

  generateRandomIndex() {
    return Math.floor(Math.random() * (this.fieldSize * this.fieldSize));
  }

  getRandomIndex(prevIndex) {
    let index;
    do {
      index = this.generateRandomIndex();
    } while (index === prevIndex);
    return index;
  }

  startMoving() {
    this.intervalId = setInterval(() => {
      const newIndex = this.getRandomIndex(this.currentIndex);
      this.cells[newIndex].append(this.goblin);
      this.currentIndex = newIndex;
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}
