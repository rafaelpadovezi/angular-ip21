(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("angular-ip21", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["angular-ip21"] = factory(require("angular"));
	else
		root["angular-ip21"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
ip21SqlService.$inject = ['$http', '$q'];

exports.default = ip21SqlService;


function ip21SqlService($http, $q) {
    return {
        create: create
    };

    function create(url, port) {
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (typeof url !== 'string') throw new TypeError('create expects a valid URL string as first parameter');
        if (typeof port !== 'number') throw new TypeError('create expects a valid Port number as first parameter');
        config.asda = config.asda || 'CHARINT=N;CHARFLOAT=N;CHARTIME=N;CONVERTERRORS=N';
        config.host = config.host || 'localhost';

        return {
            executeSelect: executeSelect,
            executeNonSelect: executeNonSelect
        };

        function execute(query, isSelect) {
            var deferred = $q.defer();

            var s = isSelect ? 1 : 0;
            var payload = '<SQL c="DRIVER={AspenTech SQLplus};' + 'HOST=' + config.host + ';' + 'Port=' + port + ';' + config.adsa + '" s="' + s + '">' + '<![CDATA[' + query + ']]>' + '</SQL>';

            $http({
                method: 'POST',
                url: url,
                data: payload,
                withCredentials: true,
                transformResponse: [function (data) {
                    try {
                        return JSON.parse(data);
                    } catch (err) {
                        var obj;
                        eval('obj = ' + data);
                        return obj;
                    }
                }],
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(function (response) {
                if (isSelect) deferred.resolve(parseDataSelect(response));else deferred.resolve(parseDataNonSelect(response));
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function parseDataSelect(response) {
            var data = response.data.data;

            if (data.result) if (data.result.es) throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data.result.es;

            if (data[0].r === 'E') throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data[0].aes;

            if (data[0].r === 'N') return [];

            //Verificar
            if (Number.isInteger(rows)) return rows;

            var cols = data[0].cols.reduce(function (acc, item) {
                acc[item.i] = item.n;
                return acc;
            }, {});

            var rows = [];
            data[0].rows.forEach(function (row) {
                var newRow = row.fld.reduce(function (acc, item) {
                    acc[cols[item.i]] = item.v;
                    return acc;
                }, {});
                rows.push(newRow);
            });

            return rows;
        }

        function parseDataNonSelect(response) {
            var data = response.data.data;

            if (data.result) if (data.result.es) throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data.result.es;

            if (data[0].r === 'E') throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data[0].aes;

            if (data[0].r === 'N') return [];

            return response;
        }

        function executeSelect(query) {
            return execute(query, true);
        }

        function executeNonSelect(query) {
            return execute(query, false);
        }
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(1);

var _angular2 = _interopRequireDefault(_angular);

var _angularIp = __webpack_require__(0);

var _angularIp2 = _interopRequireDefault(_angularIp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var angularIp21 = _angular2.default.module('angular-ip21', []).factory('ip21SqlService', _angularIp2.default).name;

exports.default = angularIp21;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-ip21.js.map