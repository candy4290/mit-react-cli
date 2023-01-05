/**
 * 16进制颜色转rgba
 *
 * @export
 * @param {string} sHex 16进制颜色值
 * @param {number} [alpha=1] 透明度
 * @returns
 */
export function colorRgba(sHex: string, alpha: number) {
  return (
    'rgba(' +
    parseInt('0x' + sHex.slice(1, 3), 0) +
    ',' +
    parseInt('0x' + sHex.slice(3, 5), 0) +
    ',' +
    parseInt('0x' + sHex.slice(5, 7), 0) +
    ',' +
    alpha +
    ')'
  );
}

/* key-value形式数据获取key */
export function getKey(val: any) {
  if (val) {
    val = `${val}`;
    return val.split('-')[0];
  }
  return '';
}
/* key-value形式数据获取value,如果value不存在，返回key */
export function getValue(val: any) {
  if (val || isNumber(val)) {
    val = `${val}`;
    const temp = val.split('-');
    if (temp.length > 2) {
      return val;
    }
    return temp[1] || temp[0] || '-';
  }
  return '';
}

/* 判断是否是数字 */
export function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * 过滤对象中，value为空的key
 *
 * @export
 * @param {*} obj
 * @param {string} key
 * @param {*} value
 * @param {boolean} [isNum=false]
 */
export function parseData(obj: any, key: any, value: any, isNum = false) {
  if (!(value === null || value === 'undefined' || typeof value === 'undefined' || value === '')) {
    if (isNum) {
      obj[key] = Number(value);
    } else {
      obj[key] = value;
    }
  } else {
    delete obj[key];
    // obj[key] = null;
  }
}

/**
 * 将obj中value为null的，从obj中删除，返回副本，不对obj做修改
 *
 * @export
 * @param {object} obj
 */
export function parseObj(obj: any) {
  const temp = JSON.parse(JSON.stringify(obj));
  Object.keys(temp).forEach(key => {
    if (!temp[key]) {
      delete temp[key];
    }
  });
  return temp;
}

/* 将全国省市数据转为Cascader组件需要的格式 */
export function getProvinceAndCityData(data: any) {
  const result: any = [];
  Object.keys(data['86']).forEach(item => {
    const temp: any = { label: data['86'][item], value: item, children: [] };
    Object.keys(data[item]).forEach(i => {
      temp.children.push({ label: data[item][i], value: i });
    });
    result.push(temp);
  });
  return result;
}

/**
 * 生成UUID
 *
 * @export
 * @returns
 */
export function uuid() {
  var s: any = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
}
/* 数字加千分位-传入数字或字符串（数字） */
export function NumberToLocal(val: any) {
  if ((val && !isNaN(val)) || val === 0) {
    return (+val).toLocaleString();
  } else {
    return '-';
  }
}

/* 将秒转为 x分钟y秒 */
export function transformSeconds(nums: any) {
  if (isNumber(nums)) {
    if (nums < 60) {
      return nums + '秒';
    } else {
      const mins = parseInt((nums / 60) + '');
      if (mins < 60) {
        const seconds = nums % 60;
        return mins + '分' + seconds + '秒';
      } else {
        const hours = parseInt((mins / 60) + '');
        const seconds = nums % 60;
        return hours + '时' + mins + '分' + seconds + '秒';
      }
    }
  }
  return nums;
}

export function throwIfMissing() {
  throw new Error('Missing parameter');
}

/*
 * @description 设置URL参数
 * @method setUrlParams
 * @param {String} url url路径，如http://xxx.xx.xxx.xx或pages/veiw/login
 * @param {Object} params 设置的参数，对象格式，如{a: 1, b: 2}
 * @param {Boolean} isCoverOldParam 是否覆盖路径原有参数，默认true
 * @return {String} url 设置参数后的路径如http://xxx.xx.xxx.xx?a=1&b=2
 */
export function setUrlParams(url: any = throwIfMissing(), params = {}, isCoverOldParam = true) {
  if (typeof params !== 'object') throw new TypeError('"params" parameter must be of object type');

  if (JSON.stringify(params) === '{}') return url;

  let result = '',
    oParam = {},
    param: any = {};

  if (url.indexOf('?') === '-1') {
    result = url;
  } else {
    result = url.split('?')[0];
    oParam = parseUrlParams(url);
  }
  if (isCoverOldParam) {
    Object.assign(param, oParam, params);
  } else {
    Object.assign(param, params, oParam);
  }

  result += '?';
  for (let i in param) {
    result += i + '=' + param[i] + '&';
  }

  return result.substr(0, result.length - 1);
}

/*
 * @description 解析路径参数
 * @method parseUrlParams
 * @param {String} url 路径，如http://xxx.xx.xxx.xx?a=1&b=2
 * @return {Object} 参数对象，如{a: 1, b: 2}
 */
export function parseUrlParams(url: any = throwIfMissing()) {
  let search = url.indexOf('?') !== -1 ? url.substring(url.lastIndexOf('?') + 1) : '',
    ret: any = {},
    seg = search.replace(/^\?/, '').split('&'),
    len = seg.length,
    i = 0,
    s;

  for (; i < len; i++) {
    if (!seg[i]) {
      continue;
    }
    s = seg[i].split('=');
    ret[s[0]] = decodeURI(s[1]);
  }

  return ret;
}

/* 获取当前页面url */
export function getCurrentPath() {
  return window.location.pathname + window.location.search;
}
