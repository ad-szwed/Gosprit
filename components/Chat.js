import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
//firebase 
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    }

    // settings for firebase, if it's not initialized
    const firebaseConfig = {
      apiKey: "AIzaSyAhC1-cr8E4iOHK620kIzENht6uuRD4faQ",
      authDomain: "gosprit-43f16.firebaseapp.com",
      projectId: "gosprit-43f16",
      storageBucket: "gosprit-43f16.appspot.com",
      messagingSenderId: "915207361868",
      appId: "1:915207361868:web:8079e28844320c01ce2be9",
      measurementId: "G-5VRKB5GEW2"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    };

    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // import name from Start
    const { name } = this.props.route.params
    this.props.navigation.setOptions({ title: name });

    // Reference to load messages via Firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");

    // Authenticates user via Firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      this.setState({
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        messages: [],
      });

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }

  // collects data in database in real-time
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  // Adds messages to cloud storage
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // event handler for sending messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      // save previous chat log
      () => {
        this.addMessage();
      }
    );
  }

  // message bubble color 
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