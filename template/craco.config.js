/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve('src'),
      '@components': path.resolve('src/components'),
      '@pages': path.resolve('src/pages'),
      '@styles': path.resolve('src/styles'),
      '@mitTypes': path.resolve('src/types'),
      '@assets': path.resolve('src/assets'),
      '@imgs': path.resolve('src/assets/images'),
    },
    plugins: [
      new SimpleProgressWebpackPlugin() /* 打包进度显示 */,
      // 打压缩包
      // new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: new RegExp(
      //     '\\.(' +
      //     ['js', 'css'].join('|') +
      //     ')$'
      //   ),
      //   threshold: 1024,
      //   minRatio: 0.8
      // }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: false,
      //   generateStatsFile: true /* 是否生成stats.json文件 */
      // }),
    ],
    //抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    // configure: (webpackConfig) => {
    //   webpackConfig.plugins = [
    //     ...webpackConfig.plugins,
    //     new SimpleProgressWebpackPlugin()
    //   ]
    //   return webpackConfig;
    // }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
