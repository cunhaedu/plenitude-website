/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'drive.google.com',
      's3.us-south.cloud-object-storage.appdomain.cloud',
    ]
  }
}
