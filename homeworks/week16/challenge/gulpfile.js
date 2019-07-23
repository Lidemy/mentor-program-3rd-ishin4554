const gulp = require('gulp');
const postcss = require('gulp-postcss');

gulp.task('css', () => gulp.src('css/main.css')
  .pipe(postcss([
    require('autoprefixer')({}),
    require('cssnano'),
  ]))
  .pipe(gulp.dest('dest/main.css')));
