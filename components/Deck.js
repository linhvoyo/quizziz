import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {createQuiz } from '../store/actions';

class Deck extends React.Component {
  startQuizHandler = async () => {
    const { onCreateQuiz, params: { title } } = this.props;
    const quizId = await onCreateQuiz(title);
    console.log('quizId', quizId);
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
  onCreateQuiz: (title) => { return dispatch(createQuiz(title)); },
});

Deck.propTypes = {
  params: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  onCreateQuiz: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
