import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Layout as View } from '@ui-kitten/components'
import { hapticsFeedback } from './haptics'
import { getCurrentTs, parseDate } from './time'
import { getExpireTsFromToken } from './strings'
import { notify } from './notifier'

const isProd = process.env.NODE_ENV === 'production'

const hitSlop = { top: 20, left: 20, bottom: 20, right: 20 }

export const PendingState = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
      }}
    >
      <ActivityIndicator color="#fff" />
    </View>
  )
}

/* eslint-disable @typescript-eslint/no-empty-function */
const noop = () => {}
/* eslint-enable @typescript-eslint/no-empty-function */

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = React.useRef<() => void>(noop)

  // Remember the latest callback
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval

  useFocusEffect(
    React.useCallback(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        const id = setInterval(tick, delay)
        return () => {
          clearInterval(id)
        }
      }
      return noop
    }, [delay])
  )
}

export {
  hapticsFeedback,
  hitSlop,
  isProd,
  noop,
  getCurrentTs,
  parseDate,
  useInterval,
  sleep,
  notify,
  getExpireTsFromToken,
}
