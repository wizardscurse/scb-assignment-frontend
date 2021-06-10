import React from 'react'
import { oneOf, shape, string, bool } from 'prop-types'
import classNames from 'classnames'
import styles from './button.module.scss'

const getRootClassName = (priority) =>
  `root_${priority}Priority`

const Button = (props) => {
  const {
    type,
    children,
    priority,
    disabled,
    ...restProps
  } = props

  const rootClassName = getRootClassName(priority)

  const cx = classNames(
    styles['root'],
    styles[rootClassName],
    disabled && styles['disable'],
    props.className,
  )

  return (
    <button
      className={cx}
      type={type}
      disabled={disabled}
      {...restProps}>
      <span className={styles['content']}>{children}</span>
    </button>
  )
}

Button.propTypes = {
  className: shape({
    content: string,
    root: string,
    root_highPriority: string,
    root_lowPriority: string,
    root_normalPriority: string,
  }),
  priority: oneOf(['high', 'low', 'normal']).isRequired,
  type: oneOf(['button', 'reset', 'submit']).isRequired,
  disabled: bool,
}

Button.defaultProps = {
  priority: 'normal',
  type: 'button',
  disabled: false,
}

export default Button
