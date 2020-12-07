import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder'
import { useAppLocales } from '../../../setup-kit/locales'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { captureError } from '../../../setup-kit/sentry'
import { useLoading } from '../../../setup-kit/hooks'
import { notify, sleep } from '../../../utils'
import { StyleGuide } from '../../../StyleGuide'

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.5,
    marginBottom: 11,
  },
  balance: {
    fontSize: 28,
    lineHeight: 33,
    marginBottom: 11,
  },
  balanceSecondary: {
    fontSize: 13,
    lineHeight: 16,
  },
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
})

const Balance = () => {
  const { STRINGS } = useAppLocales()
  const [{ activeCoin, user, system }, dispatch] = useAppState()
  const { loading, setLoading } = useLoading()

  React.useEffect(() => {
    let isCurrent = true
    const fetchCoins = async () => {
      try {
        setLoading(true)
        const payload = await api.getCoins()
        await sleep(2000)
        dispatch({ type: `FETCH_COINS`, payload })
        if (isCurrent) {
          setLoading(false)
        }
      } catch (e) {
        captureError(`await api.getCoins() ${JSON.stringify(e)}`)
        notify({
          message: STRINGS.errors.common,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
        if (isCurrent) {
          setLoading(false)
        }
      }
    }

    const fetchProfile = async () => {
      try {
        const payload = await api.getProfile()
        dispatch({ type: `FETCH_PROFILE`, payload })
      } catch (e) {
        captureError(`await api.getProfile() ${JSON.stringify(e)}`)
        notify({
          message: STRINGS.errors.common,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
      }
    }

    fetchCoins()
    fetchProfile()

    return () => {
      isCurrent = false
    }
  }, [dispatch, setLoading, STRINGS])

  if (loading) {
    const color = StyleGuide.colors.background
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{STRINGS.home.balance}</Text>
        <Placeholder
          Animation={(props) => (
            <Fade
              {...props}
              style={{
                backgroundColor: StyleGuide.colors.grey,
              }}
            />
          )}
          style={{ height: 33 + 11 + 16, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <PlaceholderLine width={40} style={{ height: 25, marginRight: 12 }} color={color} />
            <PlaceholderLine width={10} style={{ height: 25 }} color={color} />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <PlaceholderLine width={40} style={{ height: 16 }} color={color} />
          </View>
        </Placeholder>
      </View>
    )
  }

  const getDisplayedBalance = (): string => {
    if (!user) {
      return '0.00'
    }
    const balance = user.balances.find((b) => b.symbol === activeCoin)
    if (!balance) {
      return '0.00'
    }
    return balance.amount.toFixed(4)
  }

  const balance = getDisplayedBalance()

  const getDisplayedBalanceUSD = (): string => {
    if (balance === '0.00') {
      return '0.00'
    }
    return (parseFloat(balance) * system.usd_rate).toFixed(4)
  }

  const balanceUSD = getDisplayedBalanceUSD()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{STRINGS.home.balance}</Text>
      <Text style={styles.balance}>{`${balance} ${activeCoin.toUpperCase()}`}</Text>
      <Text style={styles.balanceSecondary}>{`${balanceUSD} USD`}</Text>
    </View>
  )
}

export { Balance }
