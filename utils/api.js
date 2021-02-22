import AsyncStorage from '@react-native-async-storage/async-storage';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';
const QUIZZES_STORAGE_KEY = 'MobileFlashcards:quizzes';
const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export async function printStorage() {
  console.log('decks', JSON.parse(await getDecksFromStorage()));
  console.log('quizzes', JSON.parse(await getQuizzesFromStorage()));
  console.log('notifications', JSON.parse(await getNotificationsFromStorage()));
}

export async function clearStorage() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY) && AsyncStorage.removeItem(QUIZZES_STORAGE_KEY);
}

export async function setDecksItem(item) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(item));
}

export async function setNotificationItem(item) {
  return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(item));
}

export async function getDecksFromStorage() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export async function getQuizzesFromStorage() {
  return AsyncStorage.getItem(QUIZZES_STORAGE_KEY);
}

export async function getNotificationsFromStorage() {
  return AsyncStorage.getItem(NOTIFICATION_KEY);
}

export async function removeNotificationKey() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY);
}

export async function addDeckToStorgage(name) {
  const decks = JSON.parse(await getDecksFromStorage());
  const deck = {
    [name]: {
      title: name,
      questions: [],
    },
  };

  if (typeof (decks) === 'object') { await setDecksItem({ ...decks, ...deck }); }
  else { await setDecksItem(deck); }
  return deck;
}

export async function addQuestion(deck, question, answer) {
  const card = {
    question,
    answer,
  };

  const decks = JSON.parse(await getDecksFromStorage());
  if (deck in decks) {
    return setDecksItem({
      ...decks,
      [deck]: {
        ...decks[deck],
        questions: decks[deck].questions.concat(card),
      },
    });
  }
  throw new Error('Unable to add card to deck');
}

export async function removeDeckFromStorage(name) {
  const decks = JSON.parse(await getDecksFromStorage());
  delete decks[name];
  await setDecksItem(decks);
}
