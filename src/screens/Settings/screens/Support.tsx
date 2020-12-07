import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { format } from 'date-fns'
import { RouteProp } from '@react-navigation/native'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { SettingsStackParamsList } from '../../../navigator/SettingsStack'
import { useKeyboard } from '../../../setup-kit/useKeyboard'
import { Input } from '../../../components/Input'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { addFeedback } from '../../../setup-kit/airtable'
import { useAppState } from '../../../setup-kit/useAppState'
import { captureError } from '../../../setup-kit/sentry'
import { notify } from '../../../utils'

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

type SupportScreenNavigationProp = StackNavigationProp<SettingsStackParamsList, ROUTES.Support>

interface Props {
  navigation: SupportScreenNavigationProp
  route: RouteProp<SettingsStackParamsList, ROUTES.Support>
}

const Support: React.FC<Props> = ({ navigation }: Props) => {
  const { keyboardOpened } = useKeyboard()
  const { STRINGS } = useAppLocales()
  const [{ user }] = useAppState()
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [pending, setPending] = React.useState(false)

  const ifFilled = subject.length && message.length

  const submit = async () => {
    setPending(true)
    try {
      await addFeedback({
        message,
        subject,
        user: user?.email || 'unknown',
        day: format(new Date(), 'yyyy-MM-dd'),
      })
      setPending(false)
      notify({
        message: STRINGS.common.success,
        description: '',
        type: 'success',
        floating: true,
      })
      navigation.navigate(ROUTES.Settings)
    } catch (e) {
      captureError(`await addFeedback ${JSON.stringify(e)}`)
      setPending(false)
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
          <Text style={styles.label}>{STRINGS.support.theme}</Text>
          <Input
            placeholder={STRINGS.support.theme}
            value={subject}
            onChangeText={setSubject}
            disabled={pending}
          />
        </View>
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.label}>{STRINGS.support.question}</Text>
          <Input
            placeholder={STRINGS.support.describe}
            disabled={pending}
            value={message}
            containerStyle={{ height: 167, paddingVertical: 20 }}
            onChangeText={setMessage}
            multiline
            textAlignVerticalAndroid="top"
            style={{ flex: 1 }}
          />
        </View>
        <Button
          style={{ height: h, borderRadius: 5, marginBottom: 'auto' }}
          onPress={submit}
          disabled={!ifFilled || pending}
        >
          {STRINGS.support.button.toUpperCase()}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { Support, navigationOptions }
