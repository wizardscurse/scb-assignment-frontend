import React, {
  createContext,
  useContext,
  useMemo,
} from 'react'
import { usePartyHaan } from './usePartyHaan'

const PartyHaanContext = createContext()

const PartyHaanContextProvider = (props) => {
  const [state, api] = usePartyHaan()

  const contextValue = useMemo(
    () => [state, api],
    [state, api],
  )

  return (
    <PartyHaanContext.Provider value={contextValue}>
      {props.children}
    </PartyHaanContext.Provider>
  )
}

export default PartyHaanContextProvider

export const usePartyHaanContext = () =>
  useContext(PartyHaanContext)
