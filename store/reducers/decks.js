import {
  ADD_DECK,
  GET_DECKS,
  ADD_CARD,
  ADD_QUIZ_TO_DECK,
} from '../actions/actionTypes';

export default function entries(state = {}, action) {
  switch (action.type) {
    case GET_DECKS: return {...state, ...action.decks};
    case ADD_DECK: return {...state, ...action.deck};
    case ADD_CARD: return {
      ...state,
      [action.deck] : {
        ...state[action.deck],
        questions: state[action.deck].questions.concat(action.question),
      },
    };
    case ADD_QUIZ_TO_DECK: return {
      ...state,
      [action.deck] : {
        ...state[action.deck],
        quizes: state[action.deck].quizes.concat(action.quiz),
      },
    };
  default: return state;
  }
}
