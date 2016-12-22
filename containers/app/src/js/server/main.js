/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var buildExternalHelpers = __webpack_require__(1).buildExternalHelpers;
	__webpack_require__(2);
	global.babelHelpers = eval(buildExternalHelpers(null, 'var')); // eslint-disable-line no-eval
	__webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-core");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-register");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _server = __webpack_require__(4);

	var _server2 = babelHelpers.interopRequireDefault(_server);

	var _file = __webpack_require__(6);

	var _file2 = babelHelpers.interopRequireDefault(_file);

	var _route = __webpack_require__(7);

	var _route2 = babelHelpers.interopRequireDefault(_route);

	var _app = __webpack_require__(8);

	var _config = __webpack_require__(13);

	var express = __webpack_require__(14);
	var fs = __webpack_require__(15);
	var vueRendererCreator = __webpack_require__(16);

	function main() {
	  var middleware = [];
	  middleware.push(['/static/js', express.static(_config.STATIC_ROOT)]);

	  var server = new _server2.default(express(), _config.SERVER_PORT, middleware, vueRendererCreator);
	  server.listen();

	  var route = new _route2.default((0, _app.createApp)());
	  route.serve(server, '*', new _file2.default(process.cwd() + '/src/html/index.html', fs)).subscribe(route.send);
	}

	main();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Rx = __webpack_require__(5);

	var httpStatus = exports.httpStatus = {
	  OK: 200
	};

	var Server = function () {
	  function Server(server, port, middleware, rendererCreator) {
	    babelHelpers.classCallCheck(this, Server);

	    this._server = server;
	    this._port = port;
	    this._renderer = rendererCreator.createRenderer();

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = middleware[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _server;

	        var middlewareArgs = _step.value;

	        (_server = this._server).use.apply(_server, babelHelpers.toConsumableArray(middlewareArgs));
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  }

	  babelHelpers.createClass(Server, [{
	    key: 'listen',
	    value: function listen() {
	      this._server.listen(this._port);
	    }
	  }, {
	    key: 'get',
	    value: function get(path) {
	      var _this = this;

	      return Rx.Observable.create(function (observe) {
	        _this._server.get(path, function (req, res) {
	          observe.next({ req: req, res: res, renderer: _this._renderer });
	        });
	      });
	    }
	  }]);
	  return Server;
	}();

	exports.default = Server;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("rxjs");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Rx = __webpack_require__(5);

	var File = function () {
	  function File(path, fs) {
	    babelHelpers.classCallCheck(this, File);

	    this._fs = fs;
	    this._path = path;
	    this._contents = null;
	  }

	  babelHelpers.createClass(File, [{
	    key: 'get',
	    value: function get() {
	      var _this = this;

	      if (this._contents !== null) {
	        return Rx.Observable.of(this._contents);
	      }

	      return Rx.Observable.create(function (observer) {
	        _this._fs.readFile(_this._path, function (err, data) {
	          if (err) {
	            observer.error(err);
	            return;
	          }

	          var contents = data.toString('utf8');

	          _this._contents = contents;

	          observer.next(contents);
	        });
	      });
	    }
	  }]);
	  return File;
	}();

	exports.default = File;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	'use string';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.APP_TEMPLATE_VAR_PATTERN = undefined;

	var _server = __webpack_require__(4);

	var Rx = __webpack_require__(5);

	var APP_TEMPLATE_VAR_PATTERN = exports.APP_TEMPLATE_VAR_PATTERN = '{{{APP}}}';

	var Route = function () {
	  function Route(app) {
	    babelHelpers.classCallCheck(this, Route);

	    this._app = app;
	  }

	  babelHelpers.createClass(Route, [{
	    key: 'render',
	    value: function render(_ref) {
	      var _this = this;

	      var req = _ref.req,
	          res = _ref.res,
	          renderer = _ref.renderer;

	      return Rx.Observable.create(function (observe) {
	        renderer.renderToString(_this._app, function (error, html) {
	          if (error) {
	            observe.error(error);
	            return;
	          }
	          var template = _this.compiledTemplate.replace(APP_TEMPLATE_VAR_PATTERN, html);
	          observe.next({ req: req, res: res, template: template });
	        });
	      });
	    }
	  }, {
	    key: 'serve',
	    value: function serve(server, path, template) {
	      var _this2 = this;

	      return template.get().do(function (template) {
	        _this2.compiledTemplate = template;
	      }).mergeMap(function () {
	        return server.get(path);
	      }).mergeMap(function (msg) {
	        return _this2.render(msg);
	      }).share();
	    }
	  }, {
	    key: 'send',
	    value: function send(_ref2) {
	      var req = _ref2.req,
	          res = _ref2.res,
	          template = _ref2.template;

	      res.status(_server.httpStatus.OK).send(template);
	    }
	  }, {
	    key: 'compiledTemplate',
	    set: function set(template) {
	      this._compiledTemplate = template;
	    },
	    get: function get() {
	      return this._compiledTemplate;
	    }
	  }]);
	  return Route;
	}();

	exports.default = Route;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createApp = createApp;
	var App = __webpack_require__(9);
	var VueJs = __webpack_require__(12);

	function createApp() {
	  return new VueJs({ el: '#app',
	    render: function render(h) {
	      return h(App);
	    }
	  });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */

	/* script */
	__vue_exports__ = __webpack_require__(10)

	/* template */
	var __vue_template__ = __webpack_require__(11)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/bjorn/projects/sphela/src/vue/app.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	if (__vue_options__.functional) {console.error("[vue-loader] app.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	//
	//
	//
	//
	//

	module.exports = {
	    data: function data() {
	        return { world: 'Vue that learning curve App Worldzughzz' };
	    },
	    created: function created() {
	        console.log('foobarmanubar');
	    },
	    mounted: function mounted() {
	        console.log('mountedfoobar');
	    },
	    updated: function updated() {
	        console.log('updatedfoobar');
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    attrs: {
	      "id": "app"
	    }
	  }, ["HelloNope " + _vm._s(_vm.world) + "!"])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SERVER_PORT = exports.SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 8000;

	var STATIC_ROOT = exports.STATIC_ROOT = process.env.STATIC_ROOT || '';

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("vue-server-renderer");

/***/ }
/******/ ]);