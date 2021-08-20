import {
    CREATE_EXPENSE,
    DELETE_EXPENSE,
    GET_EXPENSE_TYPES,
    GET_EXPENSES,
    GET_EXPENSES_BY_MONTH, GET_STATISTICS,
    UPDATE_EXPENSE, UPDATE_SELECTED_MONTHS_DATE
} from "../types";

export const initialState = {
    expenses: [],
    expenseTypes: [],
    selectedMonthsDate: null,
    statistics: {
        totalExpensesForTheMonth: null,
        averageMonthlyExpenses: null,
        statisticsForTheMonth: {},
        statisticsOnAverangeForTheMonth: {}
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPENSE_TYPES:
            return {...state, expenseTypes: action.payload }
        case GET_EXPENSES_BY_MONTH:
            return {...state, expenses: action.payload }
        case GET_EXPENSES:
            return {...state, expenses: action.payload }
        case DELETE_EXPENSE:
            return {...state, expenses: state.expenses.filter(expense => expense.id != action.payload)}
        case UPDATE_EXPENSE:
            return {...state, expenses: state.expenses.map(expense => expense.id != action.payload.id ? expense : action.payload)}
        case CREATE_EXPENSE:
            return {...state, expenses: [...state.expenses, action.payload]}
        case GET_STATISTICS:
            return {...state, statistics: action.payload}
        case UPDATE_SELECTED_MONTHS_DATE:
            return {...state, selectedMonthsDate: action.payload}
        default:
            return state
    }
}