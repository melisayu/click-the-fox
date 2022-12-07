/**
 * Generate random id.
 **/
export function generateId (): string {
  const S4 = (): string => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * Generate today's date.
 **/
export function getDate (): string {
  const today = new Date()
  const year = today.getFullYear().toString()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const formattedDate = day.toString() + '-' + month.toString() + '-' + year.toString()
  return formattedDate
}
