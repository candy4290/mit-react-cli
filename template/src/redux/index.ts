import dictionaryReducer from './dictionary';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// /* 合并reducers */
const index = combineReducers({
  dictionary: dictionaryReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'logout/logout') {
    /* 退出登录清空store树 */
    state = undefined;
  }
  return index(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
