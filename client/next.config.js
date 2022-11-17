module.exports = {
    async rewrites() {
        return [
            {
                source: '/v1/:slug*',
                destination: 'http://localhost:3456/v1/:slug*'
            },
        ]
    },
}
