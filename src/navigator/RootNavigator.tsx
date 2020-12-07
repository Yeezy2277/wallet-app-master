import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAuth } from '../setup-kit/useAuth'
import { SetPin as SetPinScreen } from '../screens/Auth/SetPin'
import { CheckPin as CheckPinScreen } from '../screens/Auth/CheckPin'

import { AuthStackScreen } from './AuthStack'
import { TabNavigator } from './TabNavigator'

const RootNavigator: React.FC = () => {
  const { auth } = useAuth()

  if (!auth) {
    return <AuthStackScreen />
  }
  const { isAuthenticated, pin, pinChecked } = auth

  if (!isAuthenticated) {
    return <AuthStackScreen />
  }

  if (!pin) {
    return (
      <SafeAreaProvider>
        <SetPinScreen />
      </SafeAreaProvider>
    )
  }

  if (!pinChecked) {
    return (
      <SafeAreaProvider>
        <CheckPinScreen />
      </SafeAreaProvider>
    )
  }

  return isAuthenticated ? <TabNavigator /> : <AuthStackScreen />
}
export { RootNavigator }
