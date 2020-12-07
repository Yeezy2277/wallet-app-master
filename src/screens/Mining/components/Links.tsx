import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Layout as View } from '@ui-kitten/components'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { Devider } from '../../../components/Devider'
import { Chevron, List, Reinvest } from '../../../components/Icons'
import { ROUTES } from '../../../setup-kit/constants/routes'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 13,
    lineHeight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: StyleGuide.colors.brand,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
})

interface Props {
  nav: (path: ROUTES.Reinvest | ROUTES.Rules) => void
}

const Links: React.FC<Props> = ({ nav }: Props) => {
  const { STRINGS } = useAppLocales()
  return (
    <View>
      <Devider style={{ marginTop: 27, opacity: 0.1 }} />
      <TouchableOpacity onPress={() => nav(ROUTES.Rules)}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <List size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>{STRINGS.postmining.rules}</Text>
          </View>
          <View>
            <Chevron size={8} direction="right" />
          </View>
        </View>
      </TouchableOpacity>
      <Devider style={{ opacity: 0.1 }} />
      <TouchableOpacity onPress={() => nav(ROUTES.Reinvest)}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Reinvest size={15} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemText}>{STRINGS.postmining.reinvest}</Text>
          </View>
          <View>
            <Chevron size={8} direction="right" />
          </View>
        </View>
      </TouchableOpacity>
      <Devider style={{ opacity: 0.1 }} />
    </View>
  )
}

export { Links }
