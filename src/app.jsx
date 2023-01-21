import React, { useEffect, useState } from 'react';
import Letters from './letters';

import { generate } from './generator';


generate();

export default function App() {
  const [grid, setGrid] = useState(null);

  useEffect(() => {
    generate().then(setGrid);
  }, []);

  return <svg width={1000} height={1200} fontSize={32}>
    { grid && <Letters grid={grid}/> }
  </svg>
}
