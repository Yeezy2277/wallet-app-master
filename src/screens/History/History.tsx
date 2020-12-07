import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import { Gradient } from '../../components/Gradient'
import { Header, TranslactionsHistory } from './components'
import { HistoryStackParamsList } from '../../navigator/HistoryStack'
import { ROUTES } from '../../setup-kit/constants/routes'
import { TransactionServerSide as TransactionModel } from '../../setup-kit/interfaces'

type HistoryScreenNavigationProp = StackNavigationProp<HistoryStackParamsList, ROUTES.History>

interface Props {
  navigation: HistoryScreenNavigationProp
  route: RouteProp<HistoryStackParamsList, ROUTES.History>
}

const History: React.FC<Props> = ({ navigation }: Props) => {
  const { top } = useSafeArea()
  const handleFilter = React.useCallback(() => {
    navigation.navigate(ROUTES.Filter)
  }, [navigation])

  const handleOpen = React.useCallback(
    (t: TransactionModel) => {
      navigation.navigate(ROUTES.TransactionDetails, { transaction: t })
    },
    [navigation]
  )

  return (
    <View style={{ flex: 1, paddingTop: top }}>
      <Header handleFilter={handleFilter} />
      <TranslactionsHistory handleOpen={handleOpen} handleFilter={handleFilter} />
      <Gradient />
    </View>
  )
}

export { History }
