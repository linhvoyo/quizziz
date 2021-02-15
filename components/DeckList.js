import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeckCard from './DeckCard';

import { fetchDecks } from '../store/actions';


class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDecks());
  }

  navigateToDeckHandler = (deck) => {
    const { navigation } = this.props;
    navigation.navigate('Deck', { ...deck });
  };

  render() {
    const { decks, navigation } = this.props;
    return (
      <View>
        <Text>Deck List</Text>
        <FlatList
          data={decks}
          renderItem={(item) => <DeckCard item={item} onDeckClick={this.navigateToDeckHandler}/>}
          keyExtractor={item => item.title}
        />
        <Button
          title="Add Deck"
          onPress={() => navigation.navigate('Add')}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks: Object.keys(decks).map((deck) => decks[deck]) || [],
  };
};

DeckList.propTypes = {
  decks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DeckList);

