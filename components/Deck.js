import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addQuizToDeck, addQuizToQuizes } from '../store/actions';

class Deck extends React.Component {
  startQuizHandler = async () => {
    const {onCreateQuiz, onAddQuizToQuizes, questions, params: { title }, navigation } = this.props;
    onCreateQuiz(title).then((quizId) => {
      onAddQuizToQuizes(quizId, title, questions).then((quiz) => {
        navigation.navigate('Quiz', { ...quiz });
      });
    });
  };

  render() {
    const { params, questions, navigation } = this.props;
    return (
      <View>
        <Text>Deck</Text>
        <Text>{params.title}</Text>
        <Text>{`${questions.length} cards`}</Text>
        <Button title="Add Card" onPress={() => navigation.navigate('AddCard', { ...params })} />
        <Button title="Start Quiz" onPress={this.startQuizHandler} />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, props) => {
  const { navigation, route: { params } } = props;
  const { questions } = decks[params.title];
  return {
    navigation,
    params,
    questions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCreateQuiz: (title) => { return dispatch(addQuizToDeck(title)); },
  onAddQuizToQuizes: (id, title, questions) => { return dispatch(addQuizToQuizes(id, title, questions)); },
});

Deck.propTypes = {
  params: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  onCreateQuiz: PropTypes.func.isRequired,
  onAddQuizToQuizes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
