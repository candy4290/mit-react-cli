import axios from 'axios';
import apis from './apis';

/**
 * 字典接口
 *
 * @export
 * @return {*} 
 */
export function getDictionaryInfo(): Promise<{
  dict_code: number,
  dict_label: string,
  dict_sort: number,
  dict_type: string,
  dict_value: string,
}[]> {
  return axios.get(apis.getAllDictionaryUrl, {
    params: {
      hhh: [1,2,3],
      dictTypes: `responsible_area,post_mode,duty_gist,associatedScene_type,pointType,pointAuthority,pointLevel,per_if_secondment,per_secondment_source,per_data_misstype,task_release_status,task_sign_status,qury_post_type,check_status,task_status,person_type,person_label,vehicle,safe_house_type`,
    },
  })
}