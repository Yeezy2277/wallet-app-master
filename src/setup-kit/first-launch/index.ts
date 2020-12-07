import { StorageKeys, getItem, setItem } from '../storage'
import { parseDate } from '../../utils'

export interface FirstLaunchProperties {
  installedAt: string
}

class FirstLaunchService {
  public getFirstLaunchDate = async (): Promise<Date | undefined> => {
    const ms = await getItem<string>(StorageKeys.FIRST_TIME_LAUNCH)
    return ms ? parseDate(ms) : undefined
  }

  public markCurrentDate = async (): Promise<Date> => {
    const launchDate = new Date()
    await setItem(StorageKeys.FIRST_TIME_LAUNCH, launchDate.getTime().toString())
    return launchDate
  }

  public resolveProperties = async () => {
    const ms = await getItem<string>(StorageKeys.FIRST_TIME_LAUNCH)

    const payload: FirstLaunchProperties = {
      installedAt: ms ? parseDate(ms).toISOString() : new Date().toISOString(),
    }
    return payload
  }
}

const firstLaunchService = new FirstLaunchService()
export { firstLaunchService }
