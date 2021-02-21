import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import { createDeck } from '../store/actions';

export default function AddDeck(props) {
  const [textInput, setTextInput] = useState('');

  const textInputHandler = (value) => { setTextInput(value); };

  const getDecks = () => {
    const { decks } = props.store.getState();
    return Object.keys(decks);
  };

  const isError = (value) => {
    if (!value) return 'String is empty';
    if (getDecks().includes(value)) return 'Name already exists';
    return false;
  };

  const createDeckHandler = () => {
    const { store, navigation } = props;
    const error = isError(textInput);
    if (error) return Alert.alert('Unable to create deck', error);
    store.dispatch(createDeck(textInput));
    setTextInput('');
    navigation.navigate('Flashcards');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter deck name"
        onChangeText={(text) => textInputHandler(text)}
        value={textInput}
        blurOnSubmit={true}
      />
      <Button title="Create deck" onPress={createDeckHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  },
  textInput: {
    height: 50,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

AddDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
