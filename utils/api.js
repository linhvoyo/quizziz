import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STORAGE_KEY = 'MobileFlashcards:app';

export async function printStorage() {
  console.log(JSON.parse(await getStorage()));
}

export async function getStorage() {
  return AsyncStorage.getItem(APP_STORAGE_KEY);
}

export async function setItem(item) {
  return AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(item));
}

export async function clearStorage() {
  return AsyncStorage.removeItem(APP_STORAGE_KEY);
}

export async function addDeck(name) {
  const decks = JSON.parse(await getStorage());
  const deck = {
    [name]: {
      title: name,
      questions: [],
    },
  };

  if (typeof (decks) === 'object') { await setItem({ ...decks, ...deck }); }
  else { await setItem(deck); }
  return deck;
}

export async function addQuestion(deck, question, answer) {
  const card = {
    question,
    answer,
  };

  const decks = JSON.parse(await getStorage());
  console.log(deck);
  console.log(decks);
  if (deck in decks) {
    return setItem({
      ...decks,
      [deck]: {
        ...decks[deck],
        questions: decks[deck].questions.concat(card),
      },
    });
  }
  throw new Error('Unable to add card to deck');
}
