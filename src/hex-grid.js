/*
  Horizontal Grid Layout
  0 1 2 3 4 5
   1 2 3 4 5
  1 2 3 4 5 6
   2 3 4 5 6
  2 3 4 5 6 7
*/

const DIRECTIONS = [
  [1, 0],   // right
  [1, 1],   // down, right
  [0, 1],   // down, left
  [-1, 0],  // left
  [-1, -1], // up, left
  [0, -1],  // up, right
];


function translate(direction, distance, {x, y}) {
  const offset = DIRECTIONS[direction];

  return {
    x: x + offset[0] * distance,
    y: y + offset[1] * distance,
  }
}

export class HorizontalHexGrid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.rows = [];
    for(var i = 0; i < height; i++) {
      this.rows.push([]);
    }
  }

  set({x, y}, item) {
    return this.rows[y][x] = item;
  }

  get({x, y}) {
    return this.rows[y][x];
  }

  getLine(direction, length, {x, y}) {
    const items = [];

    for(var i = 0; i < length; i ++) {
      items.push(this.get(translate(direction, i, {x, y})));
    }

    return items;
  }

  setLine({x, y}, direction, items) {
    items.forEach((item, i) => {
      this.set(translate(direction, i, {x, y}), item);
    });
  }

  items() {
    return Object.entries(this.rows).flatMap(function([ykey, row]) {
      const y = Number(ykey);

      return Object.entries(row).flatMap(function([xkey, item]) {
        const x = Number(xkey);

        return { x, y, item };
      });
    });
  }
}

