import {all} from 'redux-saga/effects'
import expenseSaga from "./expenseSaga";

function* rootWatcher() {
    yield all([expenseSaga()])
}

export default rootWatcher