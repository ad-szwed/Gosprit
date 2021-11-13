import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // displaying name chosen in the start screen in the top navigation bar
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // initial message receieved
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hello ${name}, I've been expecting you`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        // system message (Gifted Chat)
        {
          _id: 2,
          text: `Behold! ${name} is here`,
          createdAt: new Date(),
          system: true,
        },
      ]
    })

  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  // changing the message bubble for the user
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#53366b'
          }
        }}
      />
    )

  }

  render() {


    // importing the chat background color chosen in the start screen
    let { changeColor } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: changeColor }} >
        {/* chat behavior as per Gifted Chat library */}
        <GiftedChat
          // getting the bubble from above function
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>

    );
  }
}