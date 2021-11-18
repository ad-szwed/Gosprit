import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
const firebase = require('firebase/app').default;
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name, // Initialise state with name received as props from navigate method in Start screen
      colour: this.props.route.params.colour, // Initialise state with colour received as props from navigate method in Start screen
      messages: [], // Set initial messages state to empty array. Data then fetched within componentDidMount()
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      loggedInText: 'Logging in...'
    };
    if (!firebase.apps.length) {
      firebase.initializeApp({ // Initialise the app by passing the config object provided by Firebase to the initialize app function
        apiKey: "AIzaSyAhC1-cr8E4iOHK620kIzENht6uuRD4faQ",
        authDomain: "gosprit-43f16.firebaseapp.com",
        projectId: "gosprit-43f16",
        storageBucket: "gosprit-43f16.appspot.com",
        messagingSenderId: "915207361868",
        appId: "1:915207361868:web:8079e28844320c01ce2be9",
        measurementId: "G-5VRKB5GEW2"
      });
    }
    this.messagesCollection = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.state.name }); // Setting the header text shown on the screen
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      };
      this.setState({
        uid: user.uid,
        user: {
          _id: user.uid,
          name: this.state.name,
          avatar: 'https://placeimg.com/140/140/any'
        },
        loggedInText: 'Welcome',
      });
      this.unsubscribeMessagesCollection = this.messagesCollection.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
    });
  }

  onCollectionUpdate = (querySnapshot) => { // when the database is updated set the messages state with the current data from the snapshot
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }
      });
    });
    this.setState({
      messages: messages
    });
  };

  onSend(newMessage = []) {
    this.addMessage(newMessage)
  }

  addMessage(newMessage) {
    const latestMessage = newMessage[0];
    // Adding a new message to the messages collection
    this.messagesCollection.add({
      _id: latestMessage._id,
      text: latestMessage.text,
      createdAt: latestMessage.createdAt,
      user: latestMessage.user
    });
  }

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

  componentWillUnmount() {
    this.authUnsubscribe();
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