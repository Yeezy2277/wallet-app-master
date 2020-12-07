import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useAppLocales } from '../../../setup-kit/locales'
import { Filter } from '../../../components/Icons'
import { hitSlop } from '../../../utils'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 11,
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
})

interface Props {
  handleFilter: () => void
}

const Header: React.FC<Props> = ({ handleFilter }: Props) => {
  const { STRINGS } = useAppLocales()
  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingLeft: 17 + 20,
        }}
      >
        <Text style={styles.text}>{STRINGS.history.title}</Text>
      </View>
      <TouchableOpacity style={{ marginRight: 20 }} onPress={handleFilter} hitSlop={hitSlop}>
        <Filter size={17} />
      </TouchableOpacity>
    </View>
  )
}

export { Header }
