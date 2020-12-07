import React from 'react'
import { Button, Icon, Text, Layout as View } from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, {
  Transition,
  Transitioning,
  TransitioningView,
  Value,
  cond,
  eq,
  interpolate,
  not,
  set,
  useCode,
} from 'react-native-reanimated'
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import { useMemoOne } from 'use-memo-one'
import { withTransition } from 'react-native-redash'
import { StyleGuide } from '../../../StyleGuide'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { DashboardStackParamsList } from '../../../navigator/DashboardStack'
import { useAppLocales } from '../../../setup-kit/locales'
import { Input } from '../../../components/Input'
import { useKeyboard } from '../../../setup-kit/useKeyboard'
import { Devider } from '../../../components/Devider'
import { hapticsFeedback, notify, sleep } from '../../../utils'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { defaultCoin } from '../../../setup-kit/constants'
import { CreateTxPayload } from '../../../setup-kit/interfaces'
import { captureError } from '../../../setup-kit/sentry'
import { AnimatedBottomSheet } from '../../../components/AnimatedBottomSheet'

const { height } = Dimensions.get('window')

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

const styles = StyleSheet.create({
  lineBreak: {
    backgroundColor: '#C4C4C4',
    opacity: 0.1,
  },
  tab: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#262C33',
    borderBottomColor: '#262C33',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tabActive: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: StyleGuide.colors.brand,
  },
  amount: {
    fontSize: 28,
    lineHeight: 33,
  },
  units: {
    fontSize: 14,
    lineHeight: 17,
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.7,
    marginBottom: 12,
  },
  option: {
    color: '#007AFF',
    fontSize: 20,
    lineHeight: 24,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderRadius: 14,
  },
})

type NewTransactionScreenNavigationProp = StackNavigationProp<
  DashboardStackParamsList,
  ROUTES.Transaction
>

interface Props {
  navigation: NewTransactionScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.Account>
}

const rgx1 = /,/gi
const rgx2 = /(\.)+/i
const rgx3 = /\./i

const NewTransaction: React.FC<Props> = ({ navigation }: Props) => {
  const ref = React.useRef<TransitioningView>(null)
  const { keyboardOpened } = useKeyboard()
  const [type, setType] = React.useState<'in' | 'out'>('out')
  const [toAddress, setAddress] = React.useState<string>('')
  const [amount, setAmount] = React.useState<string>('1')
  const { STRINGS } = useAppLocales()
  const [
    {
      activeCoin,
      user,
      system: { usd_rate: rate },
    },
  ] = useAppState()
  const [submitting, setSubmitting] = React.useState(false)
  const [copiedInfoVisible, setVisible] = React.useState(false)
  const [currency, setCurrency] = React.useState(activeCoin)
  const { state, isOpen } = useMemoOne(
    () => ({
      state: new Value(State.UNDETERMINED),
      isOpen: new Value(0),
    }),
    []
  )

  const openCloseTransition = withTransition(isOpen, { duration: 200 })
  const isCustomCoin = activeCoin !== defaultCoin

  const translateY = interpolate(openCloseTransition, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  const zIndex = interpolate(translateY, {
    inputRange: [0, 299, 300],
    outputRange: [0, 1, -1],
  })

  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [state, isOpen])

  const handleAnimate = () => {
    if (ref.current) {
      ref.current.animateNextTransition()
    }
  }

  const handleTransformValue = (v: string) => {
    return v.replace(rgx1, '.').replace(rgx2, '.')
  }

  const handleSetAmount = (v: string) => {
    if (v === '.') {
      return
    }
    if (v === ',') {
      return
    }
    setAmount(handleTransformValue(v))
  }

  const onBlur = () => {
    const res = handleTransformValue(amount)
    const [left, right] = res.split('.')
    if (left && !right) {
      setAmount(res.replace(rgx3, ''))
    }
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

  const calcFee = (val: string): string => {
    if (!val) {
      return '0'
    }
    const a = parseFloat(val)
    if (Number.isNaN(a)) {
      return '0'
    }
    if (isCustomCoin) {
      return a.toString()
    }
    // Если сумма отправления меньше 4-х монет, то комиссия 0.01
    if (a < 4) {
      return (a + 0.01).toFixed(6)
    }
    // Сумма отправления * 0.0025 (0.25%)
    return (a + a * 0.0025).toFixed(6)
  }
  const isUSD = currency.toLowerCase() === 'usd'
  const amountWithFee = calcFee(isUSD ? (parseFloat(amount) / rate).toFixed(6) : amount)

  const balance = user?.balances.find((b) => b.symbol === activeCoin)?.amount

  const renderSend = () => {
    return (
      <>
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.label}>{STRINGS.transaction.address}</Text>
          <Input
            placeholder={STRINGS.transaction.address}
            value={toAddress}
            onChangeText={setAddress}
          />
        </View>
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}
          >
            <Text style={styles.label}>{STRINGS.transaction.amount}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.label}>{STRINGS.common.currency}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 16,
            }}
          >
            <Input
              containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
              placeholder="..."
              keyboardType="number-pad"
              value={amount}
              disabled={submitting}
              style={styles.amount}
              onBlur={onBlur}
              onChangeText={handleSetAmount}
            />
            {!isCustomCoin ? (
              <TapGestureHandler
                onHandlerStateChange={Animated.event([
                  {
                    nativeEvent: { state },
                  },
                ])}
              >
                <Animated.View>
                  <Text style={styles.units}>{currency.toUpperCase()}</Text>
                </Animated.View>
              </TapGestureHandler>
            ) : (
              <Animated.View>
                <Text style={styles.units}>{currency.toUpperCase()}</Text>
              </Animated.View>
            )}
          </View>
          <Devider style={[styles.lineBreak]} />
        </View>

        <Text style={[styles.label, { opacity: 1 }]}>
          {`${STRINGS.transaction.withdrawal}: ${amountWithFee} ${activeCoin.toUpperCase()}`}
        </Text>
        {isCustomCoin ? (
          <Text style={[styles.label, { opacity: 1 }]}>
            {`${STRINGS.transactionDetails.comission}: 0.01 ${defaultCoin.toUpperCase()}`}
          </Text>
        ) : null}
        {balance && activeCoin === 'ouro' && currency.toLowerCase() !== 'usd' ? (
          <TouchableOpacity
            onPress={() => {
              const withFee = parseFloat(calcFee(balance.toString()))
              const amountToSend = balance - (withFee - balance)
              setAmount(handleTransformValue(amountToSend.toFixed(4).toString()))
            }}
          >
            <Text style={[styles.label, { opacity: 1 }]}>{STRINGS.transaction.sendAll}</Text>
          </TouchableOpacity>
        ) : null}
      </>
    )
  }

  const handleSendTx = async () => {
    if (parseFloat(amount) === 0) {
      setAmount('')
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.lessThanMin(`0`),
        type: 'warning',
        floating: true,
      })
      return
    }
    hapticsFeedback()
    setSubmitting(true)
    const a = isUSD ? (parseFloat(amount) / rate).toFixed(6) : amount
    const payload: CreateTxPayload = {
      address: toAddress,
      type: 'transfer',
      amount: {
        symbol: activeCoin,
        amount: parseFloat(a),
      },
    }

    try {
      await api.createTx(payload)
      await sleep(4000)
      setSubmitting(false)
      navigation.navigate(ROUTES.TransactionSuccess, {
        amount,
      })
    } catch (e) {
      captureError(`await api.createTx(${payload}) ${JSON.stringify(e)}`)
      if (e?.errors?.address === 'wrong_value') {
        notify({
          message: STRINGS.errors.address,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
      } else if (e?.errors?.amount === 'insufficient_funds') {
        notify({
          message: STRINGS.errors.notEnough,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
      } else {
        notify({
          message: STRINGS.errors.common,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
      }
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    isOpen.setValue(0)
    state.setValue(State.UNDETERMINED)
  }

  const readyToSend = !!toAddress && !!amount

  return (
    <Transitioning.View {...{ transition, ref }} style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: StyleGuide.colors.background, paddingHorizontal: 16 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={keyboardOpened}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', marginBottom: 24, marginHorizontal: -16 }}>
            <TouchableOpacity
              style={[styles.tab, type === 'out' ? styles.tabActive : {}]}
              onPress={() => {
                handleAnimate()
                setType('out')
              }}
            >
              <Text>{STRINGS.transaction.out}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, type === 'in' ? styles.tabActive : {}]}
              onPress={() => {
                handleAnimate()
                setType('in')
              }}
            >
              <Text>{STRINGS.transaction.in}</Text>
            </TouchableOpacity>
          </View>
          {type === 'out' ? renderSend() : <TxReceive />}
        </View>
        {type === 'out' ? (
          <Button
            style={{ height: h, borderRadius: 5, marginBottom: 'auto' }}
            onPress={handleSendTx}
            disabled={!readyToSend || submitting}
          >
            {submitting
              ? () => <ActivityIndicator color={StyleGuide.colors.white} />
              : STRINGS.common.send.toUpperCase()}
          </Button>
        ) : (
          <Button
            style={{ height: h, borderRadius: 5, marginBottom: 'auto' }}
            onPress={() => {
              hapticsFeedback()
              Clipboard.setString(user?.address || '')
              setVisible(true)
            }}
          >
            {STRINGS.transaction.copy.toUpperCase()}
          </Button>
        )}
      </KeyboardAwareScrollView>

      <Copied visible={copiedInfoVisible} />

      <AnimatedBottomSheet
        zIndex={zIndex}
        gestureHandler={{
          onHandlerStateChange: Animated.event([
            {
              nativeEvent: { state },
            },
          ]),
        }}
        translateY={translateY}
      >
        <SelectCurrency
          activeCoin={activeCoin}
          handleClose={handleClose}
          setCurrency={setCurrency}
        />
      </AnimatedBottomSheet>
    </Transitioning.View>
  )
}
function TxReceive() {
  const { STRINGS } = useAppLocales()
  const [{ user }] = useAppState()
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.label}>{STRINGS.transaction.myAddress}</Text>
      <Text style={[styles.label, { opacity: 1, marginBottom: 26 }]}>{user?.address || ''}</Text>
      <Devider style={[styles.lineBreak]} />
    </View>
  )
}

function Copied({ visible }: { visible: boolean }) {
  const { STRINGS } = useAppLocales()
  return visible ? (
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
      <Icon name="copy-outline" fill={StyleGuide.colors.svgAccentLime} width={18} height={18} />
      <Text style={{ fontSize: 12, marginLeft: 4 }}>{STRINGS.common.copied}</Text>
    </View>
  ) : null
}

function SelectCurrency({
  activeCoin,
  handleClose,
  setCurrency,
}: {
  activeCoin: string
  handleClose: () => void
  setCurrency: (c: string) => void
}) {
  const { STRINGS } = useAppLocales()
  return (
    <>
      <View style={{ flex: 2, ...styles.bottomSheet }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setCurrency(activeCoin)
              handleClose()
            }}
          >
            <Text style={styles.option}>{activeCoin.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
        <Devider style={[styles.lineBreak, { backgroundColor: '#3F3F3F', opacity: 1 }]} />
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setCurrency('USD')
              handleClose()
            }}
          >
            <Text style={styles.option}>USD</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, ...styles.bottomSheet, marginTop: 6 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              handleClose()
            }}
          >
            <Text style={[styles.option, { fontWeight: 'bold' }]}>{STRINGS.common.cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { NewTransaction, navigationOptions }
