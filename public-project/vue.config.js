
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    baseUrl: '/',
    outputDir:'dist1',
    assetsDir:'assets',

    devServer: {
        open:'false',
        host:'localhost',
        port:'8082',
        proxy: {
            '/apis': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/apis': ''
                }
            }
        }
    }
}