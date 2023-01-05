import IconFont from '@components/icon-font';
import { dictionarySelector, getDictionary } from '@src/redux/dictionary';
import { useEffect } from 'react';
import LogoImg from '@imgs/logo.png';
import { useAppDispatch, useAppSelector } from '@redux/hook';

export default function Page1() {
  const dispatch = useAppDispatch();
  const dictionary = useAppSelector(dictionarySelector);

  useEffect(() => {
    console.log('----------')
    /* 触发action */
    dispatch(getDictionary());
  }, [dispatch]);
  useEffect(() => {
    /* 获取redux中的状态 */
    console.log(dictionary);
  }, [dictionary]);
  return (
    <>
      <img src={LogoImg} alt="" />
      {/* iconfont图标 */}
      <IconFont type="iconsheshi" />
      <div style={{ fontFamily: 'BigruixianBlackGBV10' }}>字体使用</div>
    </>
  );
}
