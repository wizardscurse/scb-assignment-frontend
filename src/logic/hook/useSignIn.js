import { useCallback, useState, useRef } from 'react'
import { useUserContext } from '../context/user/user'
import { post } from '../util/api'

export const useSignIn = () => {
  const [
    { isSigningIn, signInError },
    { signIn, clearError },
  ] = useUserContext()
  const [errorMsg, setErrorMsg] = useState('')
  const formApiRef = useRef(null)
  const setFormApi = useCallback(
    (api) => (formApiRef.current = api),
    [],
  )

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      const formValue = formApiRef.current.getValues()
      if (!formValue?.email || !formValue?.password) {
        setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        return
      }
      await signIn({
        email,
        password,
      })
    },
    [post, signIn],
  )

  const clearErrorMsg = useCallback(() => {
    setErrorMsg('')
    clearError()
  }, [clearError])

  const handleSignUp = useCallback(() => {
    window.location = '/signup'
  }, [])

  return {
    handleSubmit,
    handleSignUp,
    clearErrorMsg,
    setFormApi,
    errorMsg: errorMsg || signInError,
    isLoading: isSigningIn,
  }
}
