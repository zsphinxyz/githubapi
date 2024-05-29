/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.dota2.com'
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com'
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org'
            },
            {
                protocol: 'https',
                hostname: 'mainfacts.com'
            },
            {
                protocol: 'https',
                hostname: 'cataas.com'
            }
        ]
    }
}

module.exports = nextConfig
