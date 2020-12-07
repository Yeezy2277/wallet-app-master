import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import DeviceInfo from 'react-native-device-info'
import { useAppLocales } from '../setup-kit/locales'

import { ROUTES } from '../setup-kit/constants'
import { StyleGuide } from '../StyleGuide'
import { bottomTabsRoutesMapping } from './routeMapper'

import { DashboardStackScreen } from './DashboardStack'
import { HistoryStackScreen } from './HistoryStack'
import { MiningStackScreen } from './MiningStack'
import { SettingsStackScreen } from './SettingsStack'

const notched = DeviceInfo.hasNotch()

export type TabParamsList = {
  [ROUTES.DashboardTab]: undefined
  [ROUTES.HistoryTab]: undefined
  [ROUTES.MiningTab]: undefined
  [ROUTES.SettingsTab]: { screen: ROUTES }
}

const Tab = createBottomTabNavigator<TabParamsList>()

function TabNavigator() {
  const { locale } = useAppLocales()

  React.useEffect(() => {
    const bgColor = StyleGuide.colors.backgroundLevel2
    const isDark = true
    const animated = true
    changeNavigationBarColor(bgColor, isDark, animated)
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }: { focused: boolean; color: string; size: number }) => {
          const { Icon, name } = bottomTabsRoutesMapping[route.name]
          return (
            <View
              style={{
                marginTop: notched ? 12 : 0,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: focused ? 1 : 0.5,
                backgroundColor: 'tranaparent',
              }}
            >
              <Icon />
              <Text
                style={{
                  fontSize: 11,
                  lineHeight: 13,
                  marginTop: notched ? 12 : 4,
                }}
              >
                {name[locale]}
              </Text>
            </View>
          )
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        labelStyle: {
          ...StyleGuide.fonts.textPrimary,
          ...StyleGuide.fonts.textBold,
          fontSize: 12,
        },
        style: {
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name={ROUTES.DashboardTab} component={DashboardStackScreen} />
      <Tab.Screen name={ROUTES.MiningTab} component={MiningStackScreen} />
      <Tab.Screen name={ROUTES.HistoryTab} component={HistoryStackScreen} />
      <Tab.Screen name={ROUTES.SettingsTab} component={SettingsStackScreen} />
    </Tab.Navigator>
  )
}

export { TabNavigator }
