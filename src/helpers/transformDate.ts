export const transformDate = (date: Date) => {
  const timeDatabase: Date = new Date(date)
  const actualTime: Date = new Date(timeDatabase.getTime())
  const timeString: string = actualTime.toString()
  const timeMessage = timeString.split(' ')
  const timeAux = timeMessage[4].split(':')
  const timeMessageLessSeconds = timeAux[0] + ':' + timeAux[1]
  const dateReturn =
    timeMessage[1] + ' ' + timeMessage[2] + ' ' + timeMessage[3]
  interface dateObject {
    date: string
    time: string
  }
  const returnObject: dateObject = {
    date: dateReturn,
    time: timeMessageLessSeconds
  }
  return returnObject
}
