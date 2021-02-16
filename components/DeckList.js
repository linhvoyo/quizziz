import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    const { decks } = this.props;

    const addIcon =  <MaterialCommunityIcons name="card-plus-outline" size={24} color="black" />;
    return (
      <View style={styles.container}>
        {decks.length ? <FlatList
          data={decks}
          renderItem={(item) => <DeckCard item={item} onDeckClick={this.navigateToDeckHandler} />}
          keyExtractor={item => item.title}
        />
          : (
            <View style={styles.container}>
              <Text style={styles.welcomeText}>Welcome to Quizziz!</Text>
              <View style={styles.deckEmpty}>
                <Text style={styles.deckEmptyText}>No deck found in list.</Text>
                <Text style={styles.deckEmptyText}>
                  Navigate to "{addIcon} Add" to create deck</Text>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f1fa',
  },
  deckEmpty: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  deckEmptyText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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

