import IconFont from '@components/icon-font';
import { actions } from '@redux';
import { dictionarySelector } from '@redux/dictionary';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoImg from '@imgs/logo.png';

export default function Page1() {
  const dispatch = useDispatch();

  const dictionary = useSelector(dictionarySelector);
  useEffect(() => {
    /* 触发action */
    dispatch(actions.getDictionary());
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
