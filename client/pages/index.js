import React from 'react'
import 'tailwindcss/tailwind.css'
import { MyApp } from './MyApp'
import { GlobalStateProvider, initialGlobalState } from '../state/GlobalStateContext'
import { globalStateReducer } from '../state/GlobalState'

function DataProvider() {

    return (
        <GlobalStateProvider reducer={globalStateReducer} initState={initialGlobalState}>
            <MyApp />
        </GlobalStateProvider>
    )

}

export default DataProvider
