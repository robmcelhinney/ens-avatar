import React, { createContext, useReducer } from 'react'

export const initialGlobalState = Object.freeze({"accountInfo": null})

export const GlobalStateContext = createContext([
    initialGlobalState,
    (state) => {},
])

export const GlobalStateProvider = ({ reducer, initState, children }) => {
    return <GlobalStateContext.Provider value={useReducer(reducer, initState)}>{children}</GlobalStateContext.Provider>
}
