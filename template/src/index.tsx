import 'dayjs/locale/zh-cn';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// export * from 'core-js/es/array/at'; // https://github.com/facebook/create-react-app/issues/13118
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

const disableReactDevTools = () => {
  const noop = () => undefined;
  const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === 'object') {
    for (const [key, value] of Object.entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === 'function' ? noop : [];
    }
  }
};

process.env.NODE_ENV === 'production' &&
  disableReactDevTools(); /* 生产环境禁用react developer tools */

dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
/* 取消应用加载动画 */
function preloaderFinished() {
  const body = document.querySelector('body');
  const preloader = document.querySelector('.preloader');

  body!.style.overflow = 'hidden';
  function remove() {
    if (!preloader) {
      return;
    }
    preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
    // preloader.addEventListener('transitionend', () => {
    //   console.log('transitionend')
    //   preloader.className = 'preloader-hidden';
    // });
    const t$ = setTimeout(() => {
      preloader.className = 'preloader-hidden';
      clearTimeout(t$);
    }, 100);
  }
  const t$ = setTimeout(() => {
    remove();
    body!.style.overflow = '';
    clearTimeout(t$);
  }, 100);
}

preloaderFinished();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
