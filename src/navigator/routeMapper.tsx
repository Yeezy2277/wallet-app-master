import React from 'react'
import { ROUTES } from '../setup-kit/constants'
import { History, Settings, Wallet, Waves } from '../components/Icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bottomTabsRoutesMapping: any = {
  [ROUTES.DashboardTab]: {
    Icon: () => <Wallet size={24} />,
    name: {
      ru: 'Кошелек',
      en: 'Wallet',
    },
  },
  [ROUTES.MiningTab]: {
    Icon: () => <Waves size={24} />,
    name: {
      ru: 'Посмайнинг',
      en: 'Posmining',
    },
  },
  [ROUTES.HistoryTab]: {
    Icon: () => <History size={24} />,
    name: {
      ru: 'История',
      en: 'History',
    },
  },
  [ROUTES.SettingsTab]: {
    Icon: () => <Settings size={24} />,
    name: {
      ru: 'Настройки',
      en: 'Settings',
    },
  },
}

export { bottomTabsRoutesMapping }
