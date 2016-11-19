module.exports = {
    entry: {
        game: './src/js/main.js',
    },
    output: {
        path: 'dist',
        filename: '[name].bundle.js',
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.png/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader'
            }
        ]
    }
}
