import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import isEmpty from '../util/isEmpty'
import { usePartyHaanContext } from '../context/partHaan/partyHaan'

export const useUpdatePartyHaan = () => {
  const [
    { isUpdating, updateError, isUpdateSuccess, partyHaan },
    { update, getById, clearError },
  ] = usePartyHaanContext()
  const [errorMsg, setErrorMsg] = useState('')
  const { pathname } = useLocation()
  const partyId = pathname.split('/').pop()

  useEffect(() => {
    if (partyId) {
      getById(partyId)
    }
  }, [getById])

  useEffect(() => {
    if (isUpdateSuccess) {
      window.location = `/${partyHaan.id}`
    }
  }, [isUpdateSuccess])

  const handleSubmit = useCallback(
    (values) => {
      if (partyId && partyHaan) {
        const limit = values.limit + 1
        if (limit < partyHaan.currentMember) {
          setErrorMsg(
            `ไม่สามารถแก้ไขจำนวนสมาชิกได้ เพราะว่าจำนวนสมาชิกปัจจุบันอยู่ที่ ${partyHaan.currentMember} คน`,
          )
          return
        }
        update({
          id: partyId,
          name: values.name,
          detail: values.detail,
          limit,
        })
      }
    },
    [partyHaan, update],
  )

  const initialValues = useMemo(() => {
    if (!isEmpty(partyHaan)) {
      return {
        name: partyHaan.name,
        detail: partyHaan.detail,
        limit: partyHaan.limit - 1,
        currentMember: partyHaan.currentMember,
      }
    }
  }, [partyHaan])

  const clearErrorMsg = useCallback(() => {
    clearError()
    setErrorMsg('')
  }, [clearError, setErrorMsg])

  return {
    isLoading: isUpdating,
    errorMsg: errorMsg || updateError,
    initialValues,
    handleSubmit,
    clearErrorMsg,
  }
}
