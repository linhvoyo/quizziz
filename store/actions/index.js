import { ADD_ENTRY, GET_ENTRIES, ADD_CARD } from './actionTypes';
import { getStorage, addDeck, addQuestion } from '../../utils/api';

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  entry,
});

export const getEntries = (entries) => ({
  type: GET_ENTRIES,
  entries,
});

export const addCard = (deck, question) => ({
  type: ADD_CARD,
  deck,
  question,
});

export const fetchEntries = () => {
  return async (dispatch) => {
    const entries = await getStorage();
    return dispatch(getEntries(JSON.parse(entries)));
  };
};

export const createEntry = (name) => {
  return async dispatch => {
    return addDeck(name).then((deck) => dispatch(addEntry(deck)));
  };
};

export const createCard = (deck, question, answer) => {
  return async dispatch => {
    return addQuestion(deck, question, answer)
      .then(() => dispatch(addCard(deck, { question, answer })));
  };
};
