import { useEffect } from 'react';
import NProgress from 'nprogress';
import { RouterConfigType } from '@/types';

/**
 * 页面加载进度条，无效手动包裹，auth-router会帮你自动包裹
 *
 * @param {() => JSX.Element} WrappedComponent
 * @return {*}
 */
const nprogressHoc = (WrappedComponent: () => JSX.Element) => {
  return function (props2: RouterConfigType) {
    useEffect(() => {
      NProgress.done();
      return () => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
      };
    }, [props2]);
    return (
      <>
        <WrappedComponent {...(props2 as any)} />
      </>
    );
  };
};
export default nprogressHoc;
