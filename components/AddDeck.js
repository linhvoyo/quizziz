import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { createDeck } from '../store/actions';

export default function AddDeck(props) {
  const [textInput, setTextInput] = useState('');

  const textInputHandler = (value) => { setTextInput(value); };

  const createDeckHandler = () => {
    const { store, navigation } = props;
    store.dispatch(createDeck(textInput));
    navigation.navigate('Home');
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
    padding: 20,
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
