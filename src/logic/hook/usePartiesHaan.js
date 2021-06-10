import { useCallback, useEffect } from 'react'
import { usePartyHaanContext } from '../context/partHaan/partyHaan'
import { useUserContext } from '../context/user/user'

export const usePartiesHaan = () => {
  const [
    {
      partiesHaan,
      isGetting,
      isAdding,
      isAddMemberSuccess,
      addMemberError,
    },
    { get, addMember, clearError },
  ] = usePartyHaanContext()
  const [{ currentUser }] = useUserContext()
  const { id } = currentUser

  useEffect(() => {
    get()
  }, [get])

  useEffect(() => {
    if (isAddMemberSuccess) {
      get()
    }
  }, [isAddMemberSuccess, get])

  const handleClick = useCallback((id) => {
    window.location = `/${id}`
  }, [])

  const handleClickCreate = useCallback(() => {
    window.location = '/create'
  }, [])

  const handleJoin = useCallback(
    (id) => {
      addMember(id)
    },
    [addMember],
  )

  const clearErrorMsg = useCallback(() => {
    clearError()
  }, [clearError])

  return {
    partiesHaan,
    isLoading: isGetting || isAdding,
    errorMsg: addMemberError,
    handleJoin,
    handleClick,
    handleClickCreate,
    clearErrorMsg,
  }
}
