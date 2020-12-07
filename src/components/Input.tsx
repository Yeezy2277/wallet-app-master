import React from 'react'
import {
  Dimensions,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { StyleGuide } from '../StyleGuide'
import { Email, Key, Search, Telegram, TouchIcon } from './Icons'

const { height } = Dimensions.get('window')

const iconsMapping = {
  email: Email,
  key: Key,
  touch: TouchIcon,
  telegram: Telegram,
  search: Search,
}

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

const styles = StyleSheet.create({
  container: {
    height: h,
    backgroundColor: StyleGuide.colors.grey,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  icon: {
    width: 15,
    height: 15,
  },
  input: {
    height: h,
    fontSize: 16,
    color: '#fff',
    fontFamily: StyleGuide.fonts.textPrimary.fontFamily,
  },
  centered: {
    textAlign: 'center',
  },
})

interface Props {
  icon?: 'email' | 'key' | 'touch' | 'telegram' | 'search'
  placeholder: string
  value: string
  onChangeText: (nextVal: string) => void
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  containerStyle?: StyleProp<ViewStyle>
  centered?: boolean
  multiline?: boolean
  style?: StyleProp<TextStyle>
  textAlignVerticalAndroid?: 'auto' | 'top' | 'bottom' | 'center'
  disabled?: boolean
  maxLength?: number
  onBlur?: () => void
}

const Input: React.FC<Props> = (props: Props) => {
  const {
    icon,
    placeholder,
    disabled,
    keyboardType = 'default',
    secureTextEntry = false,
    containerStyle,
    value,
    style,
    multiline = false,
    centered = false,
    onChangeText,
    onBlur,
    textAlignVerticalAndroid,
    maxLength,
  } = props
  const Icon = icon ? iconsMapping[icon] : null
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flex: 1 }}>
        <TextInput
          value={value}
          editable={!disabled}
          multiline={multiline}
          maxLength={maxLength}
          onChangeText={onChangeText}
          style={[styles.input, centered ? styles.centered : {}, style]}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.7)"
          autoCapitalize="none"
          textAlignVertical={textAlignVerticalAndroid}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
        />
      </View>
      {icon && <View style={styles.icon}>{Icon && <Icon size={15} />}</View>}
    </View>
  )
}

export { Input }
