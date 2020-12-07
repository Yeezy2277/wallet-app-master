import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import { useAppLocales } from '../setup-kit/locales'
import { TransactionDetails as TransactionDetailsScreen } from '../screens/Dashboard/screens'
import { History as HistoryScreen } from '../screens/History'
import { Filter as FilterScreen } from '../screens/History/screens'

import { ROUTES } from '../setup-kit/constants'
import { StyleGuide, boarderlessHeader } from '../StyleGuide'
import { TransactionServerSide } from '../setup-kit/interfaces'

export type HistoryStackParamsList = {
  [ROUTES.History]: undefined
  [ROUTES.Filter]: undefined
  [ROUTES.TransactionDetails]: { transaction: TransactionServerSide }
}
const HistoryStack = createStackNavigator<HistoryStackParamsList>()

function HistoryStackScreen() {
  const { STRINGS } = useAppLocales()
  return (
    <HistoryStack.Navigator screenOptions={{ ...boarderlessHeader }}>
      <HistoryStack.Screen
        name={ROUTES.History}
        component={HistoryScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <HistoryStack.Screen
        name={ROUTES.Filter}
        component={FilterScreen}
        options={{
          headerTitle: STRINGS.filters.title,
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <HistoryStack.Screen
        name={ROUTES.TransactionDetails}
        component={TransactionDetailsScreen}
        options={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: StyleGuide.colors.white,
          headerTitle: STRINGS.transactionDetails.title,
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </HistoryStack.Navigator>
  )
}

export { HistoryStackScreen }
