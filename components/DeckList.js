import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchEntries } from '../store/actions';


class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEntries());
  }

  render() {
    const { decks } = this.props;
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

const mapStateToProps = (state) => {
  return {
    decks: Object.keys(state).map((deck) => state[deck]),
  };
};

export default connect(mapStateToProps)(DeckList);

