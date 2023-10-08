export const reducer = (state, action) => {

    switch (action.type) {
        case 'setRefreshRecords':
            return {
                refreshRecords: state.refreshRecords !== null ? !state.refreshRecords : false
            }
        default: return state
    }
}

export const initialState = {
    refreshRecords: null,
}