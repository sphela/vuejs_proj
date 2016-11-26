const spawn = require('child_process').spawn;
const gulp = require('gulp');
const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const flow = require('rollup-plugin-flow');
const eslint = require('gulp-eslint');

const paths = {
  js: {
    src: './src/js/**/*.js',
    dest: './dist/js/',
    client: {
      entry: './src/js/client/main.js'
    },
    server: {
      entry: './src/js/server/main.js',
    },
  },
  bin: {
    flow: './node_modules/flow-bin/cli.js',
  }
};

const cmds = {
  flow: paths.bin.flow,
};

const tasks = {
  JS_CLIENT: 'js_client',
  JS_SERVER: 'js_server',
  DEFAULT: 'default',
  FLOW: 'flow',
  LINT: 'lint',
};

gulp.task(tasks.FLOW, cb => {
  const proc = spawn(cmds.flow);

  proc.stdout.on('data', data => {
    console.log(data.toString('utf8'));
  });

  proc.stderr.on('data', data => {
    console.log(data.toString('utf8'));
  });

  proc.on('close', cb);
});

gulp.task(tasks.LINT, () => {
  return gulp.src(paths.js.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(tasks.JS_CLIENT, function() {
  return gulp.src(paths.js.src)
    .pipe(rollup({
      entry: paths.js.client.entry,
      plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
      ]
    }))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task(tasks.JS_SERVER, function() {
  return gulp.src(paths.js.src)
    .pipe(rollup({
      entry: paths.js.server.entry,
      plugins: [
        flow()
      ],
    }))
    .pipe(gulp.dest(paths.js.dest));
});

const ALL_TASKS = [
  tasks.LINT,
  tasks.FLOW,
  tasks.JS_CLIENT,
  tasks.JS_SERVER,
];

gulp.task(tasks.DEFAULT, gulp.parallel(ALL_TASKS));