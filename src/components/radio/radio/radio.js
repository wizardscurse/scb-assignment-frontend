import React from 'react'
import { Radio } from 'informed'
import classNames from 'classnames'
import styles from './radio.module.scss'

const RadioOption = (props) => {
  const { className, id, label, value, ...rest } = props
  const cx = classNames(
    styles['root'],
    styles['label'],
    props.className,
  )

  return (
    <div className={cx}>
      <label className={styles['label']} htmlFor={id}>
        <Radio
          {...rest}
          className={styles['input']}
          id={id}
          value={value}
        />
        <span className={styles['span']}>
          {label || (value != null ? value : '')}
        </span>
      </label>
    </div>
  )
}

export default RadioOption
