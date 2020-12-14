import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { SettingsStackParamsList } from '../../../navigator/SettingsStack'
import { useKeyboard } from '../../../setup-kit/useKeyboard'
import { Input } from '../../../components/Input'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { hapticsFeedback, notify} from '../../../utils'
import { captureError } from '../../../setup-kit/sentry'

const { height } = Dimensions.get('window')

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.7,
    marginBottom: 12,
  },
})

type SupportScreenNavigationProp = StackNavigationProp<SettingsStackParamsList, ROUTES.PinCode>

interface Props {
  navigation: SupportScreenNavigationProp
  route: RouteProp<SettingsStackParamsList, ROUTES.PinCode>
}

const PinCode: React.FC<Props> = ({ navigation }: Props) => {
  const [{}, dispatch] = useAppState()
  const { keyboardOpened } = useKeyboard()
  const { STRINGS } = useAppLocales()
  const [pin, setPin] = React.useState('')
  const [pending, setPending] = React.useState(false)

  const ifFilled = pin.length === 4
  const btnDelete = pin !== "Don't work"

  useFocusEffect(
    React.useCallback(() => {
      const reFetchProfile = async () => {
        try {
          const payload = await api.getProfile()
          dispatch({ type: `FETCH_PROFILE`, payload })
        } catch (e) {
          captureError(`await api.getProfile() ${JSON.stringify(e)}`)
        }
      }
      return () => {
        // re-fetch user profile when screen blurred
        reFetchProfile()
      }
    }, [dispatch])
  )

  const submit = async () => {
    hapticsFeedback()
    setPending(true)
    try {
      await api.setPin(pin)
      setPending(false)
      notify({
        message: STRINGS.common.success,
        description: '',
        type: 'success',
        floating: true,
      })
      navigation.navigate(ROUTES.PinCode)
    } catch (e) {
      setPending(false)
      captureError(`await api.setPin(${pin}) ${JSON.stringify(e)}`)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    }
  }
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: StyleGuide.colors.background, paddingHorizontal: 16 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={keyboardOpened}
    >
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 24, marginTop: 15 }}>
          <Text style={styles.label}>{STRINGS.pinCode.description}</Text>
          <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginBottom: 25 }}>
            {STRINGS.pinCode.addPin}
          </Text>
          <Input
            placeholder={STRINGS.pinCode.inputText}
            value={pin}
            onChangeText={setPin}
            disabled={pending}
            keyboardType="number-pad"
          />
          <Button
            style={{ height: h, borderRadius: 5, marginBottom: 'auto', marginTop: 25 }}
            onPress={submit}
            disabled={!ifFilled || pending}
          >
            {STRINGS.pinCode.buttonAdd.toUpperCase()}
          </Button>
        </View>
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.label}>{STRINGS.pinCode.deletePin}</Text>
          <Button
            style={{ height: h, borderRadius: 5, marginBottom: 'auto' }}
            onPress={submit}
            disabled={btnDelete}
          >
            {STRINGS.pinCode.buttonDelete.toUpperCase()}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { PinCode, navigationOptions }
