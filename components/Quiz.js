import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends React.Component {
  render() {
    return (
      <View>
        <Text>Quiz</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

export default connect()(Quiz);
