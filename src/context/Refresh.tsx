import { useState, createContext } from 'react'

export const RefreshContext = createContext(null)

export const RefreshProvider = ({ children }) => {
  const [outletShow, setOutletShow] = useState(true)

  const updateOutletShow = (val: boolean) => {
    setOutletShow(val)
  }

  return (
    <RefreshContext.Provider
      value={{
        outletShow,
        updateOutletShow,
      }}
    >
      {children}
    </RefreshContext.Provider>
  )
}
