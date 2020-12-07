import React from 'react'
import {
  ActivityIndicator,
  BackHandler,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, Layout as View } from '@ui-kitten/components'
import { RouteProp } from '@react-navigation/native'
import { AuthStackParamsList } from '../../navigator/AuthStack'
import { ROUTES } from '../../setup-kit/constants'
import { StyleGuide } from '../../StyleGuide'
import { useKeyboard } from '../../setup-kit/useKeyboard'
import { useAppLocales } from '../../setup-kit/locales'
import { hapticsFeedback, notify } from '../../utils'
import { captureError } from '../../setup-kit/sentry'
import { StorageKeys, getSecure } from '../../setup-kit/storage'
import { useAppState } from '../../setup-kit/useAppState'
import { Logo } from '../../components/Icons'
import { api } from '../../setup-kit/api'
import { tokenService } from '../../setup-kit/token/Token'

type Auth2FAScreenNavigationProp = StackNavigationProp<AuthStackParamsList, ROUTES.TWOFA>

interface Props {
  navigation: Auth2FAScreenNavigationProp
  route: RouteProp<AuthStackParamsList, ROUTES.TWOFA>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  logo: {
    width: 76,
    height: 76,
    backgroundColor: StyleGuide.colors.brand,
    borderRadius: 76 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginBottom: 50,
    fontWeight: '500',
    fontSize: 36,
    lineHeight: 49,
    textAlign: 'center',
  },

  pin: {
    flex: 1,
    borderBottomColor: StyleGuide.colors.brand,
    borderBottomWidth: 2,
    marginHorizontal: 9,
    padding: 5,
    height: 36,
    alignItems: 'center',
  },

  digit: {
    fontSize: 18,
    lineHeight: 24,
  },

  hidden: {
    height: 0,
    width: 0,
    transform: [{ translateX: -100 }],
  },
})

const Pin = ({ value }: { value?: string }) => {
  return <View style={styles.pin}>{value ? <Text style={styles.digit}>{value}</Text> : null}</View>
}

const Pins = ({ code }: { code: string }) => {
  const [d1, d2, d3, d4, d5, d6] = code.split('')

  return (
    <View style={{ flexDirection: 'row' }}>
      <Pin value={d1} />
      <Pin value={d2} />
      <Pin value={d3} />
      <Pin value={d4} />
      <Pin value={d5} />
      <Pin value={d6} />
    </View>
  )
}

const TwoFA: React.FC<Props> = ({ navigation, route }: Props) => {
  const { STRINGS } = useAppLocales()
  const [, dispatch] = useAppState()
  const [pending, setPending] = React.useState(false)
  const [code, setCode] = React.useState<string>('')
  const ref = React.useRef<TextInput>(null)
  const { keyboardOpened } = useKeyboard()

  const { email, password } = route.params

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  const handleInput = (val: string) => {
    if (val.length > 6) {
      return
    }
    setCode(val)
  }

  React.useEffect(() => {
    const onBackPress = () => true
    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [])

  const saveTokens = async ({
    refreshToken,
    accessToken,
  }: {
    refreshToken: string
    accessToken: string
  }) => {
    await tokenService.setAccessToken(accessToken)
    await tokenService.setAccessExpiration(accessToken)
    await tokenService.setRefreshToken(refreshToken)
  }

  const handleSubmit = async () => {
    setPending(true)
    hapticsFeedback()
    try {
      // eslint-disable-next-line camelcase
      const res = await api.login({ email, password, fa: code })
      const { jwt, refresh } = res
      await saveTokens({ accessToken: jwt, refreshToken: refresh })
      setPending(false)
      const pin = await getSecure(StorageKeys.PIN)
      setPending(false)
      if (!pin) {
        navigation.navigate(ROUTES.SetLocalAuth)
      } else {
        dispatch({
          type: 'AUTH_CHANGE',
          payload: { isAuthenticated: true, pin, pinChecked: false },
        })
      }
    } catch (e) {
      captureError(`await api.login(}) ${JSON.stringify(e)}`)
      if (e?.errors?.message === 'Invalid 2FA') {
        notify({
          message: STRINGS.errors.invalidCode,
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
      setCode('')
      setPending(false)
    }
  }

  React.useEffect(() => {
    const isValid = !Number.isNaN(parseInt(code, 10)) && code.length === 6
    if (code.length === 6 && isValid) {
      Keyboard.dismiss()
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <View style={styles.logo}>
            <Logo size={40} />
          </View>
        </View>
        <View style={{ flex: 2 }}>
          {pending ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <Text style={[styles.title]}>{STRINGS.login.fa}</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleFocus}
                style={{ marginBottom: 50 }}
                disabled={pending}
              >
                <Pins code={code} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <TextInput
        ref={ref}
        style={styles.hidden}
        autoFocus
        value={code}
        onChangeText={handleInput}
        keyboardType="number-pad"
      />
      {keyboardOpened && (
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss()
          }}
        />
      )}
    </View>
  )
}

export { TwoFA }
