import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeckCard from './DeckCard';

import { fetchEntries } from '../store/actions';


class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEntries());
  }

  navigateToDeckHandler = (deck) => {
    const { navigation } = this.props;
    navigation.navigate('Deck', {...deck});
  };

  render() {
    const { decks } = this.props;
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

DeckList.propTypes = {
  decks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(DeckList);

