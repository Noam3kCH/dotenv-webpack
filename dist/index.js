'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack = require('webpack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The dotenv-webpack plugin.
 * @param {Object} options - The parameters.
 * @param {String} [path=./.env] - The location of the environment variable.
 * @param {Bool|String} [safe=false] - If false ignore safe-mode, if true load `'./.env.example'`, if a string load that file as the sample.
 * @param {Bool} [systemvars=false] - If true, load system environment variables.
 * @returns {webpack.DefinePlugin}
 */
var Dotenv = function () {
  function Dotenv(options) {
    _classCallCheck(this, Dotenv);

    options = _extends({
      path: './.env',
      safe: false,
      systemvars: false
    }, options);

    // Catch older packages, but hold their hand (just for a bit)
    if (options.sample) {
      if (options.safe) {
        options.safe = options.sample;
      }
      console.warn('dotend-webpack: "options.sample" is a deprecated property. Please update your configuration to use "options.safe" instead.');
    }

    var vars = options.systemvars ? _extends({}, process.env) : {};
    var env = this.loadFile(options.path);

    var blueprint = env;
    if (options.safe) {
      var file = './.env.example';
      if (options.safe !== true) {
        file = options.safe;
      }
      blueprint = this.loadFile(file);
    }

    Object.keys(blueprint).map(function (key) {
      var value = env[key] || env[key];
      if (!value && options.safe) {
        throw new Error('Missing environment variable: ' + key);
      } else {
        vars[key] = value;
      }
    });

    return new _webpack.DefinePlugin({
      'process.env': JSON.stringify(vars)
    });
  }

  /**
   * Load and parses a file.
   * @param {String} file - The file to load.
   * @returns {Object}
   */


  _createClass(Dotenv, [{
    key: 'loadFile',
    value: function loadFile(file) {
      try {
        return _dotenv2.default.parse(_fs2.default.readFileSync(file));
      } catch (err) {
        console.warn('Failed to load ' + file + '.');
        return {};
      }
    }
  }]);

  return Dotenv;
}();

exports.default = Dotenv;
