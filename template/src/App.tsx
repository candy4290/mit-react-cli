import './App.less';
import { createRouter } from './configs/router.config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@redux/index';
import '@babel/polyfill';
import BrowserCheck from '@components/browser-check';
import { useVersion } from './self-hooks';

function App() {
  const routes = createBrowserRouter(createRouter() as any, , {
    basename: process.env.PUBLIC_URL,
  });
  useVersion();

  return (
    <Provider store={store}>
      {routes && <RouterProvider router={routes} />}
      {/* 检查适用的浏览器版本及型号 */}
      <BrowserCheck></BrowserCheck>
    </Provider>
  );
}

export default App;
