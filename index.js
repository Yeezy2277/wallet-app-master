/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import { App } from './App'
import { name as appName } from './app.json'

/* eslint-disable no-console */
console.disableYellowBox = true

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!')
  console.log(remoteMessage)
})
/* eslint-enable no-console */

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }
  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
