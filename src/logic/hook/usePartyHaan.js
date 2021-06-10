import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePartyHaanContext } from '../context/partHaan/partyHaan'
import { useUserContext } from '../context/user/user'

export const usePartyHaan = () => {
  const [
    {
      partyHaan,
      isGetting,
      isAdding,
      getError,
      addMemberError,
    },
    { getById, addMember, clearError },
  ] = usePartyHaanContext()
  const [{ currentUser }] = useUserContext()
  const [errorMsg, setErrorMsg] = useState('')
  const { pathname } = useLocation()
  const partyId = pathname.split('/').pop()

  useEffect(() => {
    getById(partyId)
  }, [getById])

  const handleEdit = useCallback(() => {
    window.location = `update/${partyId}`
  }, [])

  const handleJoin = useCallback(() => {
    addMember(partyHaan?.id)
  }, [partyHaan, addMember])

  const clearErrorMsg = useCallback(() => {
    clearError()
    setErrorMsg('')
  }, [clearError])

  return {
    partyHaan,
    isLoading: isGetting || isAdding,
    errorMsg: getError || addMemberError || errorMsg,
    ableEdit: partyHaan?.createdBy === currentUser?.id,
    ableJoin:
      partyHaan?.createdBy !== currentUser?.id &&
      !partyHaan?.joined,
    handleEdit,
    handleJoin,
    clearErrorMsg,
  }
}
