import { SIGN_IN, SIGN_OUT, INITIALIZE_SCORE, UPDATE_SCORE } from '../actions/types';

const INITIAL_STATE = [{
 playerId: 0,
 name: 'Human',
 ai: null,
 playsColor: true,
 score: 0
}, {
 playerId: 1,
 name: 'AI Maximizer',
 ai: 'maximizer',
 // name: 'AI Random',
 // ai: 'random',
 playsColor: false,
 score: 0
}]

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case INITIALIZE_SCORE:
   return state.map(item => item = {
    playerId: item.playerId,
    name: item.name,
    ai: item.ai,
    playsColor: item.playsColor,
    score: 0
   });
  case UPDATE_SCORE:
   return state.map((item, index) => index === action.payload.playerId ? {
    playerId: item.playerId,
    name: item.name,
    ai: item.ai,
    playsColor: item.playsColor,
    score: item.score + action.payload.score
   } : item
   );
  case SIGN_IN:
   return state.map(item => item.ai === null ? {
    playerId: item.playerId,
    name: action.payload,
    ai: item.ai,
    playsColor: item.playsColor,
    score: item.score
   } : item
   );
  case SIGN_OUT:
    return state.map(item => item.ai === null ? {
     playerId: item.playerId,
     name: 'Human ' + (item.playerId + 1),
     ai: item.ai,
     playsColor: item.playsColor,
     score: item.score
    } : item
    );
  default:
   return state;
 }
};