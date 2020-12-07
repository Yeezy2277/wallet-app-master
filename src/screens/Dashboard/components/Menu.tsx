import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useAppLocales } from '../../../setup-kit/locales'
import { StyleGuide } from '../../../StyleGuide'
import { CoinsSelect, Money, User, Users } from '../../../components/Icons'
import { ROUTES } from '../../../setup-kit/constants'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemText: {
    fontSize: 12,
    lineHeight: 14,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: StyleGuide.colors.brand,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 11,
  },
})

const Icon: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.iconContainer}>{children}</View>
    </View>
  )
}

const Item: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return <View style={{ flex: 1, alignItems: 'center' }}>{children}</View>
}

interface Props {
  nav: (path: ROUTES.Account | ROUTES.Structure | ROUTES.Transaction | ROUTES.Coins) => void
}

const Menu: React.FC<Props> = ({ nav }: Props) => {
  const { STRINGS } = useAppLocales()
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          nav(ROUTES.Account)
        }}
      >
        <Item>
          <Icon>
            <User size={14} />
          </Icon>
          <Text style={styles.itemText}>{STRINGS.home.account}</Text>
        </Item>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          nav(ROUTES.Transaction)
        }}
      >
        <Item>
          <Icon>
            <Money size={20} />
          </Icon>
          <Text style={styles.itemText}>{STRINGS.home.transfers}</Text>
        </Item>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          nav(ROUTES.Structure)
        }}
      >
        <Item>
          <Icon>
            <Users size={18} />
          </Icon>
          <Text style={styles.itemText}>{STRINGS.home.structure}</Text>
        </Item>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          nav(ROUTES.Coins)
        }}
      >
        <Item>
          <Icon>
            <CoinsSelect size={18} />
          </Icon>
          <Text style={styles.itemText}>{STRINGS.home.coins}</Text>
        </Item>
      </TouchableOpacity>
    </View>
  )
}

export { Menu }
