/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REGION: process.env.REGION,
    AUTH_USER_POOL_ID: process.env.AUTH_USER_POOL_ID,
    AUTH_USER_POOL_CLIENT_ID: process.env.AUTH_USER_POOL_CLIENT_ID
  }
};

module.exports = nextConfig;
