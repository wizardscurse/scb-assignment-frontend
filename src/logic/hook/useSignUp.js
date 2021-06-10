import { useCallback, useState, useRef } from 'react'
import { useUserContext } from '../context/user/user'
import { post } from '../util/api'

export const useSignUp = () => {
  const [
    { isSigningUp, signUpError },
    { signUp, clearError },
  ] = useUserContext()
  const [errorMsg, setErrorMsg] = useState('')
  const formApiRef = useRef(null)
  const setFormApi = useCallback(
    (api) => (formApiRef.current = api),
    [],
  )
  const handleSubmit = useCallback(
    async ({ email, name, password, confirmPassword }) => {
      const formValue = formApiRef.current.getValues()
      if (
        formValue.password !== formValue.confirmPassword
      ) {
        setErrorMsg('รหัสผ่านไม่ตรงกัน')
        return
      }
      clearErrorMsg()
      await signUp({
        email,
        name,
        password,
        confirmPassword,
      })
    },
    [post],
  )

  const clearErrorMsg = useCallback(() => {
    setErrorMsg()
    clearError()
  }, [clearError])

  return {
    handleSubmit,
    setFormApi,
    clearErrorMsg,
    isLoading: isSigningUp,
    errorMsg: errorMsg || signUpError,
  }
}
