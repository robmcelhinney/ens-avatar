import { useCallback, useContext, useMemo } from 'react'
import { GlobalStateContext } from '../state/GlobalStateContext'

export const useGlobalState = (key) => {
    const [globalState, dispatch] = useContext(GlobalStateContext)
    const state = globalState[key] 

    const setState = useCallback(
        (newValue) => {
            let value = newValue
            if (typeof newValue === "function" ) {
                value = newValue(state)
            }
            dispatch({ key, value })
        },
        [key, dispatch, state]
    )

    return useMemo(() => {
        return [state, setState]
    }, [state, setState])
}
