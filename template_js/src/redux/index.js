import dictionaryReducer, { getDictionary } from './dictionary';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// /* 合并reducers */
const index = combineReducers({
  dictionary: dictionaryReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'logout/logout') {
    /* 退出登录清空store树 */
    state = undefined;
  }
  return index(state, action);
};

export const actions = { getDictionary };

const store = configureStore({
  reducer: rootReducer,
});

export default store;
