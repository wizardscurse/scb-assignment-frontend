import React from 'react'
import { Form, Text } from 'informed'
import classNames from 'classnames'
import Message from '../../message'
import Button from '../../button'
import Loading from '../../loading'
import styles from './signin.module.scss'

import { useSignIn } from '../../../logic/hook/useSignIn'

const SignIn = (props) => {
  const cx = classNames(styles['root'], props.className)
  const {
    errorMsg,
    clearErrorMsg,
    handleSubmit,
    handleSignUp,
    setFormApi,
    isLoading,
  } = useSignIn()

  return (
    <div className={cx}>
      {isLoading && <Loading />}
      <Message type="error" onClose={clearErrorMsg}>
        {errorMsg}
      </Message>
      <Form
        className={styles['modal']}
        onSubmit={handleSubmit}
        getApi={setFormApi}>
        <div className={styles['image-container']}>
          <img
            className={styles['logo']}
            src="https://www.partyhaan.com/static/media/duck_1.3a0bf0e9.png"
          />
        </div>
        <div className={styles['field']}>
          <label className={styles['input']}>
            <Text
              className={styles['input_field']}
              field="email"
            />
            <span className={styles['input_label']}>
              อีเมล
            </span>
          </label>
        </div>
        <div className={styles['field']}>
          <label className={styles['input']}>
            <Text
              className={styles['input_field']}
              field="password"
              type="password"
            />
            <span className={styles['input_label']}>
              รหัสผ่าน
            </span>
          </label>
        </div>
        <div className={styles['button']}>
          <Button type="submit" priority="high">
            เข้าสู่ระบบ
          </Button>
        </div>
        <div className={styles['button']}>
          <Button onClick={handleSignUp}>
            สร้างบัญชีผู้ใช้
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SignIn
