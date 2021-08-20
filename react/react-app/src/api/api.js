import axios from 'axios';
import moment from 'moment';
import {store} from '../redux/store'
import {logoutAction} from "../redux/actions/accountActions";

const baseUrl = 'https://localhost:44338/api/'

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response && error.response.status === 401 && store.getState().account.auth) {
            store.dispatch(logoutAction())
        }
        return Promise.reject(error)
    }
)

const api = {
    account: {
        login: (email, password) => axios.get(baseUrl + 'Account', {
            params: {
                login: email,
                password
            } }),
        register: (email, password, firstName, lastName) => axios.post(baseUrl + 'Account', {
            login: email,
            password,
            firstName,
            lastName
        })
    },
    expenses: {
        getExpenseTypes: () => axios.get(baseUrl + 'ExpenseType', {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')}
            }),
        getExpensesByCurrentMonth: date => axios.get(baseUrl + 'Expense', {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')},
            params: {
                startDate: moment(date).startOf('month').format('YYYY-MM-DD'),
                endDate: moment(date).endOf('month').format('YYYY-MM-DD')
            } }),
        getExpenses: expense => axios.get(baseUrl + 'Expense', {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')},
            params: {
                name: expense.searchString,
                startDate: expense.startDate,
                endDate: expense.endDate,
                minCost: expense.minCost,
                maxCost: expense.maxCost,
                expenseTypeId: expense.expenseTypeId
            } }),
        createExpense: expense => axios({
            method: 'post',
            url: baseUrl + 'Expense',
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')},
            data: {...expense}
            }),
        deleteExpense: id => axios.delete(baseUrl + 'Expense', {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')},
            params: {
                expenseId: id
            } }),
        updateExpense: expense => axios.put(baseUrl + 'Expense' ,{
            ...expense
            },
            {
                headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')}
            }
        ),
        getStatistics: date => axios.get(baseUrl + 'Expense/Statistics', {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')},
            params: {
                startDate: moment(date).startOf('month').format('YYYY-MM-DD'),
                endDate: moment(date).endOf('month').format('YYYY-MM-DD')
            } }),
    }
}

export default api