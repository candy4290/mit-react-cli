const path = require('path');
const fs = require('fs');

const tinify = require('tinify');
tinify.key = ''; /* 填写有效key https://tinypng.com/developers */

if (!tinify.key) {
  throw Error('请填写有效的tinypng的key');
}

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

const dir = pathResolve('../../src/assets/images');
const targetDir = pathResolve('../../src/assets/optimized-images/');

function copyIt(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from));
}

function compressLoop(filePath) {
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(fileName => {
        const filedir = path.join(filePath, fileName);
        fs.stat(filedir, (err2, stats) => {
          if (!err2) {
            const targeturl = targetDir + filedir.slice(filedir.indexOf('images') + 7);
            const targetDirt = targeturl.slice(0, -fileName.length - 1);
            if (!fs.existsSync(targetDirt)) {
              fs.mkdirSync(targetDirt);
            }
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            if (isFile) {
              if (fileName.endsWith('.png') || fileName.endsWith('.jpg')) {
                const source = tinify.fromFile(filedir);
                source.toFile(targetDir + filedir.slice(filedir.indexOf('images') + 7));
              } else {
                copyIt(filedir, targetDir + filedir.slice(filedir.indexOf('images') + 7));
              }
              // const size = stats.size;
              // if (size / 1024 > 300) {
              //   /* 大于500KB */
              //   console.log(filedir + ':' + stats.size / 1024 + 'kb');
              // }
            }
            if (isDir) {
              compressLoop(filedir);
            }
          }
        });
      });
    }
  });
}

compressLoop(dir);
