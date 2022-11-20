export const globalStateReducer = (oldState, action) => {
    const prevValue = oldState[action.key]
    const newValue = action.value
    if (prevValue !== newValue) {
        return { ...oldState, [action.key]: newValue }
    } else {
        return oldState
    }
}
