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
