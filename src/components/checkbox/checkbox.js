import React from 'react'
import { BasicCheckbox, asField } from 'informed'
import classNames from 'classnames'
import styles from './checkbox.module.scss'

const Checkbox = (props) => {
  const { label, fieldState, message, className, ...rest } =
    props
  const cx = classNames(styles['root'], props.className)
  const { asyncError, error } = fieldState
  const errorMessage = error || asyncError

  return (
    <div className={cx}>
      <label
        className={styles['checkbox-container']}
        for="consent">
        {label}
        <BasicCheckbox
          {...rest}
          fieldState={fieldState}
          className={
            errorMessage ? styles['input_error'] : ''
          }
        />
        <span
          className={`${styles['checkmark']} ${
            errorMessage ? styles['checkmark_error'] : ''
          }`}></span>
      </label>
    </div>
  )
}

export default asField(Checkbox)
