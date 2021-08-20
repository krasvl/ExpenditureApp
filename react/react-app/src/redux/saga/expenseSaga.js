import {takeEvery, put} from "redux-saga/effects";

import { getStatisticsRequest } from "../actions/expensesActions";
import {CREATE_EXPENSE, DELETE_EXPENSE, GET_EXPENSES_BY_MONTH, UPDATE_EXPENSE} from "../types";
import {store} from '../store';

function* getStatisticsWorker() {
    yield put(getStatisticsRequest(store.getState().expenses.selectedMonthsDate))
}

function* expenseChangeWatcher() {
    yield takeEvery(GET_EXPENSES_BY_MONTH, getStatisticsWorker)
    yield takeEvery(CREATE_EXPENSE, getStatisticsWorker)
    yield takeEvery(UPDATE_EXPENSE, getStatisticsWorker)
    yield takeEvery(DELETE_EXPENSE, getStatisticsWorker)
}

export default expenseChangeWatcher