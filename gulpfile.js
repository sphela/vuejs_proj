'use strict';

const spawn = require('child_process').spawn;
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const webpack = require('gulp-webpack');
const nodeExternals = require('webpack-node-externals');
const webpackOptions = require('./webpack.config');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const through = require('through2');
const babel = require('babel-core');

const appContainer = 'containers/app/';
const jsBuildPath = `${appContainer}src/js/`;
function buildPath (type) {
  return `${jsBuildPath}${type}/`;
}

const paths = {
  watchSrc: './src/',
  css: {
    src: `./src/sass/**/*.scss`,
    sassDest: `${__dirname}/${appContainer}/src/sass/`,
    vueStyles: `${__dirname}/${buildPath('client')}style.css`,
    dest: `${__dirname}/${appContainer}/src/css/`,
  },
  js: {
    gulpfile: './gulpfile.js',
    src: './src/js/**/*.js',
    dest: jsBuildPath,
    client: {
      src: [
        './src/vue/**/*.vue',
        './src/js/client/**/*.js',
        './src/js/shared/**/*.js'
      ],
      entry: './src/js/client/main.js',
      dest: `${__dirname}/${buildPath('client')}`,
    },
    server: {
      src: [
        './src/vue/**/*.vue',
        './src/js/server/**/*.js',
        './src/js/shared/**/*.js'
      ],
      target: `./${buildPath('server')}main.js`,
      entry: './src/js/server/main.js',
      init: './src/js/server/init.js',
      dest: `${__dirname}/${buildPath('server')}`,
    },
  },
  bin: {
    flow: './node_modules/flow-bin/cli.js',
  }
};

const cmds = {
  deployStatic: './scripts/deploy-static.sh',
  externalHelpers: './node_modules/.bin/babel-external-helpers',
  flow: paths.bin.flow,
  run: `node ${paths.js.server.target}`,
};

const tasks = {
  JS_CLIENT: 'js-client',
  JS_SERVER: 'js-server',
  DEFAULT: 'default',
  FLOW: 'flow',
  LINT: 'lint',
  WATCH: 'watch',
  NODEMON: 'nodemon',
  DEPLOY_STATIC: 'deploy-static',
  SASS: 'sass',
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
  const options = Object.assign({}, webpackOptions);
  let latest = null;
  options.entry = paths.js.client.entry;

  return gulp.src(paths.js.client.src)
    .pipe(webpack(options))
    // Some gulp-foo to prepend babel helpers to output file.
    // See: https://babeljs.io/docs/plugins/external-helpers/
    .pipe(function () {
      // These need to be actual functions and not arrow functions as gulp binds a this context.
      return through.obj(function (file, enc, cb) {
        // `latest` & `file` an instance of Vinyl virtual files. In this case the file contains the js output from webpack.
        latest = file;
        cb();
      }, function (cb) {
        let contents = through();
        contents.write(babel.buildExternalHelpers());
        contents.write('\n');
        contents.write(latest.contents);
        contents.end();

        // `file` is an instance of Vinyl, `clone` is a method on Vinyl virtual files.
        const file = latest.clone({ contents: false });
        file.contents = contents;
        file.path = latest.path;
        this.push(file);
        cb();
      });
    }())
    .pipe(gulp.dest(paths.js.client.dest));
});

gulp.task(tasks.JS_SERVER, () => {
  const options = Object.assign({}, webpackOptions);

  options.target = 'node';
  options.externals = [ nodeExternals() ];
  options.entry = paths.js.server.init;

  return gulp.src(paths.js.server.src)
    .pipe(webpack(options))
    .pipe(gulp.dest(paths.js.server.dest));
});

gulp.task(tasks.DEPLOY_STATIC, cb => {
  const proc = spawn(cmds.deployStatic);

  proc.stdout.on('data', data => {
    console.log(data.toString('utf8'));
  });

  proc.stderr.on('data', data => {
    console.log(data.toString('utf8'));
  });

  proc.on('close', cb);
});

gulp.task(tasks.SASS, () => {
  return gulp.src(paths.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.src([ paths.css.vueStyles ], { passthrough: true }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.css.dest));
});

const ALL_TASKS = [
  tasks.LINT,
  tasks.FLOW,
  tasks.JS_CLIENT,
  tasks.JS_SERVER,
  tasks.SASS,
];

const WATCH_TASKS = [
  tasks.LINT,
  tasks.FLOW,
  tasks.JS_CLIENT,
  tasks.JS_SERVER,
  tasks.NODEMON,
  tasks.SASS,
];

gulp.task(tasks.NODEMON, () => {
  return nodemon({
    script: paths.js.server.target,
    ext: 'js html vue scss',
    exec: './scripts/dev-restart-app.sh',
    watch: paths.watchSrc,
    tasks: ALL_TASKS,
    env: { 'NODE_ENV': 'development' },
  });
});

gulp.task(tasks.WATCH, gulp.series(WATCH_TASKS));
gulp.task(tasks.DEFAULT, gulp.series(ALL_TASKS));
