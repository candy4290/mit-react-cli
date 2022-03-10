import { Button } from 'antd';
import './index.less';
import { useNavigate } from 'react-router-dom';
import nprogressHoc from '@components/hocs/nprogress';

const prefix = 'mit-not-found';

function NotFound() {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <div className={prefix}>
      <div className={`${prefix}-img`}>
        <div className={`${prefix}-img-cont`}></div>
      </div>
      <div className={`${prefix}-cont`}>
        <h1 className={`${prefix}-cont-title`}>404</h1>
        <h1 className={`${prefix}-cont-desc`}>抱歉，你访问的页面不存在</h1>
        <div className={`${prefix}-cont-actions`}>
          <Button type="primary" onClick={goHome}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}

export default nprogressHoc(NotFound);
