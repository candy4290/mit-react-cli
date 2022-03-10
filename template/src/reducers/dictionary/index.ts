import Types from '../../actions/types';
const initDictionary = {
  data: null,
  errMsg: null,
  isLoading: false,
};
export default function onAction(state = initDictionary, action: { type: any; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_DICTIONARY:
      return { ...state, isLoading: true };
    case Types.GET_DICTIONARY_SUCCESS:
      return { ...state, isLoading: false, data: payload };
    case Types.GET_DICTIONARY_FAILED:
      return { ...state, isLoading: false, errMsg: payload };
    default:
      return { ...state };
  }
}
