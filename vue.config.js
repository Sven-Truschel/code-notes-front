var webpack = require("webpack");
var axios = require('axios')
const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    transpileDependencies: [
        /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
    ],
    configureWebpack: {
        plugins: [

            new CKEditorWebpackPlugin({
                // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                language: 'en'
            })

        ]
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
        config.module
            .rule('cke-svg')
            .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
            .use('raw-loader')
            .loader('raw-loader');

        config.module
            .rule('cke-css')
            .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
            .use('postcss-loader')
            .loader('postcss-loader')
            .tap(() => {
                return styles.getPostCssConfig({
                    themeImporter: {
                        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                    },
                    minify: true
                });
            });
    },

    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },

    transpileDependencies: [
        'quasar'
    ]
}