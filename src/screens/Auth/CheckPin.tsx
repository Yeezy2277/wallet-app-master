import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { Alert, Platform } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { hapticsFeedback, noop, notify } from '../../utils'
import { useAppLocales } from '../../setup-kit/locales'
import { StorageKeys, clearItem, clearSecure, getItem, getSecure } from '../../setup-kit/storage'
import { useAppState } from '../../setup-kit/useAppState'
import { Header, Keyboard, Pins } from './SetPin'
import { ModalBox } from '../../components/ModalBox'
import { AskBiometricsAndroid } from '../../components/AskBiometricsAndroid'
import { tokenService } from '../../setup-kit/token/Token'

const transition = (
  <Transition.Together>
    <Transition.In type="scale" durationMs={200} />
    <Transition.Out type="scale" durationMs={200} />
  </Transition.Together>
)

const CheckPin = () => {
  const insets = useSafeArea()
  const { STRINGS } = useAppLocales()
  const [code, setCode] = React.useState<string>('')
  const [pin, setPin] = React.useState<string>('')
  const [, dispatch] = useAppState()
  const ref = React.useRef<TransitioningView>(null)
  const [biometricAuth, setBiometricAuth] = React.useState<boolean>(false)
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

  React.useEffect(() => {
    const getPinFromStorage = async () => {
      try {
        const p = await getSecure(StorageKeys.PIN)
        setPin(p)
      } catch (e) {
        setPin('')
      }
    }
    getPinFromStorage()
  }, [])

  const handleLogin = React.useCallback(async () => {
    const p = await getSecure(StorageKeys.PIN)
    dispatch({
      type: 'AUTH_CHANGE',
      payload: { isAuthenticated: true, pin: p, pinChecked: true },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleKeyboardPress = (d: string) => {
    const nextValue = `${code}${d}`
    setCode(nextValue)
  }

  const handleRemoveChar = () => {
    const nextValue = code.slice(0, -1)
    setCode(nextValue)
  }

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23
  }

  const handleAuthenticate = async (result: boolean) => {
    if (result) {
      handleLogin()
    }
  }

  const authCurrent = React.useCallback(async () => {
    try {
      await FingerprintScanner.authenticate({ title: 'Log in with Biometrics' })
      handleLogin()
      FingerprintScanner.release()
    } catch (e) {
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
      FingerprintScanner.release()
    }
  }, [STRINGS.errors.common, STRINGS.errors.tryAgain, handleLogin])

  const askAuth = () => {
    if (requiresLegacyAuthentication()) {
      handleOpenModal()
    } else {
      authCurrent()
    }
  }

  const clear = React.useCallback(async () => {
    await tokenService.clear()
    await clearSecure()
    await clearItem(StorageKeys.BIOMETRIC)
    dispatch({
      type: 'AUTH_CHANGE',
      payload: { isAuthenticated: false },
    })
  }, [dispatch])

  const handleForgotCode = async () => {
    Alert.alert(
      STRINGS.login.biometric.reset,
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
            clear()
          },
        },
      ],
      { cancelable: false }
    )
  }

  const handleCheck = async () => {
    hapticsFeedback()
    if (!biometricAuth) {
      const isValid = code.length === 4 && code === pin
      if (!isValid) {
        setCode('')
        notify({
          message: STRINGS.errors.invalidCode,
          description: STRINGS.errors.tryAgain,
          type: 'danger',
          floating: true,
        })
      } else {
        handleLogin()
      }
    } else {
      askAuth()
    }
  }

  React.useEffect(() => {
    const checkBiometric = async () => {
      const isOn = await getItem(StorageKeys.BIOMETRIC)
      if (isOn) {
        setBiometricAuth(true)
        authCurrent()
      }
    }
    checkBiometric()
  }, [authCurrent])

  return (
    <Transitioning.View
      style={[
        {
          flex: 1,
          backgroundColor: 'transparent',
        },
      ]}
      {...{ transition, ref }}
    >
      <View style={{ flex: 1, paddingBottom: insets.bottom, paddingTop: insets.top }}>
        <Header title={STRINGS.login.biometric.enter} />
        <View
          style={{
            flex: 2,
            alignItems: 'center',
          }}
        >
          <Pins code={code} />
          <Keyboard
            biometric={biometricAuth}
            handleKeyboardPress={handleKeyboardPress}
            handleRemoveChar={handleRemoveChar}
            handleApply={handleCheck}
            code={code}
            handleForgot={handleForgotCode}
          />
        </View>
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

export { CheckPin }
