import { ADD_ENTRY, GET_ENTRIES } from './actionTypes';
import { getStorage, addDeck } from '../../utils/helpers';

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  entry,
});

export const getEntries = (entries) => ({
  type: GET_ENTRIES,
  entries,
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
