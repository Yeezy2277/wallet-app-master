import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
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
  const [delPin, setDelPin] = React.useState('')
  const [pending, setPending] = React.useState(false)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const [isPin, setIsPin] = React.useState(false) // state of pin_enabled

  const ifFilledAdd = pin.length === 4
  const ifFilledEdit = pin.length === 4 && oldPin.length === 4
  const ifFilledDelete = delPin.length === 4
  // getting data from server
  React.useEffect(() => {
    try {
      api.getProfile().then((r) => {
        const payload = r
        console.log(r)
        setIsPin(payload.pin_enabled)
        setIsInitialized(true)
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
        const payload = await api.setPin(pin)
        dispatch({ type: `SET_PIN`, payload })
        setIsPin(true)
        setPin('')
      } else if (typeSubmit === 'SUBMIT_EDIT') {
        const payload = await api.setPin(pin, oldPin)
        dispatch({ type: `SET_PIN`, payload })
        setIsPin(true)
        setOldPin('')
        setPin('')
        console.log(payload)
      } else if (typeSubmit === 'SUBMIT_DELETE') {
        await api.setPin('', delPin)
        const payload = await api.getProfile()
        dispatch({ type: `FETCH_PROFILE`, payload })
        setIsPin(false)
        setDelPin('')
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
        message: STRINGS.errors.wrongPin,
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
      <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
        <View style={{ marginBottom: 24, marginTop: 15 }}>
          <Text style={styles.label}>{STRINGS.pinCode.description}</Text>
          {!isInitialized ? (
            <View>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginBottom: 25 }}>
                {STRINGS.pinCode.wait}
              </Text>
              <Image source={{ uri: 'https://i.gifer.com/ZZ5H.gif' }} />
            </View>
          ) : !isPin ? (
            <View>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginBottom: 15 }}>
                {STRINGS.pinCode.addPinMessage}
              </Text>
              <ScrollView keyboardShouldPersistTaps="handled">
                <Input
                  placeholder={STRINGS.pinCode.inputText}
                  value={pin}
                  onChangeText={setPin}
                  disabled={pending}
                  keyboardType="number-pad"
                />
              </ScrollView>
              <Button
                style={{ height: h, borderRadius: 5, marginBottom: 'auto', marginTop: 15 }}
                onPress={submitAdd}
                disabled={!ifFilledAdd || pending}
              >
                {STRINGS.pinCode.buttonAdd.toUpperCase()}
              </Button>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginTop: 15 }}>
                {STRINGS.pinCode.deletePinMessage}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.7, marginBottom: 15 }}>
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
              <View style={{ marginTop: 15 }}>
                <Input
                  placeholder={STRINGS.pinCode.newPin}
                  value={pin}
                  onChangeText={setPin}
                  disabled={pending}
                  keyboardType="number-pad"
                />
              </View>
              <Button
                style={{ height: h, borderRadius: 5, marginBottom: 'auto', marginTop: 15 }}
                onPress={submitEdit}
                disabled={!ifFilledEdit || pending}
              >
                {STRINGS.pinCode.editPin.toUpperCase()}
              </Button>
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 16,
                    opacity: 0.7,
                    marginTop: 25,
                    marginBottom: 15,
                  }}
                >
                  {STRINGS.pinCode.deletePin}
                </Text>
                <Input
                  placeholder={STRINGS.pinCode.oldPin}
                  value={delPin}
                  onChangeText={setDelPin}
                  disabled={pending}
                  keyboardType="number-pad"
                />
                <Button
                  style={{ height: h, borderRadius: 5, marginBottom: 'auto', marginTop: 15 }}
                  onPress={submitDelete}
                  disabled={!ifFilledDelete || pending}
                >
                  {STRINGS.pinCode.buttonDelete.toUpperCase()}
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { PinCode, navigationOptions }
