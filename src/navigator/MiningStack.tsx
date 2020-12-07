import React from 'react'

import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'

import { useAppLocales } from '../setup-kit/locales'

import { Mining as MiningScreen } from '../screens/Mining'

import { ROUTES } from '../setup-kit/constants'
import { StyleGuide, boarderlessHeader } from '../StyleGuide'
import { Reinvest as ReinvestScreen, Rules as RulesScreen } from '../screens/Mining/screens'
import { navigationOptions as rulesNavigationOptions } from '../screens/Mining/screens/Rules'
import { navigationOptions as reinvestNavigationOptions } from '../screens/Mining/screens/Reinvest'

export type MiningStackParamsList = {
  [ROUTES.Mining]: undefined
  [ROUTES.Reinvest]: undefined
  [ROUTES.Rules]: undefined
}
const MiningStack = createStackNavigator<MiningStackParamsList>()

function MiningStackScreen() {
  const { STRINGS } = useAppLocales()
  return (
    <MiningStack.Navigator screenOptions={{ ...boarderlessHeader }}>
      <MiningStack.Screen
        name={ROUTES.Mining}
        component={MiningScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MiningStack.Screen
        name={ROUTES.Rules}
        component={RulesScreen}
        options={{
          ...rulesNavigationOptions,
          headerTitleAlign: 'center',
          headerTitle: STRINGS.postmining.rules,
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MiningStack.Screen
        name={ROUTES.Reinvest}
        component={ReinvestScreen}
        options={{
          ...reinvestNavigationOptions,
          headerTitleAlign: 'center',
          headerTitle: STRINGS.postmining.reinvest,
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MiningStack.Navigator>
  )
}

export { MiningStackScreen }
