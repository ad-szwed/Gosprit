import React from 'react';
import { View, Text, Button, TextInput, ImageBackground } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to GOSPRIT</Text>
        <TextInput
          style={{ height: 40, borderColor: 'black', borderWidth: 2, padding: 10 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder='Type your name'
        />
        <Button
          title="Start chattin'"
          onPress={() => this.props.navigation.navigate('Chat')}
        />
      </View>
    )
  }
}

// styles outside the class component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#151617",
    alignItems: "center",
    justifyContent: "space-between",
  }
});