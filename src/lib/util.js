export const toArray = (object) => {
  const array = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      array.push({ id: key, ...object[key] })
    }
  }
  return array
}

export const toDateLocale = (datetimeInMilliseconds) => {
  return new Date(datetimeInMilliseconds).toLocaleDateString()
}

export const toDateInput = (datetimeInMilliseconds) => {
  const date = new Date(datetimeInMilliseconds)
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  mm = mm < 10 ? `0${mm}` : mm
  dd = dd < 10 ? `0${dd}` : dd
  return `${yyyy}-${mm}-${dd}`
}
