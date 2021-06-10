import React from 'react'
import classNames from 'classnames'
import { useUserContext } from '../../logic/context/user/user'
import styles from './navbar.module.scss'

const Navbar = (props) => {
  const cx = classNames(
    props.priority === 'low'
      ? styles['root-low']
      : styles['root'],
    props.className,
  )
  const [{}, { signOut }] = useUserContext()

  return (
    <div className={cx}>
      <a href="/">หน้าแรก</a>
      <div className={styles['navbar-right']}>
        <a onClick={signOut}>ออกจากระบบ</a>
      </div>
    </div>
  )
}

export default Navbar
