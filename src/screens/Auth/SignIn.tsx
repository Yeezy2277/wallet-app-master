/* eslint-disable no-nested-ternary */
import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeArea } from 'react-native-safe-area-context'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AuthStackParamsList } from '../../navigator/AuthStack'
import { useAppLocales } from '../../setup-kit/locales'
import { tokenService } from '../../setup-kit/token/Token'
import { useKeyboard } from '../../setup-kit/useKeyboard'
import { StyleGuide } from '../../StyleGuide'
import { Input } from '../../components/Input'
import { api } from '../../setup-kit/api'
import { ROUTES } from '../../setup-kit/constants'
import { Logo } from '../../components/Icons'
import { noop, notify } from '../../utils'
import { captureError } from '../../setup-kit/sentry'
import { useAppState } from '../../setup-kit/useAppState'
import { validateEmail } from '../../utils/regex'
import { StorageKeys, getSecure } from '../../setup-kit/storage'

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamsList, ROUTES.Auth>

interface Props {
  navigation: AuthScreenNavigationProp
  route: RouteProp<AuthStackParamsList, ROUTES.Auth>
  handleChangeAuthType: () => void
}

const { height } = Dimensions.get('window')
/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

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
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 33,
    marginBottom: 19,
  },

  inputContainer: {
    marginBottom: 20,
  },
})

const debugEmail = 'test-account@ouroboros-crypto.com'
const debugPassword = 'abcdef123'

const SignIn: React.FC<Props> = ({ navigation, handleChangeAuthType }: Props) => {
  const [, dispatch] = useAppState()
  const [pending, setPending] = React.useState(false)

  const [email, setEmail] = React.useState(__DEV__ ? debugEmail : '')
  const [password, setPassword] = React.useState(__DEV__ ? debugPassword : '')
  const [timer, setTimer] = React.useState(30)
  const [clockRunning, setClockRunning] = React.useState(false)

  const { STRINGS } = useAppLocales()
  const { keyboardOpened } = useKeyboard()
  const [attemptsCount, setAttemptsCount] = React.useState<number>(0)
  const insets = useSafeArea()

  React.useEffect(() => {
    function tick() {
      if (clockRunning) {
        setTimer((t) => (t === 0 ? 0 : t - 1))
        if (timer === 0) {
          setClockRunning(false)
        }
      }
    }
    if (clockRunning) {
      const id = setInterval(tick, 1000)

      return () => clearInterval(id)
    }
    return noop
  }, [timer, clockRunning])

  React.useEffect(() => {
    const bgColor = StyleGuide.colors.background
    const isDark = true
    const animated = true
    changeNavigationBarColor(bgColor, isDark, animated)
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

  const validate = (): boolean => {
    return validateEmail(email) && password.length > 0
  }

  const submit = async () => {
    const isValid = validate()
    if (!isValid) {
      return
    }
    setPending(true)
    try {
      const res = await api.login({ email, password })
      const { jwt, refresh, message, success } = res
      const faRequired = message === 'fa_required' && success === false
      if (faRequired) {
        navigation.navigate(ROUTES.TWOFA, { email, password })
        return
      }
      await saveTokens({ accessToken: jwt, refreshToken: refresh })
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
      captureError(`await api.login({${email}, password}) ${JSON.stringify(e)}`)
      if (e?.errors?.message === 'Invalid username / password') {
        notify({
          message: STRINGS.errors.invalidPassword,
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
      setPending(false)
      setAttemptsCount((prev) => prev + 1)
    }
  }

  React.useEffect(() => {
    if (attemptsCount >= 2) {
      setTimer(30)
      setClockRunning(true)
      setAttemptsCount(0)
    }
  }, [attemptsCount])

  const isValid = validate()

  const btnText = !clockRunning
    ? STRINGS.login.login.toUpperCase()
    : `${STRINGS.login.wait.toUpperCase()} ${timer} ${STRINGS.common.seconds.toLowerCase()}`

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        resetScrollToCoords={{ x: 0, y: 0 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={keyboardOpened}
        contentContainerStyle={{
          flexGrow: keyboardOpened ? 0 : 1,
          justifyContent: 'center',
          paddingTop: 32,
        }}
      >
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              paddingBottom: keyboardOpened ? 24 : 0,
            }}
          >
            <View style={styles.logo}>
              <Logo size={40} />
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>{STRINGS.login.title.signIn}</Text>
            </View>
            <Input
              icon="email"
              placeholder={STRINGS.login.email}
              keyboardType="email-address"
              containerStyle={styles.inputContainer}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              icon="key"
              placeholder={STRINGS.login.password}
              secureTextEntry
              containerStyle={styles.inputContainer}
              value={password}
              onChangeText={setPassword}
            />

            <Button
              style={{ height: h, borderRadius: 5, marginBottom: 'auto' }}
              disabled={!isValid || pending || clockRunning}
              onPress={submit}
            >
              {pending ? () => <ActivityIndicator color={StyleGuide.colors.white} /> : btnText}
            </Button>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 24,
              }}
            >
              <Text style={{ color: '#7A7F83' }}>{`${STRINGS.login.changeAuth.signIn} `}</Text>
              <TouchableOpacity onPress={handleChangeAuthType}>
                <Text>{STRINGS.login.changeAuth.create}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { SignIn }
