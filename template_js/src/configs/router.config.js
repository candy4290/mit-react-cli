import NotFound from '@pages/not-found';

const routerConfig = [
  { path: '/', url: 'demo1', title: 'demo1', exact: true, auth: false },
  { path: '/demo2', url: 'demo2', title: 'demo2', exact: true, auth: false },
  {
    path: '*',
    url: '404',
    element: NotFound,
    title: '404',
    exact: true,
    auth: false,
  } /* 404页面 */,
];
export default routerConfig;
