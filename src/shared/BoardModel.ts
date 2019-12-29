function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class BoardModel {
  public static readonly BEGINNER = Object.freeze({
    width: 9,
    height: 9,
    mines: 10
  });

  private width: number;
  private height: number;
  private mines: number;

  private readonly internalBoard: number[][] = [];

  public constructor({ width, height, mines } = BoardModel.BEGINNER) {
    this.width = width;
    this.height = height;
    this.mines = mines;
  }

  public get grid(): ReadonlyArray<ReadonlyArray<number>> {
    return this.internalBoard;
  }

  public generate() {
    this.purgeGrid();
    this.initGrid();
    this.placesMines();
    this.calculateFields();
  }

  private purgeGrid() {
    this.internalBoard.length = 0;
  }

  private initGrid() {
    for (let x = 0; x < this.width; x++) {
      this.internalBoard.push([]);
      for (let y = 0; y < this.height; y++) {
        this.internalBoard[x].push(-1);
      }
    }
  }

  private placesMines() {
    let m = 0;
    do {
      const x = randomInt(0, this.width - 1);
      const y = randomInt(0, this.height - 1);
      if (this.internalBoard[x][y] === -1) {
        this.internalBoard[x][y] = 9;
        m++;
      }
    } while (m < this.mines);
  }

  private calculateFields() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.internalBoard[x][y] === 9) {
          continue;
        }
        let mines = 0;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= this.width) {
            continue;
          }
          for (let dy = -1; dy <= 1; dy++) {
            const ny = y + dy;
            if (dx === 0 || dy === 0) {
              continue;
            }
            if (ny < 0 || ny >= this.height) {
              continue;
            }
            if (this.internalBoard[nx][ny] === 9) {
              mines++;
            }
          }
        }
        this.internalBoard[x][y] = mines;
      }
    }
  }
}
