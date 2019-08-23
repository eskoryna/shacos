import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import playersReduce from './playersReducer';
import boardReducer from './boardReducer';
import stackReducer from './stackReducer';
import moveReducer from './moveReducer';
import authReducer from './authReducer';
import aiMaximizerReducer from './aiMaximizerReducer';

export default combineReducers({
 game: gameReducer,
 players: playersReduce,
 board: boardReducer,
 stack: stackReducer,
 move: moveReducer,
 auth: authReducer,
 aiMaximizer: aiMaximizerReducer
});