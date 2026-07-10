/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html"
      }
    ];
  }
};

export default nextConfig;
