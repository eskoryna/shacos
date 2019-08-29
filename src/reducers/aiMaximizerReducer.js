import { INITIALIZE_AI_MAXIMIZER, SET_AI_MAXIMIZER } from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case INITIALIZE_AI_MAXIMIZER:
   return INITIAL_STATE;
  case SET_AI_MAXIMIZER:
   return action.payload;
  default:
   return state;
 }
};