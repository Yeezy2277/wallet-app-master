import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { ROUTES } from '../../../setup-kit/constants'
import { SettingsStackParamsList } from '../../../navigator/SettingsStack'
import { useKeyboard } from '../../../setup-kit/useKeyboard'
import { Input } from '../../../components/Input'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { hapticsFeedback, notify } from '../../../utils'
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
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useAppState()
  const { keyboardOpened } = useKeyboard()
  const { STRINGS } = useAppLocales()
  const [pin, setPin] = React.useState('')
  const [oldPin, setOldPin] = React.useState('')
  const [pending, setPending] = React.useState(false)
  const [isPin, setIsPin] = React.useState(false) // state of pin_enabled

  const ifFilled = pin.length === 4
  // getting data from server
  React.useEffect(() => {
    try {
      api.getProfile().then((r) => {
        const payload = r
        setIsPin(payload.pin_enabled)
      })
    } catch (e) {
      captureError(`await api.getProfile() ${JSON.stringify(e)}`)
    }
  }, [])
  const submit = async (typeSubmit: string) => {
    hapticsFeedback()
    setPending(true)
    try {
      if (typeSubmit === 'SUBMIT_ADD') {
        const payload = await api.setPin(pin, '')
        dispatch({ type: `SET_PIN`, payload })
        setIsPin(true)
      } else if (typeSubmit === 'SUBMIT_EDIT') {
        const payload = await api.setPin(pin, oldPin)
        dispatch({ type: `SET_PIN`, payload })
        setIsPin(true)
        console.log(payload)
      } else if (typeSubmit === 'SUBMIT_DELETE') {
        await api.setPin('', '')
        const payload = await api.getProfile()
        payload.pin_enabled = false
        dispatch({ type: `FETCH_PROFILE`, payload })
        setIsPin(false)
      }
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
      captureError(`await api.setPin(${pin}) ${JSON.stringify(e)}, ${isPin}`)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    }
  }
  const submitAdd = () => {
    submit('SUBMIT_ADD')
  }
  const submitEdit = () => {
    submit('SUBMIT_EDIT')
  }
  const submitDelete = () => {
    submit('SUBMIT_DELETE')
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
          {!isPin ? (
            <View>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginBottom: 25 }}>
                {STRINGS.pinCode.addPinMessage}
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
                onPress={submitAdd}
                disabled={!ifFilled || pending}
              >
                {STRINGS.pinCode.buttonAdd.toUpperCase()}
              </Button>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginTop: 20 }}>
                {STRINGS.pinCode.deletePinMessage}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginBottom: 25 }}>
                {STRINGS.pinCode.editPin}
              </Text>
              <View>
                <Input
                  placeholder={STRINGS.pinCode.oldPin}
                  value={oldPin}
                  onChangeText={setOldPin}
                  disabled={pending}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Input
                  placeholder={STRINGS.pinCode.newPin}
                  value={pin}
                  onChangeText={setPin}
                  disabled={pending}
                  keyboardType="number-pad"
                />
              </View>
              <Button
                style={{ height: h, borderRadius: 5, marginBottom: 'auto', marginTop: 5 }}
                onPress={submitEdit}
                disabled={!ifFilled || pending}
              >
                {STRINGS.pinCode.editPin.toUpperCase()}
              </Button>
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginTop: 25 }}>
                  {STRINGS.pinCode.deletePin}
                </Text>
                <Button
                  style={{ height: h, borderRadius: 5, marginBottom: 'auto', marginTop: 15 }}
                  onPress={submitDelete}
                >
                  {STRINGS.pinCode.buttonDelete.toUpperCase()}
                </Button>
              </View>
            </View>
          )}
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
