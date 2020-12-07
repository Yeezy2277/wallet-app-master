import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Layout as View } from '@ui-kitten/components'
import { StyleGuide } from '../StyleGuide'

const { width } = Dimensions.get('window')

const padding = 16

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  withShadow: {
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: StyleGuide.colors.shadow,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  container: {
    marginHorizontal: 32,
    borderRadius: 16,
    backgroundColor: '#fdfcff',
    padding,
    width: width * 0.8,
    height: 300,
  },
})

interface ModalBoxProps {
  visible: boolean
}

const ModalBox = ({ visible, children }: React.PropsWithChildren<ModalBoxProps>) => {
  return (
    <View
      style={[styles.root, { opacity: visible ? 1 : 0 }]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      {visible && <View style={[styles.container, styles.withShadow]}>{children}</View>}
    </View>
  )
}

export { ModalBox }
