import React from 'react'
import { Form } from 'informed'
import classNames from 'classnames'
import { useSignUp } from '../../../logic/hook/useSignUp'
import { isRequired } from '../../../logic/util/formValidators'
import Loading from '../../loading'
import TextInput from '../../textInput'
import Checkbox from '../../checkbox'
import Button from '../../button'
import Message from '../../message'
import styles from './signUp.module.scss'

const SignUp = (props) => {
  const cx = classNames(styles['root'], props.className)
  const {
    handleSubmit,
    setFormApi,
    clearErrorMsg,
    isLoading,
    errorMsg,
  } = useSignUp()

  return (
    <div className={cx}>
      {isLoading && <Loading />}
      <Message type="error" onClose={clearErrorMsg}>
        {errorMsg}
      </Message>
      <Form
        className={styles['modal']}
        getApi={setFormApi}
        onSubmit={handleSubmit}>
        <div className={styles['image-container']}>
          <img
            className={styles['logo']}
            src="https://www.partyhaan.com/static/media/duck_2.ae6402a2.png"
          />
        </div>
        <div className={styles['field']}>
          <div className={styles['input']}>
            <TextInput
              id="email"
              field="email"
              label="อีเมล"
              validate={isRequired}
            />
          </div>
        </div>
        <div className={styles['field']}>
          <div className={styles['input']}>
            <TextInput
              id="name"
              field="name"
              label="ชื่อในปาร์ตี้หาร"
              validate={isRequired}
            />
          </div>
        </div>
        <div className={styles['field']}>
          <div className={styles['input']}>
            <TextInput
              id="password"
              field="password"
              type="password"
              label="รหัสผ่าน"
              validate={isRequired}
            />
          </div>
        </div>
        <div className={styles['field']}>
          <div className={styles['input']}>
            <TextInput
              id="confirmPassword"
              field="confirmPassword"
              type="password"
              label="ยืนยันรหัสผ่าน"
              validate={isRequired}
            />
          </div>
        </div>
        <div className={styles['container']}>
          <Checkbox
            field="consent"
            id="consent"
            label="ฉันยอมรับ เงื่อนไขและข้อตกลง
            เกี่ยวกับการใช้งาน PatyHaan
            รวมถึงนโยบายความเป็นส่วนตัว"
            validate={isRequired}
          />
        </div>
        <div className={styles['button']}>
          <Button type="submit" priority="low">
            สร้างบัญชีผู้ใช้
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SignUp
