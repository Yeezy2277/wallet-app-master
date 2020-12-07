/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import SplashScreen from 'react-native-splash-screen'
import * as Sentry from '@sentry/react-native'
import NetInfo from '@react-native-community/netinfo'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { AppStateProvider, useAppState } from './setup-kit/useAppState'
import { appStateReducer as appReducer, initialState } from './setup-kit/appReducer'
import { useAuth } from './setup-kit/useAuth'
import { useAppLocales } from './setup-kit/locales/useAppLocales'
import { RootNavigator } from './navigator'
import { defaultCoin } from './setup-kit/constants'
import { PendingState } from './utils'
import { StyleGuide } from './StyleGuide'
import { StorageKeys, getItem } from './setup-kit/storage'
import { api } from './setup-kit/api'
import { captureError } from './setup-kit/sentry'
import { Maintenance } from './screens/Maintenance/Maintenance'

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://82e207c5b4d948799c9fd6ac6e9e1313@o408807.ingest.sentry.io/5280828',
  })
}

const OfflineApplication = ({ onCheck }: { onCheck: () => void }) => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}
    >
      <Text
        style={{
          marginBottom: 12,
          textAlign: 'center',
        }}
        category="h3"
        status="danger"
      >
        Вы оффлайн
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 12 }}>
        Приложение откроется при восстановлении соединения с сетью
      </Text>
      <Button onPress={onCheck}>Проверить прямо сейчас</Button>
    </View>
  )
}

function ReadyCheck() {
  const { authAttempted } = useAuth()
  const { ready } = useAppLocales()
  const [{ activeCoin, system }, dispatch] = useAppState()

  React.useEffect(() => {
    const fetchCoinFromStorage = async () => {
      const c = await getItem<string>(StorageKeys.COIN)
      if (c) {
        dispatch({
          type: 'SELECT_COIN',
          payload: c,
        })
      } else {
        dispatch({
          type: 'SELECT_COIN',
          payload: defaultCoin,
        })
      }
    }
    const fetchSystem = async () => {
      try {
        const payload = await api.system()
        dispatch({ type: `FETCH_SYSTEM`, payload })
      } catch (e) {
        captureError(`await api.system() ${JSON.stringify(e)}`)
        const payload = { maintenance: false, usd_rate: 0.008 }
        dispatch({ type: `FETCH_SYSTEM`, payload })
      }
    }
    fetchSystem()
    fetchCoinFromStorage()
  }, [dispatch])

  const isReady = ready && authAttempted && activeCoin && system.loaded

  // eslint-disable-next-line no-nested-ternary
  return !isReady ? <PendingState /> : system.maintenance ? <Maintenance /> : <RootNavigator />
}

const StatusBarFC = () => {
  return Platform.OS === 'ios' ? (
    <StatusBar barStyle="light-content" />
  ) : (
    <StatusBar backgroundColor={StyleGuide.colors.background} />
  )
}

const App = () => {
  const [isConnected, setConnected] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected)
    })

    return unsubscribe
  }, [])

  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

  React.useEffect(() => {
    const bgColor = StyleGuide.colors.background
    const isDark = true
    const animated = true
    changeNavigationBarColor(bgColor, isDark, animated)
  }, [])

  const checkInternet = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setConnected(true)
      }
    })
  }

  return (
    <AppStateProvider reducer={appReducer} initialState={initialState}>
      <>
        <StatusBarFC />
        {isConnected ? <ReadyCheck /> : <OfflineApplication onCheck={checkInternet} />}
      </>
    </AppStateProvider>
  )
}

export { App }
