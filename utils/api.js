import AsyncStorage from '@react-native-async-storage/async-storage';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';
const QUIZZES_STORAGE_KEY = 'MobileFlashcards:quizzes';

export async function printStorage() {
  console.log('decks', JSON.parse(await getDecksFromStorage()));
  console.log('quizzes', JSON.parse(await getQuizzesFromStorage()));
}

export async function clearStorage() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY) && AsyncStorage.removeItem(QUIZZES_STORAGE_KEY);
}

export async function setDecksItem(item) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(item));
}

export async function getDecksFromStorage() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export async function getQuizzesFromStorage() {
  return AsyncStorage.getItem(QUIZZES_STORAGE_KEY);
}

export async function addDeckToStorgage(name) {
  const decks = JSON.parse(await getDecksFromStorage());
  const deck = {
    [name]: {
      title: name,
      questions: [],
      quizes: [],
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

export async function updateDecks(decks) {
  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export async function updateQuizzes(quizzes) {
  if (!JSON.parse(await getQuizzesFromStorage())) await AsyncStorage.setItem(QUIZZES_STORAGE_KEY, JSON.stringify({}));
  await AsyncStorage.mergeItem(QUIZZES_STORAGE_KEY, JSON.stringify(quizzes));
}
