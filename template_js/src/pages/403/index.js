import React, { useEffect } from 'react';
import { Button } from 'antd';
import './index.less';
import { useQuery } from '@utils/router';
import { useNavigate } from 'react-router-dom';

const prefix = 'wc-not-authed';

function NoAuthPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const title = query.get('title');
  const errMsg = query.get('errMsg');
  useEffect(() => {
    return () => {};
  }, []);
  function goHome() {
    navigate('/');
  }
  return (
    <div className={prefix}>
      <div className={`${prefix}-img`}>
        <div className={`${prefix}-img-cont`}></div>
      </div>
      <div className={`${prefix}-cont`}>
        <h1 className={`${prefix}-cont-title`}>{title || '403'}</h1>
        <h1 className={`${prefix}-cont-desc`}>
          {errMsg || '抱歉，您没有权限访问该页面，请联系管理员！'}
        </h1>
        <div className={`${prefix}-cont-actions`}>
          <Button type="primary" onClick={goHome}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NoAuthPage;
