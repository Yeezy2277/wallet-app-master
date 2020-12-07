import React from 'react'
import { BackHandler, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Layout as View } from '@ui-kitten/components'
import { useSafeArea } from 'react-native-safe-area-context'
import { BrandLogo } from '../Dashboard/components'
import { KeyboardApply, KeyboardBackSpace, TouchIcon } from '../../components/Icons'
import { StyleGuide } from '../../StyleGuide'
import { hapticsFeedback, notify } from '../../utils'
import { useAppLocales } from '../../setup-kit/locales'
import { setSecure } from '../../setup-kit/storage'
import { useAppState } from '../../setup-kit/useAppState'

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.5,
    marginBottom: 12,
  },
  digit: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 30,
  },
  forgot: {
    color: StyleGuide.colors.white,
    opacity: 0.5,
    fontSize: 12,
    textAlign: 'center',
  },
  pin: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#C4C4C4',
    opacity: 0.2,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinActive: {
    backgroundColor: StyleGuide.colors.brand,
    opacity: 1,
  },
  pinInner: {
    width: 4,
    height: 4,
    borderRadius: 4 / 2,
    backgroundColor: StyleGuide.colors.white,
  },
})

const Pin = ({ value }: { value?: string }) => {
  return (
    <View style={[styles.pin, value ? styles.pinActive : undefined]}>
      {value ? <View style={styles.pinInner} /> : null}
    </View>
  )
}

export const Header = ({ title }: { title: string }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <BrandLogo />
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export const Pins = ({ code }: { code: string }) => {
  const [first, second, third, fourth] = code.split('')

  return (
    <View style={{ flexDirection: 'row' }}>
      <Pin value={first} />
      <Pin value={second} />
      <Pin value={third} />
      <Pin value={fourth} />
    </View>
  )
}

const Digit = ({
  value,
  onPress,
  disabled,
}: {
  value: string
  onPress: (v: string) => void
  disabled: boolean
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(value)} style={styles.digit} disabled={disabled}>
      <Text>{value}</Text>
    </TouchableOpacity>
  )
}

export const Keyboard = ({
  handleKeyboardPress,
  handleRemoveChar,
  biometric,
  code,
  handleApply,
  handleForgot,
}: {
  handleKeyboardPress: (s: string) => void
  handleRemoveChar: () => void
  handleApply: () => void
  code: string
  biometric?: boolean
  handleForgot?: () => void
}) => {
  const { STRINGS } = useAppLocales()
  const disabled = biometric || code.length >= 4
  const backSpaceDisabled = biometric || !code.length
  const isChecking = !!handleForgot
  const applyDisabled = biometric ? false : code.length < 4

  const handleKeyPress = (v: string) => {
    handleKeyboardPress(v)
  }

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3].map((d) => {
          return <Digit key={d} value={d.toString()} onPress={handleKeyPress} disabled={disabled} />
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {[4, 5, 6].map((d) => {
          return <Digit key={d} value={d.toString()} onPress={handleKeyPress} disabled={disabled} />
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {[7, 8, 9].map((d) => {
          return <Digit key={d} value={d.toString()} onPress={handleKeyPress} disabled={disabled} />
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.digit, isChecking ? { borderWidth: 0 } : undefined]}
          onPress={isChecking ? handleForgot : handleRemoveChar}
          disabled={!isChecking && backSpaceDisabled}
        >
          {isChecking ? (
            <Text style={styles.forgot}>{STRINGS.login.biometric.forgot}</Text>
          ) : (
            <KeyboardBackSpace />
          )}
        </TouchableOpacity>

        <Digit key={0} value="0" onPress={handleKeyPress} disabled={disabled} />

        <TouchableOpacity style={styles.digit} disabled={applyDisabled} onPress={handleApply}>
          {biometric ? <TouchIcon size={60} fill="rgba(255,255,255,0.5)" /> : <KeyboardApply />}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const SetPin = () => {
  const insets = useSafeArea()
  const { STRINGS } = useAppLocales()
  const [code, setCode] = React.useState<string>('')
  const [confirm, setConfirm] = React.useState<string>('')
  const [step, setStep] = React.useState<'set' | 'confirm'>('set')
  const [, dispatch] = useAppState()

  React.useEffect(() => {
    const onBackPress = () => true

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [])

  const handleKeyboardPress = (d: string) => {
    const value = step === 'set' ? code : confirm

    const nextValue = `${value}${d}`
    if (step === 'set') {
      setCode(nextValue)
    } else {
      setConfirm(nextValue)
    }
  }

  const handleRemoveChar = () => {
    const value = step === 'set' ? code : confirm
    const nextValue = value.slice(0, -1)
    if (step === 'set') {
      setCode(nextValue)
    } else {
      setConfirm(nextValue)
    }
  }

  const handleApply = () => {
    setConfirm('')
    setStep('confirm')
    hapticsFeedback()
  }

  const handleSave = async () => {
    hapticsFeedback()
    const isValid = code.length === 4 && confirm.length === 4 && code === confirm
    if (!isValid) {
      setConfirm('')
      setCode('')
      setStep('set')
      notify({
        message: STRINGS.errors.codeIsDifferent,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    } else {
      await setSecure(code)
      dispatch({
        type: 'AUTH_CHANGE',
        payload: { isAuthenticated: true, pin: code, pinChecked: true },
      })
    }
  }

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom, paddingTop: insets.top }}>
      <Header
        title={step === 'set' ? STRINGS.login.biometric.create : STRINGS.login.biometric.confirm}
      />
      <View
        style={{
          flex: 2,
          alignItems: 'center',
        }}
      >
        <Pins code={step === 'set' ? code : confirm} />
        <Keyboard
          handleKeyboardPress={handleKeyboardPress}
          handleRemoveChar={handleRemoveChar}
          handleApply={step === 'set' ? handleApply : handleSave}
          code={step === 'set' ? code : confirm}
        />
      </View>
    </View>
  )
}

export { SetPin }
