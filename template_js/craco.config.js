/* eslint-disable no-unused-vars */
const CracoLessPlugin = require('craco-less');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const path = require('path');
const {
  // whenProd,
  getPlugin,
  pluginByName,
  removePlugins,
} = require('@craco/craco');
const pathResolve = pathUrl => path.join(__dirname, pathUrl);
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: lessRule => {
          lessRule.use.push({
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, 'src/styles/_variable.less'),
                path.resolve(__dirname, 'src/styles/_func.less'),
              ],
              injector: 'append', // 如果在样式文件之后导入就加此行配置
            },
          });
          return lessRule;
        },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      /* 路径别名 */
      '@src': pathResolve('src'),
      '@pages': pathResolve('src/pages'),
      '@components': pathResolve('src/components'),
      '@ajax': pathResolve('src/configs/axios'),
      '@apis': pathResolve('src/configs/apis'),
      '@assets': pathResolve('src/assets'),
      '@imgs': pathResolve('src/assets/images'),
      '@utils': pathResolve('src/utils'),
      '@configs': pathResolve('src/configs'),
      '@styles': pathResolve('src/styles'),
      '@redux': pathResolve('src/redux'),
    },
    plugins: [
      new SimpleProgressWebpackPlugin() /* 打包进度显示 */,
      // ...whenProd(
      //   () => [
      //     // new BundleAnalyzerPlugin({
      //     //   analyzerMode: 'disabled', /* 不启动展示打包报告的http服务器  */
      //     //   generateStatsFile: true /* 是否生成stats.json文件 */
      //     // }),
      //   ],
      //   []
      // ),
    ],
    configure: webpackConfig => {
      webpackConfig.plugins.forEach(i => {
        if (i.key === 'ESLintWebpackPlugin') {
          i.options.emitError = process.env.NODE_ENV === 'production' ? false : false;
          i.options.emitWarning = process.env.NODE_ENV === 'production' ? false : false;
          i.options.failOnError = false; // 设置eslint-error级别错误，不会导致编译报错
        }
        if (i.constructor.pluginName === 'mini-css-extract-plugin') {
          // chunk common [mini-css-extract-plugin] Conflicting order
          i.options.ignoreOrder = true;
        }
      });
      webpackConfig.devtool =
        webpackConfig.mode === 'development' ? 'cheap-module-source-map' : false;
      if (process.env.NODE_ENV === 'production') {
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            commons: {
              chunks: 'all',
              name: 'common',
              minChunks: 3,
              priority: 5,
            },
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name: 'vendor',
              priority: 10,
              enforce: true,
            },
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              priority: 20, // 优先级
            },
          },
        };
      }
      // return smp.wrap(webpackConfig);
      return webpackConfig;
    },
  },
};
