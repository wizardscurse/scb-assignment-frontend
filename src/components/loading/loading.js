import React from 'react'
import classNames from 'classnames'
import styles from './loading.module.scss'

const Loading = (props) => {
  const cx = classNames(styles['root'], props.className)
  return <div className={cx} />
}

export default Loading
