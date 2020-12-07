import React from 'react'
import {
  CalendarProps,
  I18nConfig,
  NativeDateService,
  Calendar as UiKittenCalendar,
} from '@ui-kitten/components'
import { useAppLocales } from '../setup-kit/locales'

const i18n: I18nConfig = {
  dayNames: {
    short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  },
  monthNames: {
    short: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    long: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  },
}

const localeDateService = new NativeDateService('ru', { i18n, startDayOfWeek: 1 })

const Calendar: React.FC<CalendarProps> = (props) => {
  const { locale } = useAppLocales()
  if (locale === 'en') {
    return <UiKittenCalendar {...props} min={new Date('1900-01-01')} />
  }
  return (
    <UiKittenCalendar dateService={localeDateService} {...props} min={new Date('1900-01-01')} />
  )
}

export { Calendar }
