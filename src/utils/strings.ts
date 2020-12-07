import { Base64 } from 'js-base64'

export function getExpireTsFromToken(token: string): string {
  console.log(JSON.parse(Base64.decode(token.split('.')[1])))
  return JSON.parse(Base64.decode(token.split('.')[1])).exp.toString()
}
