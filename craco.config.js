const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#03387b',
          '@link-color': '#03387b',
          '@back-color': '#03387b',
          '@skcancel-color': '#fa541c'
        },
      },
    },
  ],
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      if (!webpackConfig.plugins) {
        config.plugins = [];
      }

      webpackConfig.plugins.push(
        process.env.NODE_ENV === 'production'
          ? new CopyWebpackPlugin({
            patterns: [
              {
                from: 'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
              },
              {
                from: 'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
              },
              {
                from: 'src/lib/abp.js',
              },
            ]
          })
          : new CopyWebpackPlugin({
            patterns: [
              {
                from: 'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
              },
              {
                from: 'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                to: 'dist/abp.signalr-client.js'
              },
              {
                from: 'src/lib/abp.js',
              },
            ]
          })
      );

      return webpackConfig;
    },
  },
};
