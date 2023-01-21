import dayjs from "dayjs"

export function generateDatesFromYearBeginning() {
  const firstDayOfYear = dayjs().startOf("year")
  const today = dayjs()

  const dates = []
  let compareDate = firstDayOfYear

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, "day")
  }

  return dates
}
