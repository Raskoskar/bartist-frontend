/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      { hostname: 'hostname' },
      { hostname: 'fakepath' },
      { hostname: 'res.cloudinary.com' },
    ],
  },
};

webpack: (config, { isServer }) => {
  // Fixes npm packages that depend on `fs` module
  if (!isServer) {
    config.node = {
      fs: 'empty'
    }
  }
}
  export default nextConfig;
