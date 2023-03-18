module.exports = {
    env: {
        MY_ENV_VAR: "my env variable"
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // melakukan custom konfigurasi pada webpack
        return config;
    },
    async headers() {
        return [
            {
                // mengatur header pada semua halaman
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'ALLOW'
                    }
                ]
            }
        ]
    },
    output: "standalone",
}