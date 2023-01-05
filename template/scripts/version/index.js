/* version自动增大1 */
const targetPath = '../../public/version.json';
const version = require(targetPath);
const fs = require('fs');

const num = +version.version.split('.').join('') + 1;
let result;
if (num > 999) {
  const temp = num + '';
  result =
    temp.slice(0, temp.length - 2) +
    '.' +
    temp
      .slice(temp.length - 2)
      .split('')
      .join('.');
} else {
  result = (num + '').split('').join('.');
}
fs.writeFileSync(
  targetPath,
  JSON.stringify({
    version: result,
  })
);
