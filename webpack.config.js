const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        open: true,
        static: './src',
        hot: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      })
    ],
  };