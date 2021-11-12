import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Chat extends React.Component {

  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    // importing color chosen in the start screen
    let { changeColor } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: changeColor,
        }}
      >
        <Text>Chat screen</Text>
      </View>
    );
  }
}