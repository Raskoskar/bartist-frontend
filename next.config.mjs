/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {domains: ['placehold.co', 'hostname', 'fakepath', '', 'res.cloudinary.com']}// pour autoriser placehold, ce sera le meme principe pour les autres sites eventuel, les rajouter a la suite
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
