import loadable from '@loadable/component';
import nprogressHoc from '@src/components/hocs/nprogress';
import Loading from '@src/components/loading';
import { Outlet } from 'react-router-dom';

/* {
  path-路由地址，
  url-组件代码对应的路径位置, 
  auth-是否需要路由权限才可以访问，
  title-页面标题，
  isEmpty-是否是空组件,自动创建<><Outlet /></Outlet>
  index-是否是默认路由,
  children-子路由
*/
const routerConfig = [
  /* 默认路由配置 */
  { path: '/page1', url: 'page1', title: 'page1' },
  { path: '/page2', url: 'page2', title: 'page2' },
  { path: '*', url: '404' },
];

/* 判断是否有新版本，如果有，重新reload页面 */
function getLastVersion() {
  const version = +(localStorage.getItem('Version') || '').split('.').join('');
  const LastVersion = +(localStorage.getItem('LastVersion') || '').split('.').join('');
  if (LastVersion > version) {
    localStorage.setItem('Version', localStorage.getItem('LastVersion'));
    window.location.reload();
  }
}

/**
 * 路由前置处理器【路由变化时，父路由中的loader每次都会被触发】
 * 1.路由变化时，先判断是否有新版本，有则自动刷新页面以加载新版本
 *
 * @return {*}
 */
async function beforeIntercept() {
  getLastVersion();
  return '';
}

/* 根据config文件动态创建路由 */
export function createRouter(config = routerConfig) {
  return config.map(item => {
    if (item.children) {
      item.children = createRouter(item.children);
    }
    const TargetEle = item.isEmpty
      ? () => (
          <>
            <Outlet />
          </>
        )
      : loadable(() => import(`@pages/${item.url}`), {
          fallback: <Loading />,
        });
    const ResultEle = item.children ? TargetEle : nprogressHoc(TargetEle);
    return item.children
      ? {
          loader: !item.children && item.path !== '/login' ? beforeIntercept : null,
          path: item.path,
          element: <ResultEle {...item} />,
          children: item.children,
        }
      : {
          loader: !item.children && item.path !== '/login' ? beforeIntercept : null,
          path: item.path,
          element: <ResultEle {...item} />,
          index: item.index,
        };
  });
}
