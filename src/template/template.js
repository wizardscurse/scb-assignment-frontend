import React from 'react'
import classNames from 'classnames'
import Navbar from '../components/navbar'
import styles from './template.module.scss'

const Template = (props) => {
  const cx = classNames(styles['root'], props.className)
  const { children } = props

  return (
    <div className={cx}>
      <Navbar priority={props.priority} />
      {children}
    </div>
  )
}

export default Template
