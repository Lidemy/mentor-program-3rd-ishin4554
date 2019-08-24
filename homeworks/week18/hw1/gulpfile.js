const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function sassTranspile() {
  return src('*.sass')
    .pipe(sass())
    .pipe(dest('./css'));
}

function cssMinify() {
  return src('css/*.css')
    .pipe(minify({ compatibility: 'ie8' }))
    .pipe(dest('./css'));
}

function jsUglify() {
  return src('app/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(dest('./js'));
}

exports.default = series(sassTranspile, cssMinify, jsUglify);
