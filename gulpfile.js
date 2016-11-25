const gulp = require('gulp');
const rollup = require('gulp-rollup');

const paths = {
  js: {
    client: {
      src:  './src/js/client/**/*.js',
      entry: './src/js/client/main.js',
      dest: './dist/client/',
    },
    server: {
      src:  './src/js/server/**/*.js',
      entry: './src/js/server/main.js',
      dest: './dist/server/',
    },
  },
};

const tasks = {
  JS_CLIENT: 'js_client',
  JS_SERVER: 'js_server',
  DEFAULT: 'default',
};

gulp.task(tasks.JS_CLIENT, function() {
  return gulp.src(paths.js.client.src)
    .pipe(rollup({
      entry: paths.js.client.entry,
    }))
    .pipe(gulp.dest(paths.js.client.dest));
});

gulp.task(tasks.JS_SERVER, function() {
  return gulp.src(paths.js.server.src)
    .pipe(rollup({
      entry: paths.js.server.entry,
    }))
    .pipe(gulp.dest(paths.js.server.dest));
});

const ALL_TASKS = [
  tasks.JS_CLIENT,
  tasks.JS_SERVER,
];

gulp.task(tasks.DEFAULT, gulp.parallel(ALL_TASKS));