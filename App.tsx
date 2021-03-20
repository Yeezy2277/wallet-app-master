import React from 'react'
import { View as RNView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Theme } from '@react-navigation/native/src/types'
import FlashMessage from 'react-native-flash-message'
import { ApplicationProvider, IconRegistry, useTheme } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { dark, mapping } from '@eva-design/eva'
import Video from 'react-native-video'
import { App as Application } from './src/index'
import { AppLocalesProvider } from './src/setup-kit/locales/useAppLocales'
import { StyleGuide } from './src/StyleGuide'

/* eslint-disable @typescript-eslint/no-var-requires */
const customMapping = require('./src/setup-kit/ui/custom-mapping.json')
const customTheme = require('./src/setup-kit/ui/custom-theme.json')
/* eslint-enable @typescript-eslint/no-var-requires */

const theme = { ...dark, ...customTheme }

const StyledApp: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={customMapping}>
      {children}
    </ApplicationProvider>
  )
}

function AppNavigation() {
  const uiKittenTheme = useTheme()

  const navigationTheme = React.useMemo(() => {
    const t: Theme = {
      dark: true,
      colors: {
        notification: uiKittenTheme['text-basic-color'],
        primary: uiKittenTheme['text-basic-color'],
        background: '#141B23',
        card: StyleGuide.colors.backgroundLevel2,
        text: uiKittenTheme['text-basic-color'],
        border: uiKittenTheme['border-basic-color-4'],
      },
    }
    return t
  }, [uiKittenTheme])
  return (
    <NavigationContainer theme={navigationTheme}>
      <Application />
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <RNView style={{ flex: 1, backgroundColor: StyleGuide.colors.background }}>
      <AppLocalesProvider>
        <IconRegistry icons={EvaIconsPack} />
        <StyledApp>
          <AppNavigation />
          <FlashMessage position="top" />
        </StyledApp>
      </AppLocalesProvider>
    </RNView>
  )
}

export { App }
