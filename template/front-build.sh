#!/bin/bash
export current_path=`pwd`
echo 'jenkins_workspace is here' $current_path


if [ "$option" = true ]; then
echo 'npm install...'
rm -rf node_modules && npm install; fi

if [ "$environment" = "test" ]; then
npm run build || exit 1;fi

if [ "$environment" = "prod" ]; then
echo '构建生产环境包...'
npm run build:prod || exit 1;fi

# /home/kaizhidev/cxx/nginx-1.16.1/html/jiadingqinwu
export front_home=/home/kaizhidev/cxx/nginx-1.16.1/html/jiadingqinwu
export front_home_prod=/home/kaizhidev/production_deploy_packages/frontend/jiadingqinwu

if [ "$environment" = "test" ]; then
cd $front_home 
rm -rf build.bk
mv build build.bk
cp -r  $current_path/build ./
fi

if [ "$environment" = "prod" ]; then
cd $front_home_prod
rm -rf build.tar
cp -r  $current_path/build ./
tar -zcvf build.tar build
rm -rf build
fi

echo 'ok'