import React, {
  createContext,
  useContext,
  useMemo,
} from 'react'
import { useUser } from './useUser'

const UserContext = createContext()

const UserContextProvider = (props) => {
  const [state, api] = useUser()

  const contextValue = useMemo(
    () => [state, api],
    [state, api],
  )

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

export const useUserContext = () => useContext(UserContext)
