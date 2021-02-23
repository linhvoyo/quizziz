import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { addQuizToDeck, addQuizToQuizes } from '../store/actions';


class Deck extends React.Component {
  startQuizHandler = () => {
    const { navigation, params, questions } = this.props;
    const answers = new Array(params.questions.length).fill(null);
    navigation.navigate('Quiz', { title: params.title, questions, answers });
  };

  render() {
    const { params, questions, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/undraw_Taking_notes_re_bnaf.png')} />
        </View>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.cardCount}>{`${questions.length} cards`}</Text>
        <Button
          containerStyle={styles.button}
          title="Add Card"
          type="outline"
          onPress={() => navigation.navigate('AddCard', { ...params })} />
        <Button
          containerStyle={styles.button}
          title="Start Quiz"
          disabled={!questions.length}
          onPress={this.startQuizHandler} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 40,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  cardCount: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  button: {
    width: 200,
    alignSelf: 'center',
    margin: 5,
  },
};

const mapStateToProps = (state, props) => {
  const { navigation, route: { params } } = props;
  const { questions } = state[params.title];
  return {
    navigation,
    params,
    questions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCreateQuiz: (title) => { return dispatch(addQuizToDeck(title)); },
  onAddQuizToQuizes: (id, title, questions) => { return dispatch(addQuizToQuizes(id, title, questions)); },
});

Deck.propTypes = {
  params: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  onCreateQuiz: PropTypes.func.isRequired,
  onAddQuizToQuizes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
