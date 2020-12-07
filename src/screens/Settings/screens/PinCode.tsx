import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { SettingsStackParamsList } from '../../../navigator/SettingsStack'
import { useKeyboard } from '../../../setup-kit/useKeyboard'
import { Input } from '../../../components/Input'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { notify, sleep } from '../../../utils'
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
  const { keyboardOpened } = useKeyboard()
  const { STRINGS } = useAppLocales()
  const [{ user },dispatch] = useAppState()
  const [subject, setSubject] = React.useState('')
  const [pending, setPending] = React.useState(false)

  const ifFilled = subject.length

  const submit = async () => {
    try {
      setPending(true)
      const payload = await api.setPin('', '', '', '', subject, 'ru')
      dispatch({ type: `SET_PIN`, payload })
      setPending(false)
    } catch (e) {
      captureError(`await api.setPin('', '', '', '', subject, 'ru') ${JSON.stringify(e)}`)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    }
  }
  const addPin = (e:any) => {

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
          <Text style={styles.label}>{STRINGS.pinCode.addPin}</Text>
          <Input
            placeholder={STRINGS.pinCode.addPin}
            value={subject}
            onChangeText={setSubject}
            disabled={pending}
          />
          <Button
            style={{ height: h, borderRadius: 5, marginBottom: 'auto' }}
            onPress={submit}
            disabled={!ifFilled || pending}
          >
            {STRINGS.pinCode.buttonAdd.toUpperCase()}
          </Button>
        </View>
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.label}>{STRINGS.pinCode.deletePin}</Text>
          <Button style={{ height: h, borderRadius: 5, marginBottom: 'auto' }} onPress={submit}>
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
