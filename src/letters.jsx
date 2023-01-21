import React from 'react';
import { Letter, LetterBackground } from './letter';



function gridToTiles(grid) {
  const items = grid.items();

  return items.map(({x: tileX, y: tileY, item: {letter}}) => {
    const x = (tileX * 36) + 64 - (tileY * 18);
    const y = (tileY * 33) + 64;

    return({ x, y, letter })
  });
}

export default function Letters({ grid }) {
  const tiles = gridToTiles(grid);

  return <>
    { tiles.map(({x, y}, i) => (
      <LetterBackground key={i} y={y} x={x}/>
    ))}
    { tiles.map(({x, y, letter}, i) => (
      <Letter key={i} y={y} x={x} letter={letter}/>
    ))}
  </>
}
