import { START_MOVE, END_MOVE } from '../actions/types';

const INITIAL_STATE = {
 isInTransit: false,
 chipId: null
};

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case START_MOVE:
   return { ...state, isInTransit: true, chipId: action.payload.chipId };
  case END_MOVE:
   return { ...state, isInTransit: false, chipId: null };
  default:
   return state;
 }
};