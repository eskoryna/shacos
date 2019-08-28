import history from '../history';
import {
 SIGN_IN,
 SIGN_OUT,
 INITIALIZE_BOARD,
 INITIALIZE_STACK,
 INITIALIZE_SCORE,
 CHANGE_BOARD_SIZE,
 START_MOVE,
 END_MOVE,
 START_GAME,
 UPDATE_POINTS,
 UPDATE_SCORE,
 INITIALIZE_AI_MAXIMIZER,
 SET_AI_MAXIMIZER
} from './types';

export const signIn = userName => dispatch => {
 dispatch ({
  type: SIGN_IN,
  payload: userName
 });
};

export const signOut = () => dispatch => {
 dispatch ({
  type: SIGN_OUT
 });
};

export const startGame = () => (dispatch, getState) => {
 dispatch(initializeBoard());
 dispatch(initializeStack());
 dispatch(initializeScore());

 dispatch({
  type: START_GAME
 });

 if (getState().players.find(player => player.ai === 'maximizer')) {
  dispatch(initializeAiMaximizer());
 }

 dispatch(switchPlayer());
};

export const initializeBoard = () => (dispatch, getState) => {
 const boardSize = getState().game.boardSize;
 var board = [];
 for (var i = 0; i < boardSize; i++) {
  for (var j = 0; j < boardSize; j++) {
   board.push({
    fieldId: i * boardSize + j,
    fieldColor: Math.floor(Math.random() * 10),
    chipId: null,
    colorPoints: 0,
    formPoints: 0
   });
  };
 };
  
 dispatch ({
  type: INITIALIZE_BOARD,
  payload: board
 });
};

export const initializeStack = () => (dispatch, getState) => {
 const stackSize = getState().game.stackSize;
 var stack = [];
 for (var i = 0; i < stackSize; i++ ) {
  for (var j = 0; j< stackSize; j++) {
   stack.push({
    chipId: i * stackSize + j,
    holdsChip: true,
   });
  };
 };

 dispatch ({
  type: INITIALIZE_STACK,
  payload: stack
 });
};

export const initializeScore = () => dispatch => {
 dispatch ({
  type: INITIALIZE_SCORE
 });
};

export const changeBoardSize = boardSize => dispatch => {
 dispatch ({
  type: CHANGE_BOARD_SIZE,
  payload: boardSize
 });
}

export const switchPlayer = () => (dispatch, getState) => {
 const playerToMoveId = getState().game.playerToMoveId;
 const availableFields = getState().game.availableFields;
 const availableChips = getState().game.availableChips;

 if (availableFields > 0 && availableChips > 0) {
  const playerToMove = getState().players[playerToMoveId];

  if (playerToMove.ai !== null) {
   dispatch(aiMove(playerToMove));
  }
 } else {
  history.push('/result');
 }
};

export const startMove = chipId => (dispatch, getState) => {
 const availableFields = getState().game.availableFields;
 const availableChips = getState().game.availableChips;
 const playerToMoveId = getState().game.playerToMoveId;
 const playerToMove = getState().players[playerToMoveId];

 if (availableFields > 0 && availableChips > 0 && playerToMove.ai === null ) {
  const holdsChip = getState().stack[chipId].holdsChip;
  if (holdsChip === true) {
   dispatch ({
    type: START_MOVE,
    payload: { chipId: chipId }
   });
  }
 }
};

export const endMove = fieldId => (dispatch, getState) => {
 const move = getState().move;
 var board = getState().board;
 const chipId = board[fieldId].chipId;

 if (move.isInTransit === true && chipId === null) {
  dispatch ({
   type: END_MOVE,
   payload: { fieldId: fieldId, chipId: move.chipId }
  });

  dispatch(updatePoints(fieldId));
  dispatch(updateScore());
  dispatch(switchPlayer());
 }
};

export const aiMove = player => (dispatch, getState) => {
 const board = getState().board;
 const stack = getState().stack;
 const availableFields = getState().game.availableFields;
 const availableChips = getState().game.availableChips;
 var decision = null;

  switch (player.ai) {
   case 'random':
    decision = aiRandomDecision(board, stack, availableFields, availableChips);

    dispatch ({
     type: END_MOVE,
     payload: decision
    });

    dispatch(updatePoints(decision.fieldId));
    dispatch(updateScore());
    dispatch(switchPlayer());
    break;
   case 'maximizer':
    const boardSize = getState().game.boardSize;
    const stackSize = getState().game.stackSize;
    var aiMaximizer = getState().aiMaximizer;
    const playsColor = player.playsColor;
    
    if (aiMaximizer === null) {
     const estimation = aiMaximizerEstimateGame(board, boardSize, stackSize, playsColor);
     dispatch ({
      type: SET_AI_MAXIMIZER,
      payload: estimation
     });

     aiMaximizer = getState().aiMaximizer;
    }

    decision = aiMaximizerDecision(board, stack, aiMaximizer);
    
    dispatch ({
     type: END_MOVE,
     payload: decision
    });

    dispatch(updatePoints(decision.fieldId));
    dispatch(updateScore());
    dispatch(switchPlayer());
    break;
   default:
    return;
  }
};

function aiRandomDecision(board, stack, availableFields, availableChips) {
 var randomField = Math.floor(Math.random() * availableFields);

 for (var i = 0; i < board.length; i++) {
  if (board[i].chipId === null) {
   randomField--;
  }
  if (randomField < 0) {
   break;
  }
 }

 var randomChip = Math.floor(Math.random() * availableChips);

 for (var j = 0; j < stack.length; j++) {
  if (stack[j].holdsChip) {
   randomChip--;
  }
  if (randomChip < 0) {
   break;
  }
 }

 return { fieldId: i, chipId: j };
};

export const updatePoints = fieldId => (dispatch, getState) => {
 const board = getState().board;
 const boardSize = getState().game.boardSize;
 const colorPoints = calculateFieldPoints(board, boardSize, fieldId, null, true);
 const formPoints = calculateFieldPoints(board, boardSize, fieldId, null, false);

 dispatch ({
  type: UPDATE_POINTS,
  payload: { fieldId: fieldId, colorPoints: colorPoints, formPoints: formPoints }
 });
};

function calculateFieldPoints(board, boardSize, fieldId, chipFeature, isColor) {
 if (chipFeature === null) {
  const chipId = board[fieldId].chipId;
  chipFeature = Math.floor(chipId / 10);

  if (!isColor) {
   chipFeature = chipId - chipFeature * 10;
  }
 }

 const horizontal = Math.floor(fieldId / boardSize);
 const vertical = fieldId - horizontal * boardSize;
 var area = null;

 if (vertical < boardSize / 2) {
  if (horizontal < boardSize / 2) {
   area = 1;
  } else {
   area = 4;
  }
 } else {
  if (horizontal < boardSize / 2) {
   area = 2;
  } else {
   area = 3;
  }
 }

 const points = calculateAreaPoints(board, boardSize, fieldId, horizontal, vertical, area, chipFeature);

 return points;
};

function calculateAreaPoints(board, boardSize, fieldId, horizontal, vertical, area, chipFeature) {
 var fromHorizontal = null;
 var toHorizontal = null;
 var fromVertical = null;
 var toVertical = null;
 var areaSum = - subtractFeatures(chipFeature, board[fieldId].fieldColor);
 
 if (boardSize === 2) {
  fromHorizontal = 0;
  toHorizontal = 1;
  fromVertical = 0;
  toVertical = 1;
 } else {
  switch (area) {
   case 1:
    fromHorizontal = horizontal;
    toHorizontal = horizontal + Math.ceil(boardSize / 2) - 1;
    fromVertical = vertical;
    toVertical = vertical + Math.ceil(boardSize / 2) - 1;
    break;
   case 2:
    fromHorizontal = horizontal;
    toHorizontal = horizontal + Math.ceil(boardSize / 2) - 1;
    fromVertical = vertical - Math.ceil(boardSize / 2) + 1;
    toVertical = vertical;
    break;
   case 3:
    fromHorizontal = horizontal - Math.ceil(boardSize / 2) + 1;
    toHorizontal = horizontal;
    fromVertical = vertical - Math.ceil(boardSize / 2) + 1;
    toVertical = vertical;
    break;
   case 4:
    fromHorizontal = horizontal - Math.ceil(boardSize / 2) + 1;
    toHorizontal = horizontal;
    fromVertical = vertical;
    toVertical = vertical + Math.ceil(boardSize / 2) - 1;
    break
   default:
     fromHorizontal = 0;
     toHorizontal = 0;
     fromVertical = 0;
     toVertical = 0;
     areaSum = 0;
  }
 }

 var fieldIndex = null;

 for (var i = fromHorizontal; i <= toHorizontal; i++) {
  for (var j = fromVertical; j <= toVertical; j++) {
   fieldIndex = i * boardSize + j;
   areaSum += subtractFeatures(chipFeature, board[fieldIndex].fieldColor);
  }
 }

 return areaSum;
};

function subtractFeatures(chipFeature, fieldFeature) {
 if (chipFeature >= fieldFeature) {
  return chipFeature - fieldFeature;
 } else {
  return chipFeature - (fieldFeature - 10);
 }
};

export const updateScore = () => (dispatch, getState) => {
 const board = getState().board;
 const boardSize = getState().game.boardSize;
 const numberOfPlayers = getState().game.numberOfPlayers;
 const players = getState().players;
 var score = null;
 for (var i = 0; i < numberOfPlayers; i++) {
  score = 0;
  for (var j = 0; j < boardSize * boardSize; j++) {
   if (players[i].playsColor) {
    score += board[j].colorPoints;
   } else {
    score += board[j].formPoints;
   }
   
  }
  dispatch ({
   type: UPDATE_SCORE,
   payload: { playerId: i, score: score }
  });
 }
};

export const initializeAiMaximizer = () => dispatch => {
 dispatch ({
  type: INITIALIZE_AI_MAXIMIZER
 });
};

function aiMaximizerEstimateGame(board, boardSize, stackSize, playsColor) {
 var points = [];
 
 for (var i = 0; i < board.length; i++) {
  for (var j = 0; j < stackSize; j++) {
   points.push({
    fieldId: i,
    chipFeature: j,
    fieldPoints: calculateFieldPoints(board, boardSize, i, j, false)
   });
  }
 }

 var k = 0;
 var estimation = [];
 var chipId = null;
 var ourPoints = null;
 var rivalPoints = null;
 var ratio = null;

 if (playsColor) {
  for (i = 0; i < board.length; i++) {
   for (j = 0; j < stackSize; j++) {
    for (k = 0; k < stackSize; k++) {
     chipId = j * stackSize + k;
     ourPoints = findPoints(points, i, j);
     rivalPoints = findPoints(points, i, k);
     ratio = ourPoints / rivalPoints;
     estimation.push({
      fieldId: i,
      chipId: chipId,
      ratio: ratio
     });
    }
   }
  }
 } else {
  for (i = 0; i < board.length; i++) {
   for (j = 0; j < stackSize; j++) {
    for (k = 0; k < stackSize; k++) {
     chipId = j * stackSize + k;
     ourPoints = findPoints(points, i, k);
     rivalPoints = findPoints(points, i, j);
     ratio = ourPoints / rivalPoints;
     estimation.push({
      fieldId: i,
      chipId: chipId,
      ratio: ratio
     });
    }
   }
  }
 }

 estimation.sort((a, b) => (a.ratio > b.ratio) ? -1 : 1);
 
 return estimation;
}

function findPoints(points, fieldId, chipFeature) {
 return points.find(field => field.fieldId === fieldId && field.chipFeature === chipFeature).fieldPoints;
}

function aiMaximizerDecision(board, stack, aiMaximizer) {
 var fieldId = null;
 var chipId = null;
 for (var i = 0; i < aiMaximizer.length; i ++) {
  fieldId = aiMaximizer[i].fieldId;
  chipId = aiMaximizer[i].chipId;
  if (board[fieldId].chipId === null && stack[chipId].holdsChip === true) {
   return { fieldId: fieldId, chipId: chipId };
  }
 }
};