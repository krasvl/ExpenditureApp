import {LOGOUT} from "../types";
import {appReducer, initialState} from "./appReducer";

export const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return initialState
    }
    return appReducer(state, action);
};