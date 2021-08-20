import {LOGIN, LOGOUT, REGISTER} from "../types";
import api from "../../api/api";

const login = requestResult => ({
    type: LOGIN,
    payload: {
        user: {
            firstName: requestResult.user.firstName,
            lastName: requestResult.user.lastName
        },
        auth: true
    }
})

export function logoutAction() {
    return {
        type: LOGOUT
    }
}

const register = requestResult => ({
    type: REGISTER,
    payload: {
        user: {
            firstName: requestResult.user.firstName,
            lastName: requestResult.user.lastName
        },
        auth: true
    }
})

export function loginRequest(email, password, errorsHandler) {
    return dispatch => {
        api.account.login(email, password)
            .then(response => {
                dispatch(login(response.data))
                sessionStorage.setItem('jwt', response.data.token)
            })
            .catch(error => errorsHandler(error.response.data))
            .catch(error => console.log(error))
    }
}

export function registerRequest(email, password, firstName, lastName, errorsHandler) {
    return  dispatch => {
    api.account.register(email, password, firstName, lastName)
        .then(response => dispatch(register(response.data)))
        .then(response => {
            sessionStorage.setItem('jwt', response.data.token)
            return response
        })
        .catch(error => console.log(error))
        .catch(error => console.log(error))
    }
}

export function logout(){
    return dispatch => dispatch(logoutAction())
}

