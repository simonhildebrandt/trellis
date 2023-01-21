import { position } from '@chakra-ui/react';
import { download, traverse } from 'dictionarily';

import { HorizontalHexGrid } from './hex-grid';


export async function getWords() {
  const dict = await download();

  const words = [];
  traverse(dict, node => {
    if (node.prefix.length == 5) words.push(node.prefix);
  }, {wordsOnly: true});

  return words;
}


class NoWordsError extends Error {};

function populateGrid(grid, words) {
  function placeWord(position, direction) {
    const currentLetters = grid.getLine(direction, 5, position).map(l => l && l.letter);

    let newWord;
    let remainingWords = [...words];

    for(;;) {
      let offset = Math.floor(Math.random()*remainingWords.length);
      newWord = remainingWords[offset];

      const newLetters = newWord.split('');
      const match = newLetters.every((l, i) => {
        const c = currentLetters[i];
        return c == undefined || c == l;
      });
      if (match) {
        break;
      } else {
        remainingWords.splice(offset, 1);
      }

      if (remainingWords.length == 0) {
        throw new NoWordsError("ran out of words trying to place")
      }
    }

    grid.setLine(position, direction, newWord.split('').map(letter => ({letter})));

    return { word: newWord, ...position, direction };
  }

  const rowCount = 3;
  for (let row = 0; row < rowCount; row ++) {
    const first = placeWord({x: row * 4, y: row * 8}, 0);
    console.log({first});
    placeWord({x: (row * 4) + 4, y: row * 8}, 0);
    placeWord({x: row * 4, y: row * 8}, 1);
    placeWord({x: (row * 4) + 4, y: (row * 8) + 4}, 5);
    placeWord({x: (row * 4) + 4, y: row * 8}, 1);
    placeWord({x: (row * 4) + 8, y: (row * 8) + 4}, 5);
    placeWord({x: (row * 4) + 4, y: (row * 8) + 4}, 0);
    placeWord({x: (row * 4) + 4, y: (row * 8) + 8}, 5);
    placeWord({x: (row * 4) + 4, y: (row * 8) + 4}, 1);
    placeWord({x: (row * 4) + 8, y: (row * 8) + 8}, 5);
    placeWord({x: (row * 4) + 8, y: (row * 8) + 4}, 1);
  }
  placeWord({x: rowCount * 4, y: rowCount * 8}, 0);
  placeWord({x: (rowCount * 4) + 4, y: rowCount * 8}, 0);
}

export async function generate() {
  const words = await getWords();

  while(true) {
    try {
      const grid = new HorizontalHexGrid(30, 30);
      populateGrid(grid, words);
      return grid;
    } catch(err) {
      if (err instanceof NoWordsError) {
        console.error('failed to place words - trying again...');
      } else {
        throw err;
      }
    }
  }

}
