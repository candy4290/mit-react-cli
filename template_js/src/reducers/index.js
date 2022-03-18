import { combineReducers } from 'redux';
import dictionary from './dictionary';

/* 合并reducers */
const index = combineReducers({
  dictionary,
});
const rootReducer = (state, action ) => {
  // if (action.type === Types.LOGOUT_SUCCESS || action.type === Types.LOGOUT_FAILED) { /* 退出登录清空store树 */
  //     // console.log('清空store树');
  //     // state = undefined;
  // }
  return index(state, action);
};

export default rootReducer;
