import { useLocation } from 'react-router-dom';

/* 
获取路由参数
使用方式：1.const query = useQuery();
2.query.get('id');
*/
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function getQueryParam(key) {
  if (!key) {
    return '';
  }
  let value = '';
  let paramStr = window.location.search ? window.location.search.substring(1) : '';
  if (paramStr) {
    paramStr.split('&').forEach(param => {
      let arr = param.split('=');
      if (arr[0] === key) {
        value = arr[1];
      }
    });
  }
  return value;
}
