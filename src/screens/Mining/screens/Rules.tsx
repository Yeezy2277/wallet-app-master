import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { ScrollView, StyleSheet } from 'react-native'
import { Devider } from '../../../components/Devider'
import { StyleGuide } from '../../../StyleGuide'
import { useAppLocales } from '../../../setup-kit/locales'
import { Calendar, Percent, Savings, Structure } from '../../../components/Icons'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { captureError } from '../../../setup-kit/sentry'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 13,
    lineHeight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: StyleGuide.colors.brand,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  lineBreak: {
    backgroundColor: '#C4C4C4',
    opacity: 0.1,
  },
})

const Rules = () => {
  const { STRINGS } = useAppLocales()
  const [{ activeCoin: coin, posmining }, dispatch] = useAppState()

  React.useEffect(() => {
    const fetchPosmining = async () => {
      try {
        const payload = await api.getPosmining({ coin })
        dispatch({
          type: 'POSMINING',
          payload,
        })
      } catch (e) {
        captureError(`await api.getPosmining(${coin}) ${JSON.stringify(e)}`)
      }
    }

    fetchPosmining()
  }, [coin, dispatch])

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <ScrollView>
        <Devider style={styles.lineBreak} />

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Percent size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {`${STRINGS.postmining.currentDayPercent}: ${posmining.daily_percent}%`}
            </Text>
          </View>
        </View>
        <Devider style={styles.lineBreak} />

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Percent size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {`${STRINGS.postmining.startDayPercent}: ${posmining.start_daily_percent}%`}
            </Text>
          </View>
        </View>
        <Devider style={styles.lineBreak} />

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Percent size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {`${STRINGS.postmining.correctionCoeff}: ${-1 * (100 - posmining.correction_coff)}%`}
            </Text>
          </View>
        </View>
        <Devider style={styles.lineBreak} />

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Structure size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {`${STRINGS.postmining.structureCoeff}: ${posmining.structure_coff}`}
            </Text>
          </View>
        </View>
        <Devider style={styles.lineBreak} />

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Savings size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {`${STRINGS.postmining.savingsCoeff}: ${posmining.savings_coff}`}
            </Text>
          </View>
        </View>
        <Devider style={styles.lineBreak} />

        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Calendar size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>
              {`${STRINGS.postmining.dayFromLastTransaction}: ${posmining.days_since_last_tx}`}
            </Text>
          </View>
        </View>
        <Devider style={styles.lineBreak} />
      </ScrollView>
    </View>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { Rules, navigationOptions }
