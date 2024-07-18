import { d } from "vite/dist/node/types.d-aGj9QkWt";

export enum units {
  rat = 1,
  goblin = 2,
  ogre = 3,
  dragon = 5,
  elf = -2,
  orc = -1,
  empty = 0,
}

export enum difficulties {
  easy = 1,
  medium = 2,
  hard = 3,
}

export type SumMonLevel = {
  spots: units[][];
  difficulty: difficulties;
  units: units[];
  results: { horizontal: number[]; vertical: number[] };
};

interface NewLevelConfig {
  width?: number;
  height?: number;
  seed?: number;
  difficulty: difficulties;
}

export class NewLevel {
  static difficulties: any;
  static generate(config: NewLevelConfig): SumMonLevel {
    const difficulty = config.difficulty;
    let width = 2;
    let height = 2;
    let numberOfIneventoryUnits = 2;
    let useEmptyTile = false;

    if (!config.height) {
      if (difficulty == difficulties.easy) height = NewLevel._getRandomInteger(2, 3);
      if (difficulty == difficulties.medium) height = NewLevel._getRandomInteger(3, 4);
      if (difficulty == difficulties.hard) height = NewLevel._getRandomInteger(5, 6);
    } else height = config.height;

    if (!config.width) {
      if (difficulty == difficulties.easy) width = NewLevel._getRandomInteger(2, 3);
      if (difficulty == difficulties.medium) width = NewLevel._getRandomInteger(3, 4);
      if (difficulty == difficulties.hard) width = NewLevel._getRandomInteger(5, 6);
    } else width = config.width;

    let inventoryTypes = [];

    // set inventory types
    if (difficulty == difficulties.hard) {
      inventoryTypes.push(units.orc, units.elf);
      useEmptyTile = true;
    }
    if (difficulty == difficulties.medium || difficulty == difficulties.hard) {
      inventoryTypes.push(units.dragon);
      useEmptyTile = true;
    }
    if (difficulty == difficulties.easy || difficulty == difficulties.medium || difficulty == difficulties.hard) {
      inventoryTypes.push(units.goblin, units.ogre, units.rat);
    }

    // set number of inventory units
    if (difficulty == difficulties.easy) numberOfIneventoryUnits = NewLevel._getRandomInteger(2, 3);
    if (difficulty == difficulties.medium) numberOfIneventoryUnits = NewLevel._getRandomInteger(3, 4);
    if (difficulty == difficulties.hard) numberOfIneventoryUnits = NewLevel._getRandomInteger(4, 5);

    // fill inventory
    let availableUnits: units[] = [];
    console.log(numberOfIneventoryUnits);

    for (let i = 0; i < numberOfIneventoryUnits; i++) {
      availableUnits.push(NewLevel._pickOne(inventoryTypes));
      inventoryTypes.splice(inventoryTypes.indexOf(availableUnits[i]), 1);
    }

    // setup empty tile
    let emptyTile = [];
    if (useEmptyTile) {
      const numOfEmptyTiles = difficulty == difficulties.medium ? NewLevel._getRandomInteger(0, 1) : NewLevel._getRandomInteger(0, 3);
      for (let i = 0; i < numOfEmptyTiles; i++) {
        let coords = NewLevel._getRandomElement(width, height);
        emptyTile.push(coords);
      }
    }

    let spots: units[][] = [];

    for (let y = 0; y < height; y++) {
      let row: units[] = [];
      for (let x = 0; x < width; x++) {
        if (emptyTile.some(coords => coords[0] === x && coords[1] === y)) {
          row.push(0);
          continue;
        } else {
          row.push(NewLevel._pickOne(availableUnits));
        }
      }
      spots.push(row);
    }

    // generate results
    let verticalResults = new Array(height).fill(0);
    let horizontalResults = new Array(width).fill(0);

    verticalResults.forEach((val, index) => {
      let result = 0;
      for (let x = 0; x < width; x++) {
        result += spots[index][x];
      }
      verticalResults[index] = result;
    });

    horizontalResults.forEach((val, index) => {
      let result = 0;
      for (let y = 0; y < height; y++) {
        result += spots[y][index];
      }
      horizontalResults[index] = result;
    });

    return {
      spots: spots,
      difficulty: config.difficulty,
      units: availableUnits,
      results: { horizontal: horizontalResults, vertical: verticalResults },
    };
  }

  private static _getRandomInteger(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static _pickOne<T>(incomingSet: ReadonlyArray<T>): T {
    const randomIndex = Math.floor(Math.random() * incomingSet.length);
    return incomingSet[randomIndex];
  }

  private static _getRandomElement(width: number, height: number): number[] {
    return [NewLevel._getRandomInteger(0, width - 1), NewLevel._getRandomInteger(0, height - 1)];
  }
}
