var images = require('images');
const path = require('path');
const fs = require('fs');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);
const dir = pathResolve('../../src/assets/images');
const targetDir = pathResolve('../../dist/');

function compressImg(source, target) {
  images(source) //Load image from file
    .save(target, {
      //Save the image to a file, with the quality of 50
      quality: 100, //保存图片到文件,图片质量为50
    });
}

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
                compressImg(filedir, targetDir + filedir.slice(filedir.indexOf('images') + 7));
              } else {
                copyIt(filedir, targetDir + filedir.slice(filedir.indexOf('images') + 7));
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

if (fs.existsSync(targetDir)) {
  fs.rmdirSync(targetDir, {
    recursive: true,
  });
}
compressLoop(dir);
