/**
 * 计算start到end日期之间的天数（01-03 是3天）
 *
 * @export
 * @param {*} start
 * @param {*} end
 * @return {*}
 */
export function getDays(start: any, end: any) {
  start = start.replace(/(^\s*)|(\s*$)/g, '');
  end = end.replace(/(^\s*)|(\s*$)/g, '');
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  return (endDate - startDate) / 1000 / 60 / 60 / 24 + 1;
}

/**
 * 获取相对于今天前preDay的日期
 *
 * @export
 * @param {*} preDay
 * @return {*}
 */
export function getDate02(preDay: any) {
  const time = new Date().getTime() - preDay * 24 * 60 * 60 * 1000;
  const date = new Date(time);
  let month: any = date.getMonth() + 1;
  let strDate: any = date.getDate();
  month = `${month}`.padStart(2, '0');
  strDate = `${strDate}`.padStart(2, '0');
  const currentDate = date.getFullYear() + '-' + month + '-' + strDate;
  return currentDate;
}

/**
 * 获取相对于target前preDay天的日期
 *
 * @export
 * @param {*} preDay
 * @return {*}
 */
export function getDate03(target: any, preDay: any) {
  const time = new Date(target).getTime() - preDay * 24 * 60 * 60 * 1000;
  const date = new Date(time);
  let month: any = date.getMonth() + 1;
  let strDate: any = date.getDate();
  month = `${month}`.padStart(2, '0');
  strDate = `${strDate}`.padStart(2, '0');
  const currentDate = date.getFullYear() + '-' + month + '-' + strDate;
  return currentDate;
}

/**
 * 返回开始结束日期的日期数组
 *
 * @export
 * @param {*} start
 * @param {*} end
 */
export function getDaysArray(start: any, end: any) {
  const days = getDays(start, end);
  const result = [];
  for (let i = 0; i < days; i++) {
    result.push(getDate03(end, i));
  }
  return result;
}
/**
 * 获取当年前后n年的年份列表
 *
 * @export
 * @param {number} [n=5]
 * @return {*}
 */
export function getYears(n = 5) {
  let arr_before = [];
  let arr_after = [];
  for (let i = n; 0 <= i; i--) {
    let d = new Date();
    arr_before.push(d.getFullYear() - i);
  }

  for (let i = 1; i <= n; i++) {
    let d = new Date();
    arr_after.push(d.getFullYear() + i);
  }

  return arr_before.concat(arr_after);
}
