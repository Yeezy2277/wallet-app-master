import SecureStore, { ACCESSIBLE } from 'rn-secure-storage'
import { getCurrentTs, getExpireTsFromToken } from '../../utils'

enum Keys {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  accessExp = 'accessExp',
  refreshExp = 'refreshExp',
}

export type AuthStatus = 'authenticated' | 'refreshRequired'

class Token {
  setAccessToken = async (token: string) => {
    await SecureStore.set(Keys.accessToken, token, {
      accessible: ACCESSIBLE.ALWAYS,
    })
  }

  setRefreshToken = async (token: string) => {
    await SecureStore.set(Keys.refreshToken, token, {
      accessible: ACCESSIBLE.ALWAYS,
    })
  }

  setAccessExpiration = async (accessToken: string) => {
    const accessExp = getExpireTsFromToken(accessToken)

    await SecureStore.set(Keys.accessExp, accessExp, {
      accessible: ACCESSIBLE.ALWAYS,
    })
  }

  setRefreshExpiration = async (refreshToken: string) => {
    const refreshExp = getExpireTsFromToken(refreshToken)

    await SecureStore.set(Keys.refreshExp, refreshExp, {
      accessible: ACCESSIBLE.ALWAYS,
    })
  }

  isExpired = async (t: Keys.accessExp | Keys.refreshExp): Promise<boolean> => {
    try {
      const expirationTime = await SecureStore.get(t)

      if (!expirationTime) {
        return true
      }

      const time = parseInt(expirationTime, 10)
      const now = getCurrentTs()
      return now > time
    } catch {
      return true
    }
  }

  getAccessToken = async (): Promise<string> => {
    try {
      const token = await SecureStore.get('accessToken')
      return token || ''
    } catch {
      return ''
    }
  }

  getRefreshToken = async (): Promise<string> => {
    try {
      const token = await SecureStore.get('refreshToken')
      return token || ''
    } catch {
      return ''
    }
  }

  clear = async (callback?: () => void): Promise<void> => {
    const promises = [
      SecureStore.set(Keys.accessToken, '', { accessible: ACCESSIBLE.ALWAYS }),
      SecureStore.set(Keys.refreshToken, '', { accessible: ACCESSIBLE.ALWAYS }),
      SecureStore.set(Keys.accessExp, '', {
        accessible: ACCESSIBLE.ALWAYS,
      }),
      SecureStore.set(Keys.refreshExp, '', {
        accessible: ACCESSIBLE.ALWAYS,
      }),
    ]

    await Promise.all(promises)

    if (callback) {
      callback()
    }
  }
}

const tokenService = new Token()

export { tokenService, Keys }
