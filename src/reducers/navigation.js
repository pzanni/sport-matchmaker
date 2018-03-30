const DEFAULT_STATE = {
    anchorEl: null
}

const navigationReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_ANCHOR_EL': {
            return { ...state, anchorEl: action.anchorEl }
        }
        case 'UNSET_ANCHOR_EL': {
            return { ...state, anchorEl: null }
        }
        default: return state
    }
}

export const openUserMenu = (anchorEl) => {
    return {
        type: 'SET_ANCHOR_EL',
        anchorEl
    }
}

export const closeUserMenu = () => {
    return {
        type: 'UNSET_ANCHOR_EL'
    }
}

export default navigationReducer