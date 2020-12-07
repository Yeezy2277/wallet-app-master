import React from 'react'
import { Layout as View } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { Logo } from '../../../components/Icons'
import { StyleGuide } from '../../../StyleGuide'

const styles = StyleSheet.create({
  logo: {
    width: 76,
    height: 76,
    backgroundColor: StyleGuide.colors.brand,
    borderRadius: 76 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 26,
  },
})

const BrandLogo = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.logo}>
        <Logo size={40} />
      </View>
    </View>
  )
}

export { BrandLogo }
