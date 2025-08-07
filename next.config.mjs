/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // add all your allowed external image domains here, e.g.:
      "https://i.scdn.co",
    ],
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
  allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
};

export default nextConfig;
