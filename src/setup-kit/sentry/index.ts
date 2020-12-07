import * as Sentry from '@sentry/react-native'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

const captureError = (e: any) => {
  if (!__DEV__) {
    Sentry.captureException(e)
  } else {
    console.warn(e)
  }
}

const captureMessage = (data: any) => {
  const message = JSON.stringify(data)
  Sentry.captureMessage(message)
}

export { captureError, captureMessage }
