import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCard } from '../store/actions';

function AddCard(props) {
  const [state, setState] = useState({ question: '', answer: '' });
  const { title } = props.route.params;

  function questionInputHandler(question) {
    setState({ ...state, question });
  }

  function answerInputHandler(answer) {
    setState({ ...state, answer });
  }

  async function addCardHandler(deck, question, answer) {
    const { dispatch, navigation, route } = props;
    await dispatch(createCard(deck, question, answer));
    navigation.navigate('Deck', { ...route.params });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Question"
        value={state.question}
        onChangeText={questionInputHandler} />
      <TextInput
        style={styles.textInput}
        placeholder="Answer"
        value={state.answer}
        onChangeText={answerInputHandler} />
      <Button title="Add Card" onPress={async () => addCardHandler(title, state.question, state.answer)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  textInput: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

AddCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect()(AddCard);

