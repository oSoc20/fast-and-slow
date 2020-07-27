module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/fast-and-slow/'
        : '/'
}