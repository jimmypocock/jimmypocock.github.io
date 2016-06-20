'use strict';

var
gulp = require('gulp'),
minifyCss = require('gulp-minify-css'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
// replace = require('gulp-replace'),
uglify = require('gulp-uglify')
;

gulp.task('script', function() {
  gulp.src('./scripts/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 8']
    }))
    .pipe(concat('style.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./scripts/**/*.js', ['script']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['script', 'sass', 'watch']);

gulp.task('build', ['script', 'sass', 'zip']);
