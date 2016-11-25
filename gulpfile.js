const gulp = require('gulp');
const rollup = require('gulp-rollup');

const paths = {
  JS_SRC: './src/js/**/*.js',
  JS_ENTRY: './src/js/main.js',
};

const tasks = {
  JS: 'js_build',
  DEFAULT: 'default',
};

gulp.task(tasks.JS, function() {
  return gulp.src(paths.JS_SRC)
    .pipe(rollup({
      entry: paths.JS_ENTRY,
    }))
    .pipe(gulp.dest('./dist'));
});

const ALL_TASKS = [
  tasks.JS,
];

gulp.task(tasks.DEFAULT, gulp.parallel(ALL_TASKS));