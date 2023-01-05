### 命令介绍
启动 npm run start 或者 npm run start:prod
打包 npm run build 或者 npm run build:prod
大文件检查(assets文件夹) npm run checkLargeImg
图片压缩 npm run compressImg
version.json中版本号增大 npm run version

### 启动 npm run start 或者 npm run start:prod

### 打包 npm run build 或者 npm run build:prod

### 上线前记得将version.json中的版本号数值调大[路由跳转时，自动刷新页面，访问新版本]

### 使用react 18.2.0

### 使用UI组件库antd 5.1.2

### @craco/craco 对 create-react-app进行自定义开发

### 使用react-router-dom6.4.4 进行路由导航

### 使用@loadable/component5.15.2进行组件动态加载

### 使用nprogress0.2.0进行路由导航进度显示提醒

### 使用ahooks 3.1.10

### axios0.26.0进行ajax请求 qs6.10.3进行序列号操作

### 使用http-proxy-middleware 2.0.3进行代理配置解决跨域问题

### 使用serve 13.0.2验证打包文件

### 使用dotenv-cli配置多环境变量

### 使用husky进行提交前验证，prettier自动美化代码，eslint定义代码规范

### 使用redux4.2.0,react-redux8.0.2,@reduxjs/toolkit1.8.3

### ie兼容处理

npm install --save core-js@3
npm install regenerator-runtime/runtime --save
/src/index.tsx顶部引入
import "core-js/stable";
import "regenerator-runtime/runtime";

### 浏览器兼容情况

chrome70+ firefox 70+ 360浏览器（极速模式）

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

### 市局地图资源

暗色：
REACT_APP_MAP_SOURCE=<http://15.75.0.255:25003/v3/tile/{z}/{x}/{y}.png>
REACT_APP_MAP_LOAD_SOURCE=<http://15.75.0.255:25033/v3/tile/{z}/{x}/{y}.png>
浅色：
REACT_APP_MAP_SOURCE=<http://15.75.0.255:25888/v3/tile/{z}/{x}/{y}.png>
REACT_APP_MAP_LOAD_SOURCE=<http://15.75.0.255:25333/v3/tile/{z}/{x}/{y}.png>

### 框架功能结构

react
路由导航（懒加载）+自动刷新（新版本）+nprogress路由提示+axios统一封装+antd主题切换+jenkins部署脚本+浏览器兼容+项目结构文件+serve验证打包文件+非组件中如何导航+eslint prettier git钩子+多环境配置+错误边界
+全局状态管理方案（redux:rx可以实现一个redux,context费劲因为存在嵌套、）
+打包优化(打包分析+热重载:react-scripts5.0.0自带+生产环境去除map文件：GENERATE_SOURCEMAP=false)
