import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: width - 20,
    height: 57 + 10 + 6 + 58 + 1 + 58,
    marginHorizontal: 10,
  },
})

interface Props {
  zIndex: Animated.Node<number>
  translateY: Animated.Node<number>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gestureHandler: { onHandlerStateChange: (...args: any[]) => void }
}

const { cond, eq } = Animated

const AnimatedBottomSheet = ({
  children,
  translateY,
  gestureHandler,
  zIndex,
}: React.PropsWithChildren<Props>) => {
  const opacity = interpolate(translateY, {
    inputRange: [0, 299, 300],
    outputRange: [1, 0, 0],
  })
  const pointerEvents = cond(eq(opacity, 1), 'auto', 'none')
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          pointerEvents={pointerEvents}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex,
            opacity,
          }}
        />
      </TapGestureHandler>
      <Animated.View
        style={{
          ...styles.bottomSheet,
          transform: [{ translateY }],
          zIndex: 100,
        }}
      >
        {children}
      </Animated.View>
    </>
  )
}
export { AnimatedBottomSheet }
