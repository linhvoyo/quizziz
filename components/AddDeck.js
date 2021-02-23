import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import { createDeck } from '../store/actions';

export default function AddDeck(props) {
  const [textInput, setTextInput] = useState('');

  const textInputHandler = (value) => { setTextInput(value); };

  const getDecks = () => {
    return props.store.getState();
  };

  const isError = (value) => {
    if (!value) return 'Name can not be blank';
    if (Object.keys(getDecks()).includes(value)) return 'Name already exists';
    return false;
  };

  const createDeckHandler = async () => {
    const { store, navigation } = props;
    const error = isError(textInput);
    if (error) return Alert.alert('Unable to create deck', error);
    const deck = (await store.dispatch(createDeck(textInput)))[textInput];
    setTextInput('');
    navigation.navigate('Deck', deck);
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
      <Button title="Create Deck" onPress={createDeckHandler} />
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
