import React from 'react'
import classNames from 'classnames'
import { useCreatePartyHaan } from '../../logic/hook/useCreatePartyHaan'
import Form from '../form'
import Template from '../../template'
import Loading from '../loading'
import Message from '../message'
import Radio from '../radio/radio'
import styles from './create.module.scss'

const members = ['1', '2', '3', '4']

const Create = (props) => {
  const cx = classNames(styles['root'], props.className)
  const {
    isLoading,
    errorMsg,
    initialValues,
    handleSubmit,
    clearErrorMsg,
  } = useCreatePartyHaan()

  const radios = members.map((member, index) => (
    <Radio key={member} label={member} value={member} />
  ))

  return (
    <Template priority="low">
      <div className={cx}>
        {isLoading && <Loading />}
        <Message type="error" onClose={clearErrorMsg}>
          {errorMsg}
        </Message>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel="สร้างปาร์ตี้หาร"
          errorMsg={errorMsg}
        />
      </div>
    </Template>
  )
}

export default Create
