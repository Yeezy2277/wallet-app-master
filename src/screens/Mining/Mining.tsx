import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { useSafeArea } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MiningStackParamsList } from '../../navigator/MiningStack'
import { Balance, Chart, Header, Links } from './components'
import { ROUTES } from '../../setup-kit/constants/routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type MiningScreenNavigationProp = StackNavigationProp<MiningStackParamsList, ROUTES.Mining>

interface Props {
  navigation: MiningScreenNavigationProp
  route: RouteProp<MiningStackParamsList, ROUTES.Mining>
}

const Mining: React.FC<Props> = ({ navigation }: Props) => {
  const nav = React.useCallback(
    (path: ROUTES.Reinvest | ROUTES.Rules) => {
      navigation.navigate(path)
    },
    [navigation]
  )

  const insets = useSafeArea()
  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          borderColor: 'red',
        },
      ]}
    >
      <Header />
      <Balance />
      <Chart />
      <Links nav={nav} />
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export { Mining }
