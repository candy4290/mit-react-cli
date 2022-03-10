import React from 'react';
import { RouterConfigType } from '@/types';
import { Route, Navigate, Routes } from 'react-router-dom';
import Loading from '@components/loading';
import loadable from '@loadable/component';
import nprogressHoc from '../hocs/nprogress';

function cancelRequests() {
  /* 路由变化时-取消所有异步请求~ */
  const cancelArr = (window as any).axiosCancel;
  cancelArr?.forEach((ele: any, index: number) => {
    ele.cancel('取消了请求'); // 在失败函数中返回这里自定义的错误信息
    delete (window as any).axiosCancel[index];
  });
}

/* 判断是否有新版本，如果有，重新reload页面 */
function getLastVersion() {
  const version = +(localStorage.getItem('Version') || '').split('.').join('');
  const LastVersion = +(localStorage.getItem('LastVersion') || '').split('.').join('');
  if (LastVersion > version) {
    localStorage.setItem('Version', localStorage.getItem('LastVersion') || '');
    window.location.reload();
  }
}

/* 路由变化时触发重新渲染---处理取消上个页面的请求、比对是否有新版本、设置标题 */
function RequireAuth({ children, r }: { children: JSX.Element; r: RouterConfigType }) {
  localStorage.setItem('hasJsError', 'false');
  cancelRequests();
  getLastVersion();
  if (r && r.title) {
    document.title = '魔视-' + r.title;
  }
  if (r.auth) {
    if (localStorage.getItem('Authorization')) {
      return children;
    }
    return <Navigate to="/login" key={r.url} />;
  }
  return children;
}

function AuthRouter(props: { routerConfig: RouterConfigType[] }) {
  function storageComponents(r: RouterConfigType) {
    if (r.element) {
      const Temp = nprogressHoc(r.element as any);
      return (
        <Route
          path={r.path}
          key={r.url}
          element={
            <RequireAuth r={r}>
              <Temp {...(r as any)} />
            </RequireAuth>
          }
        />
      );
    }
    const LoadableComponent = loadable(() => import(`@pages/${r.url}`), { fallback: <Loading /> });
    const Np = nprogressHoc(LoadableComponent as any);
    return (
      <Route
        path={r.path}
        key={r.url}
        element={
          <RequireAuth r={r}>
            <Np {...r} />
          </RequireAuth>
        }
      />
    );
  }

  return <Routes>{props.routerConfig.map(r => storageComponents(r))}</Routes>;
}
export default React.memo(AuthRouter);
