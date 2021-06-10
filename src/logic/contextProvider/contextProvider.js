import React from 'react'
import UserContextProvider from '../context/user/user'
import PartyHaanContextProvider from '../context/partHaan/partyHaan'

const contextProviders = [
  UserContextProvider,
  PartyHaanContextProvider,
]

const contextProvider = ({ children }) =>
  contextProviders.reduceRight((memo, ContextProvider) => {
    return <ContextProvider>{memo}</ContextProvider>
  }, children)

export default contextProvider
