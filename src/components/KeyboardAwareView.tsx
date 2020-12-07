import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
})

/* eslint-disable @typescript-eslint/no-explicit-any */
const KeyboardAwareView: React.FC<any> = ({ children }: React.PropsWithChildren<any>) => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.fullScreen}>
        {children}
      </KeyboardAvoidingView>
    )
  }
  return children
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export { KeyboardAwareView }
