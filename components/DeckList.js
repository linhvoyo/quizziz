import React from 'react';
import { View, Text, Button } from 'react-native';

class DeckList extends React.Component {

  render() {
    return (
      <View>
        <Text>Deck List</Text>
        <Button title="Add Deck" />
      </View>
    );
  }
}

export default DeckList;

