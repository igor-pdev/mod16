const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function compressImages() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

function compileSass() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

function compressJs() {
  return gulp.src('src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

function watchFiles() {
  gulp.watch('src/images/*', compressImages);
  gulp.watch('src/scss/*.scss', compileSass);
  gulp.watch('src/js/*.js', compressJs);
}

const build = gulp.series(gulp.parallel(compressImages, compileSass, compressJs));
const watch = gulp.parallel(watchFiles);

exports.compressImages = compressImages;
exports.compileSass = compileSass;
exports.compressJs = compressJs;
exports.watch = watch;
exports.build = build;
