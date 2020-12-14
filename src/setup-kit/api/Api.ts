/* eslint-disable lines-between-class-members */
import axiosModule from 'axios'
import { AuthStatus, Keys, tokenService } from '../token/Token'
import { ouroHost } from '../constants'
import {
  Coin,
  CreateTxPayload,
  PosminingServerSide,
  Profile,
  StructureServerSide,
  SystemServerSide,
  TransactionServerSide,
} from '../interfaces'

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=UTF-8',
}

enum ApiErrorTypes {
  KeyNotPresent = 'KeyNotPresent',
  RefreshFailed = 'RefreshFailed',
}

const axios = axiosModule.create()

axios.interceptors.response.use(
  (response) => {
    return response
  },
  // eslint-disable-next-line func-names
  function (error) {
    return Promise.reject(error.response.data)
  }
)

class Api {
  private checkAuthState = async (): Promise<AuthStatus> => {
    const isAccessExpired = await tokenService.isExpired(Keys.accessExp)
    if (!isAccessExpired) {
      return 'authenticated'
    }

    return 'refreshRequired'
  }

  private authHeaders = async (): Promise<{
    Authorization: string
  }> => {
    const auth = await this.checkAuthState()
    if (auth === 'authenticated') {
      try {
        const token = await tokenService.getAccessToken()
        return { Authorization: `JWT ${token}` }
      } catch (e) {
        throw new Error(ApiErrorTypes.KeyNotPresent)
      }
    }
    if (auth === 'refreshRequired') {
      try {
        const refreshToken = await tokenService.getRefreshToken()

        const { jwt: newAccess, refresh: newRefresh } = await this.refreshToken({
          refreshToken,
        })

        await tokenService.setAccessToken(newAccess)
        await tokenService.setAccessExpiration(newAccess)
        await tokenService.setRefreshToken(newRefresh)

        return { Authorization: `JWT ${newAccess}` }
      } catch (e) {
        await tokenService.clear()
        throw new Error(ApiErrorTypes.RefreshFailed)
      }
    } else {
      throw new Error(ApiErrorTypes.RefreshFailed)
    }
  }

  public login = async ({
    email,
    password,
    fa,
  }: {
    email: string
    password: string
    fa?: string
  }) => {
    const url = `${ouroHost}/login`
    const resp = await axios.post<{
      jwt: string
      refresh: string
      success: boolean
      message: 'fa_required' | 'login successful!'
    }>(
      url,
      { email, password, fa },
      {
        headers: {
          ...defaultHeaders,
        },
      }
    )
    return resp.data
  }

  public register = async ({ email, password }: { email: string; password: string }) => {
    const url = `${ouroHost}/register`
    const resp = await axios.post<{ jwt: string; refresh: string; message: string }>(
      url,
      {
        email,
        password,
      },
      {
        headers: {
          ...defaultHeaders,
        },
      }
    )
    return resp.data
  }

  public refreshToken = async ({ refreshToken }: { refreshToken: string }) => {
    const url = `${ouroHost}/token/refresh`
    const resp = await axios.post<{ jwt: string; refresh: string }>(
      url,
      { token: refreshToken },
      {
        headers: {
          ...defaultHeaders,
        },
      }
    )
    return resp.data
  }

  public getCoins = async () => {
    const url = `${ouroHost}/coins`
    const resp = await axios.get<Coin[]>(url, {
      headers: {
        ...defaultHeaders,
      },
    })
    return resp.data
  }

  public postFcmToken = async (payload: {
    fcmToken: string
    deviceId: string
    platform: string
  }) => {
    const url = `${ouroHost}/notifications/token`
    const authHeaders = await this.authHeaders()
    const resp = await axios.post(url, payload, {
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    })
    return resp.data
  }

  public getProfile = async () => {
    const url = `${ouroHost}/profile`
    const authHeaders = await this.authHeaders()
    const resp = await axios.get<Profile>(url, {
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    })
    return resp.data
  }

  public getLatestTxs = async (coin: string) => {
    const url = `${ouroHost}/txs?coin=${coin}`
    const authHeaders = await this.authHeaders()
    const resp = await axios.get<{
      pages: number // 1
      results: TransactionServerSide[]
      total: number // 1
      limit: number // 25
      page: number // 1
    }>(url, {
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    })
    return resp.data
  }

  public getTxs = async ({
    type,
    from,
    to,
    page = 1,
    limit,
    coin,
  }: {
    type: 'all' | 'sent' | 'received' | 'reinvest'
    to: string
    from: string
    page?: number
    limit: number
    coin: string
  }) => {
    const url = `${ouroHost}/txs?type=${type}&from=${from}&to=${to}&page=${page}&limit=${limit}&coin=${coin}`
    const authHeaders = await this.authHeaders()
    const resp = await axios.get<{
      pages: number // 1
      results: TransactionServerSide[]
      total: number // 1
      limit: number // 25
      page: number // 1
    }>(url, {
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    })
    return resp.data
  }

  public system = async () => {
    const url = `${ouroHost}/system`
    const resp = await axios.get<SystemServerSide>(url, {
      headers: {
        ...defaultHeaders,
      },
    })
    return resp.data
  }

  public getStructure = async ({ coin }: { coin: string }) => {
    const url = `${ouroHost}/coins/${coin}/structure`
    const authHeaders = await this.authHeaders()
    const resp = await axios.get<StructureServerSide>(url, {
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    })
    return resp.data
  }

  public getPosmining = async ({ coin }: { coin: string }) => {
    const url = `${ouroHost}/coins/${coin}/posmining`
    const authHeaders = await this.authHeaders()
    const resp = await axios.get<PosminingServerSide>(url, {
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    })
    return resp.data
  }

  public setReinvest = async (reinvest: number) => {
    const url = `${ouroHost}/profile`
    const authHeaders = await this.authHeaders()
    const resp = await axios.put<unknown>(
      url,
      { reinvest },
      {
        headers: {
          ...defaultHeaders,
          ...authHeaders,
        },
      }
    )
    return resp.data
  }

  public setTelegram = async (telegram: string) => {
    const url = `${ouroHost}/profile`
    const authHeaders = await this.authHeaders()
    const resp = await axios.put<unknown>(
      url,
      { telegram },
      {
        headers: {
          ...defaultHeaders,
          ...authHeaders,
        },
      }
    )
    return resp.data
  }
  public setPin = async (pin: string) => {
    const url = `${ouroHost}/profile`
    const authHeaders = await this.authHeaders()
    const resp = await axios.put<unknown>(
      url,
      { pin },
      {
        headers: {
          ...defaultHeaders,
          ...authHeaders,
        },
      }
    )
    return resp.data
  }

  public createTx = async (data: CreateTxPayload) => {
    const url = `${ouroHost}/txs`
    const authHeaders = await this.authHeaders()
    const resp = await axios.post<{ txhash: string }>(
      url,
      { ...data },
      {
        headers: {
          ...defaultHeaders,
          ...authHeaders,
        },
      }
    )
    return resp.data
  }
}

const api = new Api()

export { api }
