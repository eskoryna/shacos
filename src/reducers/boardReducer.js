import { INITIALIZE_BOARD, END_MOVE, UPDATE_POINTS } from '../actions/types';

export default (state = [], action) => {
 switch (action.type) {
  case INITIALIZE_BOARD:
   return action.payload;
  case END_MOVE:
   return state.map((item, index) => index === action.payload.fieldId ? {
     fieldId: item.fieldId,
     fieldColor: item.fieldColor,
     chipId: action.payload.chipId,
     colorPoints: item.colorPoints,
     formPoints: item.formPoints
    } : item
   );
  case UPDATE_POINTS:
   return state.map((item, index) => index === action.payload.fieldId ? {
    fieldId: item.fieldId,
    fieldColor: item.fieldColor,
    chipId: item.chipId,
    colorPoints: action.payload.colorPoints,
    formPoints: action.payload.formPoints
   } : item
   );
  default:
   return state;
 }
};