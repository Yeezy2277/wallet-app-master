import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { ActivityIndicator, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { MiningStackParamsList } from '../../../navigator/MiningStack'
import { useAppLocales } from '../../../setup-kit/locales'
import { useAppState } from '../../../setup-kit/useAppState'
import { Input } from '../../../components/Input'
import { KeyboardAwareView } from '../../../components/KeyboardAwareView'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { api } from '../../../setup-kit/api'
import { notify } from '../../../utils'
import { StyleGuide } from '../../../StyleGuide'
import { captureError } from '../../../setup-kit/sentry'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  itemText: {
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
})

type ReinvestScreenNavigationProp = StackNavigationProp<MiningStackParamsList, ROUTES.Reinvest>

interface Props {
  navigation: ReinvestScreenNavigationProp
  route: RouteProp<MiningStackParamsList, ROUTES.Reinvest>
}

const commission = 0.01
const min = 0.02
const rgx1 = /,/gi
const rgx2 = /(\.)+/i
const rgx3 = /\./i

const Reinvest: React.FC<Props> = ({ navigation }: Props) => {
  const { STRINGS } = useAppLocales()
  const [{ user }, dispatch] = useAppState()
  const defaultAmount = user?.reinvest.toString() || min.toString()
  const [value, setValue] = React.useState(defaultAmount)
  const [pending, setPenging] = React.useState(false)

  const handleTransformValue = (v: string) => {
    return v.replace(rgx1, '.').replace(rgx2, '.')
  }

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
    let res = handleTransformValue(value)
    const [left, right] = res.split('.')
    if (left && !right) {
      res = res.replace(rgx3, '')
    }
    const reinvest = parseFloat(res)

    if (reinvest < 0) {
      setValue(defaultAmount)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.lessThanZero,
        type: 'warning',
        floating: true,
      })
      return
    }
    if (reinvest < min) {
      setValue(defaultAmount)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.lessThanMin(min.toString()),
        type: 'warning',
        floating: true,
      })
      return
    }

    setPenging(true)
    try {
      await api.setReinvest(reinvest)
      setPenging(false)
      notify({
        message: STRINGS.common.success,
        description: '',
        type: 'success',
        floating: true,
      })
      navigation.goBack()
    } catch (e) {
      captureError(`await api.setReinvest(${reinvest}) ${JSON.stringify(e)}`)
      setPenging(false)
      notify({
        message: STRINGS.errors.common,
        description: STRINGS.errors.tryAgain,
        type: 'danger',
        floating: true,
      })
    }
  }

  const handleChage = (v: string) => {
    if (v === '.') {
      return
    }
    if (v === ',') {
      return
    }
    setValue(handleTransformValue(v))
  }

  const onBlur = () => {
    const res = handleTransformValue(value)
    const [left, right] = res.split('.')
    if (left && !right) {
      setValue(res.replace(rgx3, ''))
    }
  }

  return (
    <KeyboardAwareView>
      <TouchableWithoutFeedback
        style={{ width: '100%' }}
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <View style={styles.container}>
          <Text style={styles.itemText}>{STRINGS.postmining.reinvestDescription}</Text>
          <Text style={[styles.itemText, styles.bold, { marginBottom: 12 }]}>
            {`${STRINGS.postmining.reinvestComission} - ${commission} OURO.`}
          </Text>
          <View>
            <Text style={[styles.itemText, { opacity: 0.7, marginBottom: 12 }]}>
              {STRINGS.postmining.reinvestValue}
            </Text>
            <Input
              value={value.toString()}
              centered
              placeholder={STRINGS.postmining.reinvestValue}
              keyboardType="numeric"
              onChangeText={handleChage}
              onBlur={onBlur}
              disabled={pending}
            />
            <Button
              disabled={!value || pending}
              style={{ height: 70, borderRadius: 5, marginBottom: 'auto', marginTop: 20 }}
              onPress={submit}
            >
              {pending
                ? () => <ActivityIndicator color={StyleGuide.colors.white} />
                : STRINGS.common.save.toUpperCase()}
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareView>
  )
}

const navigationOptions = {
  headerBackTitleVisible: false,
  headerTintColor: '#fff',
}

export { Reinvest, navigationOptions }
