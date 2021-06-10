import React from 'react'
import { BasicText, asField } from 'informed'
import classNames from 'classnames'
import styles from './textInput.module.scss'

const TextInput = (props) => {
  const { label, fieldState, message, className, ...rest } =
    props
  const cx = classNames(styles['root'], props.className)
  const { asyncError, error } = fieldState
  const errorMessage = error || asyncError

  return (
    <div className={cx}>
      <label>{label}</label>
      <BasicText
        {...rest}
        fieldState={fieldState}
        className={
          errorMessage ? styles['input_error'] : ''
        }
      />
      <span
        className={
          errorMessage ? styles['input_error'] : ''
        }>
        {errorMessage}
      </span>
    </div>
  )
}

export default asField(TextInput)
