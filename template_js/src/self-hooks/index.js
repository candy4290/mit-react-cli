import axios from '@/configs/axios';
import { useEffect } from 'react';

export function useVersion(delay = 60) {
  useEffect(() => {
    axios.get('/version.json').then((res) => {
      if (!localStorage.getItem('Version')) {
        /* 存储版本号 */
        localStorage.setItem('Version', res.version);
      } else {
        /* 存储最新版本号 */
        localStorage.setItem('LastVersion', res.version);
      }
    });
    const temp$ = setInterval(() => {
      axios.get('/version.json').then((res) => {
        if (!localStorage.getItem('Version')) {
          /* 存储版本号 */
          localStorage.setItem('Version', res.version);
        } else {
          /* 存储最新版本号 */
          localStorage.setItem('LastVersion', res.version);
        }
      });
    }, delay * 1000);
    return () => {
      clearInterval(temp$);
    };
  }, [delay]);
}
