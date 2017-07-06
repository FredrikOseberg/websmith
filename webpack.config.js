module.exports = {
     entry: './app.js',

     output: {
          filename: 'bundle.js',
          publicPath: '/'
     },

     module: {
          loaders: [
               {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
               },
               {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
               },
          ]
     },
}
