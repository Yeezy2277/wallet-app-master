import React from 'react'
import { Action, Store } from './interfaces'
import { noop } from '../utils'
import { initialState as initial } from './appReducer'

/* eslint-disable @typescript-eslint/no-explicit-any */
type CTX = [Store, React.Dispatch<Action<any>>]
const Context = React.createContext<CTX>([initial, noop])

interface P {
  reducer: (state: Store, action: Action<any>) => Store
  initialState: Store
  children: React.ReactNode
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function AppStateProvider(props: P) {
  const { reducer, initialState, children } = props
  const value = React.useReducer(reducer, initialState)
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppState() {
  return React.useContext(Context)
}
