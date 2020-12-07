/* eslint-disable no-nested-ternary */
import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AuthStackParamsList } from '../../navigator/AuthStack'

import { ROUTES } from '../../setup-kit/constants'
import { hapticsFeedback } from '../../utils'

import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamsList, ROUTES.Auth>

interface Props {
  navigation: AuthScreenNavigationProp
  route: RouteProp<AuthStackParamsList, ROUTES.Auth>
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

enum Screens {
  signIn,
  signUp,
}

const Auth: React.FC<Props> = ({ navigation, route }: Props) => {
  const [screen, setScreen] = React.useState<Screens>(Screens.signIn)
  const ref = React.useRef<TransitioningView>(null)

  const handleAnimate = () => {
    if (ref.current) {
      ref.current.animateNextTransition()
    }
  }

  const openSignIn = React.useCallback(() => {
    handleAnimate()
    hapticsFeedback()
    setScreen(Screens.signIn)
  }, [])

  const openSignUp = React.useCallback(() => {
    handleAnimate()
    hapticsFeedback()
    setScreen(Screens.signUp)
  }, [])

  return (
    <Transitioning.View {...{ transition, ref }} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {screen === Screens.signIn ? (
          <SignIn handleChangeAuthType={openSignUp} navigation={navigation} route={route} />
        ) : (
          <SignUp handleChangeAuthType={openSignIn} navigation={navigation} route={route} />
        )}
      </View>
    </Transitioning.View>
  )
}

export { Auth }
