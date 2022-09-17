/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'www.themoviedb.org', 'images.unsplash.com']
  },
  env: {
    "API_KEY": "AIzaSyAgniLlUWBxnR7KgmyQoM6CeFFvOZal3AI",
    "AUTH_DOMAIN": "disney-clone-31297.firebaseapp.com",
    "PROJECT_ID": "disney-clone-31297",
    "STORAGE_BUCKET": "disney-clone-31297.appspot.com",
    "MESSAGING_SENDER_ID": "1068486841528",
    "APP_ID": "1:1068486841528:web:5a64607320d9adb48d504d"
  }
}

module.exports = nextConfig
