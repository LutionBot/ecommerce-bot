var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    del         = require('del'), // rm -rf
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass');

gulp.task('delete', function() {
  return del(['dist']);
});

gulp.task('sass-dev', function () {
 return gulp.src('./src/stylesheets/style.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./statics/default/stylesheets/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/stylesheets/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('./src/js/*.js', ['bundleJs']);
});

gulp.task('bundleJs', ['delete'], function () {
  var localFiles      = './src/js/lution-ecommerce.js',
    jquery = './node_modules/jquery/dist/jquery.min.js';
  return gulp.src([localFiles])
          .pipe(concat('chatbot.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('statics/default/js'));
});

gulp.task('sass', function () {
  var css = ['./src/stylesheets/style.scss',
  './src/stylesheets/spinner.scss'];
  return gulp.src(css)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./statics/default/stylesheets/'));
});

gulp.task('build', ['delete', 'bundleJs', 'sass', 'js:watch']);

gulp.task('default', ['build', 'sass']);
