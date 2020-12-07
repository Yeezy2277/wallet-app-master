import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { Platform } from 'react-native'

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
}

const hapticsFeedback = () => {
  if (Platform.OS === 'ios') {
    ReactNativeHapticFeedback.trigger('impactLight', options)
  } else {
    ReactNativeHapticFeedback.trigger('impactMedium', options)
  }
}

export { hapticsFeedback }
