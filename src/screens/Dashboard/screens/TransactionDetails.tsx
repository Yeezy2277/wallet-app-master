import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon, Text, Layout as View } from '@ui-kitten/components'
import { StackNavigationProp } from '@react-navigation/stack'
import { format } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import { RouteProp } from '@react-navigation/native'
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'
import Clipboard from '@react-native-community/clipboard'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { DashboardStackParamsList } from '../../../navigator/DashboardStack'
import { StyleGuide } from '../../../StyleGuide'
import { Devider } from '../../../components/Devider'
import { Arrow, ArrowInCircle, Reward, TxReinvest } from '../../../components/Icons'
import type { TransactionType } from '../../../setup-kit/interfaces'
import { hapticsFeedback } from '../../../utils'
import { useAppLocales } from '../../../setup-kit/locales'
import { useAppState } from '../../../setup-kit/useAppState'

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

type TransactionDetailsScreenNavigationProp = StackNavigationProp<
  DashboardStackParamsList,
  ROUTES.Transaction
>

interface Props {
  navigation: TransactionDetailsScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.TransactionDetails>
}

const locales = {
  ru,
  en: enGB,
}

const styles = StyleSheet.create({
  label: {
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 16,
  },
  textPrimary: {
    fontSize: 28,
    lineHeight: 33,
  },
  textSecondary: {
    fontSize: 13,
    lineHeight: 16,
  },
  box: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widhBg: {
    backgroundColor: StyleGuide.colors.backgroundLevel2,
  },
  shadow: {
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 5,
  },
  in: {
    backgroundColor: StyleGuide.colors.success,
    shadowColor: 'rgb(67, 162, 96)',
  },
  out: {
    backgroundColor: StyleGuide.colors.danger,
    shadowColor: StyleGuide.colors.danger,
  },
  posmined: {
    backgroundColor: StyleGuide.colors.brand,
    shadowColor: StyleGuide.colors.brand,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
})

const TransactionDetails: React.FC<Props> = ({ route }: Props) => {
  const { transaction } = route.params
  const ref = React.useRef<TransitioningView>(null)
  const { STRINGS, locale } = useAppLocales()
  const [{ user }] = useAppState()
  const [copiedInfoVisible, setVisible] = React.useState(false)

  const { recipient, timestamp, amount, hash, fee, posmined, sender, type: txType } = transaction

  const myAddress = user?.address || ''

  const getType = (): 'in' | 'out' => {
    if (txType === 'reward' || txType === 'reinvest') {
      return 'in'
    }
    if (txType === 'delegate') {
      return 'out'
    }
    if (txType === 'undelegate') {
      return 'in'
    }
    return sender === myAddress ? 'out' : 'in'
  }

  const txTypeNames: { [key in TransactionType]: string } = {
    transfer: STRINGS.transactionDetails.transfer,
    delegate: STRINGS.transactionDetails.delegate,
    undelegate: STRINGS.transactionDetails.undelegate,
    reward: STRINGS.transactionDetails.reward,
    reinvest: STRINGS.transactionDetails.reinvest,
  }

  const type = getType()

  const date = new Date(timestamp)
  const formattedDate = format(date, 'd.MM.yyyy', {
    locale: locales[locale],
  })

  const formattedDateTime = format(date, 'd.MM.yyyy HH:mm', {
    locale: locales[locale],
  })

  const handleCopy = (value: string) => {
    if (ref.current) {
      ref.current.animateNextTransition()
    }
    Clipboard.setString(value)
    setVisible(true)
    hapticsFeedback()
  }

  React.useEffect(() => {
    let isCurrent = true
    if (copiedInfoVisible) {
      setTimeout(() => {
        if (isCurrent) {
          if (ref.current) {
            ref.current.animateNextTransition()
          }
          setVisible(false)
        }
      }, 2000)
    }
    return () => {
      isCurrent = false
    }
  }, [copiedInfoVisible])

  const parseLowValue = (n: number): number => {
    const [, v2] = n.toString().split('.')
    const arr = v2.split('')
    const idx = arr.findIndex((d) => d !== '0')
    return parseFloat(n.toFixed(idx + 1))
  }

  const getNum = (n: number): number => {
    if (Math.trunc(n) === n) {
      return n
    }
    return parseLowValue(n)
  }

  const getIcon = () => {
    if (txType === 'reward') {
      return <Reward size={15} />
    }
    if (txType === 'reinvest') {
      return <TxReinvest size={15} />
    }
    if (txType === 'delegate' || txType === 'undelegate') {
      return <ArrowInCircle size={21} direction={type === 'out' ? 'right' : 'left'} />
    }

    return <Arrow size={14} direction={type === 'in' ? 'right' : 'left'} />
  }

  const txAmount =
    txType !== 'reinvest'
      ? `${getNum(amount.amount)} ${amount.symbol.toUpperCase()}`
      : `${getNum(posmined.amount)} ${posmined.symbol.toUpperCase()}`

  return (
    <Transitioning.View style={{ flex: 1 }} {...{ transition, ref }}>
      <ScrollView
        contentContainerStyle={[{ paddingBottom: 50, flex: 1 }, styles.widhBg]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                paddingHorizontal: 24,
                marginTop: 21,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                flex: 1,
              },
              styles.widhBg,
            ]}
          >
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 39,
                  paddingTop: 20,
                },
                styles.widhBg,
              ]}
            >
              <Text style={styles.label}>{formattedDate}</Text>
              <View style={[{ flexDirection: 'row', alignItems: 'center' }, styles.widhBg]}>
                <Icon
                  name="checkmark-outline"
                  fill={StyleGuide.colors.success}
                  width={18}
                  height={18}
                />
                <Text style={[styles.label, { marginLeft: 7 }]}>{STRINGS.common.done}</Text>
              </View>
            </View>
            <View style={[{ alignItems: 'center' }, styles.widhBg]}>
              <View
                style={[
                  styles.box,
                  type === 'in' ? styles.in : styles.out,
                  styles.shadow,
                  { marginBottom: 24 },
                  txType === 'reinvest' ? styles.posmined : undefined,
                ]}
              >
                {getIcon()}
              </View>
              <View style={[{ alignItems: 'center' }, styles.widhBg]}>
                <Text style={[styles.textPrimary, { marginBottom: 11 }]}>{`${txAmount}`}</Text>
                {/* TODO: put this back */}
                {/* <Text style={styles.textSecondary}>{`${posmined.amount}$`}</Text> */}
              </View>
            </View>
            <Devider
              style={{ marginBottom: 34, marginTop: 38, opacity: 0.1, marginHorizontal: -24 }}
            />
            <View style={styles.widhBg}>
              <View style={[styles.item, styles.widhBg]}>
                <Text style={[styles.label, { marginRight: 20 }]}>
                  {STRINGS.transactionDetails.type}
                </Text>
                <Text style={styles.textSecondary}>{txTypeNames[txType]}</Text>
              </View>

              {!!recipient && (
                <View style={[styles.item, styles.widhBg]}>
                  <Text style={[styles.label, { marginRight: 20 }]}>
                    {STRINGS.transactionDetails.recepient}
                  </Text>
                  <TouchableOpacity
                    style={[{ flex: 1, alignItems: 'flex-end' }, styles.widhBg]}
                    onLongPress={() => {
                      handleCopy(recipient)
                    }}
                  >
                    <Text style={[styles.textSecondary, { textAlign: 'right' }]}>{recipient}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!!sender && (
                <View style={[styles.item, styles.widhBg]}>
                  <Text style={[styles.label, { marginRight: 20 }]}>
                    {STRINGS.transactionDetails.sender}
                  </Text>
                  <TouchableOpacity
                    style={[{ flex: 1, alignItems: 'flex-end' }, styles.widhBg]}
                    onLongPress={() => {
                      handleCopy(sender)
                    }}
                  >
                    <Text style={[styles.textSecondary, { textAlign: 'right' }]}>{sender}</Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={[styles.item, styles.widhBg]}>
                <Text style={[styles.label, { marginRight: 20 }]}>
                  {STRINGS.transactionDetails.id}
                </Text>
                <TouchableOpacity
                  style={[{ flex: 1, alignItems: 'flex-end' }, styles.widhBg]}
                  onLongPress={() => {
                    handleCopy(hash)
                  }}
                >
                  <Text style={[styles.textSecondary, { textAlign: 'right' }]}>{hash}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.item, styles.widhBg]}>
                <Text style={[styles.label, { marginRight: 20 }]}>
                  {STRINGS.transactionDetails.timestamp}
                </Text>

                <View style={[{ flex: 1, alignItems: 'flex-end' }, styles.widhBg]}>
                  <Text style={[styles.textSecondary, { textAlign: 'right' }]}>
                    {formattedDateTime}
                  </Text>
                </View>
              </View>
              <View style={[styles.item, styles.widhBg]}>
                <Text style={[styles.label, { marginRight: 20 }]}>
                  {STRINGS.transactionDetails.comission}
                </Text>
                <Text style={styles.textSecondary}>
                  {`${fee.amount} ${fee.symbol.toUpperCase()}`}
                </Text>
              </View>
            </View>
          </View>

          {copiedInfoVisible && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: 20,
                backgroundColor: 'transaprent',
              }}
            >
              <Icon
                name="copy-outline"
                fill={StyleGuide.colors.svgAccentLime}
                width={18}
                height={18}
              />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>{STRINGS.common.copied}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <LinearGradient
        colors={['rgba(20, 27, 35, 0)', '#141B23']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 73 }}
      />
    </Transitioning.View>
  )
}

export { TransactionDetails }
