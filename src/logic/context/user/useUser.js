import { useReducer, useCallback, useMemo } from 'react'
import { BrowserPersistence } from '../../util/simplePersistence'
import { get, post } from '../../util/api'

export const types = {
  SIGN_IN_REQUEST: 'USER/SIGN_IN_REQUEST',
  SIGN_IN_RECEIVE: 'USER/SIGN_IN_RECEIVE',
  SIGN_IN_FAIL: 'USER/SIGN_IN_FAIL',
  SIGN_OUT: 'USER/SIGN_OUT',
  GET_DETAIL_REQUEST: 'USER/GET_DETAIL_REQUEST',
  GET_DETAIL_RECEIVE: 'USER/GET_DETAIL_RECEIVE',
  GET_DETAIL_FAIL: 'USER/GET_DETAIL_FAIL',
  CLEAR_ERROR: 'USER/CLEAR_ERROR',
  SIGN_UP_REQUEST: 'USER/SIGN_UP_REQUEST',
  SIGN_UP_RECEIVE: 'USER/SIGN_UP_RECEIVE',
  SIGN_UP_FAIL: 'USER/SIGN_UP_FAIL',
}

const storage = new BrowserPersistence()

export const initialState = {
  currentUser: {
    id: undefined,
    email: undefined,
    name: undefined,
  },
  isSignedIn: !!storage.getItem('signin_token'),
  isGettingDetail: false,
  isSigningIn: false,
  isSigningUp: false,
  token: storage.getItem('signin_token'),
  signInError: undefined,
  signUpError: undefined,
  getDetailError: undefined,
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.SIGN_IN_REQUEST:
      return {
        ...state,
        isSigningIn: true,
        signInError: undefined,
        currentUser: undefined,
      }
    case types.SIGN_IN_RECEIVE:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: true,
        signInError: undefined,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
      }
    case types.SIGN_IN_FAIL:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: false,
        signInError: action.payload.error,
        currentUser: undefined,
      }
    case types.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        token: undefined,
        currentUser: undefined,
      }
    case types.CLEAR_ERROR:
      return {
        ...state,
        signInError: undefined,
        signUpError: undefined,
        getDetailError: undefined,
      }
    case types.GET_DETAIL_REQUEST:
      return {
        ...state,
        isGettingDetail: true,
        getDetailError: undefined,
      }
    case types.GET_DETAIL_RECEIVE:
      return {
        ...state,
        isGettingDetail: false,
        isSignedIn: true,
        currentUser: action.payload.currentUser,
        getDetailError: undefined,
      }
    case types.GET_DETAIL_FAIL:
      return {
        ...state,
        isSignedIn: false,
        isGettingDetail: false,
        getDetailError: action.payload.error,
      }
    case types.SIGN_UP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        signUpError: undefined,
      }
    case types.SIGN_UP_RECEIVE:
      return {
        ...state,
        isSigningUp: false,
        isSignedIn: true,
        signUpError: undefined,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
      }
    case types.SIGN_UP_FAIL:
      return {
        ...state,
        isSigningUp: false,
        isSignedIn: false,
        signUpError: action.payload.error,
      }
    default:
      return state
  }
}

export const useUser = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const signIn = useCallback(
    async (payload) => {
      try {
        dispatch({ type: types.SIGN_IN_REQUEST })
        const {
          data: { id, email, name, token },
        } = await post('/users/signin', {
          email: payload.email,
          password: payload.password,
        })

        const currentUser = {
          id,
          email,
          name,
        }

        storage.setItem('signin_token', token)
        storage.setItem('staff_info', currentUser)

        dispatch({
          type: types.SIGN_IN_RECEIVE,
          payload: { currentUser, token },
        })
      } catch (error) {
        dispatch({
          type: types.SIGN_IN_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const signOut = useCallback(() => {
    storage.removeItem('signin_token')
    storage.removeItem('staff_info')
    dispatch({ type: types.SIGN_OUT })
  }, [dispatch])

  const getDetail = useCallback(async () => {
    const token = storage.getItem('signin_token')
    if (token) {
      try {
        dispatch({ type: types.GET_DETAIL_REQUEST })
        const {
          data: { id, email, name },
        } = await get('/users')

        const currentUser = {
          id,
          email,
          name,
        }

        dispatch({
          type: types.GET_DETAIL_RECEIVE,
          payload: { currentUser },
        })
      } catch (error) {
        signOut()
        dispatch({
          type: types.GET_DETAIL_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    }
  }, [dispatch])

  const clearError = useCallback(() => {
    dispatch({
      type: types.CLEAR_ERROR,
    })
  }, [dispatch])

  const signUp = useCallback(
    async (payload) => {
      try {
        dispatch({ type: types.SIGN_UP_REQUEST })

        const {
          data: { id, email, name, token },
        } = await post('/users/signup', {
          email: payload.email,
          name: payload.name,
          password: payload.password,
        })

        const currentUser = {
          id,
          email,
          name,
        }

        storage.setItem('signin_token', token)
        storage.setItem('staff_info', currentUser)

        dispatch({
          type: types.SIGN_UP_RECEIVE,
          payload: { currentUser, token },
        })
      } catch (error) {
        dispatch({
          type: types.SIGN_UP_FAIL,
          payload: { error: error?.response?.data?.title },
        })
      }
    },
    [dispatch],
  )

  const api = useMemo(
    () => ({
      signIn,
      signOut,
      getDetail,
      clearError,
      signUp,
    }),
    [signIn, signOut, getDetail, clearError, signUp],
  )

  return [state, api]
}
