import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import { TransactionServerSide } from '../setup-kit/interfaces'
import type { TransactionType } from '../setup-kit/interfaces'
import { StyleGuide } from '../StyleGuide'
import { Arrow, ArrowInCircle, Reward, TxReinvest } from './Icons'
import { useAppLocales } from '../setup-kit/locales'

const styles = StyleSheet.create({
  withBg: {
    backgroundColor: StyleGuide.colors.backgroundLevel2,
  },
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 75,
    borderRadius: 5,
    marginBottom: 10,
  },
  box: {
    marginRight: 19,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  in: {
    backgroundColor: StyleGuide.colors.success,
    shadowColor: 'rgb(67, 162, 96)',
  },
  out: {
    backgroundColor: StyleGuide.colors.danger,
    shadowColor: StyleGuide.colors.danger,
  },
  posmined: {
    backgroundColor: StyleGuide.colors.brand,
    shadowColor: StyleGuide.colors.brand,
  },
  type: {
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 11,
    lineHeight: 13,
    opacity: 0.5,
  },
  shadow: {
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 5,
  },
})

const locales = {
  ru,
  en: enGB,
}

interface Props {
  transaction: TransactionServerSide
  myAddress: string
  handleOpen: (t: TransactionServerSide) => void
}

const Transaction = ({ transaction, handleOpen, myAddress }: Props) => {
  const { STRINGS, locale } = useAppLocales()
  const { titles } = STRINGS.transaction

  const { sender, timestamp, amount, type: txType, posmined } = transaction

  const date = new Date(timestamp)

  const formattedDate = format(date, 'd MMMM yyyy', {
    locale: locales[locale],
  })

  const onPress = () => {
    handleOpen(transaction)
  }

  const getType = (): 'in' | 'out' => {
    if (txType === 'reward' || txType === 'reinvest') {
      return 'in'
    }
    if (txType === 'delegate') {
      return 'out'
    }
    if (txType === 'undelegate') {
      return 'in'
    }
    return sender === myAddress ? 'out' : 'in'
  }

  const type = getType()

  const parseLowValue = (n: number): number => {
    const [, v2] = n.toString().split('.')
    const arr = v2.split('')
    const idx = arr.findIndex((d) => d !== '0')
    return parseFloat(n.toFixed(idx + 1))
  }

  const getNum = (n: number): number => {
    if (Math.trunc(n) === n) {
      return n
    }
    return parseLowValue(n)
  }

  const txAmount =
    txType !== 'reinvest'
      ? `${getNum(amount.amount)} ${amount.symbol.toUpperCase()}`
      : `${getNum(posmined.amount)} ${posmined.symbol.toUpperCase()}`

  const getTitle = () => {
    const mapping: { [key in TransactionType]: string } = {
      reward: titles.reward,
      transfer: type === 'in' ? titles.in : titles.out,
      delegate: titles.delegate,
      undelegate: titles.undelegate,
      reinvest: titles.reinvest,
    }

    return mapping[txType]
  }

  const title = getTitle()

  const getIcon = () => {
    if (txType === 'reward') {
      return <Reward size={15} />
    }
    if (txType === 'reinvest') {
      return <TxReinvest size={15} />
    }
    if (txType === 'delegate' || txType === 'undelegate') {
      return <ArrowInCircle size={21} direction={type === 'out' ? 'right' : 'left'} />
    }

    return <Arrow size={14} direction={type === 'in' ? 'right' : 'left'} />
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, styles.withBg]}>
        <View
          style={[
            styles.box,
            type === 'in' ? styles.in : styles.out,
            styles.shadow,
            txType === 'reinvest' ? styles.posmined : undefined,
          ]}
        >
          {getIcon()}
        </View>
        <View style={[{ flex: 1 }, styles.withBg]}>
          <Text style={styles.type}>{title}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={[{ alignItems: 'flex-end' }, styles.withBg]}>
          <Text style={styles.type}>{`${type === 'in' ? '+' : '-'}${txAmount}`}</Text>
          {/* <Text style={styles.date}>0.378$</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export { Transaction }
