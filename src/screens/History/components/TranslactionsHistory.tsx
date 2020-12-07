import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { format } from 'date-fns'

import { Transaction } from '../../../components/Transaction'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { captureError } from '../../../setup-kit/sentry'
import { TransactionServerSide } from '../../../setup-kit/interfaces'
import { TxPreviewPlaceholders } from '../../Dashboard/components/TxPreviewPlaceholders'
import { Title } from './Title'
import { EmptyList } from './EmptyList'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 73,
  },
})

interface Props {
  handleOpen: (t: TransactionServerSide) => void
  handleFilter: () => void
}

const ListHeaderComponent = () => {
  return (
    <>
      <View style={{ height: 60 }} />
      <Title />
    </>
  )
}

const keyExtractor = (t: TransactionServerSide) => t.hash

const LIMIT = 25

const TranslactionsHistory: React.FC<Props> = ({ handleOpen, handleFilter }: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const firstRendered = React.useRef<boolean>(true)

  const [
    {
      filters: { from, to, type },
      transactions: { filtered, pages: pagesInState },
      user,
      activeCoin,
    },
    dispatch,
  ] = useAppState()

  React.useEffect(() => {
    firstRendered.current = false
  }, [])

  const initialLoading = firstRendered.current && !loading
  const isEmpty = !filtered.length

  React.useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setPage(1)
      try {
        const { results, pages } = await api.getTxs({
          type,
          limit: LIMIT,
          from: format(from, 'yyyy-MM-dd'),
          to: format(to, 'yyyy-MM-dd'),
          coin: activeCoin,
        })
        dispatch({
          type: `REPLACE_TRANSACTIONS`,
          payload: { results, pages },
        })
        setLoading(false)
      } catch (e) {
        captureError(`await api.getTxs({
          type: 'all',
          from: ${format(from, 'yyyy-MM-dd')},
          to: ${format(to, 'yyyy-MM-dd')},
          coin: ${activeCoin},
        }) ${JSON.stringify(e)}`)
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [from, to, type, dispatch, activeCoin])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const { results } = await api.getTxs({
        type,
        page: 1,
        limit: filtered.length,
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
        coin: activeCoin,
      })
      dispatch({
        type: `REPLACE_TRANSACTIONS`,
        payload: { results },
      })
      setRefreshing(false)
    } catch (e) {
      captureError(`await api.getTxs({
        type: 'all',
        from: ${format(from, 'yyyy-MM-dd')},
        to: ${format(to, 'yyyy-MM-dd')},
        coin: ${activeCoin},
      }) ${JSON.stringify(e)}`)
      setRefreshing(false)
    }
  }

  const myAddress = user?.address || ''

  const renderItem = React.useCallback(
    ({ item }: { item: TransactionServerSide }) => {
      return <Transaction transaction={item} handleOpen={handleOpen} myAddress={myAddress} />
    },
    [myAddress, handleOpen]
  )

  if (loading || initialLoading) {
    return (
      <View style={styles.container}>
        <ListHeaderComponent />
        <TxPreviewPlaceholders />
      </View>
    )
  }

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <ListHeaderComponent />
        <EmptyList onPress={handleFilter} />
      </View>
    )
  }

  const refresher = () => {
    return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#fff" />
  }

  const retrieveMore = async () => {
    const hasMore = page + 1 <= pagesInState

    if (!hasMore) {
      return
    }
    try {
      const { results } = await api.getTxs({
        type,
        limit: LIMIT,
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
        page: page + 1,
        coin: activeCoin,
      })
      setPage((prevPage) => prevPage + 1)
      dispatch({
        type: `ADD_TRANSACTIONS`,
        payload: { results },
      })
    } catch (e) {
      captureError(`await api.getTxs({
        type: ${type},
        from: ${format(from, 'yyyy-MM-dd')},
        to: ${format(to, 'yyyy-MM-dd')},
        coin: ${activeCoin},
        page: ${page + 1}
      }) ${JSON.stringify(e)}`)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={filtered}
        refreshControl={refresher()}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.8}
        onEndReached={retrieveMore}
      />
    </View>
  )
}

export { TranslactionsHistory }
