import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from '../reducer/RootReducer'
import rootAction from '../action/RootAction'

const epicMiddleware = createEpicMiddleware(rootAction)

export default createStore(rootReducer, applyMiddleware(logger, epicMiddleware));
