import { combineReducers } from 'redux';
import decks from './decks';
import quizzes from './quizzes';

export default combineReducers({
  decks,
  quizzes,
});

