import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { ActivityIndicator, BackHandler, Dimensions, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import { DashboardStackParamsList } from '../../../navigator/DashboardStack'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { useAppLocales } from '../../../setup-kit/locales'
import { BrandLogo } from '../components'
import { hapticsFeedback, sleep } from '../../../utils'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { captureError } from '../../../setup-kit/sentry'
import { StyleGuide } from '../../../StyleGuide'

const { height } = Dimensions.get('window')

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

type TransactionSuccessScreenNavigationProp = StackNavigationProp<
  DashboardStackParamsList,
  ROUTES.TransactionSuccess
>

interface Props {
  navigation: TransactionSuccessScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.TransactionSuccess>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 33,
    marginBottom: 19,
    textAlign: 'center',
  },
  textSecondary: {
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.5,
    marginBottom: 6,
  },
  amount: {
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 26,
  },
})

const TransactionDone: React.FC<Props> = ({ navigation, route }: Props) => {
  const { amount } = route.params
  const insets = useSafeArea()
  const { STRINGS } = useAppLocales()
  const [{ activeCoin }, dispatch] = useAppState()
  const [pending, setPending] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )

  const handleDone = async () => {
    hapticsFeedback()
    setPending(true)
    await sleep(5000)
    try {
      const { results } = await api.getLatestTxs(activeCoin)
      dispatch({
        type: `LATEST_TRANSACTIONS`,
        payload: results,
      })
    } catch (e) {
      captureError(`await api.getLatestTxs() ${JSON.stringify(e)}`)
    }

    navigation.navigate(ROUTES.Dashboard)
  }

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 16, justifyContent: 'center' }}
    >
      <BrandLogo />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.textSecondary}>{STRINGS.common.thanks}</Text>
        <Text style={styles.text}>{STRINGS.transaction.success}</Text>
        <Text style={styles.amount}>{`${amount} OURO`}</Text>
      </View>
      <Button style={{ height: h, borderRadius: 5 }} onPress={handleDone} disabled={pending}>
        {pending
          ? () => <ActivityIndicator color={StyleGuide.colors.white} />
          : STRINGS.transaction.goBack.toUpperCase()}
      </Button>
    </View>
  )
}

export { TransactionDone }
