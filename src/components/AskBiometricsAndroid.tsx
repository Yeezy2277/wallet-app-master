import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import { Platform, TouchableOpacity } from 'react-native'
import { hapticsFeedback, notify } from '../utils'
import { useAppLocales } from '../setup-kit/locales'

import { TouchIcon } from './Icons'
import { StyleGuide } from '../StyleGuide'

interface Props {
  handleAuthenticate: (result: boolean) => void
  handleClose: () => void
}

const AskBiometricsAndroid: React.FC<Props> = ({ handleClose, handleAuthenticate }: Props) => {
  const { STRINGS } = useAppLocales()

  const onClose = () => {
    handleClose()
  }

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23
  }

  const handleAuthenticationAttemptedLegacy = () => {
    notify({
      message: STRINGS.errors.common,
      description: STRINGS.errors.tryAgain,
      type: 'danger',
      floating: true,
    })
  }

  const authLegacy = async () => {
    try {
      await FingerprintScanner.authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
      handleAuthenticate(true)
      onClose()
      FingerprintScanner.release()
      notify({
        message: STRINGS.common.success,
        description: '',
        type: 'success',
        floating: true,
      })
    } catch (error) {
      FingerprintScanner.release()
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    }
  }

  const authCurrent = async () => {
    try {
      await FingerprintScanner.authenticate({ title: 'Log in with Biometrics' })
      handleAuthenticate(true)
      onClose()
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
      })
      handleAuthenticate(false)
      onClose()
    }
  }

  const askAuth = () => {
    hapticsFeedback()
    if (requiresLegacyAuthentication()) {
      authLegacy()
    } else {
      authCurrent()
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <Text category="h6" style={{ textAlign: 'center', color: StyleGuide.colors.black }}>
        {STRINGS.login.biometric.biometric}
      </Text>
      <TouchableOpacity onPress={askAuth} style={{ alignSelf: 'center' }}>
        <TouchIcon size={64} fill="#FF2D55" />
      </TouchableOpacity>
      <Button onPress={onClose} style={{ marginBottom: 16 }} status="danger">
        {STRINGS.common.cancel}
      </Button>
    </View>
  )
}

export { AskBiometricsAndroid }
