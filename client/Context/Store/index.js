import React from "react";
import { reducer, initialState } from "./reducer";

export const StoreContext = React.createContext({
    state: initialState,
    dispatch: () => null
})

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
}