import React from 'react'
import classNames from 'classnames'
import { Users, Clock, Plus } from 'react-feather'
import { usePartiesHaan } from '../../logic/hook/usePartiesHaan'
import { dateFormat } from '../../logic/util/dateFormat'
import Message from '../message'
import Button from '../button'
import Template from '../../template'
import Loading from '../loading'
import Card from '../card'
import styles from './home.module.scss'

const Home = (props) => {
  const cx = classNames(styles['root'], props.className)
  const {
    partiesHaan,
    isLoading,
    errorMsg,
    handleClickCreate,
    handleClick,
    clearErrorMsg,
    handleJoin,
  } = usePartiesHaan()

  return (
    <Template>
      {isLoading && <Loading />}
      <Message type="error" onClose={clearErrorMsg}>
        {errorMsg}
      </Message>
      <div className={cx}>
        <div className={styles['container']}>
          {partiesHaan?.map((party) => (
            <div key={party.id} className={styles['card']}>
              <Card
                id={party.id}
                isAvailable={
                  party.currentMember < party.limit
                }
                isJoined={party.joined}
                isFull={party.currentMember === party.limit}
                title={party.name}
                imageUrl="https://pbs.twimg.com/profile_images/1227868232922492928/G4GSnxR0_400x400.jpg">
                <div className={styles['card-container']}>
                  <div
                    className={styles['detail-container']}>
                    <div>
                      <Users />
                      <p>{`${party.currentMember} / ${party.limit}`}</p>
                    </div>
                    <div>
                      <Clock />
                      <p>
                        {dateFormat(
                          new Date(party.createdDate),
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    className={styles['button-container']}>
                    <Button
                      onClick={() => handleClick(party.id)}>
                      ละเอียด
                    </Button>
                  </div>
                  <div
                    className={styles['button-container']}>
                    <Button
                      disabled={party.joined}
                      onClick={() => handleJoin(party.id)}>
                      เข้าร่วม
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
          <Plus
            onClick={handleClickCreate}
            className={styles['create-button']}
            width="80"
            height="80"
          />
        </div>
      </div>
    </Template>
  )
}

export default Home
