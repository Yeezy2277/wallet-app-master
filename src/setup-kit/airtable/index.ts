import Airtable from 'airtable'
import { Platform } from 'react-native'

const AIRTABLE_API_KEY = 'keyZjWH1xAU88uyd1'
const AIRTABLE_DB = 'appuvIayFvJRvtOu2'

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_DB)

const platform = Platform.OS

const addFeedback = async ({
  user,
  message,
  subject,
  day,
}: {
  user: string
  message: string
  subject: string
  day: string
}) => {
  await base('Feedback').create({
    user,
    subject,
    message,
    day,
    platform,
  })
}
export { base as airtable, addFeedback }
