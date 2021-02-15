import { CREATE_QUIZ } from '../actions/actionTypes';

export default function quizzes(state = {}, action) {
  switch (action.type) {
    case CREATE_QUIZ: return { ...state, [action.quiz.id]: action.quiz };
    default: return state;
  }
}
