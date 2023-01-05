var images = require('images');
const path = require('path');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);
const dir = pathResolve('../../src/assets/images/login/bg.png');
const targetDir = pathResolve('../../dist/login/bg.jpg');

function compressImg(source, target) {
  images(source) //Load image from file
    .save(target, {
      //Save the image to a file, with the quality of 50
      quality: 100, //保存图片到文件,图片质量为50
    });
}
compressImg(dir, targetDir);
