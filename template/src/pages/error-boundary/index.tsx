import React from 'react';
import { Button } from 'antd';
// import apis from '@apis';
// import axios from '@ajax';
import './index.less';
import nprogressHoc from '@components/hocs/nprogress';

const prefix = 'mit-error';
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    console.log('getDerivedStateFromError');
    // 更新 state 使下一次渲染能够显示降级后的 UI
    localStorage.setItem('hasJsError', 'true');
    return { hasError: true, error };
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

  /* 判断是否有新版本，如果有，重新reload页面 */
  getLastVersion() {
    const version = +(localStorage.getItem('Version') || '').split('.').join('');
    const LastVersion = +(localStorage.getItem('LastVersion') || '').split('.').join('');
    if (LastVersion > version) {
      localStorage.setItem('Version', localStorage.getItem('LastVersion') || '');
      window.location.reload();
    }
  }

  render() {
    if (localStorage.getItem('hasJsError') === 'true') {
      // console.log(this.state.hasError);
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
export default nprogressHoc(ErrorBoundary as any);
