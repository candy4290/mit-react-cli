const path = require('path');
const fs = require('fs');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);
const dir = pathResolve('../../src/assets/images');
const targetDir = pathResolve('../../dist/');

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
              const size = stats.size;
              if (size / 1024 > 500) {
                /* 大于500KB */
                console.log(filedir + ':' + stats.size / 1024 + 'kb');
              }
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
