import { ADD_ENTRY, GET_ENTRIES, ADD_CARD } from '../actions/actionTypes';

export default function entries(state = {}, action) {
  switch (action.type) {
    case GET_ENTRIES: return {...state, ...action.entries};
    case ADD_ENTRY: return {...state, ...action.entry};
    case ADD_CARD: return {
      ...state,
      [action.deck] : {
        ...state[action.deck],
        questions: state[action.deck].questions.concat(action.question),
      },
    };
  default: return state;
  }
}
