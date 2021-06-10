import React from 'react'
import classNames from 'classnames'
import styles from './card.module.scss'

const Card = (props) => {
  const cx = classNames(styles['root'], props.className)
  const {
    imageUrl,
    title,
    children,
    isAvailable,
    isJoined,
    isFull,
  } = props

  const renderBadge = () => {
    if (isJoined) {
      return (
        <span
          className={classNames(
            styles['badge'],
            styles['joined'],
          )}>
          เข้าร่วมปาร์ตี้แล้ว
        </span>
      )
    }

    if (isFull) {
      return (
        <span
          className={classNames(
            styles['badge'],
            styles['full'],
          )}>
          เต็ม
        </span>
      )
    }

    if (isAvailable) {
      return (
        <span
          className={classNames(
            styles['badge'],
            styles['available'],
          )}>
          ว่าง
        </span>
      )
    }
  }

  return (
    <div className={cx}>
      <img src={imageUrl} alt="Avatar" />
      <div className={styles['container']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['details-container']}>
          {children}
        </div>
      </div>
      {}
      {renderBadge()}
    </div>
  )
}

export default Card
