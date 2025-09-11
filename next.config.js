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
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com'
            },
            {
                protocol: 'https',
                hostname: 'yt3.ggpht.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.akamai.steamstatic.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.dota2.comundefined'
            },
            {
                protocol: 'https',
                hostname: 'cdn.steamstatic.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.steamusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'steamcdn-a.akamaihd.net'
            },
            {
                protocol: 'https',
                hostname: 'steamusercontent-a.akamaihd.net'
            },
        ]
    }
}

module.exports = nextConfig
