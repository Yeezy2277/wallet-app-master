import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import { StackNavigationProp } from '@react-navigation/stack'
import DeviceInfo from 'react-native-device-info'
import { RouteProp } from '@react-navigation/native'
import { Calendar } from '../../../components/Calendar'
import { Devider } from '../../../components/Devider'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { HistoryStackParamsList } from '../../../navigator/HistoryStack'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { useAppState } from '../../../setup-kit/useAppState'
import type { Fltr } from '../../../setup-kit/interfaces'

const { height } = Dimensions.get('window')

const notched = DeviceInfo.hasNotch()

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 13,
    lineHeight: 16,
  },
  item: {
    height: 29,
    borderWidth: 1,
    flex: 1,
    borderColor: StyleGuide.colors.brand,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemActive: {
    backgroundColor: StyleGuide.colors.brand,
  },
  transactionType: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.5,
  },
  transactionActive: {
    opacity: 1,
  },
  inputContainer: {
    height: 50,
    flex: 1,
    backgroundColor: StyleGuide.colors.grey,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
})

interface MenuProps {
  filter: Fltr
  setFilter: (f: Fltr) => void
}

const Menu = ({ filter, setFilter }: MenuProps) => {
  const { STRINGS } = useAppLocales()
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, overflow: 'hidden' }}
    >
      <TouchableOpacity
        onPress={() => {
          if (filter !== 'all') {
            setFilter('all')
          }
        }}
        style={[
          styles.item,
          filter === 'all' ? styles.itemActive : undefined,
          { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
        ]}
      >
        <Text
          style={[styles.transactionType, filter === 'all' ? styles.transactionActive : undefined]}
        >
          {STRINGS.filters.all}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (filter !== 'received') {
            setFilter('received')
          }
        }}
        style={[styles.item, filter === 'received' ? styles.itemActive : undefined]}
      >
        <Text
          style={[
            styles.transactionType,
            filter === 'received' ? styles.transactionActive : undefined,
          ]}
        >
          {STRINGS.filters.received}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.item,
          filter === 'sent' ? styles.itemActive : undefined,
          { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
        ]}
        onPress={() => {
          if (filter !== 'sent') {
            setFilter('sent')
          }
        }}
      >
        <Text
          style={[styles.transactionType, filter === 'sent' ? styles.transactionActive : undefined]}
        >
          {STRINGS.filters.sent}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

type FilterScreenNavigationProp = StackNavigationProp<HistoryStackParamsList, ROUTES.Filter>

interface Props {
  navigation: FilterScreenNavigationProp
  route: RouteProp<HistoryStackParamsList, ROUTES.Filter>
}

const locales = {
  ru,
  en: enGB,
}

const Filter: React.FC<Props> = ({ navigation }: Props) => {
  const { STRINGS, locale } = useAppLocales()
  const [{ filters }, dispatch] = useAppState()
  const [from, setFrom] = React.useState<Date>()
  const [to, setTo] = React.useState<Date>()
  const [calendarOpened, setCalendarOpened] = React.useState<'from' | 'to' | 'none'>('none')
  const isBtnAvailable = from && to && calendarOpened === 'none'

  const formatYmd = (date: Date) => format(date, 'd MMM yyyy', { locale: locales[locale] })

  const applyFilters = () => {
    dispatch({
      type: 'FILTER_HISTORY',
      payload: { from, to },
    })
    navigation.navigate(ROUTES.History)
  }

  const setFilterType = (t: Fltr) => {
    dispatch({
      type: 'FILTER_HISTORY_BY_TYPE',
      payload: { type: t },
    })
  }

  const today = new Date()

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginTop: notched ? 15 : 0, marginBottom: 14 }]}>
        {`${STRINGS.filters.transactionType}: `}
      </Text>
      <Menu filter={filters.type} setFilter={setFilterType} />
      <Devider style={{ marginTop: 30, marginBottom: 24, opacity: 0.1, marginVertical: -16 }} />
      <Text style={[styles.text, { marginBottom: 14 }]}>{`${STRINGS.filters.period}:`}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.inputContainer, { marginRight: 10 }]}
          disabled={calendarOpened === 'to'}
          onPress={() => {
            if (calendarOpened === 'from') {
              setCalendarOpened('none')
            } else {
              setCalendarOpened('from')
            }
          }}
        >
          <Text>{!from ? STRINGS.filters.periodFrom : formatYmd(from)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inputContainer, { marginLeft: 10 }]}
          disabled={calendarOpened === 'from'}
          onPress={() => {
            if (calendarOpened === 'to') {
              setCalendarOpened('none')
            } else {
              setCalendarOpened('to')
            }
          }}
        >
          <Text>{!to ? STRINGS.filters.periodTo : formatYmd(to)}</Text>
        </TouchableOpacity>
      </View>
      {calendarOpened === 'from' && (
        <Calendar
          shouldRasterizeIOS
          date={from}
          max={today}
          onSelect={(nextDate) => {
            setFrom(nextDate)
            setCalendarOpened('none')
          }}
        />
      )}
      {calendarOpened === 'to' && (
        <Calendar
          shouldRasterizeIOS
          date={to}
          max={today}
          onSelect={(nextDate) => {
            setTo(nextDate)
            setCalendarOpened('none')
          }}
        />
      )}
      {isBtnAvailable && (
        <Button
          style={{ height: h, borderRadius: 5, marginTop: 'auto', marginBottom: 30 }}
          onPress={() => {
            applyFilters()
          }}
        >
          {STRINGS.filters.button.toUpperCase()}
        </Button>
      )}
    </View>
  )
}

export { Filter }
