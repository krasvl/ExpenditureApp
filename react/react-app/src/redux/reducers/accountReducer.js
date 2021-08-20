import {LOGIN, LOGOUT, REGISTER} from "../types";

export const initialState = {
    user: {
        firstName: null,
        lastName: null,
    },
    auth: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case REGISTER:
            return action.payload
        default:
            return state
    }
}