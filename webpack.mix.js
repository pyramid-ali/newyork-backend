let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.js('resources/assets/js/app.js', 'public/js')
    .extract(['vue', 'jquery', 'bootstrap', 'lodash', 'axios']);

mix.sass('resources/assets/sass/bootstrap.scss', 'public/css')
    .sass('resources/assets/sass/app.scss', 'public/css');

mix.sass('resources/assets/sass/bite/style.scss', 'public/css/bite.min.css',
    {
        outputStyle: 'compressed'
    })
    .sourceMaps();

mix.copyDirectory('resources/assets/images', 'public/images');