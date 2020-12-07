export interface Action<T> {
  type: string
  payload: T
  extra?: { onSuccess: () => void; onFail: () => void }
}

export type Nullable<T> = T | null

export type Auth = { isAuthenticated: boolean; pin: string; pinChecked: boolean }

export interface CoinBalance {
  symbol: string // 'ouro'
  amount: number // 1000.0
}

// 1) логин первый раз после установки
// 2) просим создать ПИН код
// 3) просим подтвердить ПИН код
// 4) сохраняем его в кеш

export interface Profile {
  balances: CoinBalance[]
  posmining_history: { amount: number; date: string }[]
  reinvest: number // 0.0
  address: string // 'ouro1nynkd5t8tkplulwkel9p5eqxnzd3hl7q6pvrzy'
  email: string // 'test-account@ouroboros-crypto.com'
  email_confirmed: boolean // false
  fa_enabled: boolean // false
  telegram: string
}

export interface Coin {
  posmining_enabled: boolean
  default: boolean
  name: string // "Ouroboros"
  symbol: string // "ouro"
}

export type Fltr = 'all' | 'sent' | 'received' | 'reinvest'

export interface Store {
  authAttempted: boolean
  system: SystemServerSide & { loaded: boolean }
  auth: Nullable<Auth>
  coins: Coin[]
  user: Nullable<Profile>
  activeCoin: string
  posmining: PosminingServerSide
  transactions: {
    latest: TransactionServerSide[]
    filtered: TransactionServerSide[]
    pages: number
  }
  filters: {
    from: Date
    to: Date
    type: Fltr
  }
}

export type TransactionType = 'transfer' | 'undelegate' | 'reward' | 'delegate' | 'reinvest'

export interface TransactionServerSide {
  type: TransactionType
  amount: {
    amount: number // 1000.0
    symbol: string // 'ouro'
  }
  fee: {
    symbol: string // 'ouro'
    amount: number // 0.75
  }
  posmined: {
    amount: number // 196.17342
    symbol: string // 'ouro'
  }
  timestamp: string // '2020-07-22T13:37:45Z'
  hash: string // '617BF102A8A2422CA5CA26E3D1F00F1D073D4D8FB0A00E6123A783B4D6E9A405'
  sender: string // 'ouro1d3jrv73kefknnh3sqst6u765ah3w9mkppw0tjh'
  recipient: string // 'ouro1nynkd5t8tkplulwkel9p5eqxnzd3hl7q6pvrzy'
  success: boolean // true
  height: number // 203510
}

export interface UserAuth {
  id: number
  name: Nullable<string>
  phone: Nullable<string>
  phoneConfirmed: boolean
  rating: Nullable<string>
  status: number
  email: Nullable<string>
  chatId: Nullable<string>
  contactPhone: Nullable<string>
  contactEmail: Nullable<string>
  contactTelegram: Nullable<string>
  password: Nullable<string>
  role: Nullable<string>
  feedbacksQnt: number
}

export interface StructureServerSide {
  max_level: number // 2;
  balance: number // 39.910188;
  followers: number // 2
}

export interface SystemServerSide {
  maintenance: boolean
  usd_rate: number
}

export interface PosminingServerSide {
  savings_coff: number // 0.0
  structure_coff: number // 0.0
  correction_coff: number // 20.0
  start_daily_percent: number // 0.06
  daily_percent: number // 0.009
  days_since_last_tx: number // 1
  coins_per_time: {
    hour: number // 0.011042
    minute: number // 0.000184
    second: number // 3e-6
    day: number // 0.26503
  }
  posmined: number // 0.20791
}

export interface CreateTxPayload {
  address: string
  type: TransactionType
  amount: {
    symbol: string
    amount: number
  }
}
