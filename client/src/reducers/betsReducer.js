import { GET_USER_BETS } from '../actions/types';

export default function betsReducer(state = [], action) {
  switch(action.type) {
    case GET_USER_BETS:
      return [...action.payload]
    default:
      return state;
  }
}