const spawn = require('child_process').spawn;
const gulp = require('gulp');
const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const flow = require('rollup-plugin-flow');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

const paths = {
  js: {
    gulpfile: './gulpfile.js',
    src: './src/js/**/*.js',
    dest: './dist/js/',
    client: {
      entry: './src/js/client/main.js'
    },
    server: {
      target: './dist/js/server/main.js',
      entry: './src/js/server/main.js',
    },
  },
  bin: {
    flow: './node_modules/flow-bin/cli.js',
  }
};

const cmds = {
  flow: paths.bin.flow,
  run: `node ${paths.js.server.target}`,
};

const tasks = {
  JS_CLIENT: 'js_client',
  JS_SERVER: 'js_server',
  DEFAULT: 'default',
  FLOW: 'flow',
  LINT: 'lint',
  WATCH: 'watch',
  NODEMON: 'nodemon',
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
  return gulp.src([ paths.js.src, paths.js.gulpfile ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(tasks.JS_CLIENT, () => {
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

gulp.task(tasks.JS_SERVER, () => {
  return gulp.src(paths.js.src)
    .pipe(rollup({
      sourceMap: true,
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

const WATCH_TASKS = [
  tasks.LINT,
  tasks.FLOW,
  tasks.JS_CLIENT,
  tasks.JS_SERVER,
  tasks.NODEMON,
];

gulp.task(tasks.NODEMON, () => {
  return nodemon({
    script: paths.js.server.target,
    watch: './src/',
    tasks: ALL_TASKS,
    env: { 'NODE_ENV': 'development' },
  });
});

gulp.task(tasks.WATCH, gulp.series(WATCH_TASKS));

gulp.task(tasks.DEFAULT, gulp.parallel(ALL_TASKS));
