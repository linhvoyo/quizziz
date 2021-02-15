import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createDeck } from '../store/actions';
import PropTypes from 'prop-types';

class AddDeck extends React.Component {
  state = {
    textInput: '',
  }

  textInputHandler = (textInput) => {
    this.setState({ textInput });
  }

  createDeckHandler = async (name) => {
    const { dispatch, navigation } = this.props;
    dispatch(createDeck(name));
    navigation.navigate('Home');
  };

  render() {
    const { textInput } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter deck name"
          onChangeText={this.textInputHandler}
          value={textInput}
          blurOnSubmit={true}
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
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect()(AddDeck);
