export const dateFormat = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let numOfDay = date.getDate()

  let hour = date.getHours().toString().padStart(2, '0')
  let minutes = date
    .getMinutes()
    .toString()
    .padStart(2, '0')

  return `${numOfDay}/${month}/${year} ${hour}:${minutes}`
}
