const { resolve } = require('path');

module.exports = {
    entry: {
        game: './src/js/main.js',
    },
    output: {
        path: resolve(`${__dirname}/dist`),
        filename: '[name].bundle.js',
        publicPath: "dist/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.png/,
                exclude: /(node_modules)/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
};
