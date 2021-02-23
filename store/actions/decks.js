import {
  ADD_DECK,
  GET_DECKS,
  ADD_CARD,
  REMOVE_DECK,
} from './actionTypes';

import {
  addDeckToStorgage,
  addQuestion,
  getDecksFromStorage,
  removeDeckFromStorage,
} from '../../utils/api';

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


const removeDeck = (name) => ({
  type: REMOVE_DECK,
  name,
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

export const removeDeckFromList = (name) => {
  return async dispatch => {
    return removeDeckFromStorage(name)
      .then(() => dispatch(removeDeck(name)));
  };
};
