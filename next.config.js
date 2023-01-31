const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
module.exports = withPWA({
  images: {
    domains: [
      'restroxbackend.swadeshnepali.com',
      'test-backend-rczos.ondigitalocean.app',
      'restrox-fullonline-backend-ud5kt.ondigitalocean.app',
      'restrox-fullonline-backend-jstzp.ondigitalocean.app',
      'restroxfille.sgp1.digitaloceanspaces.com',
      'https://restrofiles.sgp1.digitaloceanspaces.com',
      'restrofiles.sgp1.digitaloceanspaces.com',
      'testbackend.restrox.co',
    ],
  },
  reactStrictMode: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
