import React, { useEffect, useState } from 'react';
import './index.less';
import { Modal } from 'antd';
import NotSupportImg from '@imgs/browsers/browsers-support.png';
import LowerVersionImg from '@imgs/browsers/browsers-version.png';

/* 支持chrome70+、Firefox70+、360极速模式 */
export default function BrowserCheck() {
  const [visible, setVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState();

  /* 获取浏览器类型和版本号--- */
  function getBrowserTypeAndVersion() {
    const userAgent = navigator.userAgent;
    const chromeIndex = userAgent.indexOf('Chrome'); /* 是否是chrome */
    const firefoxIndex = userAgent.indexOf('Firefox'); /* 是否是firefox */
    if (chromeIndex > -1) {
      /* 获取chrome版本 */
      const endIndex = userAgent.indexOf('.', chromeIndex);
      const version = userAgent.slice(chromeIndex + 7, endIndex);
      console.log('chrome:' + version);
      if (version < 70) {
        setImgSrc(LowerVersionImg);
        setVisible(true);
      }
    } else if (firefoxIndex > -1) {
      /* 获取firefox版本 */
      const endIndex = userAgent.indexOf('.', firefoxIndex);
      const version = userAgent.slice(firefoxIndex + 8, endIndex);
      console.log('firefox:' + version);
      if (version < 70) {
        setImgSrc(LowerVersionImg);
        setVisible(true);
      }
    } else {
      /* 推荐使用xxx浏览器 */
      setImgSrc(NotSupportImg);
      setVisible(true);
    }
  }

  useEffect(() => {
    getBrowserTypeAndVersion();
  }, []);

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      width={628}
      wrapClassName={'check-browser-modal'}
    >
      <img src={imgSrc} alt="不支持" />
    </Modal>
  );
}
