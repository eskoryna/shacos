import React from 'react';
import Board from './Board';
import Stack from './Stack';

const Game = () => {
 return <div style={{ display: 'flex', flexDirection: 'row' }}>
  <div>
   <Board />
  </div>
  <div>
   <Stack />
  </div>
 </div>
};

export default Game;