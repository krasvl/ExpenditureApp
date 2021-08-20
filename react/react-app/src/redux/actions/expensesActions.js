import api from "../../api/api";
import {
    CREATE_EXPENSE,
    DELETE_EXPENSE,
    GET_EXPENSE_TYPES,
    GET_EXPENSES,
    GET_EXPENSES_BY_MONTH, GET_STATISTICS,
    UPDATE_EXPENSE, UPDATE_SELECTED_MONTHS_DATE
} from "../types";

const getExpenseTypes = types => ({
    type: GET_EXPENSE_TYPES,
    payload: types
})

const getExpensesByCurrentMonth = expenses => ({
    type: GET_EXPENSES_BY_MONTH,
    payload: expenses
})

const getExpenses = expenses => ({
    type: GET_EXPENSES,
    payload: expenses
})

const createExpense = expense => ({
    type: CREATE_EXPENSE,
    payload: expense
})

const deleteExpense = id => ({
    type: DELETE_EXPENSE,
    payload: id
})

const updateExpense = expense => ({
    type: UPDATE_EXPENSE,
    payload: expense
})

const getStatistics = statistics => ({
    type: GET_STATISTICS,
    payload: statistics
})

export const updateSelectedMonthsDate= date => ({
    type: UPDATE_SELECTED_MONTHS_DATE,
    payload: date
})



export function getExpenseTypesRequest() {
    return  dispatch => {
        api.expenses.getExpenseTypes()
            .then(response => dispatch(getExpenseTypes(response.data)))
            .catch(error => console.log(error))
    }
}

export function getExpensesByCurrentMonthRequest(date) {
    return  dispatch => {
        api.expenses.getExpensesByCurrentMonth(date)
            .then(response => dispatch(getExpensesByCurrentMonth(response.data)))
            .catch(error => console.log(error))
    }
}

export function getExpensesRequest(payload) {
    return  dispatch => {
        api.expenses.getExpenses(payload)
            .then(response => dispatch(getExpenses(response.data)))
            .catch(error => console.log(error))
    }
}

export function createExpenseRequest(expense) {
    return  dispatch => {
        api.expenses.createExpense(expense)
            .then(response => dispatch(createExpense(response.data)))
            .catch(error => console.log(error))
    }
}

export function deleteExpensesRequest(id) {
    return  dispatch => {
        api.expenses.deleteExpense(id)
            .then(response => dispatch(deleteExpense(response.data.id)))
            .catch(error => console.log(error))
    }
}

export function updateExpenseRequest(expense) {
    return  dispatch => {
        api.expenses.updateExpense(expense)
            .then(response => dispatch(updateExpense(response.data)))
            .catch(error => console.log(error))
    }
}

export function getStatisticsRequest(date) {
    return  dispatch => {
        api.expenses.getStatistics(date)
            .then(response => dispatch(getStatistics(response.data)))
            .catch(error => console.log(error))
    }
}
