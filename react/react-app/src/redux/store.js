import {applyMiddleware, compose, createStore} from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"

import 'regenerator-runtime/runtime'
import createSagaMiddleware from 'redux-saga'

import {rootReducer} from "./reducers/rootReducer"
import {initialState} from "./reducers/appReducer";
import rootSaga from "./saga/rootSaga";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(thunk, sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
