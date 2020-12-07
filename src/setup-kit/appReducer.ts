import { Action, Store } from './interfaces'

const now = new Date()
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)

/* eslint-disable @typescript-eslint/camelcase */
const initialState: Store = {
  authAttempted: false,
  auth: null,

  coins: [],
  activeCoin: '',
  system: {
    loaded: false,
    maintenance: false,
    usd_rate: 0.008,
  },
  posmining: {
    savings_coff: 0.0,
    structure_coff: 0.0,
    correction_coff: 0.0,
    start_daily_percent: 0.0,
    days_since_last_tx: 0,
    daily_percent: 0.0,
    coins_per_time: { hour: 0.0, minute: 0.0, second: 0.0, day: 0.0 },
    posmined: 0.0,
  },
  /* eslint-enable @typescript-eslint/camelcase */

  user: null,

  transactions: {
    latest: [],
    filtered: [],
    pages: 1,
  },
  filters: {
    type: 'all',
    from: firstDay,
    to: new Date(),
  },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const appStateReducer = (state: Store, action: Action<any>): Store => {
  switch (action.type) {
    case 'AUTH_CHANGE': {
      const { isAuthenticated, pin = '', pinChecked = false } = action.payload
      return { ...state, auth: { isAuthenticated, pin, pinChecked }, authAttempted: true }
    }

    case 'FILTER_HISTORY': {
      return { ...state, filters: { ...state.filters, ...action.payload } }
    }

    case 'FILTER_HISTORY_BY_TYPE': {
      return { ...state, filters: { ...state.filters, ...action.payload } }
    }

    case 'FETCH_COINS': {
      return { ...state, coins: action.payload }
    }

    case 'FETCH_SYSTEM': {
      return { ...state, system: { ...action.payload, loaded: true } }
    }

    case 'SELECT_COIN': {
      return { ...state, activeCoin: action.payload }
    }

    case 'FETCH_PROFILE': {
      return { ...state, user: action.payload }
    }

    case 'LATEST_TRANSACTIONS': {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          latest: action.payload,
        },
      }
    }

    case 'ADD_TRANSACTIONS': {
      const { results, pages } = action.payload
      return {
        ...state,
        transactions: {
          ...state.transactions,
          filtered: [...state.transactions.filtered, ...results],
          pages: pages !== undefined ? pages : state.transactions.pages,
        },
      }
    }

    case 'REPLACE_TRANSACTIONS': {
      const { results, pages } = action.payload
      return {
        ...state,
        transactions: {
          ...state.transactions,
          filtered: results,
          pages: pages !== undefined ? pages : state.transactions.pages,
        },
      }
    }

    case 'POSMINING': {
      return {
        ...state,
        posmining: { ...action.payload },
      }
    }

    default:
      return state
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export { initialState, appStateReducer }
