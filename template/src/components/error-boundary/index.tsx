import React from 'react';
import { Button } from 'antd';
import NProgress from 'nprogress';
import './index.less';
import { useLocation } from 'react-router-dom';

const prefix = 'wc-error';
class ErrorBoundary extends React.Component {
  state: any;
  props: any;
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      url: null,
      errorInfo: null,
    };
  }

  componentDidMount() {
    NProgress.done();
  }

  static getDerivedStateFromError(error: any) {
    console.log('getDerivedStateFromError');
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error, url: location.pathname };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('componentDidCatch');
    this.getLastVersion();
    // 你同样可以将错误日志上报给服务器
    // axios.post(apis.log, {
    //   error: error.toString(),
    //   errorPosition: errorInfo.componentStack,
    // }).then(res => {
    //   console.log('记录成功');
    // });
    localStorage.setItem('error', error.toString());
    localStorage.setItem('errorPosition', errorInfo.componentStack);
    this.setState({
      error,
      errorInfo,
    });
  }

  componentWillUnmount() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
  }

  shouldComponentUpdate() {
    if (this.state.hasError && location.pathname !== this.state.url) {
      this.setState({
        hasError: false,
      });
      return true;
    }
    return false;
  }

  /* 判断是否有新版本，如果有，重新reload页面 */
  getLastVersion() {
    const version = +(localStorage.getItem('Version') || '').split('.').join('');
    const LastVersion = +(localStorage.getItem('LastVersion') || '').split('.').join('');
    if (LastVersion > version) {
      localStorage.setItem('Version', localStorage.getItem('LastVersion')!);
      window.location.reload();
    }
  }

  render() {
    if (!!this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className={prefix}>
          <div className={`${prefix}-img`}>
            <div className={`${prefix}-img-cont`}></div>
          </div>
          <div className={`${prefix}-cont`}>
            <h1 className={`${prefix}-cont-title`}>{'未知异常'}</h1>
            <h1 className={`${prefix}-cont-desc`}>{'抱歉，系统未知异常，请联系管理员！'}</h1>
            <div className={`${prefix}-cont-actions`}>
              <Button type="primary" onClick={() => window.location.reload()}>
                重新加载
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const wrappComponent = (WrappedComponent: any) => (props: any) => {
  const location = useLocation();
  return <WrappedComponent {...props} location={location} />;
};

export default wrappComponent(ErrorBoundary);
