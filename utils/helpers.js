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

