import { ADD_DECK, GET_DECKS, ADD_CARD } from './actionTypes';
import { getDecksFromStorage, addDeckToStorgage, addQuestion } from '../../utils/api';

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
