import Types from '../types';
import axios from '@/configs/axios';
import apis from '@/configs/apis';
export const getDictionary = () => {
  return (dispatch: any) => {
    dispatch({ type: Types.GET_DICTIONARY });
    return axios
      .get(apis.getAllDictionaryUrl, {
        params: {
          dictTypes: `responsible_area,post_mode,duty_gist,associatedScene_type,pointType,pointAuthority,pointLevel,per_if_secondment,per_secondment_source,per_data_misstype,task_release_status,task_sign_status,qury_post_type,check_status,task_status,person_type,person_label,vehicle`,
        },
      })
      .then((res: any) => {
        const result: any = {};
        (res || []).forEach((item: any) => {
          const element: any = {};
          element[item.dict_value] = item.dict_label;
          result[item.dict_type] = Object.assign({}, result[item.dict_type], element);
        });
        dispatch({ type: Types.GET_DICTIONARY_SUCCESS, payload: { ...result } });
      })
      .catch(err => {
        dispatch({ type: Types.GET_DICTIONARY_FAILED, payload: err });
      });
  };
};
