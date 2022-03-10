import { Button } from 'antd';
import axios from '@/configs/axios';
import apis from '@/configs/apis';
import { useSafeState } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import actions from '@/actions';
import { useDispatch, useSelector } from 'react-redux';

function Demo() {
  const [loading, setLoading] = useSafeState(false);
  const dictionary = useSelector((state: any) => state.dictionary);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('demo init');
    dispatch(actions.getDictionary());
    return () => {
      console.log('demo destory');
    };
  }, [dispatch]);

  useEffect(() => {
    console.log(dictionary);
  }, [dictionary]);

  function handleRequest() {
    setLoading(true);
    axios
      .get(apis.testUrl, {
        params: {
          orgCode: '310115470000',
          searchDate: '2022-03-07 16:50:34',
        },
      })
      .then(
        rsp => {
          console.log(rsp);
          setLoading(false);
        },
        () => setLoading(false)
      );
    setTimeout(() => {
      navigate('/');
    }, 100);
  }
  return (
    <>
      {console.log('demo render')}
      <Button loading={loading} onClick={handleRequest}>
        发起请求,跳转回demo1
      </Button>
    </>
  );
}
export default Demo;
