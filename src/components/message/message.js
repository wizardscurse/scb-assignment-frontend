import React from 'react'
import {
  oneOf,
  shape,
  string,
  bool,
  func,
} from 'prop-types'
import classNames from 'classnames'
import styles from './message.module.scss'

const getRootClassName = (type) => `root_${type}Type`

const Message = (props) => {
  const { type, onClose, children, ...restProps } = props
  const rootClassName = getRootClassName(type)
  const cx = classNames(
    styles['root'],
    !children && styles['hidden'],
    styles[rootClassName],
    props.className,
  )

  return (
    <div className={cx} {...restProps}>
      <span
        className={styles['closebtn']}
        onClick={() => {
          onClose()
        }}>
        &times;
      </span>
      {children}
    </div>
  )
}

Message.propTypes = {
  classes: shape({
    content: string,
    root: string,
    root_errorType: string,
    root_informationType: string,
    root_waringType: string,
  }),
  type: oneOf(['error', 'information', 'waring'])
    .isRequired,
  onClose: func,
}

Message.defaultProps = {
  type: 'information',
}
export default Message
