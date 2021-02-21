import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';


export function FrontCard(props) {
  const { question, showAnswer, title } = props;

  return (
    <Card containerStyle={styles.card}>
      <ScrollView>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Text style={styles.text}>{question}</Text>
        <Button buttonStyle={front.showAnswer} title="Show Answer" onPress={showAnswer} />
      </ScrollView>
    </Card>
  );
}

export function BackCard(props) {
  const { answer, content, onAnswered, onNext, title } = props;

  const icon = <AntDesign name="check" size={24} />;

  return (
    <View>
      <Card containerStyle={styles.card}>
        <ScrollView>
          <View style={back.title}>
            <Card.Title style={back.titleText}>{title}</Card.Title>
            <Button title=">>>" disabled={answer === null} type="clear" onPress={onNext} />
          </View>
          <Card.Divider />
          <Text style={[styles.text, back.question]}>{content.question}?</Text>
          <Text style={[styles.text, back.answer]}>{content.answer}</Text>
          <View style={back.controls}>
            <Button
              containerStyle={back.ctrlBtn}
              buttonStyle={back.correct}
              titleStyle={back.correctTitle}
              type="outline"
              title="Correct"
              icon={answer ? icon : null}
              raised={answer}
              onPress={() => onAnswered(true)}
            />
            <Button
              containerStyle={back.ctrlBtn}
              buttonStyle={back.incorrect}
              titleStyle={back.incorrectTitle}
              type="outline"
              title="Incorrect"
              icon={answer === false ? icon : null}
              raised={!!(answer === false)}
              onPress={() => onAnswered(false)}
            />
          </View>
        </ScrollView>
      </Card >
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

const front = StyleSheet.create({
  showAnswer: {
    marginTop: 10,
    borderRadius: 10,
  },
});

const back = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    marginTop: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  answer: {
    fontSize: 15,
  },
  controls: {
    marginTop: 10,
  },
  ctrlBtn: {
    margin: 5,
  },
  correct: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
  },
  correctTitle: {
    color: 'green',
  },
  incorrect: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
  },
  incorrectTitle: {
    color: 'red',
  },
});


FrontCard.propTypes = {
  question: PropTypes.string.isRequired,
  showAnswer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

BackCard.propTypes = {
  answer: PropTypes.bool,
  content: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }),
  onAnswered: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}