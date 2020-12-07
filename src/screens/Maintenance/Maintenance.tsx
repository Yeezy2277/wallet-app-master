import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Layout as View } from '@ui-kitten/components'
import { useAppLocales } from '../../setup-kit/locales'
import { BrandLogo } from '../Dashboard/components'
import { StyleGuide } from '../../StyleGuide'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 33,
    marginBottom: 8,
  },
  secondary: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.5,
  },
  icon: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
    marginBottom: 24,
    backgroundColor: StyleGuide.colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})

const Maintenance = () => {
  const { STRINGS } = useAppLocales()
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <BrandLogo />
      </View>
      <Text style={styles.primary}>{STRINGS.maintenance.title}</Text>
      <Text style={styles.secondary}>{STRINGS.maintenance.message}</Text>
    </View>
  )
}

export { Maintenance }
