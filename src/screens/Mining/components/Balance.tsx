import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder'
import { useFocusEffect } from '@react-navigation/native'
import { useAppLocales } from '../../../setup-kit/locales'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { captureError } from '../../../setup-kit/sentry'
import { StyleGuide } from '../../../StyleGuide'
import { useInterval } from '../../../utils'

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

const color = StyleGuide.colors.background

const Balance = () => {
  const { STRINGS } = useAppLocales()
  const [{ activeCoin: coin, posmining, system }, dispatch] = useAppState()
  const [value, setValue] = React.useState(posmining.posmined)
  const [key, setKey] = React.useState<number>(new Date().getTime())

  const fetchPosmining = React.useCallback(async () => {
    try {
      const payload = await api.getPosmining({ coin })
      dispatch({
        type: 'POSMINING',
        payload,
      })
      setValue(payload.posmined)
    } catch (e) {
      captureError(`await api.getPosmining(${coin}) ${JSON.stringify(e)}`)
    }
  }, [coin, dispatch])

  React.useEffect(() => {
    fetchPosmining()
  }, [key, fetchPosmining])

  useInterval(() => {
    fetchPosmining()
  }, 1000 * 10)

  useFocusEffect(
    React.useCallback(() => {
      function tick() {
        setValue((prev) => prev + posmining.coins_per_time.second / 100)
      }
      const id = setInterval(tick, 10)
      return () => {
        clearInterval(id)
      }
    }, [posmining])
  )
  useFocusEffect(
    React.useCallback(() => {
      setKey(new Date().getTime())
    }, [])
  )

  const isReady = !!posmining

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{STRINGS.postmining.title}</Text>
        <Placeholder
          Animation={(props) => (
            <Fade
              {...props}
              style={{
                backgroundColor: StyleGuide.colors.grey,
              }}
            />
          )}
          style={{ height: 33 + 16 + 11, alignItems: 'center', justifyContent: 'center' }}
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
    if (!value) {
      return '0.000000'
    }
    return value.toFixed(8)
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
      <Text style={styles.text}>{STRINGS.postmining.title}</Text>
      <Text style={styles.balance}>{`${balance} ${coin.toUpperCase()}`}</Text>
      <Text style={styles.balanceSecondary}>{`${balanceUSD} USD`}</Text>
    </View>
  )
}

export { Balance }
