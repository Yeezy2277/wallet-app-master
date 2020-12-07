import React from 'react'
import { Keyboard, KeyboardEventName, Platform } from 'react-native'

const listeners = {
  ios: ['keyboardWillShow' as KeyboardEventName, 'keyboardWillHide' as KeyboardEventName],
  android: ['keyboardDidShow' as KeyboardEventName, 'keyboardDidHide' as KeyboardEventName],
}

const useKeyboard = (): { keyboardOpened: boolean } => {
  const [keyboardOpened, setOpened] = React.useState(false)

  const show = () => {
    setOpened(true)
  }

  const hide = () => {
    setOpened(false)
  }

  React.useEffect(() => {
    const subsc = Keyboard.addListener(
      Platform.OS === 'ios' ? listeners.ios[0] : listeners.android[0],
      show
    )
    return () => {
      subsc.remove()
    }
  }, [])

  React.useEffect(() => {
    const subsc = Keyboard.addListener(
      Platform.OS === 'ios' ? listeners.ios[1] : listeners.android[1],
      hide
    )
    return () => {
      subsc.remove()
    }
  }, [])
  return { keyboardOpened }
}

export { useKeyboard }
