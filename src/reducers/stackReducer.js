import { INITIALIZE_STACK, END_MOVE } from '../actions/types';

export default (state = [], action) => {
 switch (action.type) {
  case INITIALIZE_STACK:
   return action.payload;
  case END_MOVE:
   return state.map((item, index) => 
    index === action.payload.chipId ? { chipId: item.chipId, holdsChip: false }  : item
   );
  default:
   return state;
 }
};