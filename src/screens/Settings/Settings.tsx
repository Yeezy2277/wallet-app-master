import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { useSafeArea } from 'react-native-safe-area-context'
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useMemoOne } from 'use-memo-one'
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
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import { withTransition } from 'react-native-redash'
import FingerprintScanner, { Biometrics } from 'react-native-fingerprint-scanner'
import { StyleGuide } from '../../StyleGuide'
import { ROUTES } from '../../setup-kit/constants/routes'
import { Header } from './components'
import { SettingsStackParamsList } from '../../navigator/SettingsStack'
import { Devider } from '../../components/Devider'
import { Chevron } from '../../components/Icons'
import { AskBiometricsAndroid } from '../../components/AskBiometricsAndroid'
import { useAppState } from '../../setup-kit/useAppState'
import { useAppLocales } from '../../setup-kit/locales'
import { STRINGS as STRINGS_ALL } from '../../setup-kit/locales/strings'
import { noop, notify } from '../../utils'
import { ModalBox } from '../../components/ModalBox'
import { AnimatedBottomSheet } from '../../components/AnimatedBottomSheet'
import { StorageKeys, getItem, setItem } from '../../setup-kit/storage'
import { tokenService } from '../../setup-kit/token/Token'

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    marginVertical: 23,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 33,
  },
  text: {
    fontSize: 13,
    lineHeight: 16,
    marginRight: 'auto',
  },
  lineBreak: {
    backgroundColor: '#C4C4C4',
    opacity: 0.1,
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

type SettingsScreenNavigationProp = StackNavigationProp<SettingsStackParamsList, ROUTES.Settings>

interface Props {
  navigation: SettingsScreenNavigationProp
  route: RouteProp<SettingsStackParamsList, ROUTES.Settings>
}

const transitionModal = (
  <Transition.Together>
    <Transition.In type="scale" durationMs={200} />
    <Transition.Out type="scale" durationMs={200} />
  </Transition.Together>
)

const Settings: React.FC<Props> = ({ navigation }: Props) => {
  const insets = useSafeArea()
  const [, dispatch] = useAppState()
  const [biometricAuth, setBiometricAuth] = React.useState<boolean>(false)
  const [scannerAvailable, setScannerAvailable] = React.useState<Biometrics | null>(null)
  const { STRINGS, changeLang, locale } = useAppLocales()
  const ref = React.useRef<TransitioningView>(null)
  const [modalVisible, setModalVisible] = React.useState(false)

  const handleOpenModal = () => {
    if (ref.current) {
      ref.current.animateNextTransition()
    }
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    if (ref.current) {
      ref.current.animateNextTransition()
    }
    setModalVisible(false)
  }

  const { state, isOpen } = useMemoOne(
    () => ({
      state: new Value(State.UNDETERMINED),
      isOpen: new Value(0),
    }),
    [],
  )

  React.useEffect(() => {
    const checkHardware = async () => {
      try {
        const biometryType = await FingerprintScanner.isSensorAvailable()
        setScannerAvailable(biometryType)
      } catch (e) {
        noop()
      }
    }
    const checkBiometric = async () => {
      const isOn = await getItem(StorageKeys.BIOMETRIC)
      if (isOn) {
        setBiometricAuth(true)
      }
    }
    checkHardware()
    checkBiometric()
  }, [])

  const transition = withTransition(isOpen, { duration: 200 })

  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  const zIndex = interpolate(translateY, {
    inputRange: [0, 299, 300],
    outputRange: [0, 1, -1],
  })

  useCode(() => cond(eq(state, State.END), set(isOpen, not(isOpen))), [state, isOpen])

  const signOut = React.useCallback(async () => {
    await tokenService.clear()
    dispatch({
      type: 'AUTH_CHANGE',
      payload: { isAuthenticated: false },
    })
  }, [dispatch])

  const handleSignOut = React.useCallback(() => {
    Alert.alert(
      STRINGS.settings.signOut,
      STRINGS.common.sure,
      [
        {
          text: STRINGS.common.no,
          onPress: noop,
        },
        {
          text: STRINGS.common.yes,
          style: 'destructive',
          onPress: async () => {
            signOut()
          },
        },
      ],
      { cancelable: false },
    )
  }, [STRINGS, signOut])

  const handleClose = () => {
    isOpen.setValue(0)
    state.setValue(State.UNDETERMINED)
  }

  const setLang = async (newLang: 'ru' | 'en') => {
    if (locale === newLang) {
      handleClose()
      return
    }
    await setItem(StorageKeys.LANG, newLang)
    changeLang(newLang)
    handleClose()
  }

  const askConfirmDeleteBiometrics = () => {
    Alert.alert(
      STRINGS.login.biometric.cancel,
      STRINGS.common.sure,
      [
        {
          text: STRINGS.common.no,
          onPress: noop,
        },
        {
          text: STRINGS.common.yes,
          style: 'destructive',
          onPress: async () => {
            setBiometricAuth(false)
            await setItem(StorageKeys.BIOMETRIC, false)
          },
        },
      ],
      { cancelable: false },
    )
  }

  const handleAuthenticate = async (result: boolean) => {
    if (result) {
      setBiometricAuth(true)
      await setItem(StorageKeys.BIOMETRIC, true)
    } else {
      setBiometricAuth(false)
    }
  }

  const authenticateIOS = async () => {
    try {
      await FingerprintScanner.authenticate({ title: 'Log in with Biometrics' })
      handleAuthenticate(true)
      notify({
        message: STRINGS.common.success,
        description: '',
        type: 'success',
        floating: true,
      })
    } catch (e) {
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
        onPress: () => {
          Linking.openSettings()
        },
      })
      handleAuthenticate(false)
    }
  }

  const askForBiometrics = async (value: boolean) => {
    if (value) {
      if (Platform.OS === 'android') {
        handleOpenModal()
      }
      if (Platform.OS === 'ios') {
        authenticateIOS()
      }
    } else {
      askConfirmDeleteBiometrics()
    }
  }

  return (
    <Transitioning.View
      style={[
        {
          flex: 1,
          backgroundColor: 'transparent',
        },
      ]}
      {...{ transition: transitionModal, ref }}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Header />
        <Devider style={{ ...styles.lineBreak }} />
        <TapGestureHandler
          onHandlerStateChange={Animated.event([
            {
              nativeEvent: { state },
            },
          ])}
        >
          <Animated.View>
            <View style={styles.item}>
              <Text style={styles.text}>{STRINGS.settings.lang}</Text>
              <Text style={[styles.text, { marginRight: 8 }]}>{STRINGS.lang}</Text>
              <View>
                <Chevron size={10} direction="right" />
              </View>
            </View>
          </Animated.View>
        </TapGestureHandler>
        <Devider style={styles.lineBreak} />
        <View style={styles.item}>
          <Text style={styles.text}>Touch ID</Text>
          {modalVisible ? (
            <ActivityIndicator />
          ) : (
            <Switch
              disabled={scannerAvailable === null}
              value={biometricAuth}
              onValueChange={askForBiometrics}
              thumbColor={StyleGuide.colors.white}
              trackColor={{ true: '#2AA33F', false: '#D7D7D7' }}
            />
          )}
        </View>

        <Devider style={styles.lineBreak} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.Support)
          }}
        >
          <View style={styles.item}>
            <Text style={styles.text}>{STRINGS.settings.support}</Text>
            <View>
              <Chevron size={8} direction="right" />
            </View>
          </View>
        </TouchableOpacity>
        <Devider style={styles.lineBreak} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.PinCode)
          }}
        >
          <View style={styles.item}>
            <Text style={styles.text}>{STRINGS.settings.pinCode}</Text>
            <View>
              <Chevron size={8} direction="right" />
            </View>
          </View>
        </TouchableOpacity>
        <Devider style={styles.lineBreak} />
        <TouchableOpacity onPress={handleSignOut}>
          <View style={styles.item}>
            <Text style={styles.text}>{STRINGS.settings.signOut}</Text>
            <View>
              <Chevron size={8} direction="right" />
            </View>
          </View>
        </TouchableOpacity>
        <Devider style={styles.lineBreak} />
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
                  setLang('ru')
                }}
              >
                <Text style={styles.option}>{STRINGS_ALL.ru.lang}</Text>
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
                  setLang('en')
                }}
              >
                <Text style={styles.option}>{STRINGS_ALL.en.lang}</Text>
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
        </AnimatedBottomSheet>
        <ModalBox visible={modalVisible}>
          <AskBiometricsAndroid
            handleClose={handleCloseModal}
            handleAuthenticate={handleAuthenticate}
          />
        </ModalBox>
      </View>
    </Transitioning.View>
  )
}

export { Settings }
