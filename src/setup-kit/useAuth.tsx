import React from 'react'
import { useAppState } from './useAppState'
import { notify } from '../utils'
import { api } from './api'
import { AuthStatus, Keys, tokenService } from './token/Token'
import { useAppLocales } from './locales'
import { StorageKeys, getSecure } from './storage'
import { captureError } from './sentry'

function useAuth() {
  const [{ authAttempted, auth }, dispatch] = useAppState()
  const { STRINGS } = useAppLocales()

  const setLoggedIn = React.useCallback(
    async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
      const pin = await getSecure(StorageKeys.PIN)
      dispatch({
        type: 'AUTH_CHANGE',
        payload: { isAuthenticated: isLoggedIn, pin, pinChecked: false },
      })
    },
    [dispatch]
  )

  React.useEffect(() => {
    const checkAuthState = async () => {
      const getAuthState = async (): Promise<AuthStatus> => {
        const isAccessExpired = await tokenService.isExpired(Keys.accessExp)
        if (!isAccessExpired) {
          return 'authenticated'
        }
        return 'refreshRequired'
      }

      const authState = await getAuthState()

      if (authState === 'authenticated') {
        setLoggedIn({ isLoggedIn: true })
      }
      if (authState === 'refreshRequired') {
        const refreshToken = await tokenService.getRefreshToken()
        const isEmpty = !refreshToken
        if (isEmpty) {
          setLoggedIn({ isLoggedIn: false })
          return
        }
        try {
          const { jwt: newAccess, refresh: newRefresh } = await api.refreshToken({
            refreshToken,
          })
          await tokenService.setAccessToken(newAccess)
          await tokenService.setAccessExpiration(newAccess)
          await tokenService.setRefreshToken(newRefresh)

          setLoggedIn({ isLoggedIn: true })
        } catch (e) {
          await tokenService.clear()
          setLoggedIn({ isLoggedIn: false })
          captureError(`await api.refreshToken({ refreshToken }) ${JSON.stringify(e)}`)
          notify({
            message: STRINGS.errors.loginRequired,
            description: STRINGS.errors.loginRequiredDescription,
            type: 'warning',
            floating: true,
          })
        }
      }
    }
    checkAuthState()
  }, [dispatch, setLoggedIn, STRINGS])

  return { authAttempted, auth }
}

export { useAuth }
