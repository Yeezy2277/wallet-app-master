import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet } from 'react-native'
import { useAppLocales } from '../../../setup-kit/locales'
import { Transaction } from '../../../components/Transaction'
import { TransactionServerSide } from '../../../setup-kit/interfaces'
import { captureError } from '../../../setup-kit/sentry'
import { notify } from '../../../utils'
import { api } from '../../../setup-kit/api'
import { useAppState } from '../../../setup-kit/useAppState'
import { TxPreviewPlaceholders } from './TxPreviewPlaceholders'

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.5,
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
})

interface Props {
  handleOpen: (t: TransactionServerSide) => void
  handleNavigateToHistory: () => void
}

const { height } = Dimensions.get('window')

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

const Transactions: React.FC<Props> = ({ handleOpen, handleNavigateToHistory }: Props) => {
  const { STRINGS } = useAppLocales()
  const [loading, setLoading] = React.useState(false)
  const [
    {
      transactions: { latest },
      user,
      activeCoin,
    },
    dispatch,
  ] = useAppState()

  React.useEffect(() => {
    let isMounted = true
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const { results } = await api.getLatestTxs(activeCoin)
        dispatch({
          type: `LATEST_TRANSACTIONS`,
          payload: results,
        })
        if (isMounted) {
          setLoading(false)
        }
      } catch (e) {
        captureError(`await api.getLatestTxs() ${JSON.stringify(e)}`)
        notify({
          message: STRINGS.errors.common,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchTransactions()

    return () => {
      isMounted = true
    }
  }, [dispatch, STRINGS, activeCoin])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{STRINGS.home.lastTransactions}</Text>
        <TxPreviewPlaceholders />
      </View>
    )
  }

  const myAddress = user?.address || ''

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{STRINGS.home.lastTransactions}</Text>
      {latest.map((t) => {
        return (
          <Transaction transaction={t} handleOpen={handleOpen} myAddress={myAddress} key={t.hash} />
        )
      })}
      <Button
        style={{ height: h, borderRadius: 5, marginTop: 24 }}
        onPress={handleNavigateToHistory}
      >
        {STRINGS.common.showAll.toUpperCase()}
      </Button>
    </View>
  )
}

export { Transactions }
