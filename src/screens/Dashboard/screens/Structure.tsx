import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { DashboardStackParamsList } from '../../../navigator/DashboardStack'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { useAppLocales } from '../../../setup-kit/locales'
import { Devider } from '../../../components/Devider'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { StructureServerSide } from '../../../setup-kit/interfaces'
import { captureError } from '../../../setup-kit/sentry'
import { StyleGuide } from '../../../StyleGuide'

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 23,
    marginBottom: 27,
    flexDirection: 'row',
  },
  lineBreak: {
    backgroundColor: '#C4C4C4',
    opacity: 0.1,
  },
  text: {
    fontSize: 13,
    lineHeight: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})

type StructureScreenNavigationProp = StackNavigationProp<DashboardStackParamsList, ROUTES.Structure>

interface Props {
  navigation: StructureScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.Structure>
}

const Structure: React.FC<Props> = () => {
  const [{ activeCoin: coin }] = useAppState()
  const { STRINGS } = useAppLocales()
  const [structure, setStructure] = React.useState<StructureServerSide>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchStructure = async () => {
      setLoading(true)
      try {
        const data = await api.getStructure({ coin })
        setStructure(data)
        setLoading(false)
      } catch (e) {
        captureError(`await api.getStructure(${coin}) ${JSON.stringify(e)}`)
        setLoading(false)
      }
    }

    fetchStructure()
  }, [coin])

  return (
    <View style={{ flex: 1 }}>
      <Devider style={[styles.lineBreak, { marginTop: 22 }]} />
      <View style={styles.itemContainer}>
        <Text style={[styles.text, { flex: 1 }]}>{`${STRINGS.structure.members}:`}</Text>
        <Text style={[styles.text]}>{structure ? structure.followers : '...'}</Text>
      </View>
      <Devider style={styles.lineBreak} />
      <View style={styles.itemContainer}>
        <Text style={[styles.text, { flex: 1 }]}>{`${STRINGS.structure.levels}:`}</Text>
        <Text style={[styles.text]}>{structure ? structure.max_level : '...'}</Text>
      </View>
      <Devider style={styles.lineBreak} />
      <View style={styles.itemContainer}>
        <Text style={[styles.text, { flex: 1 }]}>{`${STRINGS.structure.income}:`}</Text>
        <Text style={[styles.text]}>{structure ? `${structure.balance} ${coin}` : '...'}</Text>
      </View>
      <Devider style={[styles.lineBreak, { marginBottom: 30 }]} />
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator color={StyleGuide.colors.white} />
        </View>
      ) : null}
    </View>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { Structure, navigationOptions }
