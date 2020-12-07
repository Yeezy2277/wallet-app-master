import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { StyleGuide } from '../../../StyleGuide'
import { DashboardStackParamsList } from '../../../navigator/DashboardStack'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { Input } from '../../../components/Input'
import { Copy } from '../../../components/Icons'
import { useAppLocales } from '../../../setup-kit/locales'
import { hapticsFeedback, hitSlop, notify } from '../../../utils'
import { useKeyboard } from '../../../setup-kit/useKeyboard'
import { useAppState } from '../../../setup-kit/useAppState'
import { api } from '../../../setup-kit/api'
import { captureError } from '../../../setup-kit/sentry'

const { height } = Dimensions.get('window')

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

const styles = StyleSheet.create({
  itemContainer: {
    height: h,
    backgroundColor: StyleGuide.colors.grey,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.7,
    marginBottom: 12,
  },
})

const defaultAddress = 'ouro...'

type AccountScreenNavigationProp = StackNavigationProp<DashboardStackParamsList, ROUTES.Account>

interface Props {
  navigation: AccountScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.Account>
}

const Account: React.FC<Props> = ({ navigation }: Props) => {
  const { STRINGS } = useAppLocales()
  const [{ user }, dispatch] = useAppState()
  const { keyboardOpened } = useKeyboard()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = React.useState('')
  const [telegram, setTelegram] = React.useState(user?.telegram || '')
  const [pending, setPending] = React.useState(false)

  const address = user?.address || defaultAddress

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

  React.useEffect(() => {
    const eml = user?.email
    if (eml) {
      setEmail(eml)
    }
  }, [user])

  const handleCopy = () => {
    hapticsFeedback()
    Clipboard.setString(address)
  }

  const submit = async () => {
    hapticsFeedback()
    setPending(true)
    try {
      await api.setTelegram(telegram)
      setPending(false)
      notify({
        message: STRINGS.common.success,
        description: '',
        type: 'success',
        floating: true,
      })
      navigation.navigate(ROUTES.Dashboard)
    } catch (e) {
      setPending(false)
      captureError(`await api.setTelegram(${telegram}) ${JSON.stringify(e)}`)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    }
  }

  const haveChanges = telegram !== user?.telegram

  const screenContent = () => {
    return (
      <>
        <View>
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.label}>{STRINGS.account.wallet}</Text>
            <View style={styles.itemContainer}>
              <Text style={{ flex: 3 }}>{address}</Text>
              <TouchableOpacity
                style={{ flex: 1, alignItems: 'flex-end' }}
                onPress={handleCopy}
                hitSlop={hitSlop}
              >
                <Copy size={16} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={styles.label}>{STRINGS.account.email}</Text>
            <Input
              icon="email"
              placeholder={STRINGS.login.email}
              keyboardType="email-address"
              value={email}
              disabled
              onChangeText={setEmail}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={styles.label}>{STRINGS.account.telegram}</Text>
            <Input
              icon="telegram"
              placeholder={STRINGS.account.telegram}
              value={telegram}
              disabled={pending}
              onChangeText={setTelegram}
            />
          </View>
        </View>
        {/* <View style={{ marginBottom: 24 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.label, { opacity: 1, marginBottom: 0, marginRight: 8 }]}>
              {STRINGS.account.changePassword}
            </Text>
            <Key size={13} />
          </TouchableOpacity>
        </View> */}
        <Button
          style={{ height: h, borderRadius: 5, marginBottom: 24 }}
          onPress={submit}
          disabled={!haveChanges || pending}
        >
          {STRINGS.common.save}
        </Button>
      </>
    )
  }

  return Platform.OS === 'ios' ? (
    <KeyboardAwareScrollView
      enableOnAndroid
      style={{ flex: 1, backgroundColor: StyleGuide.colors.background, paddingHorizontal: 16 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={keyboardOpened}
      contentContainerStyle={{
        flexGrow: keyboardOpened ? 0 : 1,
      }}
    >
      {screenContent()}
    </KeyboardAwareScrollView>
  ) : (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: StyleGuide.colors.background,
          paddingHorizontal: 16,
          paddingBottom: keyboardOpened ? 24 : 0,
        }}
      >
        {screenContent()}
      </View>
    </ScrollView>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: StyleGuide.colors.white,
}

export { Account, navigationOptions }
