import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { useAppLocales } from '../../../setup-kit/locales'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 11,
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
})

const Header = () => {
  const { STRINGS } = useAppLocales()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{STRINGS.settings.title}</Text>
    </View>
  )
}

export { Header }
