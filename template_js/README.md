### 命令介绍
启动 npm run start 或者 npm run start:prod
打包 npm run build 或者 npm run build:prod
大文件检查(assets文件夹) npm run checkLargeImg
图片压缩 npm run compressImg
图片压缩(使用tinypng---推荐使用这个) npm run compressImgs
version.json中版本号增大 npm run version

如果项目不是部署在根目录。比如需要访问http://xxxx:yyy/admin/来访问项目
则需要做如下几个步骤：
1..env或者.env.production中的PUBLIC_URL值修改为/admin
2.将打包后文件夹的名字改为admin，或者通过更新craco.config.js中的outputDir的值，来指定打包后文件夹的名字
3.nginx配置
    location /admin {
        root D:/git/jiadingqinwu;
        try_files $uri $uri/admin /admin/index.html;
        index index.html;
    }
### 上线前记得将version.json中的版本号数值调大[路由跳转时，自动刷新页面，访问新版本]

### 使用react 18.2.0

### 使用UI组件库antd 5.1.2

### 使用less

其中在_shared.less,_variable.less,_func.less中的样式，全局通用，不需要再额外引入。
_shared.less用来定义全局共享的样式
_variable.less用来定义全局的less变量
_func.less用来定义全局的less函数

### @craco/craco 对 create-react-app进行自定义开发

### 使用react-router-dom6.4.4 进行路由导航

### 使用@loadable/component5.15.2进行组件动态加载

### 使用nprogress0.2.0进行路由导航进度显示提醒

### 使用ahooks 3.7.0

### axios1.1.3进行ajax请求 qs6.10.3进行序列号操作

### 使用serve 13.0.2验证打包文件

### 使用dotenv-cli配置多环境变量

### 使用husky进行提交前验证，prettier自动美化代码，eslint定义代码规范

### 使用redux4.2.0,react-redux8.0.2,@reduxjs/toolkit1.8.3

### 浏览器兼容处理

通过调整package.json中的browserslist，来指定兼容的浏览器版本

### vscode插件推荐

Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
Auto Rename Tag
Color Picker
Debugger for Chrome
Document This
Eclipse Keymap
EditorConfig for VS Code
ENV
ESLint
TSLint
file-icons
Git History
gitignore
JavaScript(ES6) code snippets
Prettier - Code formatter
React/Redux/react-router Snippets
Svg Preview
Highlight
vscode-json
Path Intellisense 用来处理路径别名，在vscode中可以自动提示，跳转等功能
MDX Preview

### 框架功能结构

react
路由导航（懒加载）+自动刷新（新版本）+nprogress路由提示+axios统一封装+jenkins部署脚本+浏览器兼容+项目结构文件+serve验证打包文件+非组件中如何导航+eslint prettier git钩子+多环境配置+错误边界
+全局状态管理方案
+打包优化(打包分析+热重载:react-scripts5.0.0自带+生产环境去除map文件：GENERATE_SOURCEMAP=false)
+静态图片压缩
