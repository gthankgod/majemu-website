/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.js",
  },
};

export default nextConfig;
