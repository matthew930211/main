import { withNextVideo } from "next-video/process";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "cdn.bhlist.co.in", "images.clerk.dev", "cdn.discordapp.com", "images.unsplash.com", "localhost", "img.clerk.com", "192.168.1.19", "192.168.1.23","192.168.1.25"],
    },
    experimental: {
        dynamicIO: true,
        allowMiddlewareResponseBody: true
    },
};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
  }

export default withNextVideo(nextConfig);
