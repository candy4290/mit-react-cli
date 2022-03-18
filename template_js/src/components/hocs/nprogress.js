import { useEffect } from 'react';
import NProgress from 'nprogress';


/**
 * 页面加载进度条，无效手动包裹，auth-router会帮你自动包裹
 *
 * @param {() => JSX.Element} WrappedComponent
 * @return {*}
 */
const nprogressHoc = (WrappedComponent) => {
  return function (props2) {
    useEffect(() => {
      NProgress.done();
      return () => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
      };
    }, [props2]);
    return (
      <>
        <WrappedComponent {...(props2)} />
      </>
    );
  };
};
export default nprogressHoc;
