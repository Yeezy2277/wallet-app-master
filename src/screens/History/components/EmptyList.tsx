import React from 'react'
import { Button, Text, Layout as View } from '@ui-kitten/components'
import { Dimensions, StyleSheet } from 'react-native'

import { StyleGuide } from '../../../StyleGuide'
import { MoneyNotFound } from '../../../components/Icons'
import { useAppLocales } from '../../../setup-kit/locales'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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

const { height } = Dimensions.get('window')

/* eslint-disable no-nested-ternary */
const h = height > 667 ? 70 : height > 568 ? 65 : 50
/* eslint-enable no-nested-ternary */

interface Props {
  onPress: () => void
}

const EmptyList: React.FC<Props> = ({ onPress }: Props) => {
  const { STRINGS } = useAppLocales()
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MoneyNotFound size={30} />
      </View>
      <Text style={styles.primary}>{STRINGS.filters.notFound}</Text>
      <Text style={styles.secondary}>{STRINGS.filters.tryToChange}</Text>
      <Button style={{ height: h, borderRadius: 5, marginTop: 27 }} onPress={onPress}>
        {STRINGS.filters.changeFilter}
      </Button>
    </View>
  )
}

export { EmptyList }
