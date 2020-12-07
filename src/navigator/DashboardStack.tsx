import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import { useAppLocales } from '../setup-kit/locales'
import { Dashboard as DashboardScreen } from '../screens/Dashboard'
import {
  Account as AccountScreen,
  Coins as CoinsScreen,
  NewTransaction as NewTransactionScreen,
  Structure as StructureScreen,
  TransactionDetails as TransactionDetailsScreen,
  TransactionDone as TransactionDoneScreen,
} from '../screens/Dashboard/screens'
import { ROUTES } from '../setup-kit/constants'
import { StyleGuide, boarderlessHeader } from '../StyleGuide'
import { navigationOptions as accountNavigationOptions } from '../screens/Dashboard/screens/Account'
import { navigationOptions as newTransactionNavigationOptions } from '../screens/Dashboard/screens/NewTransaction'
import { navigationOptions as structureNavigationOptions } from '../screens/Dashboard/screens/Structure'
import {
  Support as SupportScreen,
  navigationOptions as supportNavigationOptions,
} from '../screens/Settings/screens/Support'
import { TransactionServerSide } from '../setup-kit/interfaces'

export type DashboardStackParamsList = {
  [ROUTES.Dashboard]: undefined
  [ROUTES.Account]: undefined
  [ROUTES.Structure]: undefined
  [ROUTES.Transaction]: undefined
  [ROUTES.Coins]: undefined
  [ROUTES.Support]: undefined
  [ROUTES.TransactionDetails]: { transaction: TransactionServerSide }
  [ROUTES.TransactionSuccess]: { amount: string }
}
const DashboardStack = createStackNavigator<DashboardStackParamsList>()

function DashboardStackScreen() {
  const { STRINGS } = useAppLocales()
  return (
    <DashboardStack.Navigator screenOptions={{ ...boarderlessHeader }}>
      <DashboardStack.Screen
        name={ROUTES.Dashboard}
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
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
      <DashboardStack.Screen
        name={ROUTES.Account}
        component={AccountScreen}
        options={{
          ...accountNavigationOptions,
          headerTitleAlign: 'center',
          headerTitle: STRINGS.home.account,
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <DashboardStack.Screen
        name={ROUTES.Structure}
        component={StructureScreen}
        options={{
          ...structureNavigationOptions,
          headerTitleAlign: 'center',
          headerTitle: STRINGS.structure.title,
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <DashboardStack.Screen
        name={ROUTES.Transaction}
        component={NewTransactionScreen}
        options={{
          ...newTransactionNavigationOptions,
          headerTitleAlign: 'center',
          headerTitle: STRINGS.transaction.title,
          headerStyle: {
            backgroundColor: StyleGuide.colors.background,
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <DashboardStack.Screen
        name={ROUTES.TransactionSuccess}
        component={TransactionDoneScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <DashboardStack.Screen
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
      <DashboardStack.Screen
        name={ROUTES.Coins}
        component={CoinsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </DashboardStack.Navigator>
  )
}

export { DashboardStackScreen }
