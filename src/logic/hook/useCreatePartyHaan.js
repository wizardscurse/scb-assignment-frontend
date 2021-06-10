import { useCallback, useEffect } from 'react'
import { usePartyHaanContext } from '../context/partHaan/partyHaan'

export const useCreatePartyHaan = () => {
  const [
    { isCreating, createError, isCreateSuccess, partyHaan },
    { create, clearError },
  ] = usePartyHaanContext()

  useEffect(() => {
    if (isCreateSuccess) {
      window.location = `/${partyHaan.id}`
    }
  }, [isCreateSuccess])

  const handleSubmit = useCallback(
    ({ name, detail, limit }) => {
      create({ name, detail, limit })
    },
    [create],
  )

  const initialValues = {
    limit: '1',
  }

  const clearErrorMsg = useCallback(() => {
    clearError()
  }, [clearError])

  return {
    isLoading: isCreating,
    errorMsg: createError,
    initialValues,
    handleSubmit,
    clearErrorMsg,
  }
}
