import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useTitle } from 'ahooks';
import { getGlobalAbort } from '@src/configs/axios';

/* 顶部页面加载进度条 */
function useNprogress() {
  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
    };
  }, []);
}

/* 路由变化时-取消所有异步请求~ */
function useAbortXHR() {
  useEffect(() => {
    getGlobalAbort().abort();
  }, []);
}

/* 高阶组件-
  1.自动设置标题
  2.顶部页面加载进度条
*/
const nprogressHoc = (WrappedComponent: any) => (props: any) => {
  useTitle('xxxx-' + props.title);
  useNprogress();
  useAbortXHR();
  return (
    <>
      <WrappedComponent {...props} />
    </>
  );
};
export default nprogressHoc;
