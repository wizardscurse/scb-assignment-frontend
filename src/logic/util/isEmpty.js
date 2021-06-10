const isEmpty = (value) => {
  const type = typeof value

  switch (type) {
    case 'object':
      return (
        value &&
        Object.keys(value).length === 0 &&
        value.constructor === Object
      )
    default:
      return !value
  }
}

export default isEmpty
