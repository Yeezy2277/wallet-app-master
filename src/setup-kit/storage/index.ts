import AsyncStorage from '@react-native-community/async-storage'
import SecureStore, { ACCESSIBLE } from 'rn-secure-storage'

enum StorageKeys {
  LANG = 'LANG',
  FIRST_TIME_LAUNCH = 'FIRST_TIME_LAUNCH',
  PIN = 'PIN',
  BIOMETRIC = 'BIOMETRIC',
  COIN = 'COIN',
  MY_ADDRESS = 'MY_ADDRESS',
}
// SecureStore.remove(StorageKeys.PIN)

async function setItem<T>(key: StorageKeys, value: T): Promise<void> {
  const val = await AsyncStorage.setItem(key, JSON.stringify(value))
  return val
}

async function clearItem(key: StorageKeys): Promise<void> {
  await AsyncStorage.removeItem(key)
}

async function getItem<T>(key: StorageKeys): Promise<T | undefined> {
  const data = await AsyncStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

async function clear(): Promise<void> {
  await AsyncStorage.clear()
}

const setSecure = async (pin: string) => {
  await SecureStore.set(StorageKeys.PIN, pin, {
    accessible: ACCESSIBLE.ALWAYS,
  })
}

const getSecure = async (key: StorageKeys): Promise<string> => {
  try {
    const pin = await SecureStore.get(key)
    return pin || ''
  } catch {
    return ''
  }
}

const clearSecure = async () => {
  await SecureStore.remove(StorageKeys.PIN)
}

export { clear, clearItem, StorageKeys, getItem, setItem, setSecure, getSecure, clearSecure }
