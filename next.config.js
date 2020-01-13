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
  webpack: config => {
    // import things with absolute path
    config.resolve.alias['app'] = __dirname;
    return config;
  },
  generateBuildId: async () => {
    return '2019-01-13-2210';
  },
  runtimeCaching: [
    {
      urlPattern: /api\/(artists|tracks)/i,
      handler: 'cacheFirst',
      options: {
        matchOptions: {
          ignoreSearch: true, //ignore access token query
        },
        cacheName: 'artist and track data',
        expiration: {
          maxEntries: 1000,
        },
      },
    },
    {
      urlPattern: /api\/accessToken/i,
      handler: 'networkFirst',
    },
  ],
});
