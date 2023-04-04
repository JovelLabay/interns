/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'graph.facebook.com',
      'lh3.googleusercontent.com',
      'picsum.photos',
      'vzcwjqjjfoylirliwhwq.supabase.co',
    ],
  },
};

module.exports = nextConfig;
