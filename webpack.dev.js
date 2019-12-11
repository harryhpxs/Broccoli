const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const src_path = path.join(__dirname, "src/");
const dist_path = path.join(__dirname, "dist/");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        path: dist_path,
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: src_path + "index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
                ]
            }
        ]
    }
});