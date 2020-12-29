import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'

import { useAppLocales } from '../setup-kit/locales'

import { Settings as SettingsScreen } from '../screens/Settings'
import {
  Support as SupportScreen,
  navigationOptions as supportNavigationOptions,
} from '../screens/Settings/screens/Support'
import { ROUTES } from '../setup-kit/constants'
import { StyleGuide, boarderlessHeader } from '../StyleGuide'
import { PinCode } from '../screens/Settings/screens/PinCode'

export type SettingsStackParamsList = {
  [ROUTES.Settings]: undefined
  [ROUTES.Support]: undefined
  [ROUTES.PinCode]: undefined
}
const SettingsStack = createStackNavigator<SettingsStackParamsList>()

function SettingsStackScreen() {
  const { STRINGS } = useAppLocales()
  return (
    <SettingsStack.Navigator screenOptions={{ ...boarderlessHeader }}>
      <SettingsStack.Screen
        name={ROUTES.Settings}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingsStack.Screen
        name={ROUTES.Support}
        component={SupportScreen}
        options={{
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          headerTitle: STRINGS.support.title,
          ...supportNavigationOptions,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <SettingsStack.Screen
        name={ROUTES.PinCode}
        component={PinCode}
        options={{
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          headerTitle: STRINGS.pinCode.title,
          ...supportNavigationOptions,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </SettingsStack.Navigator>
  )
}

export { SettingsStackScreen }
