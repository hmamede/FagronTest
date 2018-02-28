let webpack = require('webpack');
let path = require('path');

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: [
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-cookies',
            'angular-ui-router',
            'angular-messages',
            'angular-sanitize',
            'angular-busy',
            'angular-jwt',
            'angular-touch',
            'angular-dynamic-locale',
            'angular-ui-bootstrap',
            'angular-ui-grid',
            'underscore',
            'oclazyload',
            'bootstrap',
            'bootstrap-hover-dropdown',
            'jquery-slimscroll',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        publicPath: '/assets',
        filename: 'app.bundle.js'
    }
    ,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.ProvidePlugin({
            _: 'underscore'
        })
        //
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),
        ,

    ],
    devtool: 'source-map'
};
