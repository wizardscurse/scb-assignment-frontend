import { useReducer, useCallback, useMemo } from 'react'
import {
  get as getApi,
  post as postApi,
  patch as patchApi,
  remove as removeApi,
} from '../../util/api'

export const types = {
  GET_PARTY_HAAN_REQUEST:
    'PARTYHAAN/GET_PARTY_HAAN_REQUEST',
  GET_PARTY_HAAN_RECEIVE:
    'PARTYHAAN/GET_PARTY_HAAN_RECEIVE',
  GET_PARTY_HAAN_FAIL: 'PARTYHAAN/GET_PARTY_HAAN_FAIL',
  GET_PARTY_HAAN_BY_ID_REQUEST:
    'PARTYHAAN/GET_PARTY_HAAN_BY_ID_REQUEST',
  GET_PARTY_HAAN_BY_ID_RECEIVE:
    'PARTYHAAN/GET_PARTY_HAAN_BY_ID_RECEIVE',
  GET_PARTY_HAAN_BY_ID_FAIL:
    'PARTYHAAN/GET_PARTY_HAAN_BY_ID_FAIL',
  CREATE_PARTY_HAAN_REQUEST:
    'PARTYHAAN/CREATE_PARTY_HAAN_REQUEST',
  CREATE_PARTY_HAAN_RECEIVE:
    'PARTYHAAN/CREATE_PARTY_HAAN_RECEIVE',
  CREATE_PARTY_HAAN_FAIL:
    'PARTYHAAN/CREATE_PARTY_HAAN_FAIL',
  UPDATE_PARTY_HAAN_REQUEST:
    'PARTYHAAN/UPDATE_PARTY_HAAN_REQUEST',
  UPDATE_PARTY_HAAN_RECEIVE:
    'PARTYHAAN/UPDATE_PARTY_HAAN_RECEIVE',
  UPDATE_PARTY_HAAN_FAIL:
    'PARTYHAAN/UPDATE_PARTY_HAAN_FAIL',
  ADD_MEMBER_PARTY_HAAN_REQUEST:
    'PARTYHAAN/ADD_MEMBER_PARTY_HAAN_REQUEST',
  ADD_MEMBER_PARTY_HAAN_RECEIVE:
    'PARTYHAAN/ADD_MEMBER_PARTY_HAAN_RECEIVE',
  ADD_MEMBER__PARTY_HAAN_FAIL:
    'PARTYHAAN/ADD_MEMBER_PARTY_HAAN_FAIL',
  DELETE_PARTY_HAAN_REQUEST:
    'PARTYHAAN/DELETE_PARTY_HAAN_REQUEST',
  DELETE_PARTY_HAAN_RECEIVE:
    'PARTYHAAN/DELETE_PARTY_HAAN_RECEIVE',
  DELETE_PARTY_HAAN_FAIL:
    'PARTYHAAN/DELETE_PARTY_HAAN_FAIL',
  CLEAR_ERROR: 'PARTYHAAN/CLEAR_ERROR',
}

export const initialState = {
  partiesHaan: [],
  partyHaan: undefined,
  isDeleting: false,
  isUpdating: false,
  isCreating: false,
  isGetting: false,
  isAddingMember: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  isGetSuccess: false,
  isAddMemberSuccess: false,
  getError: undefined,
  deleteError: undefined,
  updateError: undefined,
  createError: undefined,
  addMemberError: undefined,
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.GET_PARTY_HAAN_REQUEST:
      return {
        ...state,
        isGetting: true,
        isGetSuccess: false,
        partiesHaan: undefined,
        getError: undefined,
      }
    case types.GET_PARTY_HAAN_RECEIVE:
      return {
        ...state,
        isGetting: false,
        isGetSuccess: true,
        partiesHaan: action.payload.partiesHaan,
        getError: undefined,
      }
    case types.GET_PARTY_HAAN_FAIL:
      return {
        ...state,
        isGetting: false,
        isGetSuccess: false,
        getError: action.payload.error,
      }

    case types.GET_PARTY_HAAN_BY_ID_REQUEST:
      return {
        ...state,
        isCreating: true,
        isCreateSuccess: false,
        partyHaan: undefined,
        getError: undefined,
      }
    case types.GET_PARTY_HAAN_BY_ID_RECEIVE:
      return {
        ...state,
        isCreating: false,
        isCreateSuccess: true,
        partyHaan: action.payload.partyHaan,
        getError: undefined,
      }
    case types.GET_PARTY_HAAN_BY_ID_FAIL:
      return {
        ...state,
        isGetting: false,
        isGetSuccess: false,
        getError: action.payload.error,
      }

    case types.CREATE_PARTY_HAAN_REQUEST:
      return {
        ...state,
        isCreating: true,
        isCreateSuccess: false,
        createError: undefined,
      }
    case types.CREATE_PARTY_HAAN_RECEIVE:
      return {
        ...state,
        isCreating: false,
        isCreateSuccess: true,
        partyHaan: action.payload.partyHaan,
        createError: undefined,
      }
    case types.CREATE_PARTY_HAAN_FAIL:
      return {
        ...state,
        isCreating: false,
        isCreateSuccess: false,
        createError: action.payload.error,
      }

    case types.UPDATE_PARTY_HAAN_REQUEST:
      return {
        ...state,
        isUpdating: true,
        isUpdateSuccess: false,
        partyHaan: undefined,
        updateError: undefined,
      }
    case types.UPDATE_PARTY_HAAN_RECEIVE:
      return {
        ...state,
        isUpdating: false,
        isUpdateSuccess: true,
        partyHaan: action.payload.partyHaan,
        updateError: undefined,
      }
    case types.UPDATE_PARTY_HAAN_FAIL:
      return {
        ...state,
        isUpdating: false,
        isUpdateSuccess: false,
        updateError: action.payload.error,
      }

    case types.ADD_MEMBER_PARTY_HAAN_REQUEST:
      return {
        ...state,
        isAddingMember: true,
        isAddMemberSuccess: false,
        addMemberError: undefined,
      }
    case types.ADD_MEMBER_PARTY_HAAN_RECEIVE:
      return {
        ...state,
        isAddingMember: false,
        isAddMemberSuccess: true,
        addMemberrror: undefined,
      }
    case types.ADD_MEMBER__PARTY_HAAN_FAIL:
      return {
        ...state,
        isAddingMember: false,
        isAddMemberSuccess: false,
        addMemberError: action.payload.error,
      }

    case types.DELETE_PARTY_HAAN_REQUEST:
      return {
        ...state,
        isDeleting: true,
        isDeleteSuccess: false,
        partyHaan: undefined,
        deleteError: undefined,
      }
    case types.DELETE_PARTY_HAAN_RECEIVE:
      return {
        ...state,
        isDeleting: false,
        isDeleteSuccess: true,
        deleteError: undefined,
      }
    case types.DELETE_PARTY_HAAN_FAIL:
      return {
        ...state,
        isDeleting: false,
        isDeleteSuccess: false,
        deleteError: action.payload.error,
      }

    case types.CLEAR_ERROR:
      return {
        ...state,
        getError: undefined,
        deleteError: undefined,
        updateError: undefined,
        createError: undefined,
        addMemberError: undefined,
      }
    default:
      return state
  }
}

export const usePartyHaan = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const get = useCallback(async () => {
    try {
      dispatch({ type: types.GET_PARTY_HAAN_REQUEST })
      const { data: partiesHaan } = await getApi('/parties')

      dispatch({
        type: types.GET_PARTY_HAAN_RECEIVE,
        payload: { partiesHaan },
      })
    } catch (error) {
      dispatch({
        type: types.GET_PARTY_HAAN_FAIL,
        payload: { error: error?.response?.data?.title },
      })
    }
  }, [dispatch])

  const getById = useCallback(
    async (id) => {
      try {
        dispatch({
          type: types.GET_PARTY_HAAN_BY_ID_REQUEST,
        })
        const { data: partyHaan } = await getApi(
          `/parties/${id}`,
        )
        dispatch({
          type: types.GET_PARTY_HAAN_BY_ID_RECEIVE,
          payload: { partyHaan },
        })
      } catch (error) {
        dispatch({
          type: types.GET_PARTY_HAAN_BY_ID_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const create = useCallback(
    async ({ name, detail, limit }) => {
      try {
        dispatch({ type: types.CREATE_PARTY_HAAN_REQUEST })

        const { data: partyHaan } = await postApi(
          '/parties',
          {
            name,
            detail,
            limit: limit + 1,
          },
        )

        dispatch({
          type: types.CREATE_PARTY_HAAN_RECEIVE,
          payload: { partyHaan },
        })
      } catch (error) {
        dispatch({
          type: types.CREATE_PARTY_HAAN_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const update = useCallback(
    async ({ id, name, detail, limit }) => {
      try {
        dispatch({ type: types.UPDATE_PARTY_HAAN_REQUEST })

        const { data: partyHaan } = await patchApi(
          `/parties/${id}`,
          {
            name,
            detail,
            limit,
          },
        )

        dispatch({
          type: types.UPDATE_PARTY_HAAN_RECEIVE,
          payload: { partyHaan },
        })
      } catch (error) {
        dispatch({
          type: types.UPDATE_PARTY_HAAN_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const addMember = useCallback(
    async (id) => {
      try {
        dispatch({
          type: types.ADD_MEMBER_PARTY_HAAN_REQUEST,
        })

        await postApi(`/parties/${id}/add-member`)

        getById(id)
        dispatch({
          type: types.ADD_MEMBER_PARTY_HAAN_RECEIVE,
        })
      } catch (error) {
        dispatch({
          type: types.ADD_MEMBER__PARTY_HAAN_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const remove = useCallback(
    async ({ id }) => {
      try {
        dispatch({ type: types.DELETE_PARTY_HAAN_REQUEST })

        const { data: partyHaan } = await removeApi(
          `/parties/${id}/delete`,
        )

        dispatch({
          type: types.DELETE_PARTY_HAAN_RECEIVE,
          payload: { partyHaan },
        })
      } catch (error) {
        dispatch({
          type: types.DELETE_PARTY_HAAN_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const clearError = useCallback(() => {
    dispatch({
      type: types.CLEAR_ERROR,
    })
  }, [dispatch])

  const api = useMemo(
    () => ({
      get,
      getById,
      create,
      update,
      addMember,
      remove,
      clearError,
    }),
    [
      get,
      getById,
      create,
      update,
      addMember,
      remove,
      clearError,
    ],
  )

  return [state, api]
}
