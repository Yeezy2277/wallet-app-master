export const removeLineBrakes = (str: string) => str.replace(/(\r\n|\n|\r)/gm, ' ')
export const removeSpaces = (str: string) => str.replace(/\s/g, '')

/* eslint-disable no-useless-escape */
export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
/* eslint-enable no-useless-escape */
