import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

interface Props {
  height?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

const Devider = ({ height = 1, color = '#C4C4C4', style = {} }: Props) => {
  return <View style={[style, { height, backgroundColor: color }]} />
}

export { Devider }
