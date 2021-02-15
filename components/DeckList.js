import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.deckTitle}>Flashcards</Text>
        <FlatList
          data={decks}
          renderItem={(item) => <DeckCard item={item} onDeckClick={this.navigateToDeckHandler} />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
});

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

