import React from 'react'
import classNames from 'classnames'
import { useUpdatePartyHaan } from '../../logic/hook/useUpdatePartyHaan'
import Form from '../form'
import Template from '../../template'
import Loading from '../loading'
import Message from '../message'
import styles from './update.module.scss'

const Update = (props) => {
  const cx = classNames(styles['root'], props.className)
  const {
    isLoading,
    errorMsg,
    initialValues,
    handleSubmit,
    clearErrorMsg,
  } = useUpdatePartyHaan()

  return (
    <Template priority="low">
      {isLoading && <Loading />}
      <Message type="error" onClose={clearErrorMsg}>
        {errorMsg}
      </Message>
      <div className={cx}>
        {initialValues && (
          <Form
            imageUrl="https://pbs.twimg.com/profile_images/1227868232922492928/G4GSnxR0_400x400.jpg"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitLabel="แก้ไขปาร์ตี้หาร"
            errorMsg={errorMsg}
          />
        )}
      </div>
    </Template>
  )
}

export default Update
