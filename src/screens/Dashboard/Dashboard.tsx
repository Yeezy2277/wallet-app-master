import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { Gradient } from '../../components/Gradient'
import { TabParamsList } from '../../navigator/TabNavigator'
import { DashboardStackParamsList } from '../../navigator/DashboardStack'
import { ActionButton, Balance, BrandLogo, Menu, Transactions } from './components'
import { Devider } from '../../components/Devider'
import { ROUTES } from '../../setup-kit/constants/routes'
import { hapticsFeedback, notify } from '../../utils'
import { TransactionServerSide } from '../../setup-kit/interfaces'
import { FCMService } from '../../setup-kit/push-notifications'
import { useAppState } from '../../setup-kit/useAppState'
import { captureError } from '../../setup-kit/sentry'
import { useAppLocales } from '../../setup-kit/locales'
import { api } from '../../setup-kit/api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, ROUTES.DashboardTab>,
  StackNavigationProp<DashboardStackParamsList, ROUTES.Dashboard>
>

interface Props {
  navigation: HomeScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.Dashboard>
}

const Dashboard: React.FC<Props> = ({ navigation }: Props) => {
  const insets = useSafeArea()
  const [refreshing, setRefreshing] = React.useState(false)
  const [{ activeCoin }, dispatch] = useAppState()
  const { STRINGS } = useAppLocales()

  const openTransactions = () => {
    navigation.jumpTo(ROUTES.HistoryTab)
  }

  const nav = React.useCallback(
    (path: ROUTES.Account | ROUTES.Structure | ROUTES.Transaction | ROUTES.Coins) => {
      hapticsFeedback()
      navigation.navigate(path)
    },
    [navigation]
  )

  const handleOpen = (t: TransactionServerSide) => {
    navigation.navigate(ROUTES.TransactionDetails, { transaction: t })
  }

  const createTransaction = React.useCallback(() => {
    navigation.navigate(ROUTES.Transaction)
  }, [navigation])

  const composeMessage = React.useCallback(() => {
    navigation.navigate(ROUTES.Support)
  }, [navigation])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const { results } = await api.getLatestTxs(activeCoin)
      dispatch({
        type: `LATEST_TRANSACTIONS`,
        payload: results,
      })
      setRefreshing(false)
    } catch (e) {
      captureError(`await api.getLatestTxs() ${JSON.stringify(e)}`)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
      setRefreshing(false)
    }
  }

  const refresher = () => {
    return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#fff" />
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const payload = await api.getProfile()
          dispatch({ type: `FETCH_PROFILE`, payload })
        } catch (e) {
          captureError(`await api.getProfile() ${JSON.stringify(e)}`)
        }
      }
      fetchProfile()
    }, [dispatch])
  )

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={refresher()}
          contentContainerStyle={{ paddingBottom: 73 }}
        >
          <BrandLogo />
          <Balance />
          <Menu nav={nav} />
          <Devider style={{ marginBottom: 27, opacity: 0.1 }} />
          <Transactions handleOpen={handleOpen} handleNavigateToHistory={openTransactions} />
        </ScrollView>
      </View>
      <Gradient />
      <FCMService />
      <ActionButton createTransaction={createTransaction} composeMessage={composeMessage} />
    </View>
  )
}

export { Dashboard }
