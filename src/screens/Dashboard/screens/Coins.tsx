import React from 'react'
import { Icon, Text, Layout as View } from '@ui-kitten/components'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSafeArea } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { RouteProp } from '@react-navigation/native'
import { StyleGuide } from '../../../StyleGuide'
import { hitSlop } from '../../../utils'
import { DashboardStackParamsList } from '../../../navigator/DashboardStack'
import { ROUTES } from '../../../setup-kit/constants/routes'
import { Input } from '../../../components/Input'
import { useAppState } from '../../../setup-kit/useAppState'
import { useAppLocales } from '../../../setup-kit/locales'
import { Coin } from '../../../setup-kit/interfaces'
import { defaultCoin } from '../../../setup-kit/constants'
import { Devider } from '../../../components/Devider'
import { StorageKeys, setItem } from '../../../setup-kit/storage'
import { CleanLogo as Logo } from '../../../components/Icons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
  },
  widhBg: {
    backgroundColor: StyleGuide.colors.backgroundLevel2,
  },
  lineBrake: {
    backgroundColor: '#C4C4C4',
    opacity: 0.1,
  },
  coinContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 17,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  coinIcon: {
    marginRight: 14,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30 / 2,
    backgroundColor: StyleGuide.colors.brand,
  },
})

type CoinsScreenNavigationProp = StackNavigationProp<DashboardStackParamsList, ROUTES.Coins>

interface Props {
  navigation: CoinsScreenNavigationProp
  route: RouteProp<DashboardStackParamsList, ROUTES.Account>
}

const CoinItem = ({
  coin,
  onSelect,
  isSelected,
}: {
  coin: Coin
  onSelect: (c: Coin) => void
  isSelected: boolean
}) => {
  const onPress = () => {
    if (isSelected) {
      return
    }
    onSelect(coin)
    setItem(StorageKeys.COIN, coin.symbol)
  }

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <View style={styles.coinContainer}>
        <View style={styles.coinIcon}>
          {coin.symbol === defaultCoin ? (
            <Logo size={20} />
          ) : (
            <Text category="h6">{`${coin.symbol.charAt(0).toUpperCase()}`}</Text>
          )}
        </View>
        <Text style={{ flex: 1 }} category="s1">
          {coin.symbol}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Icon
            width={20}
            height={20}
            name={isSelected ? 'checkmark-circle-2-outline' : 'radio-button-off-outline'}
            fill={StyleGuide.colors.brand}
          />
        </TouchableOpacity>
      </View>
      <Devider style={styles.lineBrake} />
    </View>
  )
}

const keyExtractor = (item: Coin) => item.symbol

const Coins: React.FC<Props> = ({ navigation }: Props) => {
  const { top: paddingTop } = useSafeArea()
  const [{ coins, activeCoin }, dispatch] = useAppState()
  const [query, setQuery] = React.useState<string>('')
  const { STRINGS } = useAppLocales()

  const goBack = () => {
    navigation.goBack()
  }

  const handleSelect = React.useCallback(
    (c: Coin) => {
      dispatch({
        type: 'SELECT_COIN',
        payload: c.symbol,
      })
    },
    [dispatch]
  )

  const renderCoin = React.useCallback(
    ({ item }: { item: Coin }) => {
      const isSelected = activeCoin === item.symbol
      return <CoinItem coin={item} onSelect={handleSelect} isSelected={isSelected} />
    },
    [handleSelect, activeCoin]
  )

  const filteredCoins: Coin[] = !query
    ? coins
    : coins.filter((c) => c.symbol.toLowerCase().includes(query.toLowerCase()))

  return (
    <View style={{ flex: 1, paddingTop }}>
      <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={goBack} hitSlop={hitSlop}>
          <Icon name="close-outline" width={24} height={24} fill={StyleGuide.colors.white} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingRight: 24,
          }}
        >
          <Text style={styles.title}>{STRINGS.home.coinsSelect}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View
          style={[
            {
              marginTop: 21,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              flex: 1,
            },
            styles.widhBg,
          ]}
        >
          <View style={{ padding: 24, backgroundColor: 'transparent' }}>
            <Input
              value={query}
              placeholder={STRINGS.home.coinsSearch}
              onChangeText={setQuery}
              icon="search"
            />
          </View>
          <FlatList
            data={filteredCoins}
            renderItem={renderCoin}
            keyExtractor={keyExtractor}
            ListHeaderComponent={<Devider style={styles.lineBrake} />}
          />
        </View>
      </View>
      <LinearGradient
        colors={['rgba(20, 27, 35, 0)', '#141B23']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 73 }}
      />
    </View>
  )
}

export { Coins }
