const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const withWorkbox = require('next-workbox');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
});

module.exports = withWorkbox({
  generateBuildId: async () => {
    return '201901121714';
  },
  runtimeCaching: [
    {
      urlPattern: /api\/(artists|tracks)/i,
      handler: 'cacheFirst',
      options: {
        matchOptions: {
          ignoreSearch: true, //ignore access token query
        },
      },
    },
    {
      urlPattern: /api\/accessToken/i,
      handler: 'networkFirst',
    },
  ],
});
