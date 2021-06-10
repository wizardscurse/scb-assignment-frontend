import React from 'react'
import { Users } from 'react-feather'
import classNames from 'classnames'
import { usePartyHaan } from '../../logic/hook/usePartyHaan'
import Template from '../../template'
import Loading from '../loading'
import Message from '../message'
import Button from '../button'
import styles from './detail.module.scss'

const Detail = (props) => {
  const cx = classNames(styles['root'], props.className)

  const {
    partyHaan,
    isLoadign,
    ableEdit,
    ableJoin,
    errorMsg,
    handleEdit,
    handleJoin,
    clearErrorMsg,
  } = usePartyHaan()

  return (
    <Template priority="low">
      <div className={cx}>
        {isLoadign && <Loading />}
        <Message type="error" onClose={clearErrorMsg}>
          {errorMsg}
        </Message>
        <div className={styles['modal']}>
          <img
            src="https://pbs.twimg.com/profile_images/1227868232922492928/G4GSnxR0_400x400.jpg"
            alt="Avatar"
          />
          <div className={styles['title']}>
            {partyHaan?.name}
          </div>
          <div className={styles['container']}>
            <div>รานละเอียด</div>
            <div>{partyHaan?.detail}</div>
            <div className={styles['members']}>
              <Users />
              <p>{`${partyHaan?.currentMember} / ${partyHaan?.limit}`}</p>
            </div>
          </div>
          <div className={styles['button']}>
            <Button
              priority="low"
              onClick={handleEdit}
              disabled={!ableEdit}>
              แก้ไขปาร์ตี้หาร
            </Button>
          </div>
          <div className={styles['button']}>
            <Button
              onClick={handleJoin}
              disabled={!ableJoin}>
              เข้าร่วมปาร์ตี้หาร
            </Button>
          </div>
        </div>
      </div>
    </Template>
  )
}

export default Detail
