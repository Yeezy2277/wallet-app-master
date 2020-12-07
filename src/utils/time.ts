const getCurrentTs = (): number => new Date().getTime() / 1000

const parseDate = (ms: string): Date => new Date(parseInt(ms, 10))

export { getCurrentTs, parseDate }
