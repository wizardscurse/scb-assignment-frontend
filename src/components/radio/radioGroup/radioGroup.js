import React from 'react'
import { BasicRadioGroup, asField } from 'informed'
import classNames from 'classnames'
import styles from './radioGroup.module.scss'

const getGridTemplateClassName = (length) =>
  `grid-template-${length}`

const RadioGroup = (props) => {
  const { label, fieldState, radios, className, ...rest } =
    props
  const cx = classNames(styles['root'], props.className)
  const gridTemplateClassName = getGridTemplateClassName(
    radios.length,
  )
  const { asyncError, error } = fieldState
  const errorMessage = error || asyncError

  return (
    <div className={cx}>
      <div
        className={classNames(styles['label'], className)}>
        {label}
      </div>
      <div
        className={classNames(
          styles['radio-container'],
          styles[gridTemplateClassName],
        )}>
        <BasicRadioGroup {...rest} fieldState={fieldState}>
          {radios}
        </BasicRadioGroup>
      </div>
      <span
        className={
          errorMessage ? styles['input_error'] : ''
        }>
        {errorMessage}
      </span>
    </div>
  )
}

export default asField(RadioGroup)
