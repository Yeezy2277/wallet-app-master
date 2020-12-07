/* eslint-disable no-console */
import React from 'react'
import { Platform } from 'react-native'
import { getUniqueId } from 'react-native-device-info'

import { FirebaseMessagingTypes, messaging } from '../firebase'
import { captureError } from '../sentry'
import { notify } from '../../utils'
import { api } from '../api'

const deviceId = getUniqueId()
const platform = Platform.OS

const FCMService = () => {
  const saveTokenToDatabase = async (fcmToken: string) => {
    console.log({ fcmToken })
    try {
      await api.postFcmToken({
        fcmToken,
        platform,
        deviceId,
      })
    } catch (e) {
      captureError(`await api.postFcmToken() ${JSON.stringify(e)}`)
    }
  }

  const registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().setAutoInitEnabled(true)
    }
  }

  React.useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        await registerAppWithFCM()
        const permission = await messaging().requestPermission({
          alert: true,
          badge: true,
          sound: true,
        })
        const isGranted = permission === 1
        if (isGranted) {
          const fcmToken = await messaging().getToken()
          saveTokenToDatabase(fcmToken)
        }
      } catch (e) {
        captureError(`await api.getToken ${JSON.stringify(e)}`)
      }
    }

    registerForPushNotificationsAsync()

    const unsubscribe = messaging().onTokenRefresh((token: string) => {
      saveTokenToDatabase(token)
    })

    return unsubscribe
  }, [])

  const parseNotification = (
    msg: FirebaseMessagingTypes.RemoteMessage
  ): { title: string; body: string } => {
    const { notification = { title: '', body: '' } } = msg
    const { title = '', body = '' } = notification
    if (!!title && !!body) {
      return { title, body }
    }
    if (!msg.data) {
      return { title: '', body: '' }
    }
    const notif = msg.data.notification as FirebaseMessagingTypes.Notification
    const { title: t = '', body: b = '' } = notif || {}
    return { title: t, body: b }
  }

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { title, body } = parseNotification(remoteMessage)
      if (!!title && !!body) {
        notify({
          message: title,
          description: body,
          autoHide: true,
          floating: true,
          backgroundColor: '#757575',
        })
      }
    })

    return unsubscribe
  }, [])

  React.useEffect(() => {
    // When the application is running, but in the background
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:'
      )
      console.log(remoteMessage)
    })

    return unsubscribe
  }, [])

  React.useEffect(() => {
    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to open from quit state:'
        )
        console.log(remoteMessage)
      })
  }, [])

  return null
}

export { FCMService }
