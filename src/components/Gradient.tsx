import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { StyleProp, ViewStyle } from 'react-native'

interface Props {
  style?: StyleProp<ViewStyle>
}

const Gradient: React.FC<Props> = ({ style = {} }: Props) => {
  return (
    <LinearGradient
      colors={['transparent', '#141B23']}
      style={[{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 73 }, style]}
    />
  )
}

export { Gradient }
