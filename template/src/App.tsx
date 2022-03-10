import { createBrowserHistory } from 'history';
import { FC } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider } from 'react-redux';
import store from './stores';

import './App.less';
import AuthRouter from './components/auth-router';
import routerConfig from './configs/router.config';
import { useVersion } from './self-hooks';
import BrowserCheck from './components/browser-check';

export const history = createBrowserHistory();

const App: FC = () => {
  useVersion();
  return (
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <div className={`App`}>
            <HistoryRouter history={history}>
              <AuthRouter routerConfig={routerConfig} />
            </HistoryRouter>
          </div>
          {/* 检查适用的浏览器版本及型号 */}
          <BrowserCheck></BrowserCheck>
        </ConfigProvider>
    </Provider>
  );
};

export default App;
