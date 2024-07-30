/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/getBlog",
        headers: [
          {
            key: "Timeout",
            value: "30s", // increase the timeout to 30 seconds
          },
        ],
      },
    ];
  },
};

export default nextConfig;
