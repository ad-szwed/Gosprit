# Gosprit v1.0 - the chat app

Built with React Native and developed using Expo.

The chat interface functionality is created with the [Gifted Chat](https://www.npmjs.com/package/react-native-gifted-chat). 
Chat conversations are stored in (Firebase)[https://firebase.google.com] database. Also accessible if offline.

Users are able to share images (take a picture or choose from media library) once the user grants access to their local media library
and camera. Location sharing is possible, after the user grants access.

### Install dependencies

Check if you are running the latest version of [Node](https://nodejs.org/en/).

1. Install [Expo](https://expo.io/)

```
$ npm install expo-cli --global
 ```
 
2. Install dependencies 
```
$ npm install
```

3. Start expo server
```
$ expo start
```

### Mobile Device Setup
- Install the Expo app through your device's app store (iOS or Android)
- Login with expo account
- Scan the QR Code on the Metro Builder

### Device Emulator Setup
- If you would like to run the app on your machine through a simulator/emulator, you will either need
  - [Android Studio](https://docs.expo.io/workflow/android-studio-emulator/)
  - [iOS Simulator](https://docs.expo.io/workflow/ios-simulator/)

## Features
- Home page where users can enter their name and choose a background color for the chat screen
- Conversation page displaying the conversation
- Users can send images and location data 
- Datastorage online in firebase Cloud and local storage offline
