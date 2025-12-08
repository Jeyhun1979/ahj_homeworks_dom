import goblinImage from '../img/goblin.png';

export default class Game {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.fieldSize = 4; 
    this.cells = [];
    this.goblin = null;
    this.currentIndex = null;
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
      field.appendChild(cell);
      this.cells.push(cell);
    }

    this.root.appendChild(field);
  }

  spawnGoblin() {
    const img = document.createElement('img');
    img.src = goblinImage;
    img.classList.add('goblin');
    this.goblin = img;

    const index = this.getRandomIndex(null);
    this.currentIndex = index;
    this.cells[index].appendChild(this.goblin);
  }

  startMoving() {
    setInterval(() => {
      const newIndex = this.getRandomIndex(this.currentIndex);

      this.cells[newIndex].appendChild(this.goblin);

      this.currentIndex = newIndex;
    }, 1000);
  }

  getRandomIndex(prevIndex) {
    let index;

    do {
      index = Math.floor(Math.random() * (this.fieldSize * this.fieldSize));
    } while (index === prevIndex);

    return index;
  }
}
