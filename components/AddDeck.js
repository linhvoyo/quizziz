import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addDeck } from '../utils/helpers';


class AddDeck extends React.Component {
  state = {
    textInput: '',
  }

  textInputHandler = (textInput) => {
    this.setState({ textInput });
  }

  createDeckHandler = async (name) => {
    await addDeck(name);
  };

  render() {
    const { textInput } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter deck name"
          onChangeText={this.textInputHandler}
          value={textInput}
        />
        <Button title="Create deck" onPress={() => this.createDeckHandler(textInput)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default AddDeck;
