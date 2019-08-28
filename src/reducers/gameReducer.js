import { INITIALIZE_BOARD, INITIALIZE_STACK, CHANGE_BOARD_SIZE, END_MOVE, START_GAME } from '../actions/types';

const INITIAL_STATE = {
 numberOfPlayers: 2,
 playerToMoveId: 0,
 boardSize: 3,
 stackSize: 10,
 availableFields: null,
 availableChips: null
};

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case INITIALIZE_BOARD:
   return { ...state, availableFields: state.boardSize * state.boardSize};
  case INITIALIZE_STACK:
   return { ...state, availableChips: state.stackSize * state.stackSize };
  case CHANGE_BOARD_SIZE:
   return { ...state, boardSize: action.payload };
  case END_MOVE:
   var playerToMoveId = state.playerToMoveId + 1;

   if (playerToMoveId >= state.numberOfPlayers) {
    playerToMoveId = 0;
   }

   return { ...state, availableFields: state.availableFields - 1, availableChips: state.availableChips - 1, playerToMoveId: playerToMoveId };
  case START_GAME:
   return { ...state, playerToMoveId: 0 }
  default:
   return state;
 }
};