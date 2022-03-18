import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middlewares = [thunk];

const store = createStore(reducers, applyMiddleware(...middlewares));

/**
 * 创建store
 */
export default store;
