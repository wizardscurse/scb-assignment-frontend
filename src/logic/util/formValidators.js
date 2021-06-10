const SUCCESS = undefined

export const isRequired = (value, customText) => {
  const FAILURE = 'โปรดระบุ'
  if (typeof customText === 'string') {
    FAILURE = customText.length ? 'โปรดระบุ' : customText
  }

  if (!value) return FAILURE
  const stringValue = String(value).trim()
  if (!stringValue.length) return FAILURE
  return SUCCESS
}
