import { useDebounce, useSafeState, useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * 获取版本号，localstorage保存新版本号，及之前的版本号
 *
 * @export
 */
export function useVersion() {
  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + '/version.json').then(res => {
      if (!localStorage.getItem('Version')) {
        /* 存储版本号 */
        localStorage.setItem('Version', res.version);
      } else {
        /* 存储最新版本号 */
        localStorage.setItem('LastVersion', res.version);
      }
    });
    const temp$ = setInterval(() => {
      axios.get(process.env.PUBLIC_URL + '/version.json', { withoutSignal: true }).then(res => {
        if (!localStorage.getItem('Version')) {
          /* 存储版本号 */
          localStorage.setItem('Version', res.version);
        } else {
          /* 存储最新版本号 */
          localStorage.setItem('LastVersion', res.version);
        }
      });
    }, 60 * 1000);
    return () => {
      clearInterval(temp$);
    };
  }, []);
}
/**
 * 分页hook
 *
 * @export
 * @param {*} fn 返回Promise的函数
 * @param {*} [options={}] params-初始化查询条件 defaultPageSize-默认每页条数 defaultPageIndex-当前页码
 * @param {string} [defaultConfig={
 *   pageSize: 'pageSize', // pageSize名称配置
 *   pageIndex: 'pageIndex' // pageIndex名称配置
 * }]
 * @return {*}
 */
export function usePagination(
  fn,
  options = {},
  defaultConfig = {
    pageSize: 'pageSize',
    pageIndex: 'pageIndex',
  }
) {
  const [params, setParams] = useSafeState({
    ...options?.params,
    [defaultConfig.pageSize]: options?.defaultPageSize || 10, // 每页显示条数
    [defaultConfig.pageIndex]: options?.defaultPageIndex || 1, // 当前页面
  }); /* 搜索框查询条件 */
  const [data, setData] = useSafeState([]);
  const [loading, setLoading] = useSafeState(!options?.manual);
  const useManualEffect = useMemo(() => {
    return !!options.manual ? useUpdateEffect : useEffect;
  }, [options.manual]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const f = useCallback(fn, []);

  const doReset = useCallback(
    temp => {
      /* 重置查询条件,将查询条件变为初始化查询条件 */
      setParams({
        ...options.params,
        ...temp,
        [defaultConfig.pageSize]: options?.defaultPageSize || 10,
        [defaultConfig.pageIndex]: options?.defaultPageIndex || 1,
      });
    },
    [setParams, options, defaultConfig]
  );

  const doRequery = useCallback(
    temp => {
      /* 保持查询条件不变-触发再次查询 */
      setParams(p => ({ ...p, ...temp }));
    },
    [setParams]
  );

  useManualEffect(() => {
    setLoading(true);
    f(params).then(
      rsp => {
        setLoading(false);
        setData(rsp);
      },
      () => {
        setLoading(false);
      }
    );
  }, [params, f, setLoading, setData]);

  return {
    data,
    loading,
    pagination: {
      pageSize: params[defaultConfig.pageSize] || 10,
      pageIndex: params[defaultConfig.pageIndex] || 1,
      params,
      paramsChange: args => {
        /* 入参变化，会重置pageIndex,从第一页开始查询 */
        setParams({
          ...options?.params,
          ...args,
          [defaultConfig.pageSize]: params[defaultConfig.pageSize],
          [defaultConfig.pageIndex]: options.defaultPageIndex || 1,
        });
      },
      pageSizeChange: pageSize => {
        setParams(p => ({ ...p, [defaultConfig.pageSize]: pageSize }));
      },
      pageIndexChange: pageIndex => {
        setParams(p => ({ ...p, [defaultConfig.pageIndex]: pageIndex }));
      },
      onchange: (page, pageSize) => {
        /* pageIndex及pageSize发生改变 */
        setParams(p => ({
          ...p,
          [defaultConfig.pageIndex]: page,
          [defaultConfig.pageSize]: pageSize,
        }));
      },
      doReset,
      doRequery,
    },
  };
}

/* 导出文件 */
export function useExportFile({ methodType, url }) {
  const [exportLoading, setExportLoading] = useSafeState(false);
  const doExport = useCallback(
    (params, defaultFileName) => {
      if (exportLoading) return;
      let promise;
      if (methodType === 'get') {
        promise = axios.get(url, {
          params,
          responseType: 'blob',
        });
      } else {
        promise = axios.post(url, params, { responseType: 'blob' });
      }
      setExportLoading(true);
      promise.then(
        res => {
          const contentDisposition = res.headers['content-disposition'] || '';
          let fileName = decodeURI(
            contentDisposition.slice(contentDisposition.indexOf('filename=') + 9)
          ); /* 获取下载文件名 */
          if (!fileName.split('.')[0]) {
            /* 如果后端没有给文件名 */
            fileName = defaultFileName;
          }
          const href = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = href;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(href);
          setExportLoading(false);
        },
        () => {
          setExportLoading(false);
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [methodType, url, setExportLoading]
  );
  return [exportLoading, doExport];
}

/**
 * 解决antd，input---onchange在拼音時也触发的问题
 *
 * @export
 * @return {*}
 */
export function useInputChange() {
  const lock = useRef(false);
  const [keywords, setKeywords] = useSafeState('');
  const debounceKeywords = useDebounce(keywords, { wait: 500 });
  const onChange = useCallback(
    e => {
      if (e.type === 'compositionstart') {
        lock.current = true;
        return;
      }
      const { value } = e.target;
      if (e.type === 'compositionend') {
        lock.current = false;
      }
      if (!lock.current) {
        setKeywords(value);
      }
    },
    [setKeywords]
  );
  return { keywords: debounceKeywords, onChange };
}

export function useNotAuthorized() {
  const navigate = useNavigate();
  const onNotAuthorized = useCallback(
    event => {
      if (event.data === 'NotAuthorized') {
        navigate('/login');
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener('message', onNotAuthorized);
    return () => {
      window.removeEventListener('message', onNotAuthorized);
    };
  }, [onNotAuthorized]);
}