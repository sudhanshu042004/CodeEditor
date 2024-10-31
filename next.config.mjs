/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.mjs

export default {
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    });
    return config;
  },
};
