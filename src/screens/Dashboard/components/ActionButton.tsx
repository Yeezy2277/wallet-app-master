import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTransition } from 'react-native-redash'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { StyleGuide } from '../../../StyleGuide'
import { Chat, Cross, Dots, MoneySend } from '../../../components/Icons'
import { hapticsFeedback } from '../../../utils'

const SIZE = 46
const MARGIN = 15

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2,
    padding: 16,
  },
  withSize: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  withBg: {
    backgroundColor: StyleGuide.colors.brand,
  },
})

interface Props {
  createTransaction: () => void
  composeMessage: () => void
}

const ActionButton: React.FC<Props> = ({ createTransaction, composeMessage }: Props) => {
  const [opened, setOpened] = React.useState<boolean>(false)
  const transition = useTransition(opened, { duration: 150, easing: Easing.exp })

  const translateY = {
    icon1: interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [1 * SIZE, -MARGIN],
    }),
    icon2: interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [2 * SIZE, -2 * MARGIN],
    }),
  }

  const zIndex = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 2],
  })

  const handlePress = () => {
    setOpened((prev) => !prev)
    hapticsFeedback()
  }

  return (
    <Animated.View style={styles.btn}>
      <Animated.View
        style={[
          { zIndex },
          styles.centered,
          styles.withSize,
          { backgroundColor: StyleGuide.colors.white },
          {
            transform: [
              {
                translateY: translateY.icon2,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handlePress()
            composeMessage()
          }}
        >
          <Chat size={16} fill={StyleGuide.colors.brand} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.centered,
          { zIndex },
          styles.withSize,
          { backgroundColor: StyleGuide.colors.white },
          {
            transform: [
              {
                translateY: translateY.icon1,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handlePress()
            createTransaction()
          }}
        >
          <MoneySend size={25} fill={StyleGuide.colors.brand} />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.withBg, styles.withSize]}
        onPress={handlePress}
      >
        <View style={[styles.withSize]}>
          <Animated.View
            style={[
              { ...StyleSheet.absoluteFillObject },
              styles.centered,
              styles.withSize,
              styles.withBg,
              { opacity: opened ? 1 : 0 },
            ]}
          >
            <Cross size={12} />
          </Animated.View>
          <Animated.View
            style={[
              { ...StyleSheet.absoluteFillObject },
              styles.centered,
              styles.withSize,
              styles.withBg,
              { opacity: opened ? 0 : 1 },
            ]}
          >
            <Dots size={25} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export { ActionButton }
