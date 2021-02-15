import {
  ADD_DECK,
  GET_DECKS,
  ADD_CARD,
  ADD_QUIZ_TO_DECK,
} from './actionTypes';
import { getDecksFromStorage, addDeckToStorgage, addQuestion, updateDecks } from '../../utils/api';
import { generateUUID } from '../../utils/helpers';

const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

const getDecks = (decks) => ({
  type: GET_DECKS,
  decks,
});

const addCard = (deck, question) => ({
  type: ADD_CARD,
  deck,
  question,
});

const addQuizToDeck = (deck, quiz) => ({
  type: ADD_QUIZ_TO_DECK,
  deck,
  quiz,
});

export const fetchDecks = () => {
  return async (dispatch) => {
    const entries = await getDecksFromStorage();
    return dispatch(getDecks(JSON.parse(entries)));
  };
};

export const createDeck = (name) => {
  return async dispatch => {
    return addDeckToStorgage(name).then((deck) => dispatch(addDeck(deck)));
  };
};

export const createCard = (deck, question, answer) => {
  return async dispatch => {
    return addQuestion(deck, question, answer)
      .then(() => dispatch(addCard(deck, { question, answer })));
  };
};

export const createQuiz = (deck) => {
  const uuid = generateUUID();
  return async (dispatch, getState) => {
    dispatch(addQuizToDeck(deck, uuid));
    return updateDecks(getState().decks)
      .then(() => uuid);
  };
};
