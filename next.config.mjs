import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.bhlist.co.in", "images.clerk.dev", "cdn.discordapp.com", "images.unsplash.com", "localhost", "img.clerk.com", "192.168.1.19", "192.168.1.23","192.168.1.25"],
    },
    experimental: {
        dynamicIO: true,
        allowMiddlewareResponseBody: true
    },
};

export default withNextVideo(nextConfig);