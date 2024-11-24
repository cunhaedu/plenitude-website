/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'tailwindui.com'  },
      { hostname: 'images.unsplash.com' },
      { hostname: 'drive.google.com' },
      { hostname: 's3.us-south.cloud-object-storage.appdomain.cloud' },
      { hostname: 'comunidade-plenitude-bucket.s3.us-south.cloud-object-storage.appdomain.cloud' },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  }
}
