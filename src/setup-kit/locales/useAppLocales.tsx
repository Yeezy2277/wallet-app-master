import React from 'react'
import * as RNLocalize from 'react-native-localize'
import { AppLocale, STRINGS } from './strings'
import { StorageKeys, getItem } from '../storage'
import { noop } from '../../utils'

type Lang = 'en' | 'ru'

export const getUserLang = (): Lang => {
  const locales = RNLocalize.getLocales()

  const { languageCode } = locales[0]

  return languageCode === 'ru' ? 'ru' : 'en'
}

export const lang = getUserLang()

const Context = React.createContext<{
  STRINGS: AppLocale
  locale: Lang
  ready: boolean
  changeLang: (l: Lang) => void
}>({
  STRINGS: STRINGS.ru,
  locale: 'ru',
  ready: false,
  changeLang: noop,
})

export const AppLocalesProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setState] = React.useState<Lang>(lang)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const init = async () => {
      const savedLang = await getItem<Lang>(StorageKeys.LANG)
      if (savedLang) {
        setState(savedLang)
      }
      setReady(true)
    }
    init()
  }, [])

  const changeLang = React.useCallback((l: Lang) => {
    setState(l)
  }, [])

  return (
    <Context.Provider value={{ STRINGS: STRINGS[state], locale: state, ready, changeLang }}>
      {children}
    </Context.Provider>
  )
}

export function useAppLocales() {
  return React.useContext(Context)
}
