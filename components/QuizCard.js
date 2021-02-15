import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';


export default function QuizCard(props) {
  const { title, content, onAnswered, answer } = props;

  const icon = <AntDesign name="check" size={24} />;

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Text style={styles.text}>{content}</Text>
      {!onAnswered ? null
        : (
          <View style={styles.controls}>
            <Button
              style={styles.ctrlBtn}
              buttonStyle={styles.correct}
              titleStyle={styles.correctTitle}
              type="outline"
              title="Correct"
              icon={answer ? icon : null}
              raised={answer}
              onPress={() => onAnswered(true)}
            />
            <Button
              style={styles.ctrlBtn}
              buttonStyle={styles.incorrect}
              titleStyle={styles.incorrectTitle}
              type="outline"
              title="Incorrect"
              icon={answer === false ? icon : null}
              raised={!!(answer === false)}
              onPress={() => onAnswered(false)}
            />
          </View>
        )
      }
    </Card>
  );
}

export function QuizSummary(props) {
  const { stats } = props;
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Summary</Card.Title>
      <Text style={styles.text}>{JSON.stringify(stats)}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: 360,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
  controls: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  ctrlBtn: {
    width: 150,
    borderRadius: 10,
  },
  correct: {
    borderColor: 'green',
  },
  correctTitle: {
    color: 'green',
  },
  incorrect: {
    borderColor: 'red',
  },
  incorrectTitle: {
    color: 'red',
  },
});

QuizCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onAnswered: PropTypes.func,
  answer: PropTypes.bool,
};

QuizSummary.propTypes = {
  stats: PropTypes.shape({
    correct: PropTypes.number.isRequired,
    incorrect: PropTypes.number.isRequired,
  }),
}