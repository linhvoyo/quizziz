import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STORAGE_KEY = 'MobileFlashcards:app';

export async function getStorage() {
  await AsyncStorage.getItem(APP_STORAGE_KEY)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}

export async function setItem(item) {
  return AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(item));
}

export async function clearStorage() {
  return AsyncStorage.removeItem(APP_STORAGE_KEY);
}

export async function addDeck(name) {
  const deck = {
    [name] : {
      title: name,
      questions: [],
    },
  };
  return setItem(deck);
}

