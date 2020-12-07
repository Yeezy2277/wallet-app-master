import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'

import { Auth as AuthScreen } from '../screens/Auth/Auth'
import { SetPin as SetPinScreen } from '../screens/Auth/SetPin'
import { TwoFA as TwoFAScreen } from '../screens/Auth/2FA'
import { ROUTES } from '../setup-kit/constants'
import { boarderlessHeader } from '../StyleGuide'

export type AuthStackParamsList = {
  [ROUTES.Auth]: undefined
  [ROUTES.TWOFA]: { email: string; password: string }
  [ROUTES.SetLocalAuth]: undefined
  [ROUTES.CheckLocalAuth]: undefined
}

const AuthStack = createStackNavigator<AuthStackParamsList>()

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ ...boarderlessHeader }}>
      <AuthStack.Screen
        name={ROUTES.Auth}
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={ROUTES.SetLocalAuth}
        component={SetPinScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <AuthStack.Screen
        name={ROUTES.TWOFA}
        component={TwoFAScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </AuthStack.Navigator>
  )
}

export { AuthStackScreen }
