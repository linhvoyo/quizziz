import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
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
    if (!question && !answer) return Alert.alert('Unable to create card, Fields are empty');
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
      <Button containerStyle={styles.button} title="Add Card" onPress={async () => addCardHandler(title, state.question, state.answer)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  textInput: {
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
});

AddCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default connect()(AddCard);

