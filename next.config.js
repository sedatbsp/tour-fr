/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'secret-key'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8084' // development api
        : 'http://188.166.162.51:8084' // production api
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api-otg/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
