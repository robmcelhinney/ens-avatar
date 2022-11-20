module.exports = {
    async rewrites() {
        return [
            {
                source: '/v1/:slug*',
                destination: (process.env.NODE_ENV == "development" ? 'http://localhost:3456/v1/:slug*' : process.env.PROXY_API + '/v1/:slug*')
            },
        ]
    },
}
