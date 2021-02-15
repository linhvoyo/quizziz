import { CREATE_QUIZ } from './actionTypes';
import { updateQuizzes } from '../../utils/api';

const createQuiz = (id, quiz) => ({
  type: CREATE_QUIZ,
  quiz,
});

export const addQuizToQuizes = (id, title, questions) => {
  const quiz = {
    id,
    title,
    questions,
    answers: new Array(questions.length).fill(null),
    submitted: false,
  };

  return async (dispatch, getState) => {
    dispatch(createQuiz(id, quiz));
    return updateQuizzes(getState().quizzes).then(() => quiz);
  };
};
