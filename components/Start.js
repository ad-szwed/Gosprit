import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import background from '../assets/bkg.png'

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      changeColor: ''
    };
  }

  render() {
    return (
      <ScrollView style={styles.main}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.background}>
          {/* TITLE */}
          <Text style={styles.title}>GOSPRIT</Text>
          {/* UI */}
          <View style={styles.uiBox}>
            <View>
              <TextInput
                style={styles.nameBox}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your name'
              />
              {/* BACKGROUND COLOR CHOICE */}
              <Text style={{ fontSize: 16, fontWeight: '300', color: '#757083', padding: 20 }}>
                Choose Background Color
              </Text>
              <View style={styles.colorChoice}>
                <TouchableOpacity
                  style={[styles.colors, styles.colorOne]}
                  onPress={() => this.setState({ changeColor: '#090C08' })}
                />
                <TouchableOpacity
                  style={[styles.colors, styles.colorTwo]}
                  onPress={() => this.setState({ changeColor: '#474056' })}
                />
                <TouchableOpacity
                  style={[styles.colors, styles.colorThree]}
                  onPress={() => this.setState({ changeColor: '#8A95A5' })}
                />
                <TouchableOpacity
                  style={[styles.colors, styles.colorFour]}
                  onPress={() => this.setState({ changeColor: '#B9C6AE' })}
                />
                <TouchableOpacity
                  style={styles.colorFive}
                  onPress={() => this.setState({ changeColor: '#FFFFFF' })}
                />
              </View>
            </View>
            {/* START CHATTING "BUTTON" */}
            <TouchableOpacity
              style={styles.startChat}
              onPress={() => this.props.navigation.navigate('Chat', {
                name: this.state.name,
                changeColor: this.state.changeColor
              })}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    )
  }
}

// styles outside the class component
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Roboto'
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    paddingTop: 100,
    paddingBottom: 200,
    fontSize: 45,
    color: '#FFFFFF'
  },
  uiBox: {
    backgroundColor: '#FFFFFF',
    width: '88%',
    height: '44%',
    padding: '5%',
    alignItems: 'center',
  },
  nameBox: {
    height: 40,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 2,
    fontSize: 16,
    fontWeight: "300",
    color: '#757083',
    width: 320,
    paddingLeft: 15,
    backgroundColor: 'white'
  },
  // background color choice:
  colorChoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 20
  },
  colors: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    opacity: 2,
  },
  colorOne: {
    backgroundColor: '#090C08',
  },

  colorTwo: {
    backgroundColor: '#474056',
  },

  colorThree: {
    backgroundColor: '#8A95A5',
  },

  colorFour: {
    backgroundColor: '#B9C6AE',
  },
  startChat: {
    backgroundColor: '#757083',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  }
});