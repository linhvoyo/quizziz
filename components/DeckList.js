import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getStorage } from '../utils/helpers';

class DeckList extends React.Component {
  state = {
    decks: [],
  }

  componentDidMount() {
    getStorage().then((res) => {
      const decks = JSON.parse(res);
      console.log(decks);
      this.setState({ decks: Object.keys(decks).map((deck) => decks[deck]) });
    });
  }

  render() {
    console.log('DeckList.js')
    console.log(this.state);
    console.log(this.props);
    const { decks } = this.state;
    return (
      <View>
        <Text>Deck List</Text>
        <FlatList
          data={decks}
          renderItem={(item) => <Text>{JSON.stringify(item)}</Text>}
          keyExtractor={item => item.title}
        />
        <Button
          title="Add Deck"
          onPress={() => this.props.navigation.navigate('Add')}
        />
      </View>
    );
  }
}

export default DeckList;

