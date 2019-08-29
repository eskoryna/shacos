import { SIGN_IN, SIGN_OUT, INITIALIZE_SCORE, UPDATE_SCORE } from '../actions/types';

const INITIAL_STATE = [{
 playerId: 0,
 name: 'Human',
 ai: null,
 playsColor: true,
 score: 0
}, {
 playerId: 1,
 name: 'AI',
 ai: 'maximizer',
 playsColor: false,
 score: 0
}]

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case INITIALIZE_SCORE:
   return state.map(item => item = { ...item, score: 0 });
  case UPDATE_SCORE:
   return state.map((item, index) => index === action.payload.playerId ?
    { ...item, score: item.score + action.payload.score } : item
   );
  case SIGN_IN:
   return state.map(item => item.ai === null ?
    { ...item, name: action.payload } : item
   );
  case SIGN_OUT:
    return state.map(item => item.ai === null ?
     { ...item, name: 'Human ' + (item.playerId + 1) } : item
    );
  default:
   return state;
 }
};