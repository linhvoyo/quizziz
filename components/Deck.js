import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Deck extends React.Component {
  state = {
    mode: '',
    order: '',
    current: '',
    correct: '',
  };

  render() {
    const { params, questions, navigation } = this.props;
    return (
      <View>
        <Text>Deck</Text>
        <Text>{params.title}</Text>
        <Text>{`${questions.length} cards`}</Text>
        <Button title="Add Card" onPress={() => navigation.navigate('AddCard', { ...params })} />
        <Button title="Start Quiz" />
      </View>
    );
  }
}

const mapStateToProps = ({decks}, props) => {
  const { navigation, route: { params } } = props;
  const { questions } = decks[params.title];
  return {
    navigation,
    params,
    questions,
  };
};

Deck.propTypes = {
  params: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Deck);
