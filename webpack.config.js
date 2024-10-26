// const path = require('path');  

// module.exports = {  
//     entry: './src/index.js',  
//     output: {  
//         filename: 'bundle.js',  
//         path: path.resolve(__dirname, 'dist'),  
//     },  
//     module: {  
//         rules: [  
//             {  
//                 test: /\.scss$/,  
//                 use: ['style-loader', 'css-loader', 'sass-loader'],  
//             },  
//         ],  
//     },  
//     mode: 'development',  
// };

const path = require('path');  
const HtmlWebpackPlugin = require('html-webpack-plugin');  

module.exports = {  
    entry: './src/index.js',  
    output: {  
        filename: 'bundle.js',  
        path: path.resolve(__dirname, 'dist'),  
        clean: true,  
    },  
    module: {  
        rules: [  
            {  
                test: /\.scss$/,  
                use: ['style-loader', 'css-loader', 'sass-loader'],  
            },  
            {  
                test: /\.js$/,  
                exclude: /node_modules/,  
                use: {  
                    loader: 'babel-loader',  
                    options: {  
                        presets: ['@babel/preset-env']  
                    }  
                }  
            }  
        ],  
    },  
    plugins: [  
        new HtmlWebpackPlugin({  
            title: 'Contact Form',  
            template: 'src/index.html',  
        }),  
    ],  
    mode: 'development',  
};