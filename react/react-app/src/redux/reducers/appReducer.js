import {combineReducers} from "redux";
import * as account from './accountReducer'
import * as expenses from './expensesReducer'
import {LOGOUT} from "../types";

export const initialState = {
    account: account.initialState,
    expenses: expenses.initialState
}

export const appReducer = combineReducers({
    account: account.reducer,
    expenses: expenses.reducer
})