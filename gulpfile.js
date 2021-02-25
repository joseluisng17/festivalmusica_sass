 const { series, src, dest, watch, parallel } = require('gulp');
 const sass = require('gulp-sass');
 const imagemin = require('gulp-imagemin');
 const notify = require('gulp-notify');
 const webp = require('gulp-webp');
 const concat = require('gulp-concat');



const paths = {
    imagenes: 'src/img/**/*', // Va entrar a todas las carpetas y va buscar todas las imagenes con extensiones de imagenes .jpg .png. ect.
    scss: 'src/scss/**/*.scss', // Va entrar a todas las carpetas y va buscar todo los archivos .scss
    js: 'src/js/**/*.js'
}

// Función que compila SASS
function css(){
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'expanded'
        }) )
        .pipe( dest('./build/css') )
}

function minificarcss(){
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        .pipe( dest('./build/css') )
}

function javascript() {
    return src(paths.js)
        .pipe( concat('bundle.js') )
        .pipe( dest('./build/js') )
}

function imagenes(){
    return src(paths.imagenes) 
        .pipe(imagemin())
        .pipe( dest('./build/img'))
        .pipe( notify({ message: 'Imagen Minificada' }))
}

function versionWebp(){
    return src(paths.imagenes) 
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({ message: 'Version webP Lista' }))

}

// Funcion para estar a la escucha de los cambios de los archivos
function watchArchivos(){
    watch( paths.scss, css ); // * = La carpeta actual  -  ** todo los archivos con esa extensión
    watch(paths.js, javascript);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.javascript = javascript;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos);