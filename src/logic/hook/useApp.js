import { useEffect } from 'react'
import { useUserContext } from '../../logic/context/user/user'

export const useApp = () => {
  const [{ isSignedIn, token }, { getDetail }] =
    useUserContext()

  useEffect(() => {
    getDetail()
  }, [getDetail])

  return {
    isSignedIn,
    token,
  }
}
