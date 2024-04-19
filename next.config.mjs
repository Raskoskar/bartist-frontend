/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {domains: ['placehold.co', 'hostname', 'fakepath', '']}// pour autoriser placehold, ce sera le meme principe pour les autres sites eventuel, les rajouter a la suite
};

export default nextConfig;
