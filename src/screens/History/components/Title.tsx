import React from 'react'
import { Text, Layout as View } from '@ui-kitten/components'
import { format } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import { useAppLocales } from '../../../setup-kit/locales'
import { useAppState } from '../../../setup-kit/useAppState'

const locales = {
  ru,
  en: enGB,
}

const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const Title = () => {
  const { locale } = useAppLocales()
  const [
    {
      filters: { from, to },
    },
  ] = useAppState()

  const formatDate = (d: Date) => {
    return format(d, 'd MMMM yyyy', {
      locale: locales[locale],
    })
  }

  const formatMonth = (d: Date) => {
    return capitalize(
      format(d, 'LLLL', {
        locale: locales[locale],
      })
    )
  }

  return (
    <View style={{ alignItems: 'center', marginBottom: 35 }}>
      <Text style={{ fontSize: 28, lineHeight: 33, marginBottom: 11 }}>
        {formatMonth(new Date())}
      </Text>
      <Text style={{ fontSize: 13, lineHeight: 16, opacity: 0.5 }}>
        {`${formatDate(from)} - ${formatDate(to)}`}
      </Text>
    </View>
  )
}

export { Title }
