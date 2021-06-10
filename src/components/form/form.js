import React from 'react'
import { Form as InForm } from 'informed'
import classNames from 'classnames'
import { isRequired } from '../../logic/util/formValidators'
import Button from '../button'
import RadioGroup from '../radio/radioGroup'
import Radio from '../radio/radio'
import TextInput from '../textInput'
import styles from './form.module.scss'

const members = [1, 2, 3, 4]

const Form = (props) => {
  const cx = classNames(styles['root'], props.className)

  const { submitLabel, onSubmit, initialValues, imageUrl } =
    props

  const radios = members.map((member) => (
    <Radio key={member} label={member} value={member} />
  ))

  return (
    <div className={cx}>
      <InForm
        initialValues={initialValues}
        className={styles['modal']}
        onSubmit={onSubmit}>
        {imageUrl && <img src={imageUrl} alt="Avatar" />}
        <div className={styles['field']}>
          <TextInput
            id="name"
            field="name"
            label="ชื่อในปาร์ตี้หาร"
            validate={isRequired}
          />
        </div>
        <div className={styles['field']}>
          <TextInput
            id="detail"
            field="detail"
            label="เพิ่มรายละเอียดเกี่ยวกับปาร์ตี้"
            validate={isRequired}
          />
        </div>
        <div className={styles['field']}>
          <RadioGroup
            field="limit"
            validate={isRequired}
            radios={radios}
            label={
              'ระบุจำนวนสมาชิกที่ต้องการ (ไม่รวมผู้สร้างปาร์ตี้)'
            }
          />
        </div>
        <div className={styles['button']}>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </InForm>
    </div>
  )
}

export default Form
