import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
 isSignedIn: null,
 userName: null
};

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case SIGN_IN:
   return { ...state, isSignedIn: true, userName: action.payload };
  case SIGN_OUT:
   return { ...state, isSignedIn: false, userName: null };
  default:
   return state;
 }
};