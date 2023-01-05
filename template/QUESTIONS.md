useEffect(() => {
    setCount(2);
    setTimeout(() => {
      console.log(count); // 为何输出不是2？？
    }, 1000);
  }, []);
  解答:https://github.com/facebook/react/issues/14010或者https://beta.reactjs.org/learn/state-as-a-snapshot
  解决方案：使用useRef或者setCount(currCount => currCount+1)