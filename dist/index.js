#!/usr/bin/env node
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5063:
/***/ ((module) => {

"use strict";


module.exports = ({onlyFirst = false} = {}) => {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
};


/***/ }),

/***/ 2068:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


const wrapAnsi16 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
	const rgb = fn(...args);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;
const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
	Object.defineProperty(object, property, {
		get: () => {
			const value = get();

			Object.defineProperty(object, property, {
				value,
				enumerable: true,
				configurable: true
			});

			return value;
		},
		enumerable: true,
		configurable: true
	});
};

/** @type {typeof import('color-convert')} */
let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
	if (colorConvert === undefined) {
		colorConvert = __webpack_require__(6931);
	}

	const offset = isBackground ? 10 : 0;
	const styles = {};

	for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
		if (sourceSpace === targetSpace) {
			styles[name] = wrap(identity, offset);
		} else if (typeof suite === 'object') {
			styles[name] = wrap(suite[targetSpace], offset);
		}
	}

	return styles;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ 6545:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(2618);

/***/ }),

/***/ 8104:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);
var settle = __webpack_require__(3211);
var buildFullPath = __webpack_require__(1934);
var buildURL = __webpack_require__(646);
var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var httpFollow = __webpack_require__(7707).http;
var httpsFollow = __webpack_require__(7707).https;
var url = __webpack_require__(8835);
var zlib = __webpack_require__(8761);
var pkg = __webpack_require__(696);
var createError = __webpack_require__(5226);
var enhanceError = __webpack_require__(1516);

var isHttps = /https:?/;

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ 3454:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);
var settle = __webpack_require__(3211);
var cookies = __webpack_require__(1545);
var buildURL = __webpack_require__(646);
var buildFullPath = __webpack_require__(1934);
var parseHeaders = __webpack_require__(6455);
var isURLSameOrigin = __webpack_require__(3608);
var createError = __webpack_require__(5226);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 2618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);
var bind = __webpack_require__(7065);
var Axios = __webpack_require__(8178);
var mergeConfig = __webpack_require__(4831);
var defaults = __webpack_require__(8190);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(8875);
axios.CancelToken = __webpack_require__(1587);
axios.isCancel = __webpack_require__(4057);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(4850);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 8875:
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 1587:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(8875);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 4057:
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 8178:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);
var buildURL = __webpack_require__(646);
var InterceptorManager = __webpack_require__(3214);
var dispatchRequest = __webpack_require__(5062);
var mergeConfig = __webpack_require__(4831);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 3214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 1934:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(1301);
var combineURLs = __webpack_require__(7189);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ 5226:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(1516);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 5062:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);
var transformData = __webpack_require__(9812);
var isCancel = __webpack_require__(4057);
var defaults = __webpack_require__(8190);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 1516:
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ 4831:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ 3211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(5226);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 9812:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 8190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);
var normalizeHeaderName = __webpack_require__(6240);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(3454);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(8104);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ 7065:
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 7189:
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 1545:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ 1301:
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 3608:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ 6240:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 6455:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(328);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 4850:
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(7065);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ 6474:
/***/ ((module, exports, __webpack_require__) => {

var Chainsaw = __webpack_require__(6533);
var EventEmitter = __webpack_require__(8614).EventEmitter;
var Buffers = __webpack_require__(1590);
var Vars = __webpack_require__(3755);
var Stream = __webpack_require__(2413).Stream;

exports = module.exports = function (bufOrEm, eventName) {
    if (Buffer.isBuffer(bufOrEm)) {
        return exports.parse(bufOrEm);
    }
    
    var s = exports.stream();
    if (bufOrEm && bufOrEm.pipe) {
        bufOrEm.pipe(s);
    }
    else if (bufOrEm) {
        bufOrEm.on(eventName || 'data', function (buf) {
            s.write(buf);
        });
        
        bufOrEm.on('end', function () {
            s.end();
        });
    }
    return s;
};

exports.stream = function (input) {
    if (input) return exports.apply(null, arguments);
    
    var pending = null;
    function getBytes (bytes, cb, skip) {
        pending = {
            bytes : bytes,
            skip : skip,
            cb : function (buf) {
                pending = null;
                cb(buf);
            },
        };
        dispatch();
    }
    
    var offset = null;
    function dispatch () {
        if (!pending) {
            if (caughtEnd) done = true;
            return;
        }
        if (typeof pending === 'function') {
            pending();
        }
        else {
            var bytes = offset + pending.bytes;
            
            if (buffers.length >= bytes) {
                var buf;
                if (offset == null) {
                    buf = buffers.splice(0, bytes);
                    if (!pending.skip) {
                        buf = buf.slice();
                    }
                }
                else {
                    if (!pending.skip) {
                        buf = buffers.slice(offset, bytes);
                    }
                    offset = bytes;
                }
                
                if (pending.skip) {
                    pending.cb();
                }
                else {
                    pending.cb(buf);
                }
            }
        }
    }
    
    function builder (saw) {
        function next () { if (!done) saw.next() }
        
        var self = words(function (bytes, cb) {
            return function (name) {
                getBytes(bytes, function (buf) {
                    vars.set(name, cb(buf));
                    next();
                });
            };
        });
        
        self.tap = function (cb) {
            saw.nest(cb, vars.store);
        };
        
        self.into = function (key, cb) {
            if (!vars.get(key)) vars.set(key, {});
            var parent = vars;
            vars = Vars(parent.get(key));
            
            saw.nest(function () {
                cb.apply(this, arguments);
                this.tap(function () {
                    vars = parent;
                });
            }, vars.store);
        };
        
        self.flush = function () {
            vars.store = {};
            next();
        };
        
        self.loop = function (cb) {
            var end = false;
            
            saw.nest(false, function loop () {
                this.vars = vars.store;
                cb.call(this, function () {
                    end = true;
                    next();
                }, vars.store);
                this.tap(function () {
                    if (end) saw.next()
                    else loop.call(this)
                }.bind(this));
            }, vars.store);
        };
        
        self.buffer = function (name, bytes) {
            if (typeof bytes === 'string') {
                bytes = vars.get(bytes);
            }
            
            getBytes(bytes, function (buf) {
                vars.set(name, buf);
                next();
            });
        };
        
        self.skip = function (bytes) {
            if (typeof bytes === 'string') {
                bytes = vars.get(bytes);
            }
            
            getBytes(bytes, function () {
                next();
            });
        };
        
        self.scan = function find (name, search) {
            if (typeof search === 'string') {
                search = new Buffer(search);
            }
            else if (!Buffer.isBuffer(search)) {
                throw new Error('search must be a Buffer or a string');
            }
            
            var taken = 0;
            pending = function () {
                var pos = buffers.indexOf(search, offset + taken);
                var i = pos-offset-taken;
                if (pos !== -1) {
                    pending = null;
                    if (offset != null) {
                        vars.set(
                            name,
                            buffers.slice(offset, offset + taken + i)
                        );
                        offset += taken + i + search.length;
                    }
                    else {
                        vars.set(
                            name,
                            buffers.slice(0, taken + i)
                        );
                        buffers.splice(0, taken + i + search.length);
                    }
                    next();
                    dispatch();
                } else {
                    i = Math.max(buffers.length - search.length - offset - taken, 0);
				}
                taken += i;
            };
            dispatch();
        };
        
        self.peek = function (cb) {
            offset = 0;
            saw.nest(function () {
                cb.call(this, vars.store);
                this.tap(function () {
                    offset = null;
                });
            });
        };
        
        return self;
    };
    
    var stream = Chainsaw.light(builder);
    stream.writable = true;
    
    var buffers = Buffers();
    
    stream.write = function (buf) {
        buffers.push(buf);
        dispatch();
    };
    
    var vars = Vars();
    
    var done = false, caughtEnd = false;
    stream.end = function () {
        caughtEnd = true;
    };
    
    stream.pipe = Stream.prototype.pipe;
    Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function (name) {
        stream[name] = EventEmitter.prototype[name];
    });
    
    return stream;
};

exports.parse = function parse (buffer) {
    var self = words(function (bytes, cb) {
        return function (name) {
            if (offset + bytes <= buffer.length) {
                var buf = buffer.slice(offset, offset + bytes);
                offset += bytes;
                vars.set(name, cb(buf));
            }
            else {
                vars.set(name, null);
            }
            return self;
        };
    });
    
    var offset = 0;
    var vars = Vars();
    self.vars = vars.store;
    
    self.tap = function (cb) {
        cb.call(self, vars.store);
        return self;
    };
    
    self.into = function (key, cb) {
        if (!vars.get(key)) {
            vars.set(key, {});
        }
        var parent = vars;
        vars = Vars(parent.get(key));
        cb.call(self, vars.store);
        vars = parent;
        return self;
    };
    
    self.loop = function (cb) {
        var end = false;
        var ender = function () { end = true };
        while (end === false) {
            cb.call(self, ender, vars.store);
        }
        return self;
    };
    
    self.buffer = function (name, size) {
        if (typeof size === 'string') {
            size = vars.get(size);
        }
        var buf = buffer.slice(offset, Math.min(buffer.length, offset + size));
        offset += size;
        vars.set(name, buf);
        
        return self;
    };
    
    self.skip = function (bytes) {
        if (typeof bytes === 'string') {
            bytes = vars.get(bytes);
        }
        offset += bytes;
        
        return self;
    };
    
    self.scan = function (name, search) {
        if (typeof search === 'string') {
            search = new Buffer(search);
        }
        else if (!Buffer.isBuffer(search)) {
            throw new Error('search must be a Buffer or a string');
        }
        vars.set(name, null);
        
        // simple but slow string search
        for (var i = 0; i + offset <= buffer.length - search.length + 1; i++) {
            for (
                var j = 0;
                j < search.length && buffer[offset+i+j] === search[j];
                j++
            );
            if (j === search.length) break;
        }
        
        vars.set(name, buffer.slice(offset, offset + i));
        offset += i + search.length;
        return self;
    };
    
    self.peek = function (cb) {
        var was = offset;
        cb.call(self, vars.store);
        offset = was;
        return self;
    };
    
    self.flush = function () {
        vars.store = {};
        return self;
    };
    
    self.eof = function () {
        return offset >= buffer.length;
    };
    
    return self;
};

// convert byte strings to unsigned little endian numbers
function decodeLEu (bytes) {
    var acc = 0;
    for (var i = 0; i < bytes.length; i++) {
        acc += Math.pow(256,i) * bytes[i];
    }
    return acc;
}

// convert byte strings to unsigned big endian numbers
function decodeBEu (bytes) {
    var acc = 0;
    for (var i = 0; i < bytes.length; i++) {
        acc += Math.pow(256, bytes.length - i - 1) * bytes[i];
    }
    return acc;
}

// convert byte strings to signed big endian numbers
function decodeBEs (bytes) {
    var val = decodeBEu(bytes);
    if ((bytes[0] & 0x80) == 0x80) {
        val -= Math.pow(256, bytes.length);
    }
    return val;
}

// convert byte strings to signed little endian numbers
function decodeLEs (bytes) {
    var val = decodeLEu(bytes);
    if ((bytes[bytes.length - 1] & 0x80) == 0x80) {
        val -= Math.pow(256, bytes.length);
    }
    return val;
}

function words (decode) {
    var self = {};
    
    [ 1, 2, 4, 8 ].forEach(function (bytes) {
        var bits = bytes * 8;
        
        self['word' + bits + 'le']
        = self['word' + bits + 'lu']
        = decode(bytes, decodeLEu);
        
        self['word' + bits + 'ls']
        = decode(bytes, decodeLEs);
        
        self['word' + bits + 'be']
        = self['word' + bits + 'bu']
        = decode(bytes, decodeBEu);
        
        self['word' + bits + 'bs']
        = decode(bytes, decodeBEs);
    });
    
    // word8be(n) == word8le(n) for all n
    self.word8 = self.word8u = self.word8be;
    self.word8s = self.word8bs;
    
    return self;
}


/***/ }),

/***/ 3755:
/***/ ((module) => {

module.exports = function (store) {
    function getset (name, value) {
        var node = vars.store;
        var keys = name.split('.');
        keys.slice(0,-1).forEach(function (k) {
            if (node[k] === undefined) node[k] = {};
            node = node[k]
        });
        var key = keys[keys.length - 1];
        if (arguments.length == 1) {
            return node[key];
        }
        else {
            return node[key] = value;
        }
    }
    
    var vars = {
        get : function (name) {
            return getset(name);
        },
        set : function (name, value) {
            return getset(name, value);
        },
        store : store || {},
    };
    return vars;
};


/***/ }),

/***/ 1590:
/***/ ((module) => {

module.exports = Buffers;

function Buffers (bufs) {
    if (!(this instanceof Buffers)) return new Buffers(bufs);
    this.buffers = bufs || [];
    this.length = this.buffers.reduce(function (size, buf) {
        return size + buf.length
    }, 0);
}

Buffers.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError('Tried to push a non-buffer');
        }
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.push(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.unshift = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!Buffer.isBuffer(arguments[i])) {
            throw new TypeError('Tried to unshift a non-buffer');
        }
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var buf = arguments[i];
        this.buffers.unshift(buf);
        this.length += buf.length;
    }
    return this.length;
};

Buffers.prototype.copy = function (dst, dStart, start, end) {
    return this.slice(start, end).copy(dst, dStart, 0, end - start);
};

Buffers.prototype.splice = function (i, howMany) {
    var buffers = this.buffers;
    var index = i >= 0 ? i : this.length - i;
    var reps = [].slice.call(arguments, 2);
    
    if (howMany === undefined) {
        howMany = this.length - index;
    }
    else if (howMany > this.length - index) {
        howMany = this.length - index;
    }
    
    for (var i = 0; i < reps.length; i++) {
        this.length += reps[i].length;
    }
    
    var removed = new Buffers();
    var bytes = 0;
    
    var startBytes = 0;
    for (
        var ii = 0;
        ii < buffers.length && startBytes + buffers[ii].length < index;
        ii ++
    ) { startBytes += buffers[ii].length }
    
    if (index - startBytes > 0) {
        var start = index - startBytes;
        
        if (start + howMany < buffers[ii].length) {
            removed.push(buffers[ii].slice(start, start + howMany));
            
            var orig = buffers[ii];
            //var buf = new Buffer(orig.length - howMany);
            var buf0 = new Buffer(start);
            for (var i = 0; i < start; i++) {
                buf0[i] = orig[i];
            }
            
            var buf1 = new Buffer(orig.length - start - howMany);
            for (var i = start + howMany; i < orig.length; i++) {
                buf1[ i - howMany - start ] = orig[i]
            }
            
            if (reps.length > 0) {
                var reps_ = reps.slice();
                reps_.unshift(buf0);
                reps_.push(buf1);
                buffers.splice.apply(buffers, [ ii, 1 ].concat(reps_));
                ii += reps_.length;
                reps = [];
            }
            else {
                buffers.splice(ii, 1, buf0, buf1);
                //buffers[ii] = buf;
                ii += 2;
            }
        }
        else {
            removed.push(buffers[ii].slice(start));
            buffers[ii] = buffers[ii].slice(0, start);
            ii ++;
        }
    }
    
    if (reps.length > 0) {
        buffers.splice.apply(buffers, [ ii, 0 ].concat(reps));
        ii += reps.length;
    }
    
    while (removed.length < howMany) {
        var buf = buffers[ii];
        var len = buf.length;
        var take = Math.min(len, howMany - removed.length);
        
        if (take === len) {
            removed.push(buf);
            buffers.splice(ii, 1);
        }
        else {
            removed.push(buf.slice(0, take));
            buffers[ii] = buffers[ii].slice(take);
        }
    }
    
    this.length -= removed.length;
    
    return removed;
};
 
Buffers.prototype.slice = function (i, j) {
    var buffers = this.buffers;
    if (j === undefined) j = this.length;
    if (i === undefined) i = 0;
    
    if (j > this.length) j = this.length;
    
    var startBytes = 0;
    for (
        var si = 0;
        si < buffers.length && startBytes + buffers[si].length <= i;
        si ++
    ) { startBytes += buffers[si].length }
    
    var target = new Buffer(j - i);
    
    var ti = 0;
    for (var ii = si; ti < j - i && ii < buffers.length; ii++) {
        var len = buffers[ii].length;
        
        var start = ti === 0 ? i - startBytes : 0;
        var end = ti + len >= j - i
            ? Math.min(start + (j - i) - ti, len)
            : len
        ;
        
        buffers[ii].copy(target, ti, start, end);
        ti += end - start;
    }
    
    return target;
};

Buffers.prototype.pos = function (i) {
    if (i < 0 || i >= this.length) throw new Error('oob');
    var l = i, bi = 0, bu = null;
    for (;;) {
        bu = this.buffers[bi];
        if (l < bu.length) {
            return {buf: bi, offset: l};
        } else {
            l -= bu.length;
        }
        bi++;
    }
};

Buffers.prototype.get = function get (i) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].get(pos.offset);
};

Buffers.prototype.set = function set (i, b) {
    var pos = this.pos(i);

    return this.buffers[pos.buf].set(pos.offset, b);
};

Buffers.prototype.indexOf = function (needle, offset) {
    if ("string" === typeof needle) {
        needle = new Buffer(needle);
    } else if (needle instanceof Buffer) {
        // already a buffer
    } else {
        throw new Error('Invalid type for a search string');
    }

    if (!needle.length) {
        return 0;
    }

    if (!this.length) {
        return -1;
    }

    var i = 0, j = 0, match = 0, mstart, pos = 0;

    // start search from a particular point in the virtual buffer
    if (offset) {
        var p = this.pos(offset);
        i = p.buf;
        j = p.offset;
        pos = offset;
    }

    // for each character in virtual buffer
    for (;;) {
        while (j >= this.buffers[i].length) {
            j = 0;
            i++;

            if (i >= this.buffers.length) {
                // search string not found
                return -1;
            }
        }

        var char = this.buffers[i][j];

        if (char == needle[match]) {
            // keep track where match started
            if (match == 0) {
                mstart = {
                    i: i,
                    j: j,
                    pos: pos
                };
            }
            match++;
            if (match == needle.length) {
                // full match
                return mstart.pos;
            }
        } else if (match != 0) {
            // a partial match ended, go back to match starting position
            // this will continue the search at the next character
            i = mstart.i;
            j = mstart.j;
            pos = mstart.pos;
            match = 0;
        }

        j++;
        pos++;
    }
};

Buffers.prototype.toBuffer = function() {
    return this.slice();
}

Buffers.prototype.toString = function(encoding, start, end) {
    return this.slice(start, end).toString(encoding);
}


/***/ }),

/***/ 6533:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Traverse = __webpack_require__(8588);
var EventEmitter = __webpack_require__(8614).EventEmitter;

module.exports = Chainsaw;
function Chainsaw (builder) {
    var saw = Chainsaw.saw(builder, {});
    var r = builder.call(saw.handlers, saw);
    if (r !== undefined) saw.handlers = r;
    saw.record();
    return saw.chain();
};

Chainsaw.light = function ChainsawLight (builder) {
    var saw = Chainsaw.saw(builder, {});
    var r = builder.call(saw.handlers, saw);
    if (r !== undefined) saw.handlers = r;
    return saw.chain();
};

Chainsaw.saw = function (builder, handlers) {
    var saw = new EventEmitter;
    saw.handlers = handlers;
    saw.actions = [];

    saw.chain = function () {
        var ch = Traverse(saw.handlers).map(function (node) {
            if (this.isRoot) return node;
            var ps = this.path;

            if (typeof node === 'function') {
                this.update(function () {
                    saw.actions.push({
                        path : ps,
                        args : [].slice.call(arguments)
                    });
                    return ch;
                });
            }
        });

        process.nextTick(function () {
            saw.emit('begin');
            saw.next();
        });

        return ch;
    };

    saw.pop = function () {
        return saw.actions.shift();
    };

    saw.next = function () {
        var action = saw.pop();

        if (!action) {
            saw.emit('end');
        }
        else if (!action.trap) {
            var node = saw.handlers;
            action.path.forEach(function (key) { node = node[key] });
            node.apply(saw.handlers, action.args);
        }
    };

    saw.nest = function (cb) {
        var args = [].slice.call(arguments, 1);
        var autonext = true;

        if (typeof cb === 'boolean') {
            var autonext = cb;
            cb = args.shift();
        }

        var s = Chainsaw.saw(builder, {});
        var r = builder.call(s.handlers, s);

        if (r !== undefined) s.handlers = r;

        // If we are recording...
        if ("undefined" !== typeof saw.step) {
            // ... our children should, too
            s.record();
        }

        cb.apply(s.chain(), args);
        if (autonext !== false) s.on('end', saw.next);
    };

    saw.record = function () {
        upgradeChainsaw(saw);
    };

    ['trap', 'down', 'jump'].forEach(function (method) {
        saw[method] = function () {
            throw new Error("To use the trap, down and jump features, please "+
                            "call record() first to start recording actions.");
        };
    });

    return saw;
};

function upgradeChainsaw(saw) {
    saw.step = 0;

    // override pop
    saw.pop = function () {
        return saw.actions[saw.step++];
    };

    saw.trap = function (name, cb) {
        var ps = Array.isArray(name) ? name : [name];
        saw.actions.push({
            path : ps,
            step : saw.step,
            cb : cb,
            trap : true
        });
    };

    saw.down = function (name) {
        var ps = (Array.isArray(name) ? name : [name]).join('/');
        var i = saw.actions.slice(saw.step).map(function (x) {
            if (x.trap && x.step <= saw.step) return false;
            return x.path.join('/') == ps;
        }).indexOf(true);

        if (i >= 0) saw.step += i;
        else saw.step = saw.actions.length;

        var act = saw.actions[saw.step - 1];
        if (act && act.trap) {
            // It's a trap!
            saw.step = act.step;
            act.cb();
        }
        else saw.next();
    };

    saw.jump = function (step) {
        saw.step = step;
        saw.next();
    };
};


/***/ }),

/***/ 7348:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _SingleBar = __webpack_require__(7561);
const _MultiBar = __webpack_require__(2013);
const _Presets = __webpack_require__(5040);

// sub-module access
module.exports = {
    Bar: _SingleBar,
    SingleBar: _SingleBar,
    MultiBar: _MultiBar,
    Presets: _Presets
};

/***/ }),

/***/ 7954:
/***/ ((module) => {


// ETA calculation
class ETA{

    constructor(length, initTime, initValue){
        // size of eta buffer
        this.etaBufferLength = length || 100;

        // eta buffer with initial values
        this.valueBuffer = [initValue];
        this.timeBuffer = [initTime];

        // eta time value
        this.eta = '0';
    }

    // add new values to calculation buffer
    update(time, value, total){
        this.valueBuffer.push(value);
        this.timeBuffer.push(time);

        // trigger recalculation
        this.calculate(total-value);
    }

    // fetch estimated time
    getTime(){
        return this.eta;
    }

    // eta calculation - request number of remaining events
    calculate(remaining){
        // get number of samples in eta buffer
        const currentBufferSize = this.valueBuffer.length;
        const buffer = Math.min(this.etaBufferLength, currentBufferSize);

        const v_diff = this.valueBuffer[currentBufferSize - 1] - this.valueBuffer[currentBufferSize - buffer];
        const t_diff = this.timeBuffer[currentBufferSize - 1] - this.timeBuffer[currentBufferSize - buffer];

        // get progress per ms
        const vt_rate = v_diff/t_diff;

        // strip past elements
        this.valueBuffer = this.valueBuffer.slice(-this.etaBufferLength);
        this.timeBuffer  = this.timeBuffer.slice(-this.etaBufferLength);

        // eq: vt_rate *x = total
        const eta = Math.ceil(remaining/vt_rate/1000);

        // check values
        if (isNaN(eta)){
            this.eta = 'NULL';

        // +/- Infinity --- NaN already handled
        }else if (!isFinite(eta)){
            this.eta = 'INF';

        // > 100k s ?
        }else if (eta > 100000){
            this.eta = 'INF';

        // negative ?
        }else if (eta < 0){
            this.eta = 0;

        }else{
            // assign
            this.eta = eta;
        }
    }
}

module.exports = ETA;

/***/ }),

/***/ 6174:
/***/ ((module) => {

// format bar
module.exports = function formatBar(progress, options){
    // calculate barsize
    const completeSize = Math.round(progress*options.barsize);
    const incompleteSize = options.barsize-completeSize;

   // generate bar string by stripping the pre-rendered strings
   return   options.barCompleteString.substr(0, completeSize) +
            options.barGlue +
            options.barIncompleteString.substr(0, incompleteSize);
}

/***/ }),

/***/ 3900:
/***/ ((module) => {

// default time format

// format a number of seconds into hours and minutes as appropriate
module.exports = function formatTime(t, options, roundToMultipleOf){
    function round(input) {
        if (roundToMultipleOf) {
            return roundToMultipleOf * Math.round(input / roundToMultipleOf);
        } else {
            return input
        }
    }

    // leading zero padding
    function autopadding(v){
        return (options.autopaddingChar + v).slice(-2);
    }

    // > 1h ?
    if (t > 3600) {
        return autopadding(Math.floor(t / 3600)) + 'h' + autopadding(round((t % 3600) / 60)) + 'm';

    // > 60s ?
    } else if (t > 60) {
        return autopadding(Math.floor(t / 60)) + 'm' + autopadding(round((t % 60))) + 's';

    // > 10s ?
    } else if (t > 10) {
        return autopadding(round(t)) + 's';

    // default: don't apply round to multiple
    }else{
        return autopadding(t) + 's';
    }
}

/***/ }),

/***/ 6404:
/***/ ((module) => {

// default value format (apply autopadding)

// format valueset
module.exports = function formatValue(v, options, type){
    // no autopadding ? passthrough
    if (options.autopadding !== true){
        return v;
    }

    // padding
    function autopadding(value, length){
        return (options.autopaddingChar + value).slice(-length);
    }

    switch (type){
        case 'percentage':
            return autopadding(v, 3);

        default:
            return v;
    }
}

/***/ }),

/***/ 8115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _stringWidth = __webpack_require__(2577);
const _defaultFormatValue = __webpack_require__(6404);
const _defaultFormatBar = __webpack_require__(6174);
const _defaultFormatTime = __webpack_require__(3900);

// generic formatter
module.exports = function defaultFormatter(options, params, payload){

    // copy format string
    let s = options.format;

    // custom time format set ?
    const formatTime = options.formatTime || _defaultFormatTime;
    
    // custom value format set ?
    const formatValue = options.formatValue || _defaultFormatValue;

    // custom bar format set ?
    const formatBar = options.formatBar || _defaultFormatBar;

    // calculate progress in percent
    const percentage =  Math.floor(params.progress*100) + '';

    // bar stopped and stopTime set ?
    const stopTime = params.stopTime || Date.now();

    // calculate elapsed time
    const elapsedTime = Math.round((stopTime - params.startTime)/1000);

    // merges data from payload and calculated
    const context = Object.assign({}, payload, {
        bar:                    formatBar(params.progress, options),

        percentage:             formatValue(percentage, options, 'percentage'),
        total:                  formatValue(params.total, options, 'total'),
        value:                  formatValue(params.value, options, 'value'),

        eta:                    formatValue(params.eta, options, 'eta'),
        eta_formatted:          formatTime(params.eta, options, 5),
        
        duration:               formatValue(elapsedTime, options, 'duration'),
        duration_formatted:     formatTime(elapsedTime, options, 1)
    });

    // assign placeholder tokens
    s = s.replace(/\{(\w+)\}/g, function(match, key){
        // key exists within payload/context
        if (typeof context[key] !== 'undefined') {
            return context[key];
        }

        // no changes to unknown values
        return match;
    });

    // calculate available whitespace (2 characters margin of error)
    const fullMargin = Math.max(0, params.maxWidth - _stringWidth(s) -2);
    const halfMargin = Math.floor(fullMargin / 2);

    // distribute available whitespace according to position
    switch (options.align) {

        // fill start-of-line with whitespaces
        case 'right':
            s = (fullMargin > 0) ? ' '.repeat(fullMargin) + s : s;
            break;

        // distribute whitespaces to left+right
        case 'center':
            s = (halfMargin > 0) ? ' '.repeat(halfMargin) + s : s;
            break;

        // default: left align, no additional whitespaces
        case 'left':
        default:
            break;
    }

    return s;
}


/***/ }),

/***/ 3455:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _ETA = __webpack_require__(7954);
const _Terminal = __webpack_require__(4411);
const _formatter = __webpack_require__(8115);
const _EventEmitter = __webpack_require__(8614);

// Progress-Bar constructor
module.exports = class GenericBar extends _EventEmitter{

    constructor(options){
        super();

        // store options
        this.options = options;

        // store terminal instance
        this.terminal = (this.options.terminal) ? this.options.terminal : new _Terminal(this.options.stream);

        // the current bar value
        this.value = 0;

        // the end value of the bar
        this.total = 100;

        // last drawn string - only render on change!
        this.lastDrawnString = null;

        // start time (used for eta calculation)
        this.startTime = null;

        // stop time (used for duration calculation)
        this.stopTime = null;

        // last update time
        this.lastRedraw = Date.now();

        // default eta calculator (will be re-create on start)
        this.eta = new _ETA(this.options.etaBufferLength, 0, 0);

        // payload data
        this.payload = {};

        // progress bar active ?
        this.isActive = false;

        // use default formatter or custom one ?
        this.formatter = (typeof this.options.format === 'function') ? this.options.format : _formatter;
    }

    // internal render function
    render(){
        // calculate the normalized current progress
        let progress = (this.value/this.total);

        // handle NaN Errors caused by total=0. Set to complete in this case
        if (isNaN(progress)){
            progress = (this.options && this.options.emptyOnZero) ? 0.0 : 1.0;
        }

        // limiter
        progress = Math.min(Math.max(progress, 0.0), 1.0);

        // formatter params
        const params = {
            progress: progress,
            eta: this.eta.getTime(),
            startTime: this.startTime,
            stopTime: this.stopTime,
            total: this.total,
            value: this.value,
            maxWidth: this.terminal.getWidth()
        };

        // automatic eta update ? (long running processes)
        if (this.options.etaAsynchronousUpdate){
            this.updateETA();
        }

        // format string
        const s = this.formatter(this.options, params, this.payload);

        const forceRedraw = this.options.forceRedraw
            // force redraw in notty-mode!
            || (this.options.noTTYOutput && !this.terminal.isTTY());

        // string changed ? only trigger redraw on change!
        if (forceRedraw || this.lastDrawnString != s){
            // trigger event
            this.emit('redraw-pre');

            // set cursor to start of line
            this.terminal.cursorTo(0, null);

            // write output
            this.terminal.write(s);

            // clear to the right from cursor
            this.terminal.clearRight();

            // store string
            this.lastDrawnString = s;

            // set last redraw time
            this.lastRedraw = Date.now();

            // trigger event
            this.emit('redraw-post');
        }
    }

    // start the progress bar
    start(total, startValue, payload){
        // set initial values
        this.value = startValue || 0;
        this.total = (typeof total !== 'undefined' && total >= 0) ? total : 100;

        // store payload (optional)
        this.payload = payload || {};

        // store start time for duration+eta calculation
        this.startTime = Date.now();

        // reset string line buffer (redraw detection)
        this.lastDrawnString = '';

        // initialize eta buffer
        this.eta = new _ETA(this.options.etaBufferLength, this.startTime, this.value);

        // set flag
        this.isActive = true;

        // start event
        this.emit('start', total, startValue);
    }

    // stop the bar
    stop(){
        // set flag
        this.isActive = false;
        
        // store stop timestamp to get total duration
        this.stopTime = new Date();

        // stop event
        this.emit('stop', this.total, this.value);
    }

    // update the bar value
    // update(value, payload)
    // update(payload)
    update(arg0, arg1 = {}){
        // value set ?
        // update(value, [payload]);
        if (typeof arg0 === 'number') {
            // update value
            this.value = arg0;

            // add new value; recalculate eta
            this.eta.update(Date.now(), arg0, this.total);
        }

        // extract payload
        // update(value, payload)
        // update(payload)
        const payloadData = ((typeof arg0 === 'object') ? arg0 : arg1) || {};

        // update event (before stop() is called)
        this.emit('update', this.total, this.value);

        // merge payload
        for (const key in payloadData){
            this.payload[key] = payloadData[key];
        }

        // limit reached ? autostop set ?
        if (this.value >= this.getTotal() && this.options.stopOnComplete) {
            this.stop();
        }
    }

    // update the bar value
    // increment(delta, payload)
    // increment(payload)
    increment(arg0 = 1, arg1 = {}){
        // increment([payload]) => step=1
        // handle the use case when `step` is omitted but payload is passed
        if (typeof arg0 === 'object') {
            this.update(this.value + 1, arg0);
        
        // increment([step=1], [payload={}])
        }else{
            this.update(this.value + arg0, arg1);
        }
    }

    // get the total (limit) value
    getTotal(){
        return this.total;
    }

    // set the total (limit) value
    setTotal(total){
        if (typeof total !== 'undefined' && total >= 0){
            this.total = total;
        }
    }

    // force eta calculation update (long running processes)
    updateETA(){
        // add new value; recalculate eta
        this.eta.update(Date.now(), this.value, this.total);
    }
}


/***/ }),

/***/ 2013:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _Terminal = __webpack_require__(4411);
const _BarElement = __webpack_require__(3455);
const _options = __webpack_require__(8322);
const _EventEmitter = __webpack_require__(8614);

// Progress-Bar constructor
module.exports = class MultiBar extends _EventEmitter{

    constructor(options, preset){
        super();

        // list of bars
        this.bars = [];

        // parse+store options
        this.options = _options.parse(options, preset);

        // disable synchronous updates
        this.options.synchronousUpdate = false;

        // store terminal instance
        this.terminal = (this.options.terminal) ? this.options.terminal : new _Terminal(this.options.stream);

        // the update timer
        this.timer = null;

        // progress bar active ?
        this.isActive = false;

        // update interval
        this.schedulingRate = (this.terminal.isTTY() ? this.options.throttleTime : this.options.notTTYSchedule);
    }

    // add a new bar to the stack
    create(total, startValue, payload){
        // progress updates are only visible in TTY mode!
        if (this.options.noTTYOutput === false && this.terminal.isTTY() === false){
            return;
        }
        
        // create new bar element
        const bar = new _BarElement(this.options);

        // store bar
        this.bars.push(bar);

        // multiprogress already active ?
        if (!this.isActive){
            // hide the cursor ?
            if (this.options.hideCursor === true){
                this.terminal.cursor(false);
            }

            // disable line wrapping ?
            if (this.options.linewrap === false){
                this.terminal.lineWrapping(false);
            }
    
            // initialize update timer
            this.timer = setTimeout(this.update.bind(this), this.schedulingRate);
        }

        // set flag
        this.isActive = true;

        // start progress bar
        bar.start(total, startValue, payload);

        // trigger event
        this.emit('start');

        // return new instance
        return bar;
    }

    // remove a bar from the stack
    remove(bar){
        // find element
        const index = this.bars.indexOf(bar);

        // element found ?
        if (index < 0){
            return false;
        }

        // remove element
        this.bars.splice(index, 1);

        // force update
        this.update();

        // clear bottom
        this.terminal.newline();
        this.terminal.clearBottom();

        return true;
    }

    // internal update routine
    update(){
        // stop timer
        if (this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }

        // trigger event
        this.emit('update-pre');
        
        // reset cursor
        this.terminal.cursorRelativeReset();

        // trigger event
        this.emit('redraw-pre');

        // update each bar
        for (let i=0; i< this.bars.length; i++){
            // add new line ?
            if (i > 0){
                this.terminal.newline();
            }

            // render
            this.bars[i].render();
        }

        // trigger event
        this.emit('redraw-post');

        // add new line in notty mode!
        if (this.options.noTTYOutput && this.terminal.isTTY() === false){
            this.terminal.newline();
            this.terminal.newline();
        }

        // next update
        this.timer = setTimeout(this.update.bind(this), this.schedulingRate);

        // trigger event
        this.emit('update-post');

        // stop if stopOnComplete and all bars stopped
        if (this.options.stopOnComplete && !this.bars.find(bar => bar.isActive)) {
            this.stop();
        }
    }

    stop(){

        // stop timer
        clearTimeout(this.timer);
        this.timer = null;

        // set flag
        this.isActive = false;

        // cursor hidden ?
        if (this.options.hideCursor === true){
            this.terminal.cursor(true);
        }

        // re-enable line wrpaping ?
        if (this.options.linewrap === false){
            this.terminal.lineWrapping(true);
        }

        // reset cursor
        this.terminal.cursorRelativeReset();

        // trigger event
        this.emit('stop-pre-clear');

        // clear line on complete ?
        if (this.options.clearOnComplete){
            // clear all bars
            this.terminal.clearBottom();
            
        // or show final progress ?
        }else{
            // update each bar
            for (let i=0; i< this.bars.length; i++){
                // add new line ?
                if (i > 0){
                    this.terminal.newline();
                }

                // trigger final rendering
                this.bars[i].render();

                // stop
                this.bars[i].stop();
            }

            // new line on complete
            this.terminal.newline();
        }

        // trigger event
        this.emit('stop');
    }
}


/***/ }),

/***/ 8322:
/***/ ((module) => {

// utility to merge defaults
function mergeOption(v, defaultValue){
    if (typeof v === 'undefined' || v === null){
        return defaultValue;
    }else{
        return v;
    }
}

module.exports = {
    // set global options
    parse: function parse(rawOptions, preset){

        // options storage
        const options = {};

        // merge preset
        const opt = Object.assign({}, preset, rawOptions);

        // the max update rate in fps (redraw will only triggered on value change)
        options.throttleTime = 1000 / (mergeOption(opt.fps, 10));

        // the output stream to write on
        options.stream = mergeOption(opt.stream, process.stderr);

        // external terminal provided ?
        options.terminal = mergeOption(opt.terminal, null);

        // clear on finish ?
        options.clearOnComplete = mergeOption(opt.clearOnComplete, false);

        // stop on finish ?
        options.stopOnComplete = mergeOption(opt.stopOnComplete, false);

        // size of the progressbar in chars
        options.barsize = mergeOption(opt.barsize, 40);

        // position of the progress bar - 'left' (default), 'right' or 'center'
        options.align = mergeOption(opt.align, 'left');

        // hide the cursor ?
        options.hideCursor = mergeOption(opt.hideCursor, false);

        // disable linewrapping ?
        options.linewrap = mergeOption(opt.linewrap, false);

        // pre-render bar strings (performance)
        options.barCompleteString = (new Array(options.barsize + 1 ).join(opt.barCompleteChar || '='));
        options.barIncompleteString = (new Array(options.barsize + 1 ).join(opt.barIncompleteChar || '-'));

        // glue sequence (control chars) between bar elements ?
        options.barGlue = mergeOption(opt.barGlue, '');

        // the bar format
        options.format = mergeOption(opt.format, 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}');

        // external time-format provided ?
        options.formatTime = mergeOption(opt.formatTime, null);

        // external value-format provided ?
        options.formatValue = mergeOption(opt.formatValue, null);

        // external bar-format provided ?
        options.formatBar = mergeOption(opt.formatBar, null);

        // the number of results to average ETA over
        options.etaBufferLength = mergeOption(opt.etaBuffer, 10);

        // automatic eta updates based on fps
        options.etaAsynchronousUpdate = mergeOption(opt.etaAsynchronousUpdate, false);

        // allow synchronous updates ?
        options.synchronousUpdate = mergeOption(opt.synchronousUpdate, true);

        // notty mode
        options.noTTYOutput = mergeOption(opt.noTTYOutput, false);

        // schedule - 2s
        options.notTTYSchedule = mergeOption(opt.notTTYSchedule, 2000);
        
        // emptyOnZero - false
        options.emptyOnZero = mergeOption(opt.emptyOnZero, false);

        // force bar redraw even if progress did not change
        options.forceRedraw = mergeOption(opt.forceRedraw, false);

        // automated padding to fixed width ?
        options.autopadding = mergeOption(opt.autopadding, false);

        // autopadding character - empty in case autopadding is disabled
        options.autopaddingChar = options.autopadding ? mergeOption(opt.autopaddingChar, '   ') : '';

        return options;
    }
};

/***/ }),

/***/ 7561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _GenericBar = __webpack_require__(3455);
const _options = __webpack_require__(8322);

// Progress-Bar constructor
module.exports = class SingleBar extends _GenericBar{

    constructor(options, preset){
        super(_options.parse(options, preset));

        // the update timer
        this.timer = null;

        // disable synchronous updates in notty mode
        if (this.options.noTTYOutput && this.terminal.isTTY() === false){
            this.options.synchronousUpdate = false;
        }

        // update interval
        this.schedulingRate = (this.terminal.isTTY() ? this.options.throttleTime : this.options.notTTYSchedule);
    }

    // internal render function
    render(){
        // stop timer
        if (this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }

        // run internal rendering
        super.render();

        // add new line in notty mode!
        if (this.options.noTTYOutput && this.terminal.isTTY() === false){
            this.terminal.newline();
        }

        // next update
        this.timer = setTimeout(this.render.bind(this), this.schedulingRate);
    }

    update(current, payload){
        // timer inactive ?
        if (!this.timer) {
            return;
        }

        super.update(current, payload);

        // trigger synchronous update ?
        // check for throttle time 
        if (this.options.synchronousUpdate && (this.lastRedraw + this.options.throttleTime*2) < Date.now()){
            // force update
            this.render();
        }
    }

    // start the progress bar
    start(total, startValue, payload){
        // progress updates are only visible in TTY mode!
        if (this.options.noTTYOutput === false && this.terminal.isTTY() === false){
            return;
        }

        // save current cursor settings
        this.terminal.cursorSave();

        // hide the cursor ?
        if (this.options.hideCursor === true){
            this.terminal.cursor(false);
        }

        // disable line wrapping ?
        if (this.options.linewrap === false){
            this.terminal.lineWrapping(false);
        }

        // initialize bar
        super.start(total, startValue, payload);

        // redraw on start!
        this.render();
    }

    // stop the bar
    stop(){
        // timer inactive ?
        if (!this.timer) {
            return;
        }

        // trigger final rendering
        this.render();

        // restore state
        super.stop();

        // stop timer
        clearTimeout(this.timer);
        this.timer = null;

        // cursor hidden ?
        if (this.options.hideCursor === true){
            this.terminal.cursor(true);
        }

        // re-enable line wrapping ?
        if (this.options.linewrap === false){
            this.terminal.lineWrapping(true);
        }

        // restore cursor on complete (position + settings)
        this.terminal.cursorRestore();

        // clear line on complete ?
        if (this.options.clearOnComplete){
            this.terminal.cursorTo(0, null);
            this.terminal.clearLine();
        }else{
            // new line on complete
            this.terminal.newline();
        }
    }
}

/***/ }),

/***/ 4411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _readline = __webpack_require__(1058);

// low-level terminal interactions
class Terminal{

    constructor(outputStream){
        this.stream = outputStream;

        // default: line wrapping enabled
        this.linewrap = true;

        // current, relative y position
        this.dy = 0;
    }

    // save cursor position + settings
    cursorSave(){
        if (!this.stream.isTTY){
            return;
        }

        // save position
        this.stream.write('\x1B7');
    }

    // restore last cursor position + settings
    cursorRestore(){
        if (!this.stream.isTTY){
            return;
        }

        // restore cursor
        this.stream.write('\x1B8');
    }

    // show/hide cursor
    cursor(enabled){
        if (!this.stream.isTTY){
            return;
        }

        if (enabled){
            this.stream.write('\x1B[?25h');
        }else{
            this.stream.write('\x1B[?25l');
        }
    }

    // change cursor positionn
    cursorTo(x=null, y=null){
        if (!this.stream.isTTY){
            return;
        }

        // move cursor absolute
        _readline.cursorTo(this.stream, x, y);
    }

    // change relative cursor position
    cursorRelative(dx=null, dy=null){
        if (!this.stream.isTTY){
            return;
        }

        // store current position
        this.dy = this.dy + dy;
        
        // move cursor relative
        _readline.moveCursor(this.stream, dx, dy);
    }

    // relative reset
    cursorRelativeReset(){
        if (!this.stream.isTTY){
            return;
        }

        // move cursor to initial line
        _readline.moveCursor(this.stream, 0, -this.dy);

        // first char
        _readline.cursorTo(this.stream, 0, null);

        // reset counter
        this.dy = 0;
    }

    // clear to the right from cursor
    clearRight(){
        if (!this.stream.isTTY){
            return;
        }

        _readline.clearLine(this.stream, 1);
    }

    // clear the full line
    clearLine(){
        if (!this.stream.isTTY){
            return;
        }

        _readline.clearLine(this.stream, 0);
    }

    // clear everyting beyond the current line
    clearBottom(){
        if (!this.stream.isTTY){
            return;
        }

        _readline.clearScreenDown(this.stream);
    }

    // add new line; increment counter
    newline(){
        this.stream.write('\n');
        this.dy++;
    }

    // write content to output stream
    // @TODO use string-width to strip length
    write(s){
        // line wrapping enabled ? trim output
        if (this.linewrap === true){
            this.stream.write(s.substr(0, this.getWidth()));
        }else{
            this.stream.write(s);
        }
    }

    // control line wrapping
    lineWrapping(enabled){
        if (!this.stream.isTTY){
            return;
        }

        // store state
        this.linewrap = enabled;
        if (enabled){
            this.stream.write('\x1B[?7h');
        }else{
            this.stream.write('\x1B[?7l');
        }
    }

    // tty environment ?
    isTTY(){
        return (this.stream.isTTY === true);
    }

    // get terminal width
    getWidth(){
        // set max width to 80 in tty-mode and 200 in notty-mode
        return this.stream.columns || (this.stream.isTTY ? 80 : 200);
    }
}

module.exports = Terminal;


/***/ }),

/***/ 5040:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _legacy = __webpack_require__(2594);
const _shades_classic = __webpack_require__(8373);
const _shades_grey = __webpack_require__(1106);
const _rect = __webpack_require__(441);

module.exports = {
    legacy: _legacy,
    shades_classic: _shades_classic,
    shades_grey: _shades_grey,
    rect: _rect
};

/***/ }),

/***/ 2594:
/***/ ((module) => {

// cli-progress legacy style as of 1.x
module.exports = {
    format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '=',
    barIncompleteChar: '-'
};

/***/ }),

/***/ 441:
/***/ ((module) => {

module.exports = {
    format: ' {bar}\u25A0 {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '\u25A0',
    barIncompleteChar: ' '
};

/***/ }),

/***/ 8373:
/***/ ((module) => {

// cli-progress legacy style as of 1.x
module.exports = {
    format: ' {bar} {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
};

/***/ }),

/***/ 1106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _colors = __webpack_require__(3045);

// cli-progress legacy style as of 1.x
module.exports = {
    format: _colors.grey(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
};

/***/ }),

/***/ 7391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __webpack_require__(8510);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ 6931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(7391);
const route = __webpack_require__(880);

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ 880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(7391);

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ 8510:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 3595:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};

var util = __webpack_require__(1669);
var ansiStyles = colors.styles = __webpack_require__(3104);
var defineProps = Object.defineProperties;
var newLineRegex = new RegExp(/[\r\n]+/g);

colors.supportsColor = __webpack_require__(662).supportsColor;

if (typeof colors.enabled === 'undefined') {
  colors.enabled = colors.supportsColor() !== false;
}

colors.enable = function() {
  colors.enabled = true;
};

colors.disable = function() {
  colors.enabled = false;
};

colors.stripColors = colors.strip = function(str) {
  return ('' + str).replace(/\x1B\[\d+m/g, '');
};

// eslint-disable-next-line no-unused-vars
var stylize = colors.stylize = function stylize(str, style) {
  if (!colors.enabled) {
    return str+'';
  }

  var styleMap = ansiStyles[style];

  // Stylize should work for non-ANSI styles, too
  if(!styleMap && style in colors){
    // Style maps like trap operate as functions on strings;
    // they don't have properties like open or close.
    return colors[style](str);
  }

  return styleMap.open + str + styleMap.close;
};

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
};

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = (function() {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function(key) {
    ansiStyles[key].closeRe =
      new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function() {
        return build(this._styles.concat(key));
      },
    };
  });
  return ret;
})();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = Array.prototype.slice.call(arguments);

  var str = args.map(function(arg) {
    // Use weak equality check so we can colorize null/undefined in safe mode
    if (arg != null && arg.constructor === String) {
      return arg;
    } else {
      return util.inspect(arg);
    }
  }).join(' ');

  if (!colors.enabled || !str) {
    return str;
  }

  var newLinesPresent = str.indexOf('\n') != -1;

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
    if (newLinesPresent) {
      str = str.replace(newLineRegex, function(match) {
        return code.close + match + code.open;
      });
    }
  }

  return str;
}

colors.setTheme = function(theme) {
  if (typeof theme === 'string') {
    console.log('colors.setTheme now only accepts an object, not a string.  ' +
      'If you are trying to set a theme from a file, it is now your (the ' +
      'caller\'s) responsibility to require the file.  The old syntax ' +
      'looked like colors.setTheme(__dirname + ' +
      '\'/../themes/generic-logging.js\'); The new syntax looks like '+
      'colors.setTheme(require(__dirname + ' +
      '\'/../themes/generic-logging.js\'));');
    return;
  }
  for (var style in theme) {
    (function(style) {
      colors[style] = function(str) {
        if (typeof theme[style] === 'object') {
          var out = str;
          for (var i in theme[style]) {
            out = colors[theme[style][i]](out);
          }
          return out;
        }
        return colors[theme[style]](str);
      };
    })(style);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function(name) {
    ret[name] = {
      get: function() {
        return build([name]);
      },
    };
  });
  return ret;
}

var sequencer = function sequencer(map, str) {
  var exploded = str.split('');
  exploded = exploded.map(map);
  return exploded.join('');
};

// custom formatter methods
colors.trap = __webpack_require__(1302);
colors.zalgo = __webpack_require__(7743);

// maps
colors.maps = {};
colors.maps.america = __webpack_require__(6936)(colors);
colors.maps.zebra = __webpack_require__(2989)(colors);
colors.maps.rainbow = __webpack_require__(5210)(colors);
colors.maps.random = __webpack_require__(3441)(colors);

for (var map in colors.maps) {
  (function(map) {
    colors[map] = function(str) {
      return sequencer(colors.maps[map], str);
    };
  })(map);
}

defineProps(colors, init());


/***/ }),

/***/ 1302:
/***/ ((module) => {

module['exports'] = function runTheTrap(text, options) {
  var result = '';
  text = text || 'Run the trap, drop the bass';
  text = text.split('');
  var trap = {
    a: ['\u0040', '\u0104', '\u023a', '\u0245', '\u0394', '\u039b', '\u0414'],
    b: ['\u00df', '\u0181', '\u0243', '\u026e', '\u03b2', '\u0e3f'],
    c: ['\u00a9', '\u023b', '\u03fe'],
    d: ['\u00d0', '\u018a', '\u0500', '\u0501', '\u0502', '\u0503'],
    e: ['\u00cb', '\u0115', '\u018e', '\u0258', '\u03a3', '\u03be', '\u04bc',
      '\u0a6c'],
    f: ['\u04fa'],
    g: ['\u0262'],
    h: ['\u0126', '\u0195', '\u04a2', '\u04ba', '\u04c7', '\u050a'],
    i: ['\u0f0f'],
    j: ['\u0134'],
    k: ['\u0138', '\u04a0', '\u04c3', '\u051e'],
    l: ['\u0139'],
    m: ['\u028d', '\u04cd', '\u04ce', '\u0520', '\u0521', '\u0d69'],
    n: ['\u00d1', '\u014b', '\u019d', '\u0376', '\u03a0', '\u048a'],
    o: ['\u00d8', '\u00f5', '\u00f8', '\u01fe', '\u0298', '\u047a', '\u05dd',
      '\u06dd', '\u0e4f'],
    p: ['\u01f7', '\u048e'],
    q: ['\u09cd'],
    r: ['\u00ae', '\u01a6', '\u0210', '\u024c', '\u0280', '\u042f'],
    s: ['\u00a7', '\u03de', '\u03df', '\u03e8'],
    t: ['\u0141', '\u0166', '\u0373'],
    u: ['\u01b1', '\u054d'],
    v: ['\u05d8'],
    w: ['\u0428', '\u0460', '\u047c', '\u0d70'],
    x: ['\u04b2', '\u04fe', '\u04fc', '\u04fd'],
    y: ['\u00a5', '\u04b0', '\u04cb'],
    z: ['\u01b5', '\u0240'],
  };
  text.forEach(function(c) {
    c = c.toLowerCase();
    var chars = trap[c] || [' '];
    var rand = Math.floor(Math.random() * chars.length);
    if (typeof trap[c] !== 'undefined') {
      result += trap[c][rand];
    } else {
      result += c;
    }
  });
  return result;
};


/***/ }),

/***/ 7743:
/***/ ((module) => {

// please no
module['exports'] = function zalgo(text, options) {
  text = text || '   he is here   ';
  var soul = {
    'up': [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚',
    ],
    'down': [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣',
    ],
    'mid': [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉',
    ],
  };
  var all = [].concat(soul.up, soul.down, soul.mid);

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function isChar(character) {
    var bool = false;
    all.filter(function(i) {
      bool = (i === character);
    });
    return bool;
  }


  function heComes(text, options) {
    var result = '';
    var counts;
    var l;
    options = options || {};
    options['up'] =
      typeof options['up'] !== 'undefined' ? options['up'] : true;
    options['mid'] =
      typeof options['mid'] !== 'undefined' ? options['mid'] : true;
    options['down'] =
      typeof options['down'] !== 'undefined' ? options['down'] : true;
    options['size'] =
      typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
    text = text.split('');
    for (l in text) {
      if (isChar(l)) {
        continue;
      }
      result = result + text[l];
      counts = {'up': 0, 'down': 0, 'mid': 0};
      switch (options.size) {
        case 'mini':
          counts.up = randomNumber(8);
          counts.mid = randomNumber(2);
          counts.down = randomNumber(8);
          break;
        case 'maxi':
          counts.up = randomNumber(16) + 3;
          counts.mid = randomNumber(4) + 1;
          counts.down = randomNumber(64) + 3;
          break;
        default:
          counts.up = randomNumber(8) + 1;
          counts.mid = randomNumber(6) / 2;
          counts.down = randomNumber(8) + 1;
          break;
      }

      var arr = ['up', 'mid', 'down'];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text, options);
};



/***/ }),

/***/ 2857:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var colors = __webpack_require__(3595);

module['exports'] = function() {
  //
  // Extends prototype of native string object to allow for "foo".red syntax
  //
  var addProperty = function(color, func) {
    String.prototype.__defineGetter__(color, func);
  };

  addProperty('strip', function() {
    return colors.strip(this);
  });

  addProperty('stripColors', function() {
    return colors.strip(this);
  });

  addProperty('trap', function() {
    return colors.trap(this);
  });

  addProperty('zalgo', function() {
    return colors.zalgo(this);
  });

  addProperty('zebra', function() {
    return colors.zebra(this);
  });

  addProperty('rainbow', function() {
    return colors.rainbow(this);
  });

  addProperty('random', function() {
    return colors.random(this);
  });

  addProperty('america', function() {
    return colors.america(this);
  });

  //
  // Iterate through all default styles and colors
  //
  var x = Object.keys(colors.styles);
  x.forEach(function(style) {
    addProperty(style, function() {
      return colors.stylize(this, style);
    });
  });

  function applyTheme(theme) {
    //
    // Remark: This is a list of methods that exist
    // on String that you should not overwrite.
    //
    var stringPrototypeBlacklist = [
      '__defineGetter__', '__defineSetter__', '__lookupGetter__',
      '__lookupSetter__', 'charAt', 'constructor', 'hasOwnProperty',
      'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString',
      'valueOf', 'charCodeAt', 'indexOf', 'lastIndexOf', 'length',
      'localeCompare', 'match', 'repeat', 'replace', 'search', 'slice',
      'split', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
      'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight',
    ];

    Object.keys(theme).forEach(function(prop) {
      if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
        console.log('warn: '.red + ('String.prototype' + prop).magenta +
          ' is probably something you don\'t want to override.  ' +
          'Ignoring style name');
      } else {
        if (typeof(theme[prop]) === 'string') {
          colors[prop] = colors[theme[prop]];
          addProperty(prop, function() {
            return colors[prop](this);
          });
        } else {
          var themePropApplicator = function(str) {
            var ret = str || this;
            for (var t = 0; t < theme[prop].length; t++) {
              ret = colors[theme[prop][t]](ret);
            }
            return ret;
          };
          addProperty(prop, themePropApplicator);
          colors[prop] = function(str) {
            return themePropApplicator(str);
          };
        }
      }
    });
  }

  colors.setTheme = function(theme) {
    if (typeof theme === 'string') {
      console.log('colors.setTheme now only accepts an object, not a string. ' +
        'If you are trying to set a theme from a file, it is now your (the ' +
        'caller\'s) responsibility to require the file.  The old syntax ' +
        'looked like colors.setTheme(__dirname + ' +
        '\'/../themes/generic-logging.js\'); The new syntax looks like '+
        'colors.setTheme(require(__dirname + ' +
        '\'/../themes/generic-logging.js\'));');
      return;
    } else {
      applyTheme(theme);
    }
  };
};


/***/ }),

/***/ 3045:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var colors = __webpack_require__(3595);
module['exports'] = colors;

// Remark: By default, colors will add style properties to String.prototype.
//
// If you don't wish to extend String.prototype, you can do this instead and
// native String will not be touched:
//
//   var colors = require('colors/safe);
//   colors.red("foo")
//
//
__webpack_require__(2857)();


/***/ }),

/***/ 6936:
/***/ ((module) => {

module['exports'] = function(colors) {
  return function(letter, i, exploded) {
    if (letter === ' ') return letter;
    switch (i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter);
      case 2: return colors.blue(letter);
    }
  };
};


/***/ }),

/***/ 5210:
/***/ ((module) => {

module['exports'] = function(colors) {
  // RoY G BiV
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter, i, exploded) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};



/***/ }),

/***/ 3441:
/***/ ((module) => {

module['exports'] = function(colors) {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
    'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',
    'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
  return function(letter, i, exploded) {
    return letter === ' ' ? letter :
      colors[
          available[Math.round(Math.random() * (available.length - 2))]
      ](letter);
  };
};


/***/ }),

/***/ 2989:
/***/ ((module) => {

module['exports'] = function(colors) {
  return function(letter, i, exploded) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};


/***/ }),

/***/ 3104:
/***/ ((module) => {

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var styles = {};
module['exports'] = styles;

var codes = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  brightRed: [91, 39],
  brightGreen: [92, 39],
  brightYellow: [93, 39],
  brightBlue: [94, 39],
  brightMagenta: [95, 39],
  brightCyan: [96, 39],
  brightWhite: [97, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  bgGray: [100, 49],
  bgGrey: [100, 49],

  bgBrightRed: [101, 49],
  bgBrightGreen: [102, 49],
  bgBrightYellow: [103, 49],
  bgBrightBlue: [104, 49],
  bgBrightMagenta: [105, 49],
  bgBrightCyan: [106, 49],
  bgBrightWhite: [107, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49],

};

Object.keys(codes).forEach(function(key) {
  var val = codes[key];
  var style = styles[key] = [];
  style.open = '\u001b[' + val[0] + 'm';
  style.close = '\u001b[' + val[1] + 'm';
});


/***/ }),

/***/ 223:
/***/ ((module) => {

"use strict";
/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/



module.exports = function(flag, argv) {
  argv = argv || process.argv;

  var terminatorPos = argv.indexOf('--');
  var prefix = /^-{1,2}/.test(flag) ? '' : '--';
  var pos = argv.indexOf(prefix + flag);

  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ 662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/



var os = __webpack_require__(2087);
var hasFlag = __webpack_require__(223);

var env = process.env;

var forceColor = void 0;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')
           || hasFlag('color=always')) {
  forceColor = true;
}
if ('FORCE_COLOR' in env) {
  forceColor = env.FORCE_COLOR.length === 0
    || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level: level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3,
  };
}

function supportsColor(stream) {
  if (forceColor === false) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full')
      || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (stream && !stream.isTTY && forceColor !== true) {
    return 0;
  }

  var min = forceColor ? 1 : 0;

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first
    // Windows release that supports 256 colors. Windows 10 build 14931 is the
    // first release that supports 16m/TrueColor.
    var osRelease = os.release().split('.');
    if (Number(process.versions.node.split('.')[0]) >= 8
        && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
      return sign in env;
    }) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
    );
  }

  if ('TERM_PROGRAM' in env) {
    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;
      case 'Hyper':
        return 3;
      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  if (env.TERM === 'dumb') {
    return min;
  }

  return min;
}

function getSupportLevel(stream) {
  var level = supportsColor(stream);
  return translateLevel(level);
}

module.exports = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr),
};


/***/ }),

/***/ 8222:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 6243:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(900);

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 8237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(8222);
} else {
	module.exports = __webpack_require__(5332);
}


/***/ }),

/***/ 5332:
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(3867);
const util = __webpack_require__(1669);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(9318);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 8212:
/***/ ((module) => {

"use strict";


module.exports = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};


/***/ }),

/***/ 2644:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { dirname, resolve } = __webpack_require__(5622);
const { readdirSync, statSync } = __webpack_require__(5747);

module.exports = function (start, callback) {
	let dir = resolve('.', start);
	let tmp, stats = statSync(dir);

	if (!stats.isDirectory()) {
		dir = dirname(dir);
	}

	while (true) {
		tmp = callback(dir, readdirSync(dir));
		if (tmp) return resolve(dir, tmp);
		dir = dirname(tmp = dir);
		if (tmp === dir) break;
	}
}


/***/ }),

/***/ 5152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

//parse Empty Node as self closing node
const buildOptions = __webpack_require__(8280).buildOptions;

const defaultOptions = {
  attributeNamePrefix: '@_',
  attrNodeName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  cdataTagName: false,
  cdataPositionChar: '\\c',
  format: false,
  indentBy: '  ',
  supressEmptyNode: false,
  tagValueProcessor: function(a) {
    return a;
  },
  attrValueProcessor: function(a) {
    return a;
  },
};

const props = [
  'attributeNamePrefix',
  'attrNodeName',
  'textNodeName',
  'ignoreAttributes',
  'cdataTagName',
  'cdataPositionChar',
  'format',
  'indentBy',
  'supressEmptyNode',
  'tagValueProcessor',
  'attrValueProcessor',
];

function Parser(options) {
  this.options = buildOptions(options, defaultOptions, props);
  if (this.options.ignoreAttributes || this.options.attrNodeName) {
    this.isAttribute = function(/*a*/) {
      return false;
    };
  } else {
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }
  if (this.options.cdataTagName) {
    this.isCDATA = isCDATA;
  } else {
    this.isCDATA = function(/*a*/) {
      return false;
    };
  }
  this.replaceCDATAstr = replaceCDATAstr;
  this.replaceCDATAarr = replaceCDATAarr;

  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = '>\n';
    this.newLine = '\n';
  } else {
    this.indentate = function() {
      return '';
    };
    this.tagEndChar = '>';
    this.newLine = '';
  }

  if (this.options.supressEmptyNode) {
    this.buildTextNode = buildEmptyTextNode;
    this.buildObjNode = buildEmptyObjNode;
  } else {
    this.buildTextNode = buildTextValNode;
    this.buildObjNode = buildObjectNode;
  }

  this.buildTextValNode = buildTextValNode;
  this.buildObjectNode = buildObjectNode;
}

Parser.prototype.parse = function(jObj) {
  return this.j2x(jObj, 0).val;
};

Parser.prototype.j2x = function(jObj, level) {
  let attrStr = '';
  let val = '';
  const keys = Object.keys(jObj);
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    if (typeof jObj[key] === 'undefined') {
      // supress undefined node
    } else if (jObj[key] === null) {
      val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
    } else if (jObj[key] instanceof Date) {
      val += this.buildTextNode(jObj[key], key, '', level);
    } else if (typeof jObj[key] !== 'object') {
      //premitive type
      const attr = this.isAttribute(key);
      if (attr) {
        attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
      } else if (this.isCDATA(key)) {
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
        } else {
          val += this.replaceCDATAstr('', jObj[key]);
        }
      } else {
        //tag value
        if (key === this.options.textNodeName) {
          if (jObj[this.options.cdataTagName]) {
            //value will added while processing cdata
          } else {
            val += this.options.tagValueProcessor('' + jObj[key]);
          }
        } else {
          val += this.buildTextNode(jObj[key], key, '', level);
        }
      }
    } else if (Array.isArray(jObj[key])) {
      //repeated nodes
      if (this.isCDATA(key)) {
        val += this.indentate(level);
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
        } else {
          val += this.replaceCDATAarr('', jObj[key]);
        }
      } else {
        //nested nodes
        const arrLen = jObj[key].length;
        for (let j = 0; j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === 'undefined') {
            // supress undefined node
          } else if (item === null) {
            val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
          } else if (typeof item === 'object') {
            const result = this.j2x(item, level + 1);
            val += this.buildObjNode(result.val, key, result.attrStr, level);
          } else {
            val += this.buildTextNode(item, key, '', level);
          }
        }
      }
    } else {
      //nested node
      if (this.options.attrNodeName && key === this.options.attrNodeName) {
        const Ks = Object.keys(jObj[key]);
        const L = Ks.length;
        for (let j = 0; j < L; j++) {
          attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
        }
      } else {
        const result = this.j2x(jObj[key], level + 1);
        val += this.buildObjNode(result.val, key, result.attrStr, level);
      }
    }
  }
  return {attrStr: attrStr, val: val};
};

function replaceCDATAstr(str, cdata) {
  str = this.options.tagValueProcessor('' + str);
  if (this.options.cdataPositionChar === '' || str === '') {
    return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
  } else {
    return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
  }
}

function replaceCDATAarr(str, cdata) {
  str = this.options.tagValueProcessor('' + str);
  if (this.options.cdataPositionChar === '' || str === '') {
    return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
  } else {
    for (let v in cdata) {
      str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
    }
    return str + this.newLine;
  }
}

function buildObjectNode(val, key, attrStr, level) {
  if (attrStr && !val.includes('<')) {
    return (
      this.indentate(level) +
      '<' +
      key +
      attrStr +
      '>' +
      val +
      //+ this.newLine
      // + this.indentate(level)
      '</' +
      key +
      this.tagEndChar
    );
  } else {
    return (
      this.indentate(level) +
      '<' +
      key +
      attrStr +
      this.tagEndChar +
      val +
      //+ this.newLine
      this.indentate(level) +
      '</' +
      key +
      this.tagEndChar
    );
  }
}

function buildEmptyObjNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildObjectNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
    //+ this.newLine
  }
}

function buildTextValNode(val, key, attrStr, level) {
  return (
    this.indentate(level) +
    '<' +
    key +
    attrStr +
    '>' +
    this.options.tagValueProcessor(val) +
    '</' +
    key +
    this.tagEndChar
  );
}

function buildEmptyTextNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildTextValNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
  }
}

function indentate(level) {
  return this.options.indentBy.repeat(level);
}

function isAttribute(name /*, options*/) {
  if (name.startsWith(this.options.attributeNamePrefix)) {
    return name.substr(this.attrPrefixLen);
  } else {
    return false;
  }
}

function isCDATA(name) {
  return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag

module.exports = Parser;


/***/ }),

/***/ 1901:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const char = function(a) {
  return String.fromCharCode(a);
};

const chars = {
  nilChar: char(176),
  missingChar: char(201),
  nilPremitive: char(175),
  missingPremitive: char(200),

  emptyChar: char(178),
  emptyValue: char(177), //empty Premitive

  boundryChar: char(179),

  objStart: char(198),
  arrStart: char(204),
  arrayEnd: char(185),
};

const charsArr = [
  chars.nilChar,
  chars.nilPremitive,
  chars.missingChar,
  chars.missingPremitive,
  chars.boundryChar,
  chars.emptyChar,
  chars.emptyValue,
  chars.arrayEnd,
  chars.objStart,
  chars.arrStart,
];

const _e = function(node, e_schema, options) {
  if (typeof e_schema === 'string') {
    //premitive
    if (node && node[0] && node[0].val !== undefined) {
      return getValue(node[0].val, e_schema);
    } else {
      return getValue(node, e_schema);
    }
  } else {
    const hasValidData = hasData(node);
    if (hasValidData === true) {
      let str = '';
      if (Array.isArray(e_schema)) {
        //attributes can't be repeated. hence check in children tags only
        str += chars.arrStart;
        const itemSchema = e_schema[0];
        //var itemSchemaType = itemSchema;
        const arr_len = node.length;

        if (typeof itemSchema === 'string') {
          for (let arr_i = 0; arr_i < arr_len; arr_i++) {
            const r = getValue(node[arr_i].val, itemSchema);
            str = processValue(str, r);
          }
        } else {
          for (let arr_i = 0; arr_i < arr_len; arr_i++) {
            const r = _e(node[arr_i], itemSchema, options);
            str = processValue(str, r);
          }
        }
        str += chars.arrayEnd; //indicates that next item is not array item
      } else {
        //object
        str += chars.objStart;
        const keys = Object.keys(e_schema);
        if (Array.isArray(node)) {
          node = node[0];
        }
        for (let i in keys) {
          const key = keys[i];
          //a property defined in schema can be present either in attrsMap or children tags
          //options.textNodeName will not present in both maps, take it's value from val
          //options.attrNodeName will be present in attrsMap
          let r;
          if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
            r = _e(node.attrsMap[key], e_schema[key], options);
          } else if (key === options.textNodeName) {
            r = _e(node.val, e_schema[key], options);
          } else {
            r = _e(node.child[key], e_schema[key], options);
          }
          str = processValue(str, r);
        }
      }
      return str;
    } else {
      return hasValidData;
    }
  }
};

const getValue = function(a /*, type*/) {
  switch (a) {
    case undefined:
      return chars.missingPremitive;
    case null:
      return chars.nilPremitive;
    case '':
      return chars.emptyValue;
    default:
      return a;
  }
};

const processValue = function(str, r) {
  if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
    str += chars.boundryChar;
  }
  return str + r;
};

const isAppChar = function(ch) {
  return charsArr.indexOf(ch) !== -1;
};

function hasData(jObj) {
  if (jObj === undefined) {
    return chars.missingChar;
  } else if (jObj === null) {
    return chars.nilChar;
  } else if (
    jObj.child &&
    Object.keys(jObj.child).length === 0 &&
    (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)
  ) {
    return chars.emptyChar;
  } else {
    return true;
  }
}

const x2j = __webpack_require__(6712);
const buildOptions = __webpack_require__(8280).buildOptions;

const convert2nimn = function(node, e_schema, options) {
  options = buildOptions(options, x2j.defaultOptions, x2j.props);
  return _e(node, e_schema, options);
};

exports.convert2nimn = convert2nimn;


/***/ }),

/***/ 8270:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(8280);

const convertToJson = function(node, options) {
  const jObj = {};

  //when no child node or attr is present
  if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
    return util.isExist(node.val) ? node.val : '';
  } else {
    //otherwise create a textnode if node has some text
    if (util.isExist(node.val)) {
      if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
        if(options.arrayMode === "strict"){
          jObj[options.textNodeName] = [ node.val ];
        }else{
          jObj[options.textNodeName] = node.val;
        }
      }
    }
  }

  util.merge(jObj, node.attrsMap, options.arrayMode);

  const keys = Object.keys(node.child);
  for (let index = 0; index < keys.length; index++) {
    var tagname = keys[index];
    if (node.child[tagname] && node.child[tagname].length > 1) {
      jObj[tagname] = [];
      for (var tag in node.child[tagname]) {
        jObj[tagname].push(convertToJson(node.child[tagname][tag], options));
      }
    } else {
      if(options.arrayMode === true){
        const result = convertToJson(node.child[tagname][0], options)
        if(typeof result === 'object')
          jObj[tagname] = [ result ];
        else
          jObj[tagname] = result;
      }else if(options.arrayMode === "strict"){
        jObj[tagname] = [convertToJson(node.child[tagname][0], options) ];
      }else{
        jObj[tagname] = convertToJson(node.child[tagname][0], options);
      }
    }
  }

  //add value
  return jObj;
};

exports.convertToJson = convertToJson;


/***/ }),

/***/ 6014:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(8280);
const buildOptions = __webpack_require__(8280).buildOptions;
const x2j = __webpack_require__(6712);

//TODO: do it later
const convertToJsonString = function(node, options) {
  options = buildOptions(options, x2j.defaultOptions, x2j.props);

  options.indentBy = options.indentBy || '';
  return _cToJsonStr(node, options, 0);
};

const _cToJsonStr = function(node, options, level) {
  let jObj = '{';

  //traver through all the children
  const keys = Object.keys(node.child);

  for (let index = 0; index < keys.length; index++) {
    var tagname = keys[index];
    if (node.child[tagname] && node.child[tagname].length > 1) {
      jObj += '"' + tagname + '" : [ ';
      for (var tag in node.child[tagname]) {
        jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
      }
      jObj = jObj.substr(0, jObj.length - 1) + ' ] '; //remove extra comma in last
    } else {
      jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
    }
  }
  util.merge(jObj, node.attrsMap);
  //add attrsMap as new children
  if (util.isEmptyObject(jObj)) {
    return util.isExist(node.val) ? node.val : '';
  } else {
    if (util.isExist(node.val)) {
      if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
        jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
      }
    }
  }
  //add value
  if (jObj[jObj.length - 1] === ',') {
    jObj = jObj.substr(0, jObj.length - 2);
  }
  return jObj + '}';
};

function stringval(v) {
  if (v === true || v === false || !isNaN(v)) {
    return v;
  } else {
    return '"' + v + '"';
  }
}

function indentate(options, level) {
  return options.indentBy.repeat(level);
}

exports.convertToJsonString = convertToJsonString;


/***/ }),

/***/ 7448:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const nodeToJson = __webpack_require__(8270);
const xmlToNodeobj = __webpack_require__(6712);
const x2xmlnode = __webpack_require__(6712);
const buildOptions = __webpack_require__(8280).buildOptions;
const validator = __webpack_require__(1739);

exports.parse = function(xmlData, options, validationOption) {
  if( validationOption){
    if(validationOption === true) validationOption = {}
    
    const result = validator.validate(xmlData, validationOption);
    if (result !== true) {
      throw Error( result.err.msg)
    }
  }
  options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
  const traversableObj = xmlToNodeobj.getTraversalObj(xmlData, options)
  //print(traversableObj, "  ");
  return nodeToJson.convertToJson(traversableObj, options);
};
exports.convertTonimn = __webpack_require__(1901).convert2nimn;
exports.getTraversalObj = xmlToNodeobj.getTraversalObj;
exports.convertToJson = nodeToJson.convertToJson;
exports.convertToJsonString = __webpack_require__(6014).convertToJsonString;
exports.validate = validator.validate;
exports.j2xParser = __webpack_require__(5152);
exports.parseToNimn = function(xmlData, schema, options) {
  return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
};


function print(xmlNode, indentation){
  if(xmlNode){
    console.log(indentation + "{")
    console.log(indentation + "  \"tagName\": \"" + xmlNode.tagname + "\", ");
    if(xmlNode.parent){
      console.log(indentation + "  \"parent\": \"" + xmlNode.parent.tagname  + "\", ");
    }
    console.log(indentation + "  \"val\": \"" + xmlNode.val  + "\", ");
    console.log(indentation + "  \"attrs\": " + JSON.stringify(xmlNode.attrsMap,null,4)  + ", ");

    if(xmlNode.child){
      console.log(indentation + "\"child\": {")
      const indentation2 = indentation + indentation;
      Object.keys(xmlNode.child).forEach( function(key) {
        const node = xmlNode.child[key];

        if(Array.isArray(node)){
          console.log(indentation +  "\""+key+"\" :[")
          node.forEach( function(item,index) {
            //console.log(indentation + " \""+index+"\" : [")
            print(item, indentation2);
          })
          console.log(indentation + "],")  
        }else{
          console.log(indentation + " \""+key+"\" : {")
          print(node, indentation2);
          console.log(indentation + "},")  
        }
      });
      console.log(indentation + "},")
    }
    console.log(indentation + "},")
  }
}

/***/ }),

/***/ 8280:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*'
const regexName = new RegExp('^' + nameRegexp + '$');

const getAllMatches = function(string, regex) {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    const allmatches = [];
    const len = match.length;
    for (let index = 0; index < len; index++) {
      allmatches.push(match[index]);
    }
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
};

const isName = function(string) {
  const match = regexName.exec(string);
  return !(match === null || typeof match === 'undefined');
};

exports.isExist = function(v) {
  return typeof v !== 'undefined';
};

exports.isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0;
};

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
exports.merge = function(target, a, arrayMode) {
  if (a) {
    const keys = Object.keys(a); // will return an array of own properties
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      if(arrayMode === 'strict'){
        target[keys[i]] = [ a[keys[i]] ];
      }else{
        target[keys[i]] = a[keys[i]];
      }
    }
  }
};
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

exports.getValue = function(v) {
  if (exports.isExist(v)) {
    return v;
  } else {
    return '';
  }
};

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

exports.buildOptions = function(options, defaultOptions, props) {
  var newOptions = {};
  if (!options) {
    return defaultOptions; //if there are not options
  }

  for (let i = 0; i < props.length; i++) {
    if (options[props[i]] !== undefined) {
      newOptions[props[i]] = options[props[i]];
    } else {
      newOptions[props[i]] = defaultOptions[props[i]];
    }
  }
  return newOptions;
};

exports.isName = isName;
exports.getAllMatches = getAllMatches;
exports.nameRegexp = nameRegexp;


/***/ }),

/***/ 1739:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(8280);

const defaultOptions = {
  allowBooleanAttributes: false, //A tag can have attributes without any value
};

const props = ['allowBooleanAttributes'];

//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate = function (xmlData, options) {
  options = util.buildOptions(options, defaultOptions, props);

  //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
  //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
  //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
  const tags = [];
  let tagFound = false;

  //indicates that the root tag has been closed (aka. depth 0 has been reached)
  let reachedRoot = false;

  if (xmlData[0] === '\ufeff') {
    // check for byte order mark (BOM)
    xmlData = xmlData.substr(1);
  }

  for (let i = 0; i < xmlData.length; i++) {
    if (xmlData[i] === '<') {
      //starting of tag
      //read until you reach to '>' avoiding any '>' in attribute value

      i++;
      if (xmlData[i] === '?') {
        i = readPI(xmlData, ++i);
        if (i.err) {
          return i;
        }
      } else if (xmlData[i] === '!') {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === '/') {
          //closing tag
          closingTag = true;
          i++;
        }
        //read tagname
        let tagName = '';
        for (; i < xmlData.length &&
          xmlData[i] !== '>' &&
          xmlData[i] !== ' ' &&
          xmlData[i] !== '\t' &&
          xmlData[i] !== '\n' &&
          xmlData[i] !== '\r'; i++
        ) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        //console.log(tagName);

        if (tagName[tagName.length - 1] === '/') {
          //self closing tag without attributes
          tagName = tagName.substring(0, tagName.length - 1);
          //continue;
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if (tagName.trim().length === 0) {
            msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
          } else {
            msg = "Tag '"+tagName+"' is an invalid name.";
          }
          return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
        }

        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject('InvalidAttr', "Attributes for '"+tagName+"' have open quote.", getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;

        if (attrStr[attrStr.length - 1] === '/') {
          //self closing tag
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid = validateAttributeString(attrStr, options);
          if (isValid === true) {
            tagFound = true;
            //continue; //text may presents after self closing tag
          } else {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, i));
          } else {
            const otg = tags.pop();
            if (tagName !== otg) {
              return getErrorObject('InvalidTag', "Closing tag '"+otg+"' is expected inplace of '"+tagName+"'.", getLineNumberForPosition(xmlData, i));
            }

            //when there are no more tags, we reached the root level.
            if (tags.length == 0) {
              reachedRoot = true;
            }
          }
        } else {
          const isValid = validateAttributeString(attrStr, options);
          if (isValid !== true) {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }

          //if the root level has been reached before ...
          if (reachedRoot === true) {
            return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
          } else {
            tags.push(tagName);
          }
          tagFound = true;
        }

        //skip tag text value
        //It may include comments and CDATA value
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === '<') {
            if (xmlData[i + 1] === '!') {
              //comment or CADATA
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else {
              break;
            }
          } else if (xmlData[i] === '&') {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          }
        } //end of reading tag text value
        if (xmlData[i] === '<') {
          i--;
        }
      }
    } else {
      if (xmlData[i] === ' ' || xmlData[i] === '\t' || xmlData[i] === '\n' || xmlData[i] === '\r') {
        continue;
      }
      return getErrorObject('InvalidChar', "char '"+xmlData[i]+"' is not expected.", getLineNumberForPosition(xmlData, i));
    }
  }

  if (!tagFound) {
    return getErrorObject('InvalidXml', 'Start tag expected.', 1);
  } else if (tags.length > 0) {
    return getErrorObject('InvalidXml', "Invalid '"+JSON.stringify(tags, null, 4).replace(/\r?\n/g, '')+"' found.", 1);
  }

  return true;
};

/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */
function readPI(xmlData, i) {
  var start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == '?' || xmlData[i] == ' ') {
      //tagname
      var tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === 'xml') {
        return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
        //check if valid attribut string
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}

function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
    //comment
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  } else if (
    xmlData.length > i + 8 &&
    xmlData[i + 1] === 'D' &&
    xmlData[i + 2] === 'O' &&
    xmlData[i + 3] === 'C' &&
    xmlData[i + 4] === 'T' &&
    xmlData[i + 5] === 'Y' &&
    xmlData[i + 6] === 'P' &&
    xmlData[i + 7] === 'E'
  ) {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === '<') {
        angleBracketsCount++;
      } else if (xmlData[i] === '>') {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (
    xmlData.length > i + 9 &&
    xmlData[i + 1] === '[' &&
    xmlData[i + 2] === 'C' &&
    xmlData[i + 3] === 'D' &&
    xmlData[i + 4] === 'A' &&
    xmlData[i + 5] === 'T' &&
    xmlData[i + 6] === 'A' &&
    xmlData[i + 7] === '['
  ) {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  }

  return i;
}

var doubleQuote = '"';
var singleQuote = "'";

/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */
function readAttributeStr(xmlData, i) {
  let attrStr = '';
  let startChar = '';
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === '') {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) {
        //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
        continue;
      } else {
        startChar = '';
      }
    } else if (xmlData[i] === '>') {
      if (startChar === '') {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== '') {
    return false;
  }

  return {
    value: attrStr,
    index: i,
    tagClosed: tagClosed
  };
}

/**
 * Select all the attributes whether valid or invalid.
 */
const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

function validateAttributeString(attrStr, options) {
  //console.log("start:"+attrStr+":end");

  //if(attrStr.trim().length === 0) return true; //empty string

  const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};

  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      //nospace before attribute name: a="sd"b="saf"
      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' has no space in starting.", getPositionFromMatch(attrStr, matches[i][0]))
    } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
      //independent attribute: ab
      return getErrorObject('InvalidAttr', "boolean attribute '"+matches[i][2]+"' is not allowed.", getPositionFromMatch(attrStr, matches[i][0]));
    }
    /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is an invalid name.", getPositionFromMatch(attrStr, matches[i][0]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      //check for duplicate attribute.
      attrNames[attrName] = 1;
    } else {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is repeated.", getPositionFromMatch(attrStr, matches[i][0]));
    }
  }

  return true;
}

function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === 'x') {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ';')
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}

function validateAmpersand(xmlData, i) {
  // https://www.w3.org/TR/xml/#dt-charref
  i++;
  if (xmlData[i] === ';')
    return -1;
  if (xmlData[i] === '#') {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ';')
      break;
    return -1;
  }
  return i;
}

function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code: code,
      msg: message,
      line: lineNumber,
    },
  };
}

function validateAttrName(attrName) {
  return util.isName(attrName);
}

// const startsWithXML = /^xml/i;

function validateTagName(tagname) {
  return util.isName(tagname) /* && !tagname.match(startsWithXML) */;
}

//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
  var lines = xmlData.substring(0, index).split(/\r?\n/);
  return lines.length;
}

//this function returns the position of the last character of match within attrStr
function getPositionFromMatch(attrStr, match) {
  return attrStr.indexOf(match) + match.length;
}


/***/ }),

/***/ 9539:
/***/ ((module) => {

"use strict";


module.exports = function(tagname, parent, val) {
  this.tagname = tagname;
  this.parent = parent;
  this.child = {}; //child tags
  this.attrsMap = {}; //attributes map
  this.val = val; //text only
  this.addChild = function(child) {
    if (Array.isArray(this.child[child.tagname])) {
      //already presents
      this.child[child.tagname].push(child);
    } else {
      this.child[child.tagname] = [child];
    }
  };
};


/***/ }),

/***/ 6712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const util = __webpack_require__(8280);
const buildOptions = __webpack_require__(8280).buildOptions;
const xmlNode = __webpack_require__(9539);
const regx =
  '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
  .replace(/NAME/g, util.nameRegexp);

//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

//polyfill
if (!Number.parseInt && window.parseInt) {
  Number.parseInt = window.parseInt;
}
if (!Number.parseFloat && window.parseFloat) {
  Number.parseFloat = window.parseFloat;
}

const defaultOptions = {
  attributeNamePrefix: '@_',
  attrNodeName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false, //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseNodeValue: true,
  parseAttributeValue: false,
  arrayMode: false,
  trimValues: true, //Trim string values of tag and attributes
  cdataTagName: false,
  cdataPositionChar: '\\c',
  tagValueProcessor: function(a, tagName) {
    return a;
  },
  attrValueProcessor: function(a, attrName) {
    return a;
  },
  stopNodes: []
  //decodeStrict: false,
};

exports.defaultOptions = defaultOptions;

const props = [
  'attributeNamePrefix',
  'attrNodeName',
  'textNodeName',
  'ignoreAttributes',
  'ignoreNameSpace',
  'allowBooleanAttributes',
  'parseNodeValue',
  'parseAttributeValue',
  'arrayMode',
  'trimValues',
  'cdataTagName',
  'cdataPositionChar',
  'tagValueProcessor',
  'attrValueProcessor',
  'parseTrueNumberOnly',
  'stopNodes'
];
exports.props = props;

/**
 * Trim -> valueProcessor -> parse value
 * @param {string} tagName
 * @param {string} val
 * @param {object} options
 */
function processTagValue(tagName, val, options) {
  if (val) {
    if (options.trimValues) {
      val = val.trim();
    }
    val = options.tagValueProcessor(val, tagName);
    val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
  }

  return val;
}

function resolveNameSpace(tagname, options) {
  if (options.ignoreNameSpace) {
    const tags = tagname.split(':');
    const prefix = tagname.charAt(0) === '/' ? '/' : '';
    if (tags[0] === 'xmlns') {
      return '';
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}

function parseValue(val, shouldParse, parseTrueNumberOnly) {
  if (shouldParse && typeof val === 'string') {
    let parsed;
    if (val.trim() === '' || isNaN(val)) {
      parsed = val === 'true' ? true : val === 'false' ? false : val;
    } else {
      if (val.indexOf('0x') !== -1) {
        //support hexa decimal
        parsed = Number.parseInt(val, 16);
      } else if (val.indexOf('.') !== -1) {
        parsed = Number.parseFloat(val);
        val = val.replace(/\.?0+$/, "");
      } else {
        parsed = Number.parseInt(val, 10);
      }
      if (parseTrueNumberOnly) {
        parsed = String(parsed) === val ? parsed : val;
      }
    }
    return parsed;
  } else {
    if (util.isExist(val)) {
      return val;
    } else {
      return '';
    }
  }
}

//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

function buildAttributesMap(attrStr, options) {
  if (!options.ignoreAttributes && typeof attrStr === 'string') {
    attrStr = attrStr.replace(/\r?\n/g, ' ');
    //attrStr = attrStr || attrStr.trim();

    const matches = util.getAllMatches(attrStr, attrsRegx);
    const len = matches.length; //don't make it inline
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = resolveNameSpace(matches[i][1], options);
      if (attrName.length) {
        if (matches[i][4] !== undefined) {
          if (options.trimValues) {
            matches[i][4] = matches[i][4].trim();
          }
          matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
          attrs[options.attributeNamePrefix + attrName] = parseValue(
            matches[i][4],
            options.parseAttributeValue,
            options.parseTrueNumberOnly
          );
        } else if (options.allowBooleanAttributes) {
          attrs[options.attributeNamePrefix + attrName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (options.attrNodeName) {
      const attrCollection = {};
      attrCollection[options.attrNodeName] = attrs;
      return attrCollection;
    }
    return attrs;
  }
}

const getTraversalObj = function(xmlData, options) {
  xmlData = xmlData.replace(/(\r\n)|\n/, " ");
  options = buildOptions(options, defaultOptions, props);
  const xmlObj = new xmlNode('!xml');
  let currentNode = xmlObj;
  let textData = "";

//function match(xmlData){
  for(let i=0; i< xmlData.length; i++){
    const ch = xmlData[i];
    if(ch === '<'){
      if( xmlData[i+1] === '/') {//Closing Tag
        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.")
        let tagName = xmlData.substring(i+2,closeIndex).trim();

        if(options.ignoreNameSpace){
          const colonIndex = tagName.indexOf(":");
          if(colonIndex !== -1){
            tagName = tagName.substr(colonIndex+1);
          }
        }

        /* if (currentNode.parent) {
          currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue2(tagName, textData , options);
        } */
        if(currentNode){
          if(currentNode.val){
            currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tagName, textData , options);
          }else{
            currentNode.val = processTagValue(tagName, textData , options);
          }
        }

        if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
          currentNode.child = []
          if (currentNode.attrsMap == undefined) { currentNode.attrsMap = {}}
          currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1)
        }
        currentNode = currentNode.parent;
        textData = "";
        i = closeIndex;
      } else if( xmlData[i+1] === '?') {
        i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.")
      } else if(xmlData.substr(i + 1, 3) === '!--') {
        i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.")
      } else if( xmlData.substr(i + 1, 2) === '!D') {
        const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.")
        const tagExp = xmlData.substring(i, closeIndex);
        if(tagExp.indexOf("[") >= 0){
          i = xmlData.indexOf("]>", i) + 1;
        }else{
          i = closeIndex;
        }
      }else if(xmlData.substr(i + 1, 2) === '![') {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2
        const tagExp = xmlData.substring(i + 9,closeIndex);

        //considerations
        //1. CDATA will always have parent node
        //2. A tag with CDATA is not a leaf node so it's value would be string type.
        if(textData){
          currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData , options);
          textData = "";
        }

        if (options.cdataTagName) {
          //add cdata node
          const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
          currentNode.addChild(childNode);
          //for backtracking
          currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar;
          //add rest value to parent node
          if (tagExp) {
            childNode.val = tagExp;
          }
        } else {
          currentNode.val = (currentNode.val || '') + (tagExp || '');
        }

        i = closeIndex + 2;
      }else {//Opening tag
        const result = closingIndexForOpeningTag(xmlData, i+1)
        let tagExp = result.data;
        const closeIndex = result.index;
        const separatorIndex = tagExp.indexOf(" ");
        let tagName = tagExp;
        if(separatorIndex !== -1){
          tagName = tagExp.substr(0, separatorIndex).trimRight();
          tagExp = tagExp.substr(separatorIndex + 1);
        }

        if(options.ignoreNameSpace){
          const colonIndex = tagName.indexOf(":");
          if(colonIndex !== -1){
            tagName = tagName.substr(colonIndex+1);
          }
        }

        //save text to parent node
        if (currentNode && textData) {
          if(currentNode.tagname !== '!xml'){
            currentNode.val = util.getValue(currentNode.val) + '' + processTagValue( currentNode.tagname, textData, options);
          }
        }

        if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){//selfClosing tag

          if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
            tagName = tagName.substr(0, tagName.length - 1);
            tagExp = tagName;
          }else{
            tagExp = tagExp.substr(0, tagExp.length - 1);
          }

          const childNode = new xmlNode(tagName, currentNode, '');
          if(tagName !== tagExp){
            childNode.attrsMap = buildAttributesMap(tagExp, options);
          }
          currentNode.addChild(childNode);
        }else{//opening tag

          const childNode = new xmlNode( tagName, currentNode );
          if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
            childNode.startIndex=closeIndex;
          }
          if(tagName !== tagExp){
            childNode.attrsMap = buildAttributesMap(tagExp, options);
          }
          currentNode.addChild(childNode);
          currentNode = childNode;
        }
        textData = "";
        i = closeIndex;
      }
    }else{
      textData += xmlData[i];
    }
  }
  return xmlObj;
}

function closingIndexForOpeningTag(data, i){
  let attrBoundary;
  let tagExp = "";
  for (let index = i; index < data.length; index++) {
    let ch = data[index];
    if (attrBoundary) {
        if (ch === attrBoundary) attrBoundary = "";//reset
    } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
    } else if (ch === '>') {
        return {
          data: tagExp,
          index: index
        }
    } else if (ch === '\t') {
      ch = " "
    }
    tagExp += ch;
  }
}

function findClosingIndex(xmlData, str, i, errMsg){
  const closingIndex = xmlData.indexOf(str, i);
  if(closingIndex === -1){
    throw new Error(errMsg)
  }else{
    return closingIndex + str.length - 1;
  }
}

exports.getTraversalObj = getTraversalObj;


/***/ }),

/***/ 1133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debug;
try {
  /* eslint global-require: off */
  debug = __webpack_require__(8237)("follow-redirects");
}
catch (error) {
  debug = function () { /* */ };
}
module.exports = debug;


/***/ }),

/***/ 7707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__(8835);
var URL = url.URL;
var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var Writable = __webpack_require__(2413).Writable;
var assert = __webpack_require__(2357);
var debug = __webpack_require__(1133);

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  if (callback) {
    this.once("timeout", callback);
  }

  if (this.socket) {
    startTimer(this, msecs);
  }
  else {
    var self = this;
    this._currentRequest.once("socket", function () {
      startTimer(self, msecs);
    });
  }

  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

function startTimer(request, msecs) {
  clearTimeout(request._timeout);
  request._timeout = setTimeout(function () {
    request.emit("timeout");
  }, msecs);
}

function clearTimer() {
  clearTimeout(this._timeout);
}

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    this._currentRequest.removeAllListeners();
    this._currentRequest.on("error", noop);
    this._currentRequest.abort();
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (input, options, callback) {
      var request = wrappedProtocol.request(input, options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ 351:
/***/ ((module) => {

"use strict";

// Call this function in a another function to find out the file from
// which that function was called from. (Inspects the v8 stack trace)
//
// Inspired by http://stackoverflow.com/questions/13227489
module.exports = function getCallerFile(position) {
    if (position === void 0) { position = 2; }
    if (position >= Error.stackTraceLimit) {
        throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`');
    }
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;
    if (stack !== null && typeof stack === 'object') {
        // stack[0] holds this file
        // stack[1] holds where this function was called
        // stack[2] holds the file we're interested in
        return stack[position] ? stack[position].getFileName() : undefined;
    }
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1621:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 4882:
/***/ ((module) => {

"use strict";
/* eslint-disable yoda */


const isFullwidthCodePoint = codePoint => {
	if (Number.isNaN(codePoint)) {
		return false;
	}

	// Code points are derived from:
	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
	if (
		codePoint >= 0x1100 && (
			codePoint <= 0x115F || // Hangul Jamo
			codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
			codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
			// CJK Radicals Supplement .. Enclosed CJK Letters and Months
			(0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
			// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
			(0x3250 <= codePoint && codePoint <= 0x4DBF) ||
			// CJK Unified Ideographs .. Yi Radicals
			(0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
			// Hangul Jamo Extended-A
			(0xA960 <= codePoint && codePoint <= 0xA97C) ||
			// Hangul Syllables
			(0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
			// CJK Compatibility Ideographs
			(0xF900 <= codePoint && codePoint <= 0xFAFF) ||
			// Vertical Forms
			(0xFE10 <= codePoint && codePoint <= 0xFE19) ||
			// CJK Compatibility Forms .. Small Form Variants
			(0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
			// Halfwidth and Fullwidth Forms
			(0xFF01 <= codePoint && codePoint <= 0xFF60) ||
			(0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
			// Kana Supplement
			(0x1B000 <= codePoint && codePoint <= 0x1B001) ||
			// Enclosed Ideographic Supplement
			(0x1F200 <= codePoint && codePoint <= 0x1F251) ||
			// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
			(0x20000 <= codePoint && codePoint <= 0x3FFFD)
		)
	) {
		return true;
	}

	return false;
};

module.exports = isFullwidthCodePoint;
module.exports.default = isFullwidthCodePoint;


/***/ }),

/***/ 6186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(5622);
var fs = __webpack_require__(5747);
var _0777 = parseInt('0777', 8);

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

function mkdirP (p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    }
    else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777
    }
    if (!made) made = null;
    
    var cb = f || function () {};
    p = path.resolve(p);
    
    xfs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                if (path.dirname(p) === p) return cb(er);
                mkdirP(path.dirname(p), opts, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, opts, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                xfs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, opts, made) {
    if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777
    }
    if (!made) made = null;

    p = path.resolve(p);

    try {
        xfs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), opts, made);
                sync(p, opts, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = xfs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};


/***/ }),

/***/ 900:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 9200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var fs = __webpack_require__(5747),
  join = __webpack_require__(5622).join,
  resolve = __webpack_require__(5622).resolve,
  dirname = __webpack_require__(5622).dirname,
  defaultOptions = {
    extensions: ['js', 'json', 'coffee'],
    recurse: true,
    rename: function (name) {
      return name;
    },
    visit: function (obj) {
      return obj;
    }
  };

function checkFileInclusion(path, filename, options) {
  return (
    // verify file has valid extension
    (new RegExp('\\.(' + options.extensions.join('|') + ')$', 'i').test(filename)) &&

    // if options.include is a RegExp, evaluate it and make sure the path passes
    !(options.include && options.include instanceof RegExp && !options.include.test(path)) &&

    // if options.include is a function, evaluate it and make sure the path passes
    !(options.include && typeof options.include === 'function' && !options.include(path, filename)) &&

    // if options.exclude is a RegExp, evaluate it and make sure the path doesn't pass
    !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) &&

    // if options.exclude is a function, evaluate it and make sure the path doesn't pass
    !(options.exclude && typeof options.exclude === 'function' && options.exclude(path, filename))
  );
}

function requireDirectory(m, path, options) {
  var retval = {};

  // path is optional
  if (path && !options && typeof path !== 'string') {
    options = path;
    path = null;
  }

  // default options
  options = options || {};
  for (var prop in defaultOptions) {
    if (typeof options[prop] === 'undefined') {
      options[prop] = defaultOptions[prop];
    }
  }

  // if no path was passed in, assume the equivelant of __dirname from caller
  // otherwise, resolve path relative to the equivalent of __dirname
  path = !path ? dirname(m.filename) : resolve(dirname(m.filename), path);

  // get the path of each file in specified directory, append to current tree node, recurse
  fs.readdirSync(path).forEach(function (filename) {
    var joined = join(path, filename),
      files,
      key,
      obj;

    if (fs.statSync(joined).isDirectory() && options.recurse) {
      // this node is a directory; recurse
      files = requireDirectory(m, joined, options);
      // exclude empty directories
      if (Object.keys(files).length) {
        retval[options.rename(filename, joined, filename)] = files;
      }
    } else {
      if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
        // hash node key shouldn't include file extension
        key = filename.substring(0, filename.lastIndexOf('.'));
        obj = m.require(joined);
        retval[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj;
      }
    }
  });

  return retval;
}

module.exports = requireDirectory;
module.exports.defaults = defaultOptions;


/***/ }),

/***/ 2577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const stripAnsi = __webpack_require__(5591);
const isFullwidthCodePoint = __webpack_require__(4882);
const emojiRegex = __webpack_require__(8212);

const stringWidth = string => {
	string = string.replace(emojiRegex(), '  ');

	if (typeof string !== 'string' || string.length === 0) {
		return 0;
	}

	string = stripAnsi(string);

	let width = 0;

	for (let i = 0; i < string.length; i++) {
		const code = string.codePointAt(i);

		// Ignore control characters
		if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
			continue;
		}

		// Ignore combining characters
		if (code >= 0x300 && code <= 0x36F) {
			continue;
		}

		// Surrogates
		if (code > 0xFFFF) {
			i++;
		}

		width += isFullwidthCodePoint(code) ? 2 : 1;
	}

	return width;
};

module.exports = stringWidth;
// TODO: remove this in the next major version
module.exports.default = stringWidth;


/***/ }),

/***/ 5591:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const ansiRegex = __webpack_require__(5063);

module.exports = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;


/***/ }),

/***/ 9318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(2087);
const tty = __webpack_require__(3867);
const hasFlag = __webpack_require__(1621);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 8588:
/***/ ((module) => {

module.exports = Traverse;
function Traverse (obj) {
    if (!(this instanceof Traverse)) return new Traverse(obj);
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!Object.hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!Object.hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.deepEqual = function (obj) {
    if (arguments.length !== 1) {
        throw new Error(
            'deepEqual requires exactly one object to compare against'
        );
    }
    
    var equal = true;
    var node = obj;
    
    this.forEach(function (y) {
        var notEqual = (function () {
            equal = false;
            //this.stop();
            return undefined;
        }).bind(this);
        
        //if (node === undefined || node === null) return notEqual();
        
        if (!this.isRoot) {
        /*
            if (!Object.hasOwnProperty.call(node, this.key)) {
                return notEqual();
            }
        */
            if (typeof node !== 'object') return notEqual();
            node = node[this.key];
        }
        
        var x = node;
        
        this.post(function () {
            node = x;
        });
        
        var toS = function (o) {
            return Object.prototype.toString.call(o);
        };
        
        if (this.circular) {
            if (Traverse(obj).get(this.circular.path) !== x) notEqual();
        }
        else if (typeof x !== typeof y) {
            notEqual();
        }
        else if (x === null || y === null || x === undefined || y === undefined) {
            if (x !== y) notEqual();
        }
        else if (x.__proto__ !== y.__proto__) {
            notEqual();
        }
        else if (x === y) {
            // nop
        }
        else if (typeof x === 'function') {
            if (x instanceof RegExp) {
                // both regexps on account of the __proto__ check
                if (x.toString() != y.toString()) notEqual();
            }
            else if (x !== y) notEqual();
        }
        else if (typeof x === 'object') {
            if (toS(y) === '[object Arguments]'
            || toS(x) === '[object Arguments]') {
                if (toS(x) !== toS(y)) {
                    notEqual();
                }
            }
            else if (x instanceof Date || y instanceof Date) {
                if (!(x instanceof Date) || !(y instanceof Date)
                || x.getTime() !== y.getTime()) {
                    notEqual();
                }
            }
            else {
                var kx = Object.keys(x);
                var ky = Object.keys(y);
                if (kx.length !== ky.length) return notEqual();
                for (var i = 0; i < kx.length; i++) {
                    var k = kx[i];
                    if (!Object.hasOwnProperty.call(y, k)) {
                        notEqual();
                    }
                }
            }
        }
    });
    
    return equal;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            Object.keys(src).forEach(function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents.slice(-1)[0],
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
            },
            'delete' : function () {
                delete state.parent.node[state.key];
            },
            remove : function () {
                if (Array.isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
            },
            before : function (f) { modifiers.before = f },
            after : function (f) { modifiers.after = f },
            pre : function (f) { modifiers.pre = f },
            post : function (f) { modifiers.post = f },
            stop : function () { alive = false }
        };
        
        if (!alive) return state;
        
        if (typeof node === 'object' && node !== null) {
            state.isLeaf = Object.keys(node).length == 0;
            
            for (var i = 0; i < parents.length; i++) {
                if (parents[i].node_ === node_) {
                    state.circular = parents[i];
                    break;
                }
            }
        }
        else {
            state.isLeaf = true;
        }
        
        state.notLeaf = !state.isLeaf;
        state.notRoot = !state.isRoot;
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            var keys = Object.keys(state.node);
            keys.forEach(function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && Object.hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

Object.keys(Traverse.prototype).forEach(function (key) {
    Traverse[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = Traverse(obj);
        return t[key].apply(t, args);
    };
});

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (Array.isArray(src)) {
            dst = [];
        }
        else if (src instanceof Date) {
            dst = new Date(src);
        }
        else if (src instanceof Boolean) {
            dst = new Boolean(src);
        }
        else if (src instanceof Number) {
            dst = new Number(src);
        }
        else if (src instanceof String) {
            dst = new String(src);
        }
        else {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        
        Object.keys(src).forEach(function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}


/***/ }),

/***/ 4140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stream = __webpack_require__(2413);
var inherits = __webpack_require__(1669).inherits;

function Entry() {
    if (!(this instanceof Entry)) {
        return new Entry();
    }

    stream.PassThrough.call(this);

    this.path = null;
    this.type = null;
    this.isDirectory = false;
}

inherits(Entry, stream.PassThrough);

Entry.prototype.autodrain = function () {
    return this.pipe(new stream.Transform({ transform: function (d, e, cb) { cb(); } }));
}

module.exports = Entry;

/***/ }),

/***/ 1202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(5747);
var path = __webpack_require__(5622);
var util = __webpack_require__(1669);
var mkdirp = __webpack_require__(6186);
var Transform = __webpack_require__(2413).Transform;
var UnzipStream = __webpack_require__(6853);

function Extract (opts) {
    if (!(this instanceof Extract))
    return new Extract(opts);

    Transform.call(this);

    this.opts = opts || {};
    this.unzipStream = new UnzipStream(this.opts);
    this.unfinishedEntries = 0;
    this.afterFlushWait = false;
    this.createdDirectories = {};

    var self = this;
    this.unzipStream.on('entry', this._processEntry.bind(this));
    this.unzipStream.on('error', function(error) {
        self.emit('error', error);
    });
}

util.inherits(Extract, Transform);

Extract.prototype._transform = function (chunk, encoding, cb) {
    this.unzipStream.write(chunk, encoding, cb);
}

Extract.prototype._flush = function (cb) {
    var self = this;

    var allDone = function() {
        process.nextTick(function() { self.emit('close'); });
        cb();
    }

    this.unzipStream.end(function() {
        if (self.unfinishedEntries > 0) {
            self.afterFlushWait = true;
            return self.on('await-finished', allDone);
        }
        allDone();
    });
}

Extract.prototype._processEntry = function (entry) {
    var self = this;
    var destPath = path.join(this.opts.path, entry.path);
    var directory = entry.isDirectory ? destPath : path.dirname(destPath);

    this.unfinishedEntries++;

    var writeFileFn = function() {
        var pipedStream = fs.createWriteStream(destPath);

        pipedStream.on('close', function() {
            self.unfinishedEntries--;
            self._notifyAwaiter();
        });
        pipedStream.on('error', function (error) {
            self.emit('error', error);
        });
        entry.pipe(pipedStream);
    }

    if (this.createdDirectories[directory] || directory === '.') {
        return writeFileFn();
    }

    // FIXME: calls to mkdirp can still be duplicated
    mkdirp(directory, function(err) {
        if (err) return self.emit('error', err);

        self.createdDirectories[directory] = true;

        if (entry.isDirectory) {
            self.unfinishedEntries--;
            self._notifyAwaiter();
            return;
        }

        writeFileFn();
    });
}

Extract.prototype._notifyAwaiter = function() {
    if (this.afterFlushWait && this.unfinishedEntries === 0) {
        this.emit('await-finished');
        this.afterFlushWait = false;
    }
}

module.exports = Extract;

/***/ }),

/***/ 5115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Transform = __webpack_require__(2413).Transform;
var util = __webpack_require__(1669);

function MatcherStream(patternDesc, matchFn) {
    if (!(this instanceof MatcherStream)) {
        return new MatcherStream();
    }

    Transform.call(this);

    var p = typeof patternDesc === 'object' ? patternDesc.pattern : patternDesc;

    this.pattern = Buffer.isBuffer(p) ? p : Buffer.from(p);
    this.requiredLength = this.pattern.length;
    if (patternDesc.requiredExtraSize) this.requiredLength += patternDesc.requiredExtraSize;

    this.data = new Buffer('');
    this.bytesSoFar = 0;

    this.matchFn = matchFn;
}

util.inherits(MatcherStream, Transform);

MatcherStream.prototype.checkDataChunk = function (ignoreMatchZero) {
    var enoughData = this.data.length >= this.requiredLength; // strict more than ?
    if (!enoughData) { return; }

    var matchIndex = this.data.indexOf(this.pattern, ignoreMatchZero ? 1 : 0);
    if (matchIndex >= 0 && matchIndex + this.requiredLength > this.data.length) {
        if (matchIndex > 0) {
            var packet = this.data.slice(0, matchIndex);
            this.push(packet);
            this.bytesSoFar += matchIndex;
            this.data = this.data.slice(matchIndex);
        }
        return;
    }

    if (matchIndex === -1) {
        var packetLen = this.data.length - this.requiredLength + 1;

        var packet = this.data.slice(0, packetLen);
        this.push(packet);
        this.bytesSoFar += packetLen;
        this.data = this.data.slice(packetLen);
        return;
    }

    // found match
    if (matchIndex > 0) {
        var packet = this.data.slice(0, matchIndex);
        this.data = this.data.slice(matchIndex);
        this.push(packet);
        this.bytesSoFar += matchIndex;
    }

    var finished = this.matchFn ? this.matchFn(this.data, this.bytesSoFar) : true;
    if (finished) {
        this.data = new Buffer('');
        return;
    }

    return true;
}

MatcherStream.prototype._transform = function (chunk, encoding, cb) {
    this.data = Buffer.concat([this.data, chunk]);

    var firstIteration = true;
    while (this.checkDataChunk(!firstIteration)) {
        firstIteration = false;
    }

    cb();
}

MatcherStream.prototype._flush = function (cb) {
    if (this.data.length > 0) {
        var firstIteration = true;
        while (this.checkDataChunk(!firstIteration)) {
            firstIteration = false;
        }
    }

    if (this.data.length > 0) {
        this.push(this.data);
        this.data = null;
    }

    cb();
}

module.exports = MatcherStream;

/***/ }),

/***/ 3935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Transform = __webpack_require__(2413).Transform;
var util = __webpack_require__(1669);
var UnzipStream = __webpack_require__(6853);

function ParserStream(opts) {
    if (!(this instanceof ParserStream)) {
        return new ParserStream(opts);
    }

    var transformOpts = opts || {};
    Transform.call(this, { readableObjectMode: true });

    this.opts = opts || {};
    this.unzipStream = new UnzipStream(this.opts);

    var self = this;
    this.unzipStream.on('entry', function(entry) {
        self.push(entry);
    });
    this.unzipStream.on('error', function(error) {
        self.emit('error', error);
    });
}

util.inherits(ParserStream, Transform);

ParserStream.prototype._transform = function (chunk, encoding, cb) {
    this.unzipStream.write(chunk, encoding, cb);
}

ParserStream.prototype._flush = function (cb) {
    var self = this;
    this.unzipStream.end(function() {
        process.nextTick(function() { self.emit('close'); });
        cb();
    });
}

ParserStream.prototype.on = function(eventName, fn) {
    if (eventName === 'entry') {
        return Transform.prototype.on.call(this, 'data', fn);
    }
    return Transform.prototype.on.call(this, eventName, fn);
}

ParserStream.prototype.drainAll = function () {
    this.unzipStream.drainAll();
    return this.pipe(new Transform({ objectMode: true, transform: function (d, e, cb) { cb(); } }));
}

module.exports = ParserStream;


/***/ }),

/***/ 6853:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var binary = __webpack_require__(6474);
var stream = __webpack_require__(2413);
var util = __webpack_require__(1669);
var zlib = __webpack_require__(8761);
var MatcherStream = __webpack_require__(5115);
var Entry = __webpack_require__(4140);

const states = {
    STREAM_START:                         0,
    START:                                1,
    LOCAL_FILE_HEADER:                    2,
    LOCAL_FILE_HEADER_SUFFIX:             3,
    FILE_DATA:                            4,
    FILE_DATA_END:                        5,
    DATA_DESCRIPTOR:                      6,
    CENTRAL_DIRECTORY_FILE_HEADER:        7,
    CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX: 8,
    CDIR64_END:                           9,
    CDIR64_END_DATA_SECTOR:               10,
    CDIR64_LOCATOR:                       11,
    CENTRAL_DIRECTORY_END:                12,
    CENTRAL_DIRECTORY_END_COMMENT:        13,
    TRAILING_JUNK:                        14,

    ERROR: 99
}

const FOUR_GIGS = 4294967296;

const SIG_LOCAL_FILE_HEADER  = 0x04034b50;
const SIG_DATA_DESCRIPTOR    = 0x08074b50;
const SIG_CDIR_RECORD        = 0x02014b50;
const SIG_CDIR64_RECORD_END  = 0x06064b50;
const SIG_CDIR64_LOCATOR_END = 0x07064b50;
const SIG_CDIR_RECORD_END    = 0x06054b50;

function UnzipStream(options) {
    if (!(this instanceof UnzipStream)) {
        return new UnzipStream(options);
    }

    stream.Transform.call(this);

    this.options = options || {};
    this.data = new Buffer('');
    this.state = states.STREAM_START;
    this.skippedBytes = 0;
    this.parsedEntity = null;
    this.outStreamInfo = {};
}

util.inherits(UnzipStream, stream.Transform);

UnzipStream.prototype.processDataChunk = function (chunk) {
    var requiredLength;

    switch (this.state) {
        case states.STREAM_START:
        case states.START:
            requiredLength = 4;
            break;
        case states.LOCAL_FILE_HEADER:
            requiredLength = 26;
            break;
        case states.LOCAL_FILE_HEADER_SUFFIX:
            requiredLength = this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength;
            break;
        case states.DATA_DESCRIPTOR:
            requiredLength = 12;
            break;
        case states.CENTRAL_DIRECTORY_FILE_HEADER:
            requiredLength = 42;
            break;
        case states.CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX:
            requiredLength = this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength + this.parsedEntity.fileCommentLength;
            break;
        case states.CDIR64_END:
            requiredLength = 52;
            break;
        case states.CDIR64_END_DATA_SECTOR:
            requiredLength = this.parsedEntity.centralDirectoryRecordSize - 44;
            break;
        case states.CDIR64_LOCATOR:
            requiredLength = 16;
            break;
        case states.CENTRAL_DIRECTORY_END:
            requiredLength = 18;
            break;
        case states.CENTRAL_DIRECTORY_END_COMMENT:
            requiredLength = this.parsedEntity.commentLength;
            break;
        case states.FILE_DATA:
            return 0;
        case states.FILE_DATA_END:
            return 0;
        case states.TRAILING_JUNK:
            if (this.options.debug) console.log("found", chunk.length, "bytes of TRAILING_JUNK");
            return chunk.length;
        default:
            return chunk.length;
    }

    var chunkLength = chunk.length;
    if (chunkLength < requiredLength) {
        return 0;
    }

    switch (this.state) {
        case states.STREAM_START:
        case states.START:
            var signature = chunk.readUInt32LE(0);
            switch (signature) {
                case SIG_LOCAL_FILE_HEADER:
                    this.state = states.LOCAL_FILE_HEADER;
                    break;
                case SIG_CDIR_RECORD:
                    this.state = states.CENTRAL_DIRECTORY_FILE_HEADER;
                    break;
                case SIG_CDIR64_RECORD_END:
                    this.state = states.CDIR64_END;
                    break;
                case SIG_CDIR64_LOCATOR_END:
                    this.state = states.CDIR64_LOCATOR;
                    break;
                case SIG_CDIR_RECORD_END:
                    this.state = states.CENTRAL_DIRECTORY_END;
                    break;
                default:
                    var isStreamStart = this.state === states.STREAM_START;
                    if (!isStreamStart && (signature & 0xffff) !== 0x4b50 && this.skippedBytes < 26) {
                        // we'll allow a padding of max 28 bytes
                        var remaining = signature;
                        var toSkip = 4;
                        for (var i = 1; i < 4 && remaining !== 0; i++) {
                            remaining = remaining >>> 8;
                            if ((remaining & 0xff) === 0x50) {
                                toSkip = i;
                                break;
                            }
                        }
                        this.skippedBytes += toSkip;
                        if (this.options.debug) console.log('Skipped', this.skippedBytes, 'bytes');
                        return toSkip;
                    }
                    this.state = states.ERROR;
                    var errMsg = isStreamStart ? "Not a valid zip file" : "Invalid signature in zip file";
                    if (this.options.debug) {
                        var sig = chunk.readUInt32LE(0);
                        var asString;
                        try { asString = chunk.slice(0, 4).toString(); } catch (e) {}
                        console.log("Unexpected signature in zip file: 0x" + sig.toString(16), '"' + asString + '", skipped', this.skippedBytes, 'bytes');
                    }
                    this.emit("error", new Error(errMsg));
                    return chunk.length;
            }
            this.skippedBytes = 0;
            return requiredLength;

        case states.LOCAL_FILE_HEADER:
            this.parsedEntity = this._readFile(chunk);
            this.state = states.LOCAL_FILE_HEADER_SUFFIX;

            return requiredLength;

        case states.LOCAL_FILE_HEADER_SUFFIX:
            var entry = new Entry();
            var isUtf8 = (this.parsedEntity.flags & 0x800) !== 0;
            entry.path = this._decodeString(chunk.slice(0, this.parsedEntity.fileNameLength), isUtf8);
            var extraDataBuffer = chunk.slice(this.parsedEntity.fileNameLength, this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength);
            var extra = this._readExtraFields(extraDataBuffer);
            if (extra && extra.parsed) {
                if (extra.parsed.path && !isUtf8) {
                    entry.path = extra.parsed.path;
                }
                if (Number.isFinite(extra.parsed.uncompressedSize) && this.parsedEntity.uncompressedSize === FOUR_GIGS-1) {
                    this.parsedEntity.uncompressedSize = extra.parsed.uncompressedSize;
                }
                if (Number.isFinite(extra.parsed.compressedSize) && this.parsedEntity.compressedSize === FOUR_GIGS-1) {
                    this.parsedEntity.compressedSize = extra.parsed.compressedSize;
                }
            }
            this.parsedEntity.extra = extra.parsed || {};

            if (this.options.debug) {
                const debugObj = Object.assign({}, this.parsedEntity, {
                    path: entry.path,
                    flags: '0x' + this.parsedEntity.flags.toString(16),
                    extraFields: extra && extra.debug
                });
                console.log("decoded LOCAL_FILE_HEADER:", JSON.stringify(debugObj, null, 2));
            }
            this._prepareOutStream(this.parsedEntity, entry);

            this.emit("entry", entry);

            this.state = states.FILE_DATA;

            return requiredLength;

        case states.CENTRAL_DIRECTORY_FILE_HEADER:
            this.parsedEntity = this._readCentralDirectoryEntry(chunk);
            this.state = states.CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX;

            return requiredLength;

        case states.CENTRAL_DIRECTORY_FILE_HEADER_SUFFIX:
            // got file name in chunk[0..]
            var isUtf8 = (this.parsedEntity.flags & 0x800) !== 0;
            var path = this._decodeString(chunk.slice(0, this.parsedEntity.fileNameLength), isUtf8);
            var extraDataBuffer = chunk.slice(this.parsedEntity.fileNameLength, this.parsedEntity.fileNameLength + this.parsedEntity.extraFieldLength);
            var extra = this._readExtraFields(extraDataBuffer);
            if (extra && extra.parsed && extra.parsed.path && !isUtf8) {
                path = extra.parsed.path;
            }
            this.parsedEntity.extra = extra.parsed;

            var isUnix = ((this.parsedEntity.versionMadeBy & 0xff00) >> 8) === 3;
            var unixAttrs, isSymlink;
            if (isUnix) {
                unixAttrs = this.parsedEntity.externalFileAttributes >>> 16;
                var fileType = unixAttrs >>> 12;
                isSymlink = (fileType & 0o12) === 0o12; // __S_IFLNK
            }
            if (this.options.debug) {
                const debugObj = Object.assign({}, this.parsedEntity, {
                    path: path,
                    flags: '0x' + this.parsedEntity.flags.toString(16),
                    unixAttrs: unixAttrs && '0' + unixAttrs.toString(8),
                    isSymlink: isSymlink,
                    extraFields: extra.debug,
                });
                console.log("decoded CENTRAL_DIRECTORY_FILE_HEADER:", JSON.stringify(debugObj, null, 2));
            }
            this.state = states.START;

            return requiredLength;

        case states.CDIR64_END:
            this.parsedEntity = this._readEndOfCentralDirectory64(chunk);
            if (this.options.debug) {
                console.log("decoded CDIR64_END_RECORD:", this.parsedEntity);
            }
            this.state = states.CDIR64_END_DATA_SECTOR;

            return requiredLength;

        case states.CDIR64_END_DATA_SECTOR:
            this.state = states.START;

            return requiredLength;

        case states.CDIR64_LOCATOR:
            // ignore, nothing interesting
            this.state = states.START;

            return requiredLength;

        case states.CENTRAL_DIRECTORY_END:
            this.parsedEntity = this._readEndOfCentralDirectory(chunk);
            if (this.options.debug) {
                console.log("decoded CENTRAL_DIRECTORY_END:", this.parsedEntity);
            }
            this.state = states.CENTRAL_DIRECTORY_END_COMMENT;

            return requiredLength;

        case states.CENTRAL_DIRECTORY_END_COMMENT:
            if (this.options.debug) {
                console.log("decoded CENTRAL_DIRECTORY_END_COMMENT:", chunk.slice(0, requiredLength).toString());
            }
            this.state = states.TRAILING_JUNK;

            return requiredLength;

        case states.ERROR:
            return chunk.length; // discard

        default:
            console.log("didn't handle state #", this.state, "discarding");
            return chunk.length;
    }
}

UnzipStream.prototype._prepareOutStream = function (vars, entry) {
    var self = this;

    var isDirectory = vars.uncompressedSize === 0 && /[\/\\]$/.test(entry.path);
    // protect against malicious zip files which want to extract to parent dirs
    entry.path = entry.path.replace(/^([/\\]*[.]+[/\\]+)*[/\\]*/, "");
    entry.type = isDirectory ? 'Directory' : 'File';
    entry.isDirectory = isDirectory;

    var fileSizeKnown = !(vars.flags & 0x08);
    if (fileSizeKnown) {
        entry.size = vars.uncompressedSize;
    }

    var isVersionSupported = vars.versionsNeededToExtract <= 45;

    this.outStreamInfo = {
        stream: null,
        limit: fileSizeKnown ? vars.compressedSize : -1,
        written: 0
    };

    if (!fileSizeKnown) {
        var pattern = new Buffer(4);
        pattern.writeUInt32LE(SIG_DATA_DESCRIPTOR, 0);
        var zip64Mode = vars.extra.zip64Mode;
        var extraSize = zip64Mode ? 20 : 12;
        var searchPattern = {
            pattern: pattern,
            requiredExtraSize: extraSize
        }

        var matcherStream = new MatcherStream(searchPattern, function (matchedChunk, sizeSoFar) {
            var vars = self._readDataDescriptor(matchedChunk, zip64Mode);

            var compressedSizeMatches = vars.compressedSize === sizeSoFar;
            // let's also deal with archives with 4GiB+ files without zip64
            if (!zip64Mode && !compressedSizeMatches && sizeSoFar >= FOUR_GIGS) {
                var overflown = sizeSoFar - FOUR_GIGS;
                while (overflown >= 0) {
                    compressedSizeMatches = vars.compressedSize === overflown;
                    if (compressedSizeMatches) break;
                    overflown -= FOUR_GIGS;
                }
            }
            if (!compressedSizeMatches) { return; }

            self.state = states.FILE_DATA_END;
            var sliceOffset = zip64Mode ? 24 : 16;
            if (self.data.length > 0) {
                self.data = Buffer.concat([matchedChunk.slice(sliceOffset), self.data]);
            } else {
                self.data = matchedChunk.slice(sliceOffset);
            }

            return true;
        });
        this.outStreamInfo.stream = matcherStream;
    } else {
        this.outStreamInfo.stream = new stream.PassThrough();
    }

    var isEncrypted = (vars.flags & 0x01) || (vars.flags & 0x40);
    if (isEncrypted || !isVersionSupported) {
        var message = isEncrypted ? "Encrypted files are not supported!"
            : ("Zip version " + Math.floor(vars.versionsNeededToExtract / 10) + "." + vars.versionsNeededToExtract % 10 + " is not supported");

        entry.skip = true;
        setImmediate(() => {
            entry.emit("error", new Error(message));
        });

        // try to skip over this entry
        this.outStreamInfo.stream.pipe(new Entry().autodrain());
        return;
    }

    var isCompressed = vars.compressionMethod > 0;
    if (isCompressed) {
        var inflater = zlib.createInflateRaw();
        inflater.on('error', function (err) {
            self.state = states.ERROR;
            self.emit('error', err);
        });
        this.outStreamInfo.stream.pipe(inflater).pipe(entry);
    } else {
        this.outStreamInfo.stream.pipe(entry);
    }

    if (this._drainAllEntries) {
        entry.autodrain();
    }
}

UnzipStream.prototype._readFile = function (data) {
    var vars = binary.parse(data)
        .word16lu('versionsNeededToExtract')
        .word16lu('flags')
        .word16lu('compressionMethod')
        .word16lu('lastModifiedTime')
        .word16lu('lastModifiedDate')
        .word32lu('crc32')
        .word32lu('compressedSize')
        .word32lu('uncompressedSize')
        .word16lu('fileNameLength')
        .word16lu('extraFieldLength')
        .vars;

    return vars;
}

UnzipStream.prototype._readExtraFields = function (data) {
    var extra = {};
    var result = { parsed: extra };
    if (this.options.debug) {
        result.debug = [];
    }
    var index = 0;
    while (index < data.length) {
        var vars = binary.parse(data)
            .skip(index)
            .word16lu('extraId')
            .word16lu('extraSize')
            .vars;

        index += 4;

        var fieldType = undefined;
        switch (vars.extraId) {
            case 0x0001:
                fieldType = "Zip64 extended information extra field";
                var z64vars = binary.parse(data.slice(index, index+vars.extraSize))
                    .word64lu('uncompressedSize')
                    .word64lu('compressedSize')
                    .word64lu('offsetToLocalHeader')
                    .word32lu('diskStartNumber')
                    .vars;
                if (z64vars.uncompressedSize !== null) {
                    extra.uncompressedSize = z64vars.uncompressedSize;
                }
                if (z64vars.compressedSize !== null) {
                    extra.compressedSize = z64vars.compressedSize;
                }
                extra.zip64Mode = true;
                break;
            case 0x000a:
                fieldType = "NTFS extra field";
                break;
            case 0x5455:
                fieldType = "extended timestamp";
                var timestampFields = data.readUInt8(index);
                var offset = 1;
                if (vars.extraSize >= offset + 4 && timestampFields & 1) {
                    extra.mtime = new Date(data.readUInt32LE(index + offset) * 1000);
                    offset += 4;
                }
                if (vars.extraSize >= offset + 4 && timestampFields & 2) {
                    extra.atime = new Date(data.readUInt32LE(index + offset) * 1000);
                    offset += 4;
                }
                if (vars.extraSize >= offset + 4 && timestampFields & 4) {
                    extra.ctime = new Date(data.readUInt32LE(index + offset) * 1000);
                }
                break;
            case 0x7075:
                fieldType = "Info-ZIP Unicode Path Extra Field";
                var fieldVer = data.readUInt8(index);
                if (fieldVer === 1) {
                    var offset = 1;
                    // TODO: should be checking this against our path buffer
                    var nameCrc32 = data.readUInt32LE(index + offset);
                    offset += 4;
                    var pathBuffer = data.slice(index + offset);
                    extra.path = pathBuffer.toString();
                }
                break;
            case 0x000d:
            case 0x5855:
                fieldType = vars.extraId === 0x000d ? "PKWARE Unix" : "Info-ZIP UNIX (type 1)";
                var offset = 0;
                if (vars.extraSize >= 8) {
                    var atime = new Date(data.readUInt32LE(index + offset) * 1000);
                    offset += 4;
                    var mtime = new Date(data.readUInt32LE(index + offset) * 1000);
                    offset += 4;
                    extra.atime = atime;
                    extra.mtime = mtime;

                    if (vars.extraSize >= 12) {
                        var uid = data.readUInt16LE(index + offset);
                        offset += 2;
                        var gid = data.readUInt16LE(index + offset);
                        offset += 2;
                        extra.uid = uid;
                        extra.gid = gid;
                    }
                }
                break;
            case 0x7855:
                fieldType = "Info-ZIP UNIX (type 2)";
                var offset = 0;
                if (vars.extraSize >= 4) {
                    var uid = data.readUInt16LE(index + offset);
                    offset += 2;
                    var gid = data.readUInt16LE(index + offset);
                    offset += 2;
                    extra.uid = uid;
                    extra.gid = gid;
                }
                break;
            case 0x7875:
                fieldType = "Info-ZIP New Unix";
                var offset = 0;
                var extraVer = data.readUInt8(index);
                offset += 1;
                if (extraVer === 1) {
                    var uidSize = data.readUInt8(index + offset);
                    offset += 1;
                    if (uidSize <= 6) {
                        extra.uid = data.readUIntLE(index + offset, uidSize);
                    }
                    offset += uidSize;

                    var gidSize = data.readUInt8(index + offset);
                    offset += 1;
                    if (gidSize <= 6) {
                        extra.gid = data.readUIntLE(index + offset, gidSize);
                    }
                }
                break;
            case 0x756e:
                fieldType = "ASi Unix";
                var offset = 0;
                if (vars.extraSize >= 14) {
                    var crc = data.readUInt32LE(index + offset);
                    offset += 4;
                    var mode = data.readUInt16LE(index + offset);
                    offset += 2;
                    var sizdev = data.readUInt32LE(index + offset);
                    offset += 4;
                    var uid = data.readUInt16LE(index + offset);
                    offset += 2;
                    var gid = data.readUInt16LE(index + offset);
                    offset += 2;
                    extra.mode = mode;
                    extra.uid = uid;
                    extra.gid = gid;
                    if (vars.extraSize > 14) {
                        var start = index + offset;
                        var end = index + vars.extraSize - 14;
                        var symlinkName = this._decodeString(data.slice(start, end));
                        extra.symlink = symlinkName;
                    }
                }
                break;
        }

        if (this.options.debug) {
            result.debug.push({
                extraId: '0x' + vars.extraId.toString(16),
                description: fieldType,
                data: data.slice(index, index + vars.extraSize).inspect()
            });
        }

        index += vars.extraSize;
    }

    return result;
}

UnzipStream.prototype._readDataDescriptor = function (data, zip64Mode) {
    if (zip64Mode) {
        var vars = binary.parse(data)
            .word32lu('dataDescriptorSignature')
            .word32lu('crc32')
            .word64lu('compressedSize')
            .word64lu('uncompressedSize')
            .vars;

        return vars;
    }

    var vars = binary.parse(data)
        .word32lu('dataDescriptorSignature')
        .word32lu('crc32')
        .word32lu('compressedSize')
        .word32lu('uncompressedSize')
        .vars;

    return vars;
}

UnzipStream.prototype._readCentralDirectoryEntry = function (data) {
    var vars = binary.parse(data)
        .word16lu('versionMadeBy')
        .word16lu('versionsNeededToExtract')
        .word16lu('flags')
        .word16lu('compressionMethod')
        .word16lu('lastModifiedTime')
        .word16lu('lastModifiedDate')
        .word32lu('crc32')
        .word32lu('compressedSize')
        .word32lu('uncompressedSize')
        .word16lu('fileNameLength')
        .word16lu('extraFieldLength')
        .word16lu('fileCommentLength')
        .word16lu('diskNumber')
        .word16lu('internalFileAttributes')
        .word32lu('externalFileAttributes')
        .word32lu('offsetToLocalFileHeader')
        .vars;

    return vars;
}

UnzipStream.prototype._readEndOfCentralDirectory64 = function (data) {
    var vars = binary.parse(data)
        .word64lu('centralDirectoryRecordSize')
        .word16lu('versionMadeBy')
        .word16lu('versionsNeededToExtract')
        .word32lu('diskNumber')
        .word32lu('diskNumberWithCentralDirectoryStart')
        .word64lu('centralDirectoryEntries')
        .word64lu('totalCentralDirectoryEntries')
        .word64lu('sizeOfCentralDirectory')
        .word64lu('offsetToStartOfCentralDirectory')
        .vars;

    return vars;
}

UnzipStream.prototype._readEndOfCentralDirectory = function (data) {
    var vars = binary.parse(data)
        .word16lu('diskNumber')
        .word16lu('diskStart')
        .word16lu('centralDirectoryEntries')
        .word16lu('totalCentralDirectoryEntries')
        .word32lu('sizeOfCentralDirectory')
        .word32lu('offsetToStartOfCentralDirectory')
        .word16lu('commentLength')
        .vars;

    return vars;
}

const cp437 = '\u0000☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ';

UnzipStream.prototype._decodeString = function (buffer, isUtf8) {
    if (isUtf8) {
        return buffer.toString('utf8');
    }
    // allow passing custom decoder
    if (this.options.decodeString) {
        return this.options.decodeString(buffer);
    }
    let result = "";
    for (var i=0; i<buffer.length; i++) {
        result += cp437[buffer[i]];
    }
    return result;
}

UnzipStream.prototype._parseOrOutput = function (encoding, cb) {
    var consume;
    while ((consume = this.processDataChunk(this.data)) > 0) {
        this.data = this.data.slice(consume);
        if (this.data.length === 0) break;
    }

    if (this.state === states.FILE_DATA) {
        if (this.outStreamInfo.limit >= 0) {
            var remaining = this.outStreamInfo.limit - this.outStreamInfo.written;
            var packet;
            if (remaining < this.data.length) {
                packet = this.data.slice(0, remaining);
                this.data = this.data.slice(remaining);
            } else {
                packet = this.data;
                this.data = new Buffer('');
            }

            this.outStreamInfo.written += packet.length;
            if (this.outStreamInfo.limit === this.outStreamInfo.written) {
                this.state = states.START;

                this.outStreamInfo.stream.end(packet, encoding, cb);
            } else {
                this.outStreamInfo.stream.write(packet, encoding, cb);
            }
        } else {
            var packet = this.data;
            this.data = new Buffer('');

            this.outStreamInfo.written += packet.length;
            var outputStream = this.outStreamInfo.stream;
            outputStream.write(packet, encoding, () => {
                if (this.state === states.FILE_DATA_END) {
                    this.state = states.START;
                    return outputStream.end(cb);
                }
                cb();
            });
        }
        // we've written to the output stream, letting that write deal with the callback
        return;
    }

    cb();
}

UnzipStream.prototype.drainAll = function () {
    this._drainAllEntries = true;
}

UnzipStream.prototype._transform = function (chunk, encoding, cb) {
    var self = this;
    if (self.data.length > 0) {
        self.data = Buffer.concat([self.data, chunk]);
    } else {
        self.data = chunk;
    }

    var startDataLength = self.data.length;
    var done = function () {
        if (self.data.length > 0 && self.data.length < startDataLength) {
            startDataLength = self.data.length;
            self._parseOrOutput(encoding, done);
            return;
        }
        cb();
    };
    self._parseOrOutput(encoding, done);
}

UnzipStream.prototype._flush = function (cb) {
    var self = this;
    if (self.data.length > 0) {
        self._parseOrOutput('buffer', function () {
            if (self.data.length > 0) return setImmediate(function () { self._flush(cb); });
            cb();
        });

        return;
    }

    if (self.state === states.FILE_DATA) {
        // uh oh, something went wrong
        return cb(new Error("Stream finished in an invalid state, uncompression failed"));
    }

    setImmediate(cb);
}

module.exports = UnzipStream;


/***/ }),

/***/ 9340:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.Parse = __webpack_require__(3935);
exports.Extract = __webpack_require__(1202);

/***/ }),

/***/ 9824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const stringWidth = __webpack_require__(2577);
const stripAnsi = __webpack_require__(5591);
const ansiStyles = __webpack_require__(2068);

const ESCAPES = new Set([
	'\u001B',
	'\u009B'
]);

const END_CODE = 39;

const ANSI_ESCAPE_BELL = '\u0007';
const ANSI_CSI = '[';
const ANSI_OSC = ']';
const ANSI_SGR_TERMINATOR = 'm';
const ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;

const wrapAnsi = code => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
const wrapAnsiHyperlink = uri => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri}${ANSI_ESCAPE_BELL}`;

// Calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes
const wordLengths = string => string.split(' ').map(character => stringWidth(character));

// Wrap a long word across multiple rows
// Ansi escape codes do not count towards length
const wrapWord = (rows, word, columns) => {
	const characters = [...word];

	let isInsideEscape = false;
	let isInsideLinkEscape = false;
	let visible = stringWidth(stripAnsi(rows[rows.length - 1]));

	for (const [index, character] of characters.entries()) {
		const characterLength = stringWidth(character);

		if (visible + characterLength <= columns) {
			rows[rows.length - 1] += character;
		} else {
			rows.push(character);
			visible = 0;
		}

		if (ESCAPES.has(character)) {
			isInsideEscape = true;
			isInsideLinkEscape = characters.slice(index + 1).join('').startsWith(ANSI_ESCAPE_LINK);
		}

		if (isInsideEscape) {
			if (isInsideLinkEscape) {
				if (character === ANSI_ESCAPE_BELL) {
					isInsideEscape = false;
					isInsideLinkEscape = false;
				}
			} else if (character === ANSI_SGR_TERMINATOR) {
				isInsideEscape = false;
			}

			continue;
		}

		visible += characterLength;

		if (visible === columns && index < characters.length - 1) {
			rows.push('');
			visible = 0;
		}
	}

	// It's possible that the last row we copy over is only
	// ansi escape characters, handle this edge-case
	if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
		rows[rows.length - 2] += rows.pop();
	}
};

// Trims spaces from a string ignoring invisible sequences
const stringVisibleTrimSpacesRight = string => {
	const words = string.split(' ');
	let last = words.length;

	while (last > 0) {
		if (stringWidth(words[last - 1]) > 0) {
			break;
		}

		last--;
	}

	if (last === words.length) {
		return string;
	}

	return words.slice(0, last).join(' ') + words.slice(last).join('');
};

// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode
//
// 'hard' will never allow a string to take up more than columns characters
//
// 'soft' allows long words to expand past the column length
const exec = (string, columns, options = {}) => {
	if (options.trim !== false && string.trim() === '') {
		return '';
	}

	let returnValue = '';
	let escapeCode;
	let escapeUrl;

	const lengths = wordLengths(string);
	let rows = [''];

	for (const [index, word] of string.split(' ').entries()) {
		if (options.trim !== false) {
			rows[rows.length - 1] = rows[rows.length - 1].trimStart();
		}

		let rowLength = stringWidth(rows[rows.length - 1]);

		if (index !== 0) {
			if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
				// If we start with a new word but the current row length equals the length of the columns, add a new row
				rows.push('');
				rowLength = 0;
			}

			if (rowLength > 0 || options.trim === false) {
				rows[rows.length - 1] += ' ';
				rowLength++;
			}
		}

		// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'
		if (options.hard && lengths[index] > columns) {
			const remainingColumns = (columns - rowLength);
			const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
			const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
			if (breaksStartingNextLine < breaksStartingThisLine) {
				rows.push('');
			}

			wrapWord(rows, word, columns);
			continue;
		}

		if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
			if (options.wordWrap === false && rowLength < columns) {
				wrapWord(rows, word, columns);
				continue;
			}

			rows.push('');
		}

		if (rowLength + lengths[index] > columns && options.wordWrap === false) {
			wrapWord(rows, word, columns);
			continue;
		}

		rows[rows.length - 1] += word;
	}

	if (options.trim !== false) {
		rows = rows.map(stringVisibleTrimSpacesRight);
	}

	const pre = [...rows.join('\n')];

	for (const [index, character] of pre.entries()) {
		returnValue += character;

		if (ESCAPES.has(character)) {
			const {groups} = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(pre.slice(index).join('')) || {groups: {}};
			if (groups.code !== undefined) {
				const code = Number.parseFloat(groups.code);
				escapeCode = code === END_CODE ? undefined : code;
			} else if (groups.uri !== undefined) {
				escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
			}
		}

		const code = ansiStyles.codes.get(Number(escapeCode));

		if (pre[index + 1] === '\n') {
			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink('');
			}

			if (escapeCode && code) {
				returnValue += wrapAnsi(code);
			}
		} else if (character === '\n') {
			if (escapeCode && code) {
				returnValue += wrapAnsi(escapeCode);
			}

			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink(escapeUrl);
			}
		}
	}

	return returnValue;
};

// For each newline, invoke the method separately
module.exports = (string, columns, options) => {
	return String(string)
		.normalize()
		.replace(/\r\n/g, '\n')
		.split('\n')
		.map(line => exec(line, columns, options))
		.join('\n');
};


/***/ }),

/***/ 4177:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const axios_1 = __importDefault(__webpack_require__(6545));
const cli_progress_1 = __importDefault(__webpack_require__(7348));
const crypto_1 = __importDefault(__webpack_require__(6417));
const fs_1 = __importDefault(__webpack_require__(5747));
const fast_xml_parser_1 = __webpack_require__(7448);
const path_1 = __importDefault(__webpack_require__(5622));
const unzip_stream_1 = __importDefault(__webpack_require__(9340));
const yargs_1 = __importDefault(__webpack_require__(4139));
const authUtils_1 = __webpack_require__(3396);
const msgUtils_1 = __webpack_require__(7268);
const package_json_1 = __webpack_require__(306);
const getLatestVersion = async (region, model) => {
    return axios_1.default
        .get(`https://fota-cloud-dn.ospserver.net/firmware/${region}/${model}/version.xml`)
        .then((res) => {
        const [pda, csc, modem] = fast_xml_parser_1.parse(res.data).versioninfo.firmware.version.latest.split("/");
        return { pda, csc, modem };
    });
};
const main = async (region, model) => {
    console.log(`
  Model: ${model}
  Region: ${region}`);
    const { pda, csc, modem } = await getLatestVersion(region, model);
    console.log(`
  Latest version:
    PDA: ${pda}
    CSC: ${csc}
    MODEM: ${modem !== "" ? modem : "N/A"}`);
    const nonce = {
        encrypted: "",
        decrypted: "",
    };
    const headers = {
        "User-Agent": "Kies2.0_FUS",
    };
    const handleHeaders = (responseHeaders) => {
        if (responseHeaders.nonce != null) {
            const { Authorization, nonce: newNonce } = authUtils_1.handleAuthRotation(responseHeaders);
            Object.assign(nonce, newNonce);
            headers.Authorization = Authorization;
        }
        const sessionID = responseHeaders["set-cookie"]
            ?.find((cookie) => cookie.startsWith("JSESSIONID"))
            ?.split(";")[0];
        if (sessionID != null) {
            headers.Cookie = sessionID;
        }
    };
    await axios_1.default
        .post("https://neofussvr.sslcs.cdngc.net/NF_DownloadGenerateNonce.do", "", {
        headers: {
            Authorization: 'FUS nonce="", signature="", nc="", type="", realm="", newauth="1"',
            "User-Agent": "Kies2.0_FUS",
            Accept: "application/xml",
        },
    })
        .then((res) => {
        handleHeaders(res.headers);
        return res;
    });
    const { binaryByteSize, binaryDescription, binaryFilename, binaryLogicValue, binaryModelPath, binaryOSVersion, binaryVersion, } = await axios_1.default
        .post("https://neofussvr.sslcs.cdngc.net/NF_DownloadBinaryInform.do", msgUtils_1.getBinaryInformMsg(`${pda}/${csc}/${modem !== "" ? modem : pda}/${pda}`, region, model, nonce.decrypted), {
        headers: {
            ...headers,
            Accept: "application/xml",
            "Content-Type": "application/xml",
        },
    })
        .then((res) => {
        handleHeaders(res.headers);
        return res;
    })
        .then((res) => {
        const parsedInfo = fast_xml_parser_1.parse(res.data);
        return {
            binaryByteSize: parsedInfo.FUSMsg.FUSBody.Put.BINARY_BYTE_SIZE.Data,
            binaryDescription: parsedInfo.FUSMsg.FUSBody.Put.DESCRIPTION.Data,
            binaryFilename: parsedInfo.FUSMsg.FUSBody.Put.BINARY_NAME.Data,
            binaryLogicValue: parsedInfo.FUSMsg.FUSBody.Put.LOGIC_VALUE_FACTORY.Data,
            binaryModelPath: parsedInfo.FUSMsg.FUSBody.Put.MODEL_PATH.Data,
            binaryOSVersion: parsedInfo.FUSMsg.FUSBody.Put.CURRENT_OS_VERSION.Data,
            binaryVersion: parsedInfo.FUSMsg.FUSBody.Results.LATEST_FW_VERSION.Data,
        };
    });
    console.log(`
  OS: ${binaryOSVersion}
  Filename: ${binaryFilename}
  Size: ${binaryByteSize} bytes
  Logic Value: ${binaryLogicValue}
  Description:
    ${binaryDescription.split("\n").join("\n    ")}`);
    const decryptionKey = msgUtils_1.getDecryptionKey(binaryVersion, binaryLogicValue);
    await axios_1.default
        .post("https://neofussvr.sslcs.cdngc.net/NF_DownloadBinaryInitForMass.do", msgUtils_1.getBinaryInitMsg(binaryFilename, nonce.decrypted), {
        headers: {
            ...headers,
            Accept: "application/xml",
            "Content-Type": "application/xml",
        },
    })
        .then((res) => {
        handleHeaders(res.headers);
        return res;
    });
    const binaryDecipher = crypto_1.default.createDecipheriv("aes-128-ecb", decryptionKey, null);
    await axios_1.default
        .get(`http://cloud-neofussvr.samsungmobile.com/NF_DownloadBinaryForMass.do?file=${binaryModelPath}${binaryFilename}`, {
        headers,
        responseType: "stream",
    })
        .then((res) => {
        const outputFolder = `${process.cwd()}/${model}_${region}/`;
        console.log();
        console.log(outputFolder);
        fs_1.default.mkdirSync(outputFolder, { recursive: true });
        let downloadedSize = 0;
        let currentFile = "";
        const progressBar = new cli_progress_1.default.SingleBar({
            format: "{bar} {percentage}% | {value}/{total} | {file}",
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
        });
        progressBar.start(binaryByteSize, downloadedSize);
        return res.data
            .on("data", (buffer) => {
            downloadedSize += buffer.length;
            progressBar.update(downloadedSize, { file: currentFile });
        })
            .pipe(binaryDecipher)
            .pipe(unzip_stream_1.default.Parse())
            .on("entry", (entry) => {
            currentFile = `${entry.path.slice(0, 18)}...`;
            progressBar.update(downloadedSize, { file: currentFile });
            entry
                .pipe(fs_1.default.createWriteStream(path_1.default.join(outputFolder, entry.path)))
                .on("finish", () => {
                if (downloadedSize === binaryByteSize) {
                    process.exit();
                }
            });
        });
    });
};
const { argv } = yargs_1.default
    .option("model", {
    alias: "m",
    describe: "Model",
    type: "string",
    demandOption: true,
})
    .option("region", {
    alias: "r",
    describe: "Region",
    type: "string",
    demandOption: true,
})
    .version(package_json_1.version)
    .alias("v", "version")
    .help();
main(argv.region, argv.model);


/***/ }),

/***/ 3396:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleAuthRotation = exports.getAuthorization = exports.decryptNonce = void 0;
const crypto_1 = __importDefault(__webpack_require__(6417));
const NONCE_KEY = "hqzdurufm2c8mf6bsjezu1qgveouv7c7";
const AUTH_KEY = "w13r4cvf4hctaujv";
exports.decryptNonce = (nonceEncrypted) => {
    const nonceDecipher = crypto_1.default.createDecipheriv("aes-256-cbc", NONCE_KEY, NONCE_KEY.slice(0, 16));
    return Buffer.concat([
        nonceDecipher.update(nonceEncrypted, "base64"),
        nonceDecipher.final(),
    ]).toString("utf-8");
};
exports.getAuthorization = (nonceDecrypted) => {
    let key = "";
    for (let i = 0; i < 16; i += 1) {
        const nonceChar = nonceDecrypted.charCodeAt(i);
        key += NONCE_KEY[nonceChar % 16];
    }
    key += AUTH_KEY;
    const authCipher = crypto_1.default.createCipheriv("aes-256-cbc", key, key.slice(0, 16));
    return Buffer.concat([
        authCipher.update(nonceDecrypted, "utf8"),
        authCipher.final(),
    ]).toString("base64");
};
exports.handleAuthRotation = (responseHeaders) => {
    const { nonce } = responseHeaders;
    const nonceDecrypted = exports.decryptNonce(nonce);
    const authorization = exports.getAuthorization(nonceDecrypted);
    return {
        Authorization: `FUS nonce="${nonce}", signature="${authorization}", nc="", type="", realm="", newauth="1"`,
        nonce: {
            decrypted: nonceDecrypted,
            encrypted: nonce,
        },
    };
};


/***/ }),

/***/ 7268:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDecryptionKey = exports.getBinaryInitMsg = exports.getBinaryInformMsg = void 0;
const crypto_1 = __importDefault(__webpack_require__(6417));
const fast_xml_parser_1 = __webpack_require__(7448);
const parser = new fast_xml_parser_1.j2xParser({});
const getLogicCheck = (input, nonce) => {
    let out = "";
    for (let i = 0; i < nonce.length; i++) {
        const char = nonce.charCodeAt(i);
        out += input[char & 0xf];
    }
    return out;
};
exports.getBinaryInformMsg = (version, region, model, nonce) => {
    const msg = {
        FUSMsg: {
            FUSHdr: {
                ProtoVer: "1.0",
            },
            FUSBody: {
                Put: {
                    ACCESS_MODE: {
                        Data: 2,
                    },
                    BINARY_NATURE: {
                        Data: 1,
                    },
                    CLIENT_PRODUCT: {
                        Data: "Smart Switch",
                    },
                    DEVICE_FW_VERSION: {
                        Data: version,
                    },
                    DEVICE_LOCAL_CODE: {
                        Data: region,
                    },
                    DEVICE_MODEL_NAME: {
                        Data: model,
                    },
                    LOGIC_CHECK: {
                        Data: getLogicCheck(version, nonce),
                    },
                },
            },
        },
    };
    return parser.parse(msg);
};
exports.getBinaryInitMsg = (filename, nonce) => {
    const msg = {
        FUSMsg: {
            FUSHdr: {
                ProtoVer: "1.0",
            },
            FUSBody: {
                Put: {
                    BINARY_FILE_NAME: {
                        Data: filename,
                    },
                    LOGIC_CHECK: {
                        Data: getLogicCheck(filename.split(".")[0].slice(-16), nonce),
                    },
                },
            },
        },
    };
    return parser.parse(msg);
};
exports.getDecryptionKey = (version, logicalValue) => {
    return crypto_1.default
        .createHash("md5")
        .update(getLogicCheck(version, logicalValue))
        .digest();
};


/***/ }),

/***/ 6702:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const align = {
    right: alignRight,
    center: alignCenter
};
const top = 0;
const right = 1;
const bottom = 2;
const left = 3;
class UI {
    constructor(opts) {
        var _a;
        this.width = opts.width;
        this.wrap = (_a = opts.wrap) !== null && _a !== void 0 ? _a : true;
        this.rows = [];
    }
    span(...args) {
        const cols = this.div(...args);
        cols.span = true;
    }
    resetOutput() {
        this.rows = [];
    }
    div(...args) {
        if (args.length === 0) {
            this.div('');
        }
        if (this.wrap && this.shouldApplyLayoutDSL(...args) && typeof args[0] === 'string') {
            return this.applyLayoutDSL(args[0]);
        }
        const cols = args.map(arg => {
            if (typeof arg === 'string') {
                return this.colFromString(arg);
            }
            return arg;
        });
        this.rows.push(cols);
        return cols;
    }
    shouldApplyLayoutDSL(...args) {
        return args.length === 1 && typeof args[0] === 'string' &&
            /[\t\n]/.test(args[0]);
    }
    applyLayoutDSL(str) {
        const rows = str.split('\n').map(row => row.split('\t'));
        let leftColumnWidth = 0;
        // simple heuristic for layout, make sure the
        // second column lines up along the left-hand.
        // don't allow the first column to take up more
        // than 50% of the screen.
        rows.forEach(columns => {
            if (columns.length > 1 && mixin.stringWidth(columns[0]) > leftColumnWidth) {
                leftColumnWidth = Math.min(Math.floor(this.width * 0.5), mixin.stringWidth(columns[0]));
            }
        });
        // generate a table:
        //  replacing ' ' with padding calculations.
        //  using the algorithmically generated width.
        rows.forEach(columns => {
            this.div(...columns.map((r, i) => {
                return {
                    text: r.trim(),
                    padding: this.measurePadding(r),
                    width: (i === 0 && columns.length > 1) ? leftColumnWidth : undefined
                };
            }));
        });
        return this.rows[this.rows.length - 1];
    }
    colFromString(text) {
        return {
            text,
            padding: this.measurePadding(text)
        };
    }
    measurePadding(str) {
        // measure padding without ansi escape codes
        const noAnsi = mixin.stripAnsi(str);
        return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
    }
    toString() {
        const lines = [];
        this.rows.forEach(row => {
            this.rowToString(row, lines);
        });
        // don't display any lines with the
        // hidden flag set.
        return lines
            .filter(line => !line.hidden)
            .map(line => line.text)
            .join('\n');
    }
    rowToString(row, lines) {
        this.rasterize(row).forEach((rrow, r) => {
            let str = '';
            rrow.forEach((col, c) => {
                const { width } = row[c]; // the width with padding.
                const wrapWidth = this.negatePadding(row[c]); // the width without padding.
                let ts = col; // temporary string used during alignment/padding.
                if (wrapWidth > mixin.stringWidth(col)) {
                    ts += ' '.repeat(wrapWidth - mixin.stringWidth(col));
                }
                // align the string within its column.
                if (row[c].align && row[c].align !== 'left' && this.wrap) {
                    const fn = align[row[c].align];
                    ts = fn(ts, wrapWidth);
                    if (mixin.stringWidth(ts) < wrapWidth) {
                        ts += ' '.repeat((width || 0) - mixin.stringWidth(ts) - 1);
                    }
                }
                // apply border and padding to string.
                const padding = row[c].padding || [0, 0, 0, 0];
                if (padding[left]) {
                    str += ' '.repeat(padding[left]);
                }
                str += addBorder(row[c], ts, '| ');
                str += ts;
                str += addBorder(row[c], ts, ' |');
                if (padding[right]) {
                    str += ' '.repeat(padding[right]);
                }
                // if prior row is span, try to render the
                // current row on the prior line.
                if (r === 0 && lines.length > 0) {
                    str = this.renderInline(str, lines[lines.length - 1]);
                }
            });
            // remove trailing whitespace.
            lines.push({
                text: str.replace(/ +$/, ''),
                span: row.span
            });
        });
        return lines;
    }
    // if the full 'source' can render in
    // the target line, do so.
    renderInline(source, previousLine) {
        const match = source.match(/^ */);
        const leadingWhitespace = match ? match[0].length : 0;
        const target = previousLine.text;
        const targetTextWidth = mixin.stringWidth(target.trimRight());
        if (!previousLine.span) {
            return source;
        }
        // if we're not applying wrapping logic,
        // just always append to the span.
        if (!this.wrap) {
            previousLine.hidden = true;
            return target + source;
        }
        if (leadingWhitespace < targetTextWidth) {
            return source;
        }
        previousLine.hidden = true;
        return target.trimRight() + ' '.repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
    }
    rasterize(row) {
        const rrows = [];
        const widths = this.columnWidths(row);
        let wrapped;
        // word wrap all columns, and create
        // a data-structure that is easy to rasterize.
        row.forEach((col, c) => {
            // leave room for left and right padding.
            col.width = widths[c];
            if (this.wrap) {
                wrapped = mixin.wrap(col.text, this.negatePadding(col), { hard: true }).split('\n');
            }
            else {
                wrapped = col.text.split('\n');
            }
            if (col.border) {
                wrapped.unshift('.' + '-'.repeat(this.negatePadding(col) + 2) + '.');
                wrapped.push("'" + '-'.repeat(this.negatePadding(col) + 2) + "'");
            }
            // add top and bottom padding.
            if (col.padding) {
                wrapped.unshift(...new Array(col.padding[top] || 0).fill(''));
                wrapped.push(...new Array(col.padding[bottom] || 0).fill(''));
            }
            wrapped.forEach((str, r) => {
                if (!rrows[r]) {
                    rrows.push([]);
                }
                const rrow = rrows[r];
                for (let i = 0; i < c; i++) {
                    if (rrow[i] === undefined) {
                        rrow.push('');
                    }
                }
                rrow.push(str);
            });
        });
        return rrows;
    }
    negatePadding(col) {
        let wrapWidth = col.width || 0;
        if (col.padding) {
            wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0);
        }
        if (col.border) {
            wrapWidth -= 4;
        }
        return wrapWidth;
    }
    columnWidths(row) {
        if (!this.wrap) {
            return row.map(col => {
                return col.width || mixin.stringWidth(col.text);
            });
        }
        let unset = row.length;
        let remainingWidth = this.width;
        // column widths can be set in config.
        const widths = row.map(col => {
            if (col.width) {
                unset--;
                remainingWidth -= col.width;
                return col.width;
            }
            return undefined;
        });
        // any unset widths should be calculated.
        const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
        return widths.map((w, i) => {
            if (w === undefined) {
                return Math.max(unsetWidth, _minWidth(row[i]));
            }
            return w;
        });
    }
}
function addBorder(col, ts, style) {
    if (col.border) {
        if (/[.']-+[.']/.test(ts)) {
            return '';
        }
        if (ts.trim().length !== 0) {
            return style;
        }
        return '  ';
    }
    return '';
}
// calculates the minimum width of
// a column, based on padding preferences.
function _minWidth(col) {
    const padding = col.padding || [];
    const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
    if (col.border) {
        return minWidth + 4;
    }
    return minWidth;
}
function getWindowWidth() {
    /* istanbul ignore next: depends on terminal */
    if (typeof process === 'object' && process.stdout && process.stdout.columns) {
        return process.stdout.columns;
    }
    return 80;
}
function alignRight(str, width) {
    str = str.trim();
    const strWidth = mixin.stringWidth(str);
    if (strWidth < width) {
        return ' '.repeat(width - strWidth) + str;
    }
    return str;
}
function alignCenter(str, width) {
    str = str.trim();
    const strWidth = mixin.stringWidth(str);
    /* istanbul ignore next */
    if (strWidth >= width) {
        return str;
    }
    return ' '.repeat((width - strWidth) >> 1) + str;
}
let mixin;
function cliui(opts, _mixin) {
    mixin = _mixin;
    return new UI({
        width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth(),
        wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
    });
}

// Bootstrap cliui with CommonJS dependencies:
const stringWidth = __webpack_require__(2577);
const stripAnsi = __webpack_require__(5591);
const wrap = __webpack_require__(9824);
function ui(opts) {
    return cliui(opts, {
        stringWidth,
        stripAnsi,
        wrap
    });
}

module.exports = ui;


/***/ }),

/***/ 9087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var fs = __webpack_require__(5747);
var util = __webpack_require__(1669);
var path = __webpack_require__(5622);

let shim;
class Y18N {
    constructor(opts) {
        // configurable options.
        opts = opts || {};
        this.directory = opts.directory || './locales';
        this.updateFiles = typeof opts.updateFiles === 'boolean' ? opts.updateFiles : true;
        this.locale = opts.locale || 'en';
        this.fallbackToLanguage = typeof opts.fallbackToLanguage === 'boolean' ? opts.fallbackToLanguage : true;
        // internal stuff.
        this.cache = Object.create(null);
        this.writeQueue = [];
    }
    __(...args) {
        if (typeof arguments[0] !== 'string') {
            return this._taggedLiteral(arguments[0], ...arguments);
        }
        const str = args.shift();
        let cb = function () { }; // start with noop.
        if (typeof args[args.length - 1] === 'function')
            cb = args.pop();
        cb = cb || function () { }; // noop.
        if (!this.cache[this.locale])
            this._readLocaleFile();
        // we've observed a new string, update the language file.
        if (!this.cache[this.locale][str] && this.updateFiles) {
            this.cache[this.locale][str] = str;
            // include the current directory and locale,
            // since these values could change before the
            // write is performed.
            this._enqueueWrite({
                directory: this.directory,
                locale: this.locale,
                cb
            });
        }
        else {
            cb();
        }
        return shim.format.apply(shim.format, [this.cache[this.locale][str] || str].concat(args));
    }
    __n() {
        const args = Array.prototype.slice.call(arguments);
        const singular = args.shift();
        const plural = args.shift();
        const quantity = args.shift();
        let cb = function () { }; // start with noop.
        if (typeof args[args.length - 1] === 'function')
            cb = args.pop();
        if (!this.cache[this.locale])
            this._readLocaleFile();
        let str = quantity === 1 ? singular : plural;
        if (this.cache[this.locale][singular]) {
            const entry = this.cache[this.locale][singular];
            str = entry[quantity === 1 ? 'one' : 'other'];
        }
        // we've observed a new string, update the language file.
        if (!this.cache[this.locale][singular] && this.updateFiles) {
            this.cache[this.locale][singular] = {
                one: singular,
                other: plural
            };
            // include the current directory and locale,
            // since these values could change before the
            // write is performed.
            this._enqueueWrite({
                directory: this.directory,
                locale: this.locale,
                cb
            });
        }
        else {
            cb();
        }
        // if a %d placeholder is provided, add quantity
        // to the arguments expanded by util.format.
        var values = [str];
        if (~str.indexOf('%d'))
            values.push(quantity);
        return shim.format.apply(shim.format, values.concat(args));
    }
    setLocale(locale) {
        this.locale = locale;
    }
    getLocale() {
        return this.locale;
    }
    updateLocale(obj) {
        if (!this.cache[this.locale])
            this._readLocaleFile();
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                this.cache[this.locale][key] = obj[key];
            }
        }
    }
    _taggedLiteral(parts, ...args) {
        let str = '';
        parts.forEach(function (part, i) {
            var arg = args[i + 1];
            str += part;
            if (typeof arg !== 'undefined') {
                str += '%s';
            }
        });
        return this.__.apply(this, [str].concat([].slice.call(args, 1)));
    }
    _enqueueWrite(work) {
        this.writeQueue.push(work);
        if (this.writeQueue.length === 1)
            this._processWriteQueue();
    }
    _processWriteQueue() {
        var _this = this;
        var work = this.writeQueue[0];
        // destructure the enqueued work.
        var directory = work.directory;
        var locale = work.locale;
        var cb = work.cb;
        var languageFile = this._resolveLocaleFile(directory, locale);
        var serializedLocale = JSON.stringify(this.cache[locale], null, 2);
        shim.fs.writeFile(languageFile, serializedLocale, 'utf-8', function (err) {
            _this.writeQueue.shift();
            if (_this.writeQueue.length > 0)
                _this._processWriteQueue();
            cb(err);
        });
    }
    _readLocaleFile() {
        var localeLookup = {};
        var languageFile = this._resolveLocaleFile(this.directory, this.locale);
        try {
            localeLookup = JSON.parse(shim.fs.readFileSync(languageFile, 'utf-8'));
        }
        catch (err) {
            if (err instanceof SyntaxError) {
                err.message = 'syntax error in ' + languageFile;
            }
            if (err.code === 'ENOENT')
                localeLookup = {};
            else
                throw err;
        }
        this.cache[this.locale] = localeLookup;
    }
    _resolveLocaleFile(directory, locale) {
        var file = shim.resolve(directory, './', locale + '.json');
        if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf('_')) {
            // attempt fallback to language only
            var languageFile = shim.resolve(directory, './', locale.split('_')[0] + '.json');
            if (this._fileExistsSync(languageFile))
                file = languageFile;
        }
        return file;
    }
    _fileExistsSync(file) {
        return shim.exists(file);
    }
}
function y18n(opts, _shim) {
    shim = _shim;
    const y18n = new Y18N(opts);
    return {
        __: y18n.__.bind(y18n),
        __n: y18n.__n.bind(y18n),
        setLocale: y18n.setLocale.bind(y18n),
        getLocale: y18n.getLocale.bind(y18n),
        updateLocale: y18n.updateLocale.bind(y18n),
        locale: y18n.locale
    };
}

var nodePlatformShim = {
    fs: {
        readFileSync: fs.readFileSync,
        writeFile: fs.writeFile
    },
    format: util.format,
    resolve: path.resolve,
    exists: (file) => {
        try {
            return fs.statSync(file).isFile();
        }
        catch (err) {
            return false;
        }
    }
};

const y18n$1 = (opts) => {
    return y18n(opts, nodePlatformShim);
};

module.exports = y18n$1;


/***/ }),

/***/ 8909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var util = __webpack_require__(1669);
var fs = __webpack_require__(5747);
var path = __webpack_require__(5622);

function camelCase(str) {
    str = str.toLocaleLowerCase();
    if (str.indexOf('-') === -1 && str.indexOf('_') === -1) {
        return str;
    }
    else {
        let camelcase = '';
        let nextChrUpper = false;
        const leadingHyphens = str.match(/^-+/);
        for (let i = leadingHyphens ? leadingHyphens[0].length : 0; i < str.length; i++) {
            let chr = str.charAt(i);
            if (nextChrUpper) {
                nextChrUpper = false;
                chr = chr.toLocaleUpperCase();
            }
            if (i !== 0 && (chr === '-' || chr === '_')) {
                nextChrUpper = true;
                continue;
            }
            else if (chr !== '-' && chr !== '_') {
                camelcase += chr;
            }
        }
        return camelcase;
    }
}
function decamelize(str, joinString) {
    const lowercase = str.toLocaleLowerCase();
    joinString = joinString || '-';
    let notCamelcase = '';
    for (let i = 0; i < str.length; i++) {
        const chrLower = lowercase.charAt(i);
        const chrString = str.charAt(i);
        if (chrLower !== chrString && i > 0) {
            notCamelcase += `${joinString}${lowercase.charAt(i)}`;
        }
        else {
            notCamelcase += chrString;
        }
    }
    return notCamelcase;
}
function looksLikeNumber(x) {
    if (x === null || x === undefined)
        return false;
    if (typeof x === 'number')
        return true;
    if (/^0x[0-9a-f]+$/i.test(x))
        return true;
    if (x.length > 1 && x[0] === '0')
        return false;
    return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}

function tokenizeArgString(argString) {
    if (Array.isArray(argString)) {
        return argString.map(e => typeof e !== 'string' ? e + '' : e);
    }
    argString = argString.trim();
    let i = 0;
    let prevC = null;
    let c = null;
    let opening = null;
    const args = [];
    for (let ii = 0; ii < argString.length; ii++) {
        prevC = c;
        c = argString.charAt(ii);
        if (c === ' ' && !opening) {
            if (!(prevC === ' ')) {
                i++;
            }
            continue;
        }
        if (c === opening) {
            opening = null;
        }
        else if ((c === "'" || c === '"') && !opening) {
            opening = c;
        }
        if (!args[i])
            args[i] = '';
        args[i] += c;
    }
    return args;
}

let mixin;
class YargsParser {
    constructor(_mixin) {
        mixin = _mixin;
    }
    parse(argsInput, options) {
        const opts = Object.assign({
            alias: undefined,
            array: undefined,
            boolean: undefined,
            config: undefined,
            configObjects: undefined,
            configuration: undefined,
            coerce: undefined,
            count: undefined,
            default: undefined,
            envPrefix: undefined,
            narg: undefined,
            normalize: undefined,
            string: undefined,
            number: undefined,
            __: undefined,
            key: undefined
        }, options);
        const args = tokenizeArgString(argsInput);
        const aliases = combineAliases(Object.assign(Object.create(null), opts.alias));
        const configuration = Object.assign({
            'boolean-negation': true,
            'camel-case-expansion': true,
            'combine-arrays': false,
            'dot-notation': true,
            'duplicate-arguments-array': true,
            'flatten-duplicate-arrays': true,
            'greedy-arrays': true,
            'halt-at-non-option': false,
            'nargs-eats-options': false,
            'negation-prefix': 'no-',
            'parse-numbers': true,
            'parse-positional-numbers': true,
            'populate--': false,
            'set-placeholder-key': false,
            'short-option-groups': true,
            'strip-aliased': false,
            'strip-dashed': false,
            'unknown-options-as-args': false
        }, opts.configuration);
        const defaults = Object.assign(Object.create(null), opts.default);
        const configObjects = opts.configObjects || [];
        const envPrefix = opts.envPrefix;
        const notFlagsOption = configuration['populate--'];
        const notFlagsArgv = notFlagsOption ? '--' : '_';
        const newAliases = Object.create(null);
        const defaulted = Object.create(null);
        const __ = opts.__ || mixin.format;
        const flags = {
            aliases: Object.create(null),
            arrays: Object.create(null),
            bools: Object.create(null),
            strings: Object.create(null),
            numbers: Object.create(null),
            counts: Object.create(null),
            normalize: Object.create(null),
            configs: Object.create(null),
            nargs: Object.create(null),
            coercions: Object.create(null),
            keys: []
        };
        const negative = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;
        const negatedBoolean = new RegExp('^--' + configuration['negation-prefix'] + '(.+)');
        [].concat(opts.array || []).filter(Boolean).forEach(function (opt) {
            const key = typeof opt === 'object' ? opt.key : opt;
            const assignment = Object.keys(opt).map(function (key) {
                const arrayFlagKeys = {
                    boolean: 'bools',
                    string: 'strings',
                    number: 'numbers'
                };
                return arrayFlagKeys[key];
            }).filter(Boolean).pop();
            if (assignment) {
                flags[assignment][key] = true;
            }
            flags.arrays[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.boolean || []).filter(Boolean).forEach(function (key) {
            flags.bools[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.string || []).filter(Boolean).forEach(function (key) {
            flags.strings[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.number || []).filter(Boolean).forEach(function (key) {
            flags.numbers[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.count || []).filter(Boolean).forEach(function (key) {
            flags.counts[key] = true;
            flags.keys.push(key);
        });
        [].concat(opts.normalize || []).filter(Boolean).forEach(function (key) {
            flags.normalize[key] = true;
            flags.keys.push(key);
        });
        if (typeof opts.narg === 'object') {
            Object.entries(opts.narg).forEach(([key, value]) => {
                if (typeof value === 'number') {
                    flags.nargs[key] = value;
                    flags.keys.push(key);
                }
            });
        }
        if (typeof opts.coerce === 'object') {
            Object.entries(opts.coerce).forEach(([key, value]) => {
                if (typeof value === 'function') {
                    flags.coercions[key] = value;
                    flags.keys.push(key);
                }
            });
        }
        if (typeof opts.config !== 'undefined') {
            if (Array.isArray(opts.config) || typeof opts.config === 'string') {
                [].concat(opts.config).filter(Boolean).forEach(function (key) {
                    flags.configs[key] = true;
                });
            }
            else if (typeof opts.config === 'object') {
                Object.entries(opts.config).forEach(([key, value]) => {
                    if (typeof value === 'boolean' || typeof value === 'function') {
                        flags.configs[key] = value;
                    }
                });
            }
        }
        extendAliases(opts.key, aliases, opts.default, flags.arrays);
        Object.keys(defaults).forEach(function (key) {
            (flags.aliases[key] || []).forEach(function (alias) {
                defaults[alias] = defaults[key];
            });
        });
        let error = null;
        checkConfiguration();
        let notFlags = [];
        const argv = Object.assign(Object.create(null), { _: [] });
        const argvReturn = {};
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            let broken;
            let key;
            let letters;
            let m;
            let next;
            let value;
            if (arg !== '--' && isUnknownOptionAsArg(arg)) {
                pushPositional(arg);
            }
            else if (arg.match(/^--.+=/) || (!configuration['short-option-groups'] && arg.match(/^-.+=/))) {
                m = arg.match(/^--?([^=]+)=([\s\S]*)$/);
                if (m !== null && Array.isArray(m) && m.length >= 3) {
                    if (checkAllAliases(m[1], flags.arrays)) {
                        i = eatArray(i, m[1], args, m[2]);
                    }
                    else if (checkAllAliases(m[1], flags.nargs) !== false) {
                        i = eatNargs(i, m[1], args, m[2]);
                    }
                    else {
                        setArg(m[1], m[2]);
                    }
                }
            }
            else if (arg.match(negatedBoolean) && configuration['boolean-negation']) {
                m = arg.match(negatedBoolean);
                if (m !== null && Array.isArray(m) && m.length >= 2) {
                    key = m[1];
                    setArg(key, checkAllAliases(key, flags.arrays) ? [false] : false);
                }
            }
            else if (arg.match(/^--.+/) || (!configuration['short-option-groups'] && arg.match(/^-[^-]+/))) {
                m = arg.match(/^--?(.+)/);
                if (m !== null && Array.isArray(m) && m.length >= 2) {
                    key = m[1];
                    if (checkAllAliases(key, flags.arrays)) {
                        i = eatArray(i, key, args);
                    }
                    else if (checkAllAliases(key, flags.nargs) !== false) {
                        i = eatNargs(i, key, args);
                    }
                    else {
                        next = args[i + 1];
                        if (next !== undefined && (!next.match(/^-/) ||
                            next.match(negative)) &&
                            !checkAllAliases(key, flags.bools) &&
                            !checkAllAliases(key, flags.counts)) {
                            setArg(key, next);
                            i++;
                        }
                        else if (/^(true|false)$/.test(next)) {
                            setArg(key, next);
                            i++;
                        }
                        else {
                            setArg(key, defaultValue(key));
                        }
                    }
                }
            }
            else if (arg.match(/^-.\..+=/)) {
                m = arg.match(/^-([^=]+)=([\s\S]*)$/);
                if (m !== null && Array.isArray(m) && m.length >= 3) {
                    setArg(m[1], m[2]);
                }
            }
            else if (arg.match(/^-.\..+/) && !arg.match(negative)) {
                next = args[i + 1];
                m = arg.match(/^-(.\..+)/);
                if (m !== null && Array.isArray(m) && m.length >= 2) {
                    key = m[1];
                    if (next !== undefined && !next.match(/^-/) &&
                        !checkAllAliases(key, flags.bools) &&
                        !checkAllAliases(key, flags.counts)) {
                        setArg(key, next);
                        i++;
                    }
                    else {
                        setArg(key, defaultValue(key));
                    }
                }
            }
            else if (arg.match(/^-[^-]+/) && !arg.match(negative)) {
                letters = arg.slice(1, -1).split('');
                broken = false;
                for (let j = 0; j < letters.length; j++) {
                    next = arg.slice(j + 2);
                    if (letters[j + 1] && letters[j + 1] === '=') {
                        value = arg.slice(j + 3);
                        key = letters[j];
                        if (checkAllAliases(key, flags.arrays)) {
                            i = eatArray(i, key, args, value);
                        }
                        else if (checkAllAliases(key, flags.nargs) !== false) {
                            i = eatNargs(i, key, args, value);
                        }
                        else {
                            setArg(key, value);
                        }
                        broken = true;
                        break;
                    }
                    if (next === '-') {
                        setArg(letters[j], next);
                        continue;
                    }
                    if (/[A-Za-z]/.test(letters[j]) &&
                        /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) &&
                        checkAllAliases(next, flags.bools) === false) {
                        setArg(letters[j], next);
                        broken = true;
                        break;
                    }
                    if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                        setArg(letters[j], next);
                        broken = true;
                        break;
                    }
                    else {
                        setArg(letters[j], defaultValue(letters[j]));
                    }
                }
                key = arg.slice(-1)[0];
                if (!broken && key !== '-') {
                    if (checkAllAliases(key, flags.arrays)) {
                        i = eatArray(i, key, args);
                    }
                    else if (checkAllAliases(key, flags.nargs) !== false) {
                        i = eatNargs(i, key, args);
                    }
                    else {
                        next = args[i + 1];
                        if (next !== undefined && (!/^(-|--)[^-]/.test(next) ||
                            next.match(negative)) &&
                            !checkAllAliases(key, flags.bools) &&
                            !checkAllAliases(key, flags.counts)) {
                            setArg(key, next);
                            i++;
                        }
                        else if (/^(true|false)$/.test(next)) {
                            setArg(key, next);
                            i++;
                        }
                        else {
                            setArg(key, defaultValue(key));
                        }
                    }
                }
            }
            else if (arg.match(/^-[0-9]$/) &&
                arg.match(negative) &&
                checkAllAliases(arg.slice(1), flags.bools)) {
                key = arg.slice(1);
                setArg(key, defaultValue(key));
            }
            else if (arg === '--') {
                notFlags = args.slice(i + 1);
                break;
            }
            else if (configuration['halt-at-non-option']) {
                notFlags = args.slice(i);
                break;
            }
            else {
                pushPositional(arg);
            }
        }
        applyEnvVars(argv, true);
        applyEnvVars(argv, false);
        setConfig(argv);
        setConfigObjects();
        applyDefaultsAndAliases(argv, flags.aliases, defaults, true);
        applyCoercions(argv);
        if (configuration['set-placeholder-key'])
            setPlaceholderKeys(argv);
        Object.keys(flags.counts).forEach(function (key) {
            if (!hasKey(argv, key.split('.')))
                setArg(key, 0);
        });
        if (notFlagsOption && notFlags.length)
            argv[notFlagsArgv] = [];
        notFlags.forEach(function (key) {
            argv[notFlagsArgv].push(key);
        });
        if (configuration['camel-case-expansion'] && configuration['strip-dashed']) {
            Object.keys(argv).filter(key => key !== '--' && key.includes('-')).forEach(key => {
                delete argv[key];
            });
        }
        if (configuration['strip-aliased']) {
            [].concat(...Object.keys(aliases).map(k => aliases[k])).forEach(alias => {
                if (configuration['camel-case-expansion'] && alias.includes('-')) {
                    delete argv[alias.split('.').map(prop => camelCase(prop)).join('.')];
                }
                delete argv[alias];
            });
        }
        function pushPositional(arg) {
            const maybeCoercedNumber = maybeCoerceNumber('_', arg);
            if (typeof maybeCoercedNumber === 'string' || typeof maybeCoercedNumber === 'number') {
                argv._.push(maybeCoercedNumber);
            }
        }
        function eatNargs(i, key, args, argAfterEqualSign) {
            let ii;
            let toEat = checkAllAliases(key, flags.nargs);
            toEat = typeof toEat !== 'number' || isNaN(toEat) ? 1 : toEat;
            if (toEat === 0) {
                if (!isUndefined(argAfterEqualSign)) {
                    error = Error(__('Argument unexpected for: %s', key));
                }
                setArg(key, defaultValue(key));
                return i;
            }
            let available = isUndefined(argAfterEqualSign) ? 0 : 1;
            if (configuration['nargs-eats-options']) {
                if (args.length - (i + 1) + available < toEat) {
                    error = Error(__('Not enough arguments following: %s', key));
                }
                available = toEat;
            }
            else {
                for (ii = i + 1; ii < args.length; ii++) {
                    if (!args[ii].match(/^-[^0-9]/) || args[ii].match(negative) || isUnknownOptionAsArg(args[ii]))
                        available++;
                    else
                        break;
                }
                if (available < toEat)
                    error = Error(__('Not enough arguments following: %s', key));
            }
            let consumed = Math.min(available, toEat);
            if (!isUndefined(argAfterEqualSign) && consumed > 0) {
                setArg(key, argAfterEqualSign);
                consumed--;
            }
            for (ii = i + 1; ii < (consumed + i + 1); ii++) {
                setArg(key, args[ii]);
            }
            return (i + consumed);
        }
        function eatArray(i, key, args, argAfterEqualSign) {
            let argsToSet = [];
            let next = argAfterEqualSign || args[i + 1];
            const nargsCount = checkAllAliases(key, flags.nargs);
            if (checkAllAliases(key, flags.bools) && !(/^(true|false)$/.test(next))) {
                argsToSet.push(true);
            }
            else if (isUndefined(next) ||
                (isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))) {
                if (defaults[key] !== undefined) {
                    const defVal = defaults[key];
                    argsToSet = Array.isArray(defVal) ? defVal : [defVal];
                }
            }
            else {
                if (!isUndefined(argAfterEqualSign)) {
                    argsToSet.push(processValue(key, argAfterEqualSign));
                }
                for (let ii = i + 1; ii < args.length; ii++) {
                    if ((!configuration['greedy-arrays'] && argsToSet.length > 0) ||
                        (nargsCount && typeof nargsCount === 'number' && argsToSet.length >= nargsCount))
                        break;
                    next = args[ii];
                    if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
                        break;
                    i = ii;
                    argsToSet.push(processValue(key, next));
                }
            }
            if (typeof nargsCount === 'number' && ((nargsCount && argsToSet.length < nargsCount) ||
                (isNaN(nargsCount) && argsToSet.length === 0))) {
                error = Error(__('Not enough arguments following: %s', key));
            }
            setArg(key, argsToSet);
            return i;
        }
        function setArg(key, val) {
            if (/-/.test(key) && configuration['camel-case-expansion']) {
                const alias = key.split('.').map(function (prop) {
                    return camelCase(prop);
                }).join('.');
                addNewAlias(key, alias);
            }
            const value = processValue(key, val);
            const splitKey = key.split('.');
            setKey(argv, splitKey, value);
            if (flags.aliases[key]) {
                flags.aliases[key].forEach(function (x) {
                    const keyProperties = x.split('.');
                    setKey(argv, keyProperties, value);
                });
            }
            if (splitKey.length > 1 && configuration['dot-notation']) {
                (flags.aliases[splitKey[0]] || []).forEach(function (x) {
                    let keyProperties = x.split('.');
                    const a = [].concat(splitKey);
                    a.shift();
                    keyProperties = keyProperties.concat(a);
                    if (!(flags.aliases[key] || []).includes(keyProperties.join('.'))) {
                        setKey(argv, keyProperties, value);
                    }
                });
            }
            if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
                const keys = [key].concat(flags.aliases[key] || []);
                keys.forEach(function (key) {
                    Object.defineProperty(argvReturn, key, {
                        enumerable: true,
                        get() {
                            return val;
                        },
                        set(value) {
                            val = typeof value === 'string' ? mixin.normalize(value) : value;
                        }
                    });
                });
            }
        }
        function addNewAlias(key, alias) {
            if (!(flags.aliases[key] && flags.aliases[key].length)) {
                flags.aliases[key] = [alias];
                newAliases[alias] = true;
            }
            if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
                addNewAlias(alias, key);
            }
        }
        function processValue(key, val) {
            if (typeof val === 'string' &&
                (val[0] === "'" || val[0] === '"') &&
                val[val.length - 1] === val[0]) {
                val = val.substring(1, val.length - 1);
            }
            if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
                if (typeof val === 'string')
                    val = val === 'true';
            }
            let value = Array.isArray(val)
                ? val.map(function (v) { return maybeCoerceNumber(key, v); })
                : maybeCoerceNumber(key, val);
            if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === 'boolean')) {
                value = increment();
            }
            if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
                if (Array.isArray(val))
                    value = val.map((val) => { return mixin.normalize(val); });
                else
                    value = mixin.normalize(val);
            }
            return value;
        }
        function maybeCoerceNumber(key, value) {
            if (!configuration['parse-positional-numbers'] && key === '_')
                return value;
            if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
                const shouldCoerceNumber = looksLikeNumber(value) && configuration['parse-numbers'] && (Number.isSafeInteger(Math.floor(parseFloat(`${value}`))));
                if (shouldCoerceNumber || (!isUndefined(value) && checkAllAliases(key, flags.numbers))) {
                    value = Number(value);
                }
            }
            return value;
        }
        function setConfig(argv) {
            const configLookup = Object.create(null);
            applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
            Object.keys(flags.configs).forEach(function (configKey) {
                const configPath = argv[configKey] || configLookup[configKey];
                if (configPath) {
                    try {
                        let config = null;
                        const resolvedConfigPath = mixin.resolve(mixin.cwd(), configPath);
                        const resolveConfig = flags.configs[configKey];
                        if (typeof resolveConfig === 'function') {
                            try {
                                config = resolveConfig(resolvedConfigPath);
                            }
                            catch (e) {
                                config = e;
                            }
                            if (config instanceof Error) {
                                error = config;
                                return;
                            }
                        }
                        else {
                            config = mixin.require(resolvedConfigPath);
                        }
                        setConfigObject(config);
                    }
                    catch (ex) {
                        if (ex.name === 'PermissionDenied')
                            error = ex;
                        else if (argv[configKey])
                            error = Error(__('Invalid JSON config file: %s', configPath));
                    }
                }
            });
        }
        function setConfigObject(config, prev) {
            Object.keys(config).forEach(function (key) {
                const value = config[key];
                const fullKey = prev ? prev + '.' + key : key;
                if (typeof value === 'object' && value !== null && !Array.isArray(value) && configuration['dot-notation']) {
                    setConfigObject(value, fullKey);
                }
                else {
                    if (!hasKey(argv, fullKey.split('.')) || (checkAllAliases(fullKey, flags.arrays) && configuration['combine-arrays'])) {
                        setArg(fullKey, value);
                    }
                }
            });
        }
        function setConfigObjects() {
            if (typeof configObjects !== 'undefined') {
                configObjects.forEach(function (configObject) {
                    setConfigObject(configObject);
                });
            }
        }
        function applyEnvVars(argv, configOnly) {
            if (typeof envPrefix === 'undefined')
                return;
            const prefix = typeof envPrefix === 'string' ? envPrefix : '';
            const env = mixin.env();
            Object.keys(env).forEach(function (envVar) {
                if (prefix === '' || envVar.lastIndexOf(prefix, 0) === 0) {
                    const keys = envVar.split('__').map(function (key, i) {
                        if (i === 0) {
                            key = key.substring(prefix.length);
                        }
                        return camelCase(key);
                    });
                    if (((configOnly && flags.configs[keys.join('.')]) || !configOnly) && !hasKey(argv, keys)) {
                        setArg(keys.join('.'), env[envVar]);
                    }
                }
            });
        }
        function applyCoercions(argv) {
            let coerce;
            const applied = new Set();
            Object.keys(argv).forEach(function (key) {
                if (!applied.has(key)) {
                    coerce = checkAllAliases(key, flags.coercions);
                    if (typeof coerce === 'function') {
                        try {
                            const value = maybeCoerceNumber(key, coerce(argv[key]));
                            ([].concat(flags.aliases[key] || [], key)).forEach(ali => {
                                applied.add(ali);
                                argv[ali] = value;
                            });
                        }
                        catch (err) {
                            error = err;
                        }
                    }
                }
            });
        }
        function setPlaceholderKeys(argv) {
            flags.keys.forEach((key) => {
                if (~key.indexOf('.'))
                    return;
                if (typeof argv[key] === 'undefined')
                    argv[key] = undefined;
            });
            return argv;
        }
        function applyDefaultsAndAliases(obj, aliases, defaults, canLog = false) {
            Object.keys(defaults).forEach(function (key) {
                if (!hasKey(obj, key.split('.'))) {
                    setKey(obj, key.split('.'), defaults[key]);
                    if (canLog)
                        defaulted[key] = true;
                    (aliases[key] || []).forEach(function (x) {
                        if (hasKey(obj, x.split('.')))
                            return;
                        setKey(obj, x.split('.'), defaults[key]);
                    });
                }
            });
        }
        function hasKey(obj, keys) {
            let o = obj;
            if (!configuration['dot-notation'])
                keys = [keys.join('.')];
            keys.slice(0, -1).forEach(function (key) {
                o = (o[key] || {});
            });
            const key = keys[keys.length - 1];
            if (typeof o !== 'object')
                return false;
            else
                return key in o;
        }
        function setKey(obj, keys, value) {
            let o = obj;
            if (!configuration['dot-notation'])
                keys = [keys.join('.')];
            keys.slice(0, -1).forEach(function (key) {
                key = sanitizeKey(key);
                if (typeof o === 'object' && o[key] === undefined) {
                    o[key] = {};
                }
                if (typeof o[key] !== 'object' || Array.isArray(o[key])) {
                    if (Array.isArray(o[key])) {
                        o[key].push({});
                    }
                    else {
                        o[key] = [o[key], {}];
                    }
                    o = o[key][o[key].length - 1];
                }
                else {
                    o = o[key];
                }
            });
            const key = sanitizeKey(keys[keys.length - 1]);
            const isTypeArray = checkAllAliases(keys.join('.'), flags.arrays);
            const isValueArray = Array.isArray(value);
            let duplicate = configuration['duplicate-arguments-array'];
            if (!duplicate && checkAllAliases(key, flags.nargs)) {
                duplicate = true;
                if ((!isUndefined(o[key]) && flags.nargs[key] === 1) || (Array.isArray(o[key]) && o[key].length === flags.nargs[key])) {
                    o[key] = undefined;
                }
            }
            if (value === increment()) {
                o[key] = increment(o[key]);
            }
            else if (Array.isArray(o[key])) {
                if (duplicate && isTypeArray && isValueArray) {
                    o[key] = configuration['flatten-duplicate-arrays'] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
                }
                else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
                    o[key] = value;
                }
                else {
                    o[key] = o[key].concat([value]);
                }
            }
            else if (o[key] === undefined && isTypeArray) {
                o[key] = isValueArray ? value : [value];
            }
            else if (duplicate && !(o[key] === undefined ||
                checkAllAliases(key, flags.counts) ||
                checkAllAliases(key, flags.bools))) {
                o[key] = [o[key], value];
            }
            else {
                o[key] = value;
            }
        }
        function extendAliases(...args) {
            args.forEach(function (obj) {
                Object.keys(obj || {}).forEach(function (key) {
                    if (flags.aliases[key])
                        return;
                    flags.aliases[key] = [].concat(aliases[key] || []);
                    flags.aliases[key].concat(key).forEach(function (x) {
                        if (/-/.test(x) && configuration['camel-case-expansion']) {
                            const c = camelCase(x);
                            if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                                flags.aliases[key].push(c);
                                newAliases[c] = true;
                            }
                        }
                    });
                    flags.aliases[key].concat(key).forEach(function (x) {
                        if (x.length > 1 && /[A-Z]/.test(x) && configuration['camel-case-expansion']) {
                            const c = decamelize(x, '-');
                            if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                                flags.aliases[key].push(c);
                                newAliases[c] = true;
                            }
                        }
                    });
                    flags.aliases[key].forEach(function (x) {
                        flags.aliases[x] = [key].concat(flags.aliases[key].filter(function (y) {
                            return x !== y;
                        }));
                    });
                });
            });
        }
        function checkAllAliases(key, flag) {
            const toCheck = [].concat(flags.aliases[key] || [], key);
            const keys = Object.keys(flag);
            const setAlias = toCheck.find(key => keys.includes(key));
            return setAlias ? flag[setAlias] : false;
        }
        function hasAnyFlag(key) {
            const flagsKeys = Object.keys(flags);
            const toCheck = [].concat(flagsKeys.map(k => flags[k]));
            return toCheck.some(function (flag) {
                return Array.isArray(flag) ? flag.includes(key) : flag[key];
            });
        }
        function hasFlagsMatching(arg, ...patterns) {
            const toCheck = [].concat(...patterns);
            return toCheck.some(function (pattern) {
                const match = arg.match(pattern);
                return match && hasAnyFlag(match[1]);
            });
        }
        function hasAllShortFlags(arg) {
            if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
                return false;
            }
            let hasAllFlags = true;
            let next;
            const letters = arg.slice(1).split('');
            for (let j = 0; j < letters.length; j++) {
                next = arg.slice(j + 2);
                if (!hasAnyFlag(letters[j])) {
                    hasAllFlags = false;
                    break;
                }
                if ((letters[j + 1] && letters[j + 1] === '=') ||
                    next === '-' ||
                    (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) ||
                    (letters[j + 1] && letters[j + 1].match(/\W/))) {
                    break;
                }
            }
            return hasAllFlags;
        }
        function isUnknownOptionAsArg(arg) {
            return configuration['unknown-options-as-args'] && isUnknownOption(arg);
        }
        function isUnknownOption(arg) {
            if (arg.match(negative)) {
                return false;
            }
            if (hasAllShortFlags(arg)) {
                return false;
            }
            const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
            const normalFlag = /^-+([^=]+?)$/;
            const flagEndingInHyphen = /^-+([^=]+?)-$/;
            const flagEndingInDigits = /^-+([^=]+?\d+)$/;
            const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
            return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
        }
        function defaultValue(key) {
            if (!checkAllAliases(key, flags.bools) &&
                !checkAllAliases(key, flags.counts) &&
                `${key}` in defaults) {
                return defaults[key];
            }
            else {
                return defaultForType(guessType(key));
            }
        }
        function defaultForType(type) {
            const def = {
                boolean: true,
                string: '',
                number: undefined,
                array: []
            };
            return def[type];
        }
        function guessType(key) {
            let type = 'boolean';
            if (checkAllAliases(key, flags.strings))
                type = 'string';
            else if (checkAllAliases(key, flags.numbers))
                type = 'number';
            else if (checkAllAliases(key, flags.bools))
                type = 'boolean';
            else if (checkAllAliases(key, flags.arrays))
                type = 'array';
            return type;
        }
        function isUndefined(num) {
            return num === undefined;
        }
        function checkConfiguration() {
            Object.keys(flags.counts).find(key => {
                if (checkAllAliases(key, flags.arrays)) {
                    error = Error(__('Invalid configuration: %s, opts.count excludes opts.array.', key));
                    return true;
                }
                else if (checkAllAliases(key, flags.nargs)) {
                    error = Error(__('Invalid configuration: %s, opts.count excludes opts.narg.', key));
                    return true;
                }
                return false;
            });
        }
        return {
            aliases: Object.assign({}, flags.aliases),
            argv: Object.assign(argvReturn, argv),
            configuration: configuration,
            defaulted: Object.assign({}, defaulted),
            error: error,
            newAliases: Object.assign({}, newAliases)
        };
    }
}
function combineAliases(aliases) {
    const aliasArrays = [];
    const combined = Object.create(null);
    let change = true;
    Object.keys(aliases).forEach(function (key) {
        aliasArrays.push([].concat(aliases[key], key));
    });
    while (change) {
        change = false;
        for (let i = 0; i < aliasArrays.length; i++) {
            for (let ii = i + 1; ii < aliasArrays.length; ii++) {
                const intersect = aliasArrays[i].filter(function (v) {
                    return aliasArrays[ii].indexOf(v) !== -1;
                });
                if (intersect.length) {
                    aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
                    aliasArrays.splice(ii, 1);
                    change = true;
                    break;
                }
            }
        }
    }
    aliasArrays.forEach(function (aliasArray) {
        aliasArray = aliasArray.filter(function (v, i, self) {
            return self.indexOf(v) === i;
        });
        const lastAlias = aliasArray.pop();
        if (lastAlias !== undefined && typeof lastAlias === 'string') {
            combined[lastAlias] = aliasArray;
        }
    });
    return combined;
}
function increment(orig) {
    return orig !== undefined ? orig + 1 : 1;
}
function sanitizeKey(key) {
    if (key === '__proto__')
        return '___proto___';
    return key;
}

const minNodeVersion = (process && process.env && process.env.YARGS_MIN_NODE_VERSION)
    ? Number(process.env.YARGS_MIN_NODE_VERSION)
    : 10;
if (process && process.version) {
    const major = Number(process.version.match(/v([^.]+)/)[1]);
    if (major < minNodeVersion) {
        throw Error(`yargs parser supports a minimum Node.js version of ${minNodeVersion}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
    }
}
const env = process ? process.env : {};
const parser = new YargsParser({
    cwd: process.cwd,
    env: () => {
        return env;
    },
    format: util.format,
    normalize: path.normalize,
    resolve: path.resolve,
    require: (path) => {
        if (true) {
            return __webpack_require__(5670)(path);
        }
        else {}
    }
});
const yargsParser = function Parser(args, opts) {
    const result = parser.parse(args.slice(), opts);
    return result.argv;
};
yargsParser.detailed = function (args, opts) {
    return parser.parse(args.slice(), opts);
};
yargsParser.camelCase = camelCase;
yargsParser.decamelize = decamelize;
yargsParser.looksLikeNumber = looksLikeNumber;

module.exports = yargsParser;


/***/ }),

/***/ 9567:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var assert = __webpack_require__(2357);

class YError extends Error {
    constructor(msg) {
        super(msg || 'yargs error');
        this.name = 'YError';
        Error.captureStackTrace(this, YError);
    }
}

let previouslyVisitedConfigs = [];
let shim;
function applyExtends(config, cwd, mergeExtends, _shim) {
    shim = _shim;
    let defaultConfig = {};
    if (Object.prototype.hasOwnProperty.call(config, 'extends')) {
        if (typeof config.extends !== 'string')
            return defaultConfig;
        const isPath = /\.json|\..*rc$/.test(config.extends);
        let pathToDefault = null;
        if (!isPath) {
            try {
                pathToDefault = /*require.resolve*/(__webpack_require__(9167).resolve(config.extends));
            }
            catch (_err) {
                return config;
            }
        }
        else {
            pathToDefault = getPathToDefaultConfig(cwd, config.extends);
        }
        checkForCircularExtends(pathToDefault);
        previouslyVisitedConfigs.push(pathToDefault);
        defaultConfig = isPath
            ? JSON.parse(shim.readFileSync(pathToDefault, 'utf8'))
            : __webpack_require__(9167)(config.extends);
        delete config.extends;
        defaultConfig = applyExtends(defaultConfig, shim.path.dirname(pathToDefault), mergeExtends, shim);
    }
    previouslyVisitedConfigs = [];
    return mergeExtends
        ? mergeDeep(defaultConfig, config)
        : Object.assign({}, defaultConfig, config);
}
function checkForCircularExtends(cfgPath) {
    if (previouslyVisitedConfigs.indexOf(cfgPath) > -1) {
        throw new YError(`Circular extended configurations: '${cfgPath}'.`);
    }
}
function getPathToDefaultConfig(cwd, pathToExtend) {
    return shim.path.resolve(cwd, pathToExtend);
}
function mergeDeep(config1, config2) {
    const target = {};
    function isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
    }
    Object.assign(target, config1);
    for (const key of Object.keys(config2)) {
        if (isObject(config2[key]) && isObject(target[key])) {
            target[key] = mergeDeep(config1[key], config2[key]);
        }
        else {
            target[key] = config2[key];
        }
    }
    return target;
}

function parseCommand(cmd) {
    const extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, ' ');
    const splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/);
    const bregex = /\.*[\][<>]/g;
    const firstCommand = splitCommand.shift();
    if (!firstCommand)
        throw new Error(`No command found in: ${cmd}`);
    const parsedCommand = {
        cmd: firstCommand.replace(bregex, ''),
        demanded: [],
        optional: [],
    };
    splitCommand.forEach((cmd, i) => {
        let variadic = false;
        cmd = cmd.replace(/\s/g, '');
        if (/\.+[\]>]/.test(cmd) && i === splitCommand.length - 1)
            variadic = true;
        if (/^\[/.test(cmd)) {
            parsedCommand.optional.push({
                cmd: cmd.replace(bregex, '').split('|'),
                variadic,
            });
        }
        else {
            parsedCommand.demanded.push({
                cmd: cmd.replace(bregex, '').split('|'),
                variadic,
            });
        }
    });
    return parsedCommand;
}

const positionName = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
function argsert(arg1, arg2, arg3) {
    function parseArgs() {
        return typeof arg1 === 'object'
            ? [{ demanded: [], optional: [] }, arg1, arg2]
            : [
                parseCommand(`cmd ${arg1}`),
                arg2,
                arg3,
            ];
    }
    try {
        let position = 0;
        const [parsed, callerArguments, _length] = parseArgs();
        const args = [].slice.call(callerArguments);
        while (args.length && args[args.length - 1] === undefined)
            args.pop();
        const length = _length || args.length;
        if (length < parsed.demanded.length) {
            throw new YError(`Not enough arguments provided. Expected ${parsed.demanded.length} but received ${args.length}.`);
        }
        const totalCommands = parsed.demanded.length + parsed.optional.length;
        if (length > totalCommands) {
            throw new YError(`Too many arguments provided. Expected max ${totalCommands} but received ${length}.`);
        }
        parsed.demanded.forEach(demanded => {
            const arg = args.shift();
            const observedType = guessType(arg);
            const matchingTypes = demanded.cmd.filter(type => type === observedType || type === '*');
            if (matchingTypes.length === 0)
                argumentTypeError(observedType, demanded.cmd, position);
            position += 1;
        });
        parsed.optional.forEach(optional => {
            if (args.length === 0)
                return;
            const arg = args.shift();
            const observedType = guessType(arg);
            const matchingTypes = optional.cmd.filter(type => type === observedType || type === '*');
            if (matchingTypes.length === 0)
                argumentTypeError(observedType, optional.cmd, position);
            position += 1;
        });
    }
    catch (err) {
        console.warn(err.stack);
    }
}
function guessType(arg) {
    if (Array.isArray(arg)) {
        return 'array';
    }
    else if (arg === null) {
        return 'null';
    }
    return typeof arg;
}
function argumentTypeError(observedType, allowedTypes, position) {
    throw new YError(`Invalid ${positionName[position] || 'manyith'} argument. Expected ${allowedTypes.join(' or ')} but received ${observedType}.`);
}

function isPromise(maybePromise) {
    return (!!maybePromise &&
        !!maybePromise.then &&
        typeof maybePromise.then === 'function');
}

function assertNotStrictEqual(actual, expected, shim, message) {
    shim.assert.notStrictEqual(actual, expected, message);
}
function assertSingleKey(actual, shim) {
    shim.assert.strictEqual(typeof actual, 'string');
}
function objectKeys(object) {
    return Object.keys(object);
}

function objFilter(original = {}, filter = () => true) {
    const obj = {};
    objectKeys(original).forEach(key => {
        if (filter(key, original[key])) {
            obj[key] = original[key];
        }
    });
    return obj;
}

function globalMiddlewareFactory(globalMiddleware, context) {
    return function (callback, applyBeforeValidation = false) {
        argsert('<array|function> [boolean]', [callback, applyBeforeValidation], arguments.length);
        if (Array.isArray(callback)) {
            for (let i = 0; i < callback.length; i++) {
                if (typeof callback[i] !== 'function') {
                    throw Error('middleware must be a function');
                }
                callback[i].applyBeforeValidation = applyBeforeValidation;
            }
            Array.prototype.push.apply(globalMiddleware, callback);
        }
        else if (typeof callback === 'function') {
            callback.applyBeforeValidation = applyBeforeValidation;
            globalMiddleware.push(callback);
        }
        return context;
    };
}
function commandMiddlewareFactory(commandMiddleware) {
    if (!commandMiddleware)
        return [];
    return commandMiddleware.map(middleware => {
        middleware.applyBeforeValidation = false;
        return middleware;
    });
}
function applyMiddleware(argv, yargs, middlewares, beforeValidation) {
    const beforeValidationError = new Error('middleware cannot return a promise when applyBeforeValidation is true');
    return middlewares.reduce((acc, middleware) => {
        if (middleware.applyBeforeValidation !== beforeValidation) {
            return acc;
        }
        if (isPromise(acc)) {
            return acc
                .then(initialObj => Promise.all([
                initialObj,
                middleware(initialObj, yargs),
            ]))
                .then(([initialObj, middlewareObj]) => Object.assign(initialObj, middlewareObj));
        }
        else {
            const result = middleware(acc, yargs);
            if (beforeValidation && isPromise(result))
                throw beforeValidationError;
            return isPromise(result)
                ? result.then(middlewareObj => Object.assign(acc, middlewareObj))
                : Object.assign(acc, result);
        }
    }, argv);
}

function getProcessArgvBinIndex() {
    if (isBundledElectronApp())
        return 0;
    return 1;
}
function isBundledElectronApp() {
    return isElectronApp() && !process.defaultApp;
}
function isElectronApp() {
    return !!process.versions.electron;
}
function hideBin(argv) {
    return argv.slice(getProcessArgvBinIndex() + 1);
}
function getProcessArgvBin() {
    return process.argv[getProcessArgvBinIndex()];
}

var processArgv = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hideBin: hideBin,
  getProcessArgvBin: getProcessArgvBin
});

function whichModule(exported) {
    if (false)
        {}
    for (let i = 0, files = Object.keys(__webpack_require__.c), mod; i < files.length; i++) {
        mod = __webpack_require__.c[files[i]];
        if (mod.exports === exported)
            return mod;
    }
    return null;
}

const DEFAULT_MARKER = /(^\*)|(^\$0)/;
function command(yargs, usage, validation, globalMiddleware = [], shim) {
    const self = {};
    let handlers = {};
    let aliasMap = {};
    let defaultCommand;
    self.addHandler = function addHandler(cmd, description, builder, handler, commandMiddleware, deprecated) {
        let aliases = [];
        const middlewares = commandMiddlewareFactory(commandMiddleware);
        handler = handler || (() => { });
        if (Array.isArray(cmd)) {
            aliases = cmd.slice(1);
            cmd = cmd[0];
        }
        else if (isCommandHandlerDefinition(cmd)) {
            let command = Array.isArray(cmd.command) || typeof cmd.command === 'string'
                ? cmd.command
                : moduleName(cmd);
            if (cmd.aliases)
                command = [].concat(command).concat(cmd.aliases);
            self.addHandler(command, extractDesc(cmd), cmd.builder, cmd.handler, cmd.middlewares, cmd.deprecated);
            return;
        }
        if (isCommandBuilderDefinition(builder)) {
            self.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler, builder.middlewares, builder.deprecated);
            return;
        }
        const parsedCommand = parseCommand(cmd);
        aliases = aliases.map(alias => parseCommand(alias).cmd);
        let isDefault = false;
        const parsedAliases = [parsedCommand.cmd].concat(aliases).filter(c => {
            if (DEFAULT_MARKER.test(c)) {
                isDefault = true;
                return false;
            }
            return true;
        });
        if (parsedAliases.length === 0 && isDefault)
            parsedAliases.push('$0');
        if (isDefault) {
            parsedCommand.cmd = parsedAliases[0];
            aliases = parsedAliases.slice(1);
            cmd = cmd.replace(DEFAULT_MARKER, parsedCommand.cmd);
        }
        aliases.forEach(alias => {
            aliasMap[alias] = parsedCommand.cmd;
        });
        if (description !== false) {
            usage.command(cmd, description, isDefault, aliases, deprecated);
        }
        handlers[parsedCommand.cmd] = {
            original: cmd,
            description,
            handler,
            builder: builder || {},
            middlewares,
            deprecated,
            demanded: parsedCommand.demanded,
            optional: parsedCommand.optional,
        };
        if (isDefault)
            defaultCommand = handlers[parsedCommand.cmd];
    };
    self.addDirectory = function addDirectory(dir, context, req, callerFile, opts) {
        opts = opts || {};
        if (typeof opts.recurse !== 'boolean')
            opts.recurse = false;
        if (!Array.isArray(opts.extensions))
            opts.extensions = ['js'];
        const parentVisit = typeof opts.visit === 'function' ? opts.visit : (o) => o;
        opts.visit = function visit(obj, joined, filename) {
            const visited = parentVisit(obj, joined, filename);
            if (visited) {
                if (~context.files.indexOf(joined))
                    return visited;
                context.files.push(joined);
                self.addHandler(visited);
            }
            return visited;
        };
        shim.requireDirectory({ require: req, filename: callerFile }, dir, opts);
    };
    function moduleName(obj) {
        const mod = whichModule(obj);
        if (!mod)
            throw new Error(`No command name given for module: ${shim.inspect(obj)}`);
        return commandFromFilename(mod.filename);
    }
    function commandFromFilename(filename) {
        return shim.path.basename(filename, shim.path.extname(filename));
    }
    function extractDesc({ describe, description, desc, }) {
        for (const test of [describe, description, desc]) {
            if (typeof test === 'string' || test === false)
                return test;
            assertNotStrictEqual(test, true, shim);
        }
        return false;
    }
    self.getCommands = () => Object.keys(handlers).concat(Object.keys(aliasMap));
    self.getCommandHandlers = () => handlers;
    self.hasDefaultCommand = () => !!defaultCommand;
    self.runCommand = function runCommand(command, yargs, parsed, commandIndex) {
        let aliases = parsed.aliases;
        const commandHandler = handlers[command] || handlers[aliasMap[command]] || defaultCommand;
        const currentContext = yargs.getContext();
        let numFiles = currentContext.files.length;
        const parentCommands = currentContext.commands.slice();
        let innerArgv = parsed.argv;
        let positionalMap = {};
        if (command) {
            currentContext.commands.push(command);
            currentContext.fullCommands.push(commandHandler.original);
        }
        const builder = commandHandler.builder;
        if (isCommandBuilderCallback(builder)) {
            const builderOutput = builder(yargs.reset(parsed.aliases));
            const innerYargs = isYargsInstance(builderOutput) ? builderOutput : yargs;
            if (shouldUpdateUsage(innerYargs)) {
                innerYargs
                    .getUsageInstance()
                    .usage(usageFromParentCommandsCommandHandler(parentCommands, commandHandler), commandHandler.description);
            }
            innerArgv = innerYargs._parseArgs(null, null, true, commandIndex);
            aliases = innerYargs.parsed.aliases;
        }
        else if (isCommandBuilderOptionDefinitions(builder)) {
            const innerYargs = yargs.reset(parsed.aliases);
            if (shouldUpdateUsage(innerYargs)) {
                innerYargs
                    .getUsageInstance()
                    .usage(usageFromParentCommandsCommandHandler(parentCommands, commandHandler), commandHandler.description);
            }
            Object.keys(commandHandler.builder).forEach(key => {
                innerYargs.option(key, builder[key]);
            });
            innerArgv = innerYargs._parseArgs(null, null, true, commandIndex);
            aliases = innerYargs.parsed.aliases;
        }
        if (!yargs._hasOutput()) {
            positionalMap = populatePositionals(commandHandler, innerArgv, currentContext);
        }
        const middlewares = globalMiddleware
            .slice(0)
            .concat(commandHandler.middlewares);
        applyMiddleware(innerArgv, yargs, middlewares, true);
        if (!yargs._hasOutput()) {
            yargs._runValidation(innerArgv, aliases, positionalMap, yargs.parsed.error, !command);
        }
        if (commandHandler.handler && !yargs._hasOutput()) {
            yargs._setHasOutput();
            const populateDoubleDash = !!yargs.getOptions().configuration['populate--'];
            yargs._postProcess(innerArgv, populateDoubleDash);
            innerArgv = applyMiddleware(innerArgv, yargs, middlewares, false);
            let handlerResult;
            if (isPromise(innerArgv)) {
                handlerResult = innerArgv.then(argv => commandHandler.handler(argv));
            }
            else {
                handlerResult = commandHandler.handler(innerArgv);
            }
            const handlerFinishCommand = yargs.getHandlerFinishCommand();
            if (isPromise(handlerResult)) {
                yargs.getUsageInstance().cacheHelpMessage();
                handlerResult
                    .then(value => {
                    if (handlerFinishCommand) {
                        handlerFinishCommand(value);
                    }
                })
                    .catch(error => {
                    try {
                        yargs.getUsageInstance().fail(null, error);
                    }
                    catch (err) {
                    }
                })
                    .then(() => {
                    yargs.getUsageInstance().clearCachedHelpMessage();
                });
            }
            else {
                if (handlerFinishCommand) {
                    handlerFinishCommand(handlerResult);
                }
            }
        }
        if (command) {
            currentContext.commands.pop();
            currentContext.fullCommands.pop();
        }
        numFiles = currentContext.files.length - numFiles;
        if (numFiles > 0)
            currentContext.files.splice(numFiles * -1, numFiles);
        return innerArgv;
    };
    function shouldUpdateUsage(yargs) {
        return (!yargs.getUsageInstance().getUsageDisabled() &&
            yargs.getUsageInstance().getUsage().length === 0);
    }
    function usageFromParentCommandsCommandHandler(parentCommands, commandHandler) {
        const c = DEFAULT_MARKER.test(commandHandler.original)
            ? commandHandler.original.replace(DEFAULT_MARKER, '').trim()
            : commandHandler.original;
        const pc = parentCommands.filter(c => {
            return !DEFAULT_MARKER.test(c);
        });
        pc.push(c);
        return `$0 ${pc.join(' ')}`;
    }
    self.runDefaultBuilderOn = function (yargs) {
        assertNotStrictEqual(defaultCommand, undefined, shim);
        if (shouldUpdateUsage(yargs)) {
            const commandString = DEFAULT_MARKER.test(defaultCommand.original)
                ? defaultCommand.original
                : defaultCommand.original.replace(/^[^[\]<>]*/, '$0 ');
            yargs.getUsageInstance().usage(commandString, defaultCommand.description);
        }
        const builder = defaultCommand.builder;
        if (isCommandBuilderCallback(builder)) {
            builder(yargs);
        }
        else {
            Object.keys(builder).forEach(key => {
                yargs.option(key, builder[key]);
            });
        }
    };
    function populatePositionals(commandHandler, argv, context) {
        argv._ = argv._.slice(context.commands.length);
        const demanded = commandHandler.demanded.slice(0);
        const optional = commandHandler.optional.slice(0);
        const positionalMap = {};
        validation.positionalCount(demanded.length, argv._.length);
        while (demanded.length) {
            const demand = demanded.shift();
            populatePositional(demand, argv, positionalMap);
        }
        while (optional.length) {
            const maybe = optional.shift();
            populatePositional(maybe, argv, positionalMap);
        }
        argv._ = context.commands.concat(argv._.map(a => '' + a));
        postProcessPositionals(argv, positionalMap, self.cmdToParseOptions(commandHandler.original));
        return positionalMap;
    }
    function populatePositional(positional, argv, positionalMap) {
        const cmd = positional.cmd[0];
        if (positional.variadic) {
            positionalMap[cmd] = argv._.splice(0).map(String);
        }
        else {
            if (argv._.length)
                positionalMap[cmd] = [String(argv._.shift())];
        }
    }
    function postProcessPositionals(argv, positionalMap, parseOptions) {
        const options = Object.assign({}, yargs.getOptions());
        options.default = Object.assign(parseOptions.default, options.default);
        for (const key of Object.keys(parseOptions.alias)) {
            options.alias[key] = (options.alias[key] || []).concat(parseOptions.alias[key]);
        }
        options.array = options.array.concat(parseOptions.array);
        options.config = {};
        const unparsed = [];
        Object.keys(positionalMap).forEach(key => {
            positionalMap[key].map(value => {
                if (options.configuration['unknown-options-as-args'])
                    options.key[key] = true;
                unparsed.push(`--${key}`);
                unparsed.push(value);
            });
        });
        if (!unparsed.length)
            return;
        const config = Object.assign({}, options.configuration, {
            'populate--': true,
        });
        const parsed = shim.Parser.detailed(unparsed, Object.assign({}, options, {
            configuration: config,
        }));
        if (parsed.error) {
            yargs.getUsageInstance().fail(parsed.error.message, parsed.error);
        }
        else {
            const positionalKeys = Object.keys(positionalMap);
            Object.keys(positionalMap).forEach(key => {
                positionalKeys.push(...parsed.aliases[key]);
            });
            Object.keys(parsed.argv).forEach(key => {
                if (positionalKeys.indexOf(key) !== -1) {
                    if (!positionalMap[key])
                        positionalMap[key] = parsed.argv[key];
                    argv[key] = parsed.argv[key];
                }
            });
        }
    }
    self.cmdToParseOptions = function (cmdString) {
        const parseOptions = {
            array: [],
            default: {},
            alias: {},
            demand: {},
        };
        const parsed = parseCommand(cmdString);
        parsed.demanded.forEach(d => {
            const [cmd, ...aliases] = d.cmd;
            if (d.variadic) {
                parseOptions.array.push(cmd);
                parseOptions.default[cmd] = [];
            }
            parseOptions.alias[cmd] = aliases;
            parseOptions.demand[cmd] = true;
        });
        parsed.optional.forEach(o => {
            const [cmd, ...aliases] = o.cmd;
            if (o.variadic) {
                parseOptions.array.push(cmd);
                parseOptions.default[cmd] = [];
            }
            parseOptions.alias[cmd] = aliases;
        });
        return parseOptions;
    };
    self.reset = () => {
        handlers = {};
        aliasMap = {};
        defaultCommand = undefined;
        return self;
    };
    const frozens = [];
    self.freeze = () => {
        frozens.push({
            handlers,
            aliasMap,
            defaultCommand,
        });
    };
    self.unfreeze = () => {
        const frozen = frozens.pop();
        assertNotStrictEqual(frozen, undefined, shim);
        ({ handlers, aliasMap, defaultCommand } = frozen);
    };
    return self;
}
function isCommandHandlerDefinition(cmd) {
    return typeof cmd === 'object';
}
function isCommandBuilderDefinition(builder) {
    return (typeof builder === 'object' &&
        !!builder.builder &&
        typeof builder.handler === 'function');
}
function isCommandBuilderCallback(builder) {
    return typeof builder === 'function';
}
function isCommandBuilderOptionDefinitions(builder) {
    return typeof builder === 'object';
}

function setBlocking(blocking) {
    if (typeof process === 'undefined')
        return;
    [process.stdout, process.stderr].forEach(_stream => {
        const stream = _stream;
        if (stream._handle &&
            stream.isTTY &&
            typeof stream._handle.setBlocking === 'function') {
            stream._handle.setBlocking(blocking);
        }
    });
}

function usage(yargs, y18n, shim) {
    const __ = y18n.__;
    const self = {};
    const fails = [];
    self.failFn = function failFn(f) {
        fails.push(f);
    };
    let failMessage = null;
    let showHelpOnFail = true;
    self.showHelpOnFail = function showHelpOnFailFn(arg1 = true, arg2) {
        function parseFunctionArgs() {
            return typeof arg1 === 'string' ? [true, arg1] : [arg1, arg2];
        }
        const [enabled, message] = parseFunctionArgs();
        failMessage = message;
        showHelpOnFail = enabled;
        return self;
    };
    let failureOutput = false;
    self.fail = function fail(msg, err) {
        const logger = yargs._getLoggerInstance();
        if (fails.length) {
            for (let i = fails.length - 1; i >= 0; --i) {
                fails[i](msg, err, self);
            }
        }
        else {
            if (yargs.getExitProcess())
                setBlocking(true);
            if (!failureOutput) {
                failureOutput = true;
                if (showHelpOnFail) {
                    yargs.showHelp('error');
                    logger.error();
                }
                if (msg || err)
                    logger.error(msg || err);
                if (failMessage) {
                    if (msg || err)
                        logger.error('');
                    logger.error(failMessage);
                }
            }
            err = err || new YError(msg);
            if (yargs.getExitProcess()) {
                return yargs.exit(1);
            }
            else if (yargs._hasParseCallback()) {
                return yargs.exit(1, err);
            }
            else {
                throw err;
            }
        }
    };
    let usages = [];
    let usageDisabled = false;
    self.usage = (msg, description) => {
        if (msg === null) {
            usageDisabled = true;
            usages = [];
            return self;
        }
        usageDisabled = false;
        usages.push([msg, description || '']);
        return self;
    };
    self.getUsage = () => {
        return usages;
    };
    self.getUsageDisabled = () => {
        return usageDisabled;
    };
    self.getPositionalGroupName = () => {
        return __('Positionals:');
    };
    let examples = [];
    self.example = (cmd, description) => {
        examples.push([cmd, description || '']);
    };
    let commands = [];
    self.command = function command(cmd, description, isDefault, aliases, deprecated = false) {
        if (isDefault) {
            commands = commands.map(cmdArray => {
                cmdArray[2] = false;
                return cmdArray;
            });
        }
        commands.push([cmd, description || '', isDefault, aliases, deprecated]);
    };
    self.getCommands = () => commands;
    let descriptions = {};
    self.describe = function describe(keyOrKeys, desc) {
        if (Array.isArray(keyOrKeys)) {
            keyOrKeys.forEach(k => {
                self.describe(k, desc);
            });
        }
        else if (typeof keyOrKeys === 'object') {
            Object.keys(keyOrKeys).forEach(k => {
                self.describe(k, keyOrKeys[k]);
            });
        }
        else {
            descriptions[keyOrKeys] = desc;
        }
    };
    self.getDescriptions = () => descriptions;
    let epilogs = [];
    self.epilog = msg => {
        epilogs.push(msg);
    };
    let wrapSet = false;
    let wrap;
    self.wrap = cols => {
        wrapSet = true;
        wrap = cols;
    };
    function getWrap() {
        if (!wrapSet) {
            wrap = windowWidth();
            wrapSet = true;
        }
        return wrap;
    }
    const deferY18nLookupPrefix = '__yargsString__:';
    self.deferY18nLookup = str => deferY18nLookupPrefix + str;
    self.help = function help() {
        if (cachedHelpMessage)
            return cachedHelpMessage;
        normalizeAliases();
        const base$0 = yargs.customScriptName
            ? yargs.$0
            : shim.path.basename(yargs.$0);
        const demandedOptions = yargs.getDemandedOptions();
        const demandedCommands = yargs.getDemandedCommands();
        const deprecatedOptions = yargs.getDeprecatedOptions();
        const groups = yargs.getGroups();
        const options = yargs.getOptions();
        let keys = [];
        keys = keys.concat(Object.keys(descriptions));
        keys = keys.concat(Object.keys(demandedOptions));
        keys = keys.concat(Object.keys(demandedCommands));
        keys = keys.concat(Object.keys(options.default));
        keys = keys.filter(filterHiddenOptions);
        keys = Object.keys(keys.reduce((acc, key) => {
            if (key !== '_')
                acc[key] = true;
            return acc;
        }, {}));
        const theWrap = getWrap();
        const ui = shim.cliui({
            width: theWrap,
            wrap: !!theWrap,
        });
        if (!usageDisabled) {
            if (usages.length) {
                usages.forEach(usage => {
                    ui.div(`${usage[0].replace(/\$0/g, base$0)}`);
                    if (usage[1]) {
                        ui.div({ text: `${usage[1]}`, padding: [1, 0, 0, 0] });
                    }
                });
                ui.div();
            }
            else if (commands.length) {
                let u = null;
                if (demandedCommands._) {
                    u = `${base$0} <${__('command')}>\n`;
                }
                else {
                    u = `${base$0} [${__('command')}]\n`;
                }
                ui.div(`${u}`);
            }
        }
        if (commands.length) {
            ui.div(__('Commands:'));
            const context = yargs.getContext();
            const parentCommands = context.commands.length
                ? `${context.commands.join(' ')} `
                : '';
            if (yargs.getParserConfiguration()['sort-commands'] === true) {
                commands = commands.sort((a, b) => a[0].localeCompare(b[0]));
            }
            commands.forEach(command => {
                const commandString = `${base$0} ${parentCommands}${command[0].replace(/^\$0 ?/, '')}`;
                ui.span({
                    text: commandString,
                    padding: [0, 2, 0, 2],
                    width: maxWidth(commands, theWrap, `${base$0}${parentCommands}`) + 4,
                }, { text: command[1] });
                const hints = [];
                if (command[2])
                    hints.push(`[${__('default')}]`);
                if (command[3] && command[3].length) {
                    hints.push(`[${__('aliases:')} ${command[3].join(', ')}]`);
                }
                if (command[4]) {
                    if (typeof command[4] === 'string') {
                        hints.push(`[${__('deprecated: %s', command[4])}]`);
                    }
                    else {
                        hints.push(`[${__('deprecated')}]`);
                    }
                }
                if (hints.length) {
                    ui.div({
                        text: hints.join(' '),
                        padding: [0, 0, 0, 2],
                        align: 'right',
                    });
                }
                else {
                    ui.div();
                }
            });
            ui.div();
        }
        const aliasKeys = (Object.keys(options.alias) || []).concat(Object.keys(yargs.parsed.newAliases) || []);
        keys = keys.filter(key => !yargs.parsed.newAliases[key] &&
            aliasKeys.every(alias => (options.alias[alias] || []).indexOf(key) === -1));
        const defaultGroup = __('Options:');
        if (!groups[defaultGroup])
            groups[defaultGroup] = [];
        addUngroupedKeys(keys, options.alias, groups, defaultGroup);
        const isLongSwitch = (sw) => /^--/.test(getText(sw));
        const displayedGroups = Object.keys(groups)
            .filter(groupName => groups[groupName].length > 0)
            .map(groupName => {
            const normalizedKeys = groups[groupName]
                .filter(filterHiddenOptions)
                .map(key => {
                if (~aliasKeys.indexOf(key))
                    return key;
                for (let i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== undefined; i++) {
                    if (~(options.alias[aliasKey] || []).indexOf(key))
                        return aliasKey;
                }
                return key;
            });
            return { groupName, normalizedKeys };
        })
            .filter(({ normalizedKeys }) => normalizedKeys.length > 0)
            .map(({ groupName, normalizedKeys }) => {
            const switches = normalizedKeys.reduce((acc, key) => {
                acc[key] = [key]
                    .concat(options.alias[key] || [])
                    .map(sw => {
                    if (groupName === self.getPositionalGroupName())
                        return sw;
                    else {
                        return ((/^[0-9]$/.test(sw)
                            ? ~options.boolean.indexOf(key)
                                ? '-'
                                : '--'
                            : sw.length > 1
                                ? '--'
                                : '-') + sw);
                    }
                })
                    .sort((sw1, sw2) => isLongSwitch(sw1) === isLongSwitch(sw2)
                    ? 0
                    : isLongSwitch(sw1)
                        ? 1
                        : -1)
                    .join(', ');
                return acc;
            }, {});
            return { groupName, normalizedKeys, switches };
        });
        const shortSwitchesUsed = displayedGroups
            .filter(({ groupName }) => groupName !== self.getPositionalGroupName())
            .some(({ normalizedKeys, switches }) => !normalizedKeys.every(key => isLongSwitch(switches[key])));
        if (shortSwitchesUsed) {
            displayedGroups
                .filter(({ groupName }) => groupName !== self.getPositionalGroupName())
                .forEach(({ normalizedKeys, switches }) => {
                normalizedKeys.forEach(key => {
                    if (isLongSwitch(switches[key])) {
                        switches[key] = addIndentation(switches[key], '-x, '.length);
                    }
                });
            });
        }
        displayedGroups.forEach(({ groupName, normalizedKeys, switches }) => {
            ui.div(groupName);
            normalizedKeys.forEach(key => {
                const kswitch = switches[key];
                let desc = descriptions[key] || '';
                let type = null;
                if (~desc.lastIndexOf(deferY18nLookupPrefix))
                    desc = __(desc.substring(deferY18nLookupPrefix.length));
                if (~options.boolean.indexOf(key))
                    type = `[${__('boolean')}]`;
                if (~options.count.indexOf(key))
                    type = `[${__('count')}]`;
                if (~options.string.indexOf(key))
                    type = `[${__('string')}]`;
                if (~options.normalize.indexOf(key))
                    type = `[${__('string')}]`;
                if (~options.array.indexOf(key))
                    type = `[${__('array')}]`;
                if (~options.number.indexOf(key))
                    type = `[${__('number')}]`;
                const deprecatedExtra = (deprecated) => typeof deprecated === 'string'
                    ? `[${__('deprecated: %s', deprecated)}]`
                    : `[${__('deprecated')}]`;
                const extra = [
                    key in deprecatedOptions
                        ? deprecatedExtra(deprecatedOptions[key])
                        : null,
                    type,
                    key in demandedOptions ? `[${__('required')}]` : null,
                    options.choices && options.choices[key]
                        ? `[${__('choices:')} ${self.stringifiedValues(options.choices[key])}]`
                        : null,
                    defaultString(options.default[key], options.defaultDescription[key]),
                ]
                    .filter(Boolean)
                    .join(' ');
                ui.span({
                    text: getText(kswitch),
                    padding: [0, 2, 0, 2 + getIndentation(kswitch)],
                    width: maxWidth(switches, theWrap) + 4,
                }, desc);
                if (extra)
                    ui.div({ text: extra, padding: [0, 0, 0, 2], align: 'right' });
                else
                    ui.div();
            });
            ui.div();
        });
        if (examples.length) {
            ui.div(__('Examples:'));
            examples.forEach(example => {
                example[0] = example[0].replace(/\$0/g, base$0);
            });
            examples.forEach(example => {
                if (example[1] === '') {
                    ui.div({
                        text: example[0],
                        padding: [0, 2, 0, 2],
                    });
                }
                else {
                    ui.div({
                        text: example[0],
                        padding: [0, 2, 0, 2],
                        width: maxWidth(examples, theWrap) + 4,
                    }, {
                        text: example[1],
                    });
                }
            });
            ui.div();
        }
        if (epilogs.length > 0) {
            const e = epilogs
                .map(epilog => epilog.replace(/\$0/g, base$0))
                .join('\n');
            ui.div(`${e}\n`);
        }
        return ui.toString().replace(/\s*$/, '');
    };
    function maxWidth(table, theWrap, modifier) {
        let width = 0;
        if (!Array.isArray(table)) {
            table = Object.values(table).map(v => [v]);
        }
        table.forEach(v => {
            width = Math.max(shim.stringWidth(modifier ? `${modifier} ${getText(v[0])}` : getText(v[0])) + getIndentation(v[0]), width);
        });
        if (theWrap)
            width = Math.min(width, parseInt((theWrap * 0.5).toString(), 10));
        return width;
    }
    function normalizeAliases() {
        const demandedOptions = yargs.getDemandedOptions();
        const options = yargs.getOptions();
        (Object.keys(options.alias) || []).forEach(key => {
            options.alias[key].forEach(alias => {
                if (descriptions[alias])
                    self.describe(key, descriptions[alias]);
                if (alias in demandedOptions)
                    yargs.demandOption(key, demandedOptions[alias]);
                if (~options.boolean.indexOf(alias))
                    yargs.boolean(key);
                if (~options.count.indexOf(alias))
                    yargs.count(key);
                if (~options.string.indexOf(alias))
                    yargs.string(key);
                if (~options.normalize.indexOf(alias))
                    yargs.normalize(key);
                if (~options.array.indexOf(alias))
                    yargs.array(key);
                if (~options.number.indexOf(alias))
                    yargs.number(key);
            });
        });
    }
    let cachedHelpMessage;
    self.cacheHelpMessage = function () {
        cachedHelpMessage = this.help();
    };
    self.clearCachedHelpMessage = function () {
        cachedHelpMessage = undefined;
    };
    function addUngroupedKeys(keys, aliases, groups, defaultGroup) {
        let groupedKeys = [];
        let toCheck = null;
        Object.keys(groups).forEach(group => {
            groupedKeys = groupedKeys.concat(groups[group]);
        });
        keys.forEach(key => {
            toCheck = [key].concat(aliases[key]);
            if (!toCheck.some(k => groupedKeys.indexOf(k) !== -1)) {
                groups[defaultGroup].push(key);
            }
        });
        return groupedKeys;
    }
    function filterHiddenOptions(key) {
        return (yargs.getOptions().hiddenOptions.indexOf(key) < 0 ||
            yargs.parsed.argv[yargs.getOptions().showHiddenOpt]);
    }
    self.showHelp = (level) => {
        const logger = yargs._getLoggerInstance();
        if (!level)
            level = 'error';
        const emit = typeof level === 'function' ? level : logger[level];
        emit(self.help());
    };
    self.functionDescription = fn => {
        const description = fn.name
            ? shim.Parser.decamelize(fn.name, '-')
            : __('generated-value');
        return ['(', description, ')'].join('');
    };
    self.stringifiedValues = function stringifiedValues(values, separator) {
        let string = '';
        const sep = separator || ', ';
        const array = [].concat(values);
        if (!values || !array.length)
            return string;
        array.forEach(value => {
            if (string.length)
                string += sep;
            string += JSON.stringify(value);
        });
        return string;
    };
    function defaultString(value, defaultDescription) {
        let string = `[${__('default:')} `;
        if (value === undefined && !defaultDescription)
            return null;
        if (defaultDescription) {
            string += defaultDescription;
        }
        else {
            switch (typeof value) {
                case 'string':
                    string += `"${value}"`;
                    break;
                case 'object':
                    string += JSON.stringify(value);
                    break;
                default:
                    string += value;
            }
        }
        return `${string}]`;
    }
    function windowWidth() {
        const maxWidth = 80;
        if (shim.process.stdColumns) {
            return Math.min(maxWidth, shim.process.stdColumns);
        }
        else {
            return maxWidth;
        }
    }
    let version = null;
    self.version = ver => {
        version = ver;
    };
    self.showVersion = () => {
        const logger = yargs._getLoggerInstance();
        logger.log(version);
    };
    self.reset = function reset(localLookup) {
        failMessage = null;
        failureOutput = false;
        usages = [];
        usageDisabled = false;
        epilogs = [];
        examples = [];
        commands = [];
        descriptions = objFilter(descriptions, k => !localLookup[k]);
        return self;
    };
    const frozens = [];
    self.freeze = function freeze() {
        frozens.push({
            failMessage,
            failureOutput,
            usages,
            usageDisabled,
            epilogs,
            examples,
            commands,
            descriptions,
        });
    };
    self.unfreeze = function unfreeze() {
        const frozen = frozens.pop();
        assertNotStrictEqual(frozen, undefined, shim);
        ({
            failMessage,
            failureOutput,
            usages,
            usageDisabled,
            epilogs,
            examples,
            commands,
            descriptions,
        } = frozen);
    };
    return self;
}
function isIndentedText(text) {
    return typeof text === 'object';
}
function addIndentation(text, indent) {
    return isIndentedText(text)
        ? { text: text.text, indentation: text.indentation + indent }
        : { text, indentation: indent };
}
function getIndentation(text) {
    return isIndentedText(text) ? text.indentation : 0;
}
function getText(text) {
    return isIndentedText(text) ? text.text : text;
}

const completionShTemplate = `###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.bashrc
#    or {{app_path}} {{completion_command}} >> ~/.bash_profile on OSX.
#
_yargs_completions()
{
    local cur_word args type_list

    cur_word="\${COMP_WORDS[COMP_CWORD]}"
    args=("\${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$({{app_path}} --get-yargs-completions "\${args[@]}")

    COMPREPLY=( $(compgen -W "\${type_list}" -- \${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ \${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o default -F _yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
`;
const completionZshTemplate = `###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.zshrc
#    or {{app_path}} {{completion_command}} >> ~/.zsh_profile on OSX.
#
_{{app_name}}_yargs_completions()
{
  local reply
  local si=$IFS
  IFS=$'\n' reply=($(COMP_CWORD="$((CURRENT-1))" COMP_LINE="$BUFFER" COMP_POINT="$CURSOR" {{app_path}} --get-yargs-completions "\${words[@]}"))
  IFS=$si
  _describe 'values' reply
}
compdef _{{app_name}}_yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
`;

function completion(yargs, usage, command, shim) {
    const self = {
        completionKey: 'get-yargs-completions',
    };
    let aliases;
    self.setParsed = function setParsed(parsed) {
        aliases = parsed.aliases;
    };
    const zshShell = (shim.getEnv('SHELL') && shim.getEnv('SHELL').indexOf('zsh') !== -1) ||
        (shim.getEnv('ZSH_NAME') && shim.getEnv('ZSH_NAME').indexOf('zsh') !== -1);
    self.getCompletion = function getCompletion(args, done) {
        const completions = [];
        const current = args.length ? args[args.length - 1] : '';
        const argv = yargs.parse(args, true);
        const parentCommands = yargs.getContext().commands;
        function runCompletionFunction(argv) {
            assertNotStrictEqual(completionFunction, null, shim);
            if (isSyncCompletionFunction(completionFunction)) {
                const result = completionFunction(current, argv);
                if (isPromise(result)) {
                    return result
                        .then(list => {
                        shim.process.nextTick(() => {
                            done(list);
                        });
                    })
                        .catch(err => {
                        shim.process.nextTick(() => {
                            throw err;
                        });
                    });
                }
                return done(result);
            }
            else {
                return completionFunction(current, argv, completions => {
                    done(completions);
                });
            }
        }
        if (completionFunction) {
            return isPromise(argv)
                ? argv.then(runCompletionFunction)
                : runCompletionFunction(argv);
        }
        const handlers = command.getCommandHandlers();
        for (let i = 0, ii = args.length; i < ii; ++i) {
            if (handlers[args[i]] && handlers[args[i]].builder) {
                const builder = handlers[args[i]].builder;
                if (isCommandBuilderCallback(builder)) {
                    const y = yargs.reset();
                    builder(y);
                    return y.argv;
                }
            }
        }
        if (!current.match(/^-/) &&
            parentCommands[parentCommands.length - 1] !== current) {
            usage.getCommands().forEach(usageCommand => {
                const commandName = parseCommand(usageCommand[0]).cmd;
                if (args.indexOf(commandName) === -1) {
                    if (!zshShell) {
                        completions.push(commandName);
                    }
                    else {
                        const desc = usageCommand[1] || '';
                        completions.push(commandName.replace(/:/g, '\\:') + ':' + desc);
                    }
                }
            });
        }
        if (current.match(/^-/) || (current === '' && completions.length === 0)) {
            const descs = usage.getDescriptions();
            const options = yargs.getOptions();
            Object.keys(options.key).forEach(key => {
                const negable = !!options.configuration['boolean-negation'] &&
                    options.boolean.includes(key);
                let keyAndAliases = [key].concat(aliases[key] || []);
                if (negable)
                    keyAndAliases = keyAndAliases.concat(keyAndAliases.map(key => `no-${key}`));
                function completeOptionKey(key) {
                    const notInArgs = keyAndAliases.every(val => args.indexOf(`--${val}`) === -1);
                    if (notInArgs) {
                        const startsByTwoDashes = (s) => /^--/.test(s);
                        const isShortOption = (s) => /^[^0-9]$/.test(s);
                        const dashes = !startsByTwoDashes(current) && isShortOption(key) ? '-' : '--';
                        if (!zshShell) {
                            completions.push(dashes + key);
                        }
                        else {
                            const desc = descs[key] || '';
                            completions.push(dashes +
                                `${key.replace(/:/g, '\\:')}:${desc.replace('__yargsString__:', '')}`);
                        }
                    }
                }
                completeOptionKey(key);
                if (negable && !!options.default[key])
                    completeOptionKey(`no-${key}`);
            });
        }
        done(completions);
    };
    self.generateCompletionScript = function generateCompletionScript($0, cmd) {
        let script = zshShell
            ? completionZshTemplate
            : completionShTemplate;
        const name = shim.path.basename($0);
        if ($0.match(/\.js$/))
            $0 = `./${$0}`;
        script = script.replace(/{{app_name}}/g, name);
        script = script.replace(/{{completion_command}}/g, cmd);
        return script.replace(/{{app_path}}/g, $0);
    };
    let completionFunction = null;
    self.registerFunction = fn => {
        completionFunction = fn;
    };
    return self;
}
function isSyncCompletionFunction(completionFunction) {
    return completionFunction.length < 3;
}

function levenshtein(a, b) {
    if (a.length === 0)
        return b.length;
    if (b.length === 0)
        return a.length;
    const matrix = [];
    let i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    let j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

const specialKeys = ['$0', '--', '_'];
function validation(yargs, usage, y18n, shim) {
    const __ = y18n.__;
    const __n = y18n.__n;
    const self = {};
    self.nonOptionCount = function nonOptionCount(argv) {
        const demandedCommands = yargs.getDemandedCommands();
        const positionalCount = argv._.length + (argv['--'] ? argv['--'].length : 0);
        const _s = positionalCount - yargs.getContext().commands.length;
        if (demandedCommands._ &&
            (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
            if (_s < demandedCommands._.min) {
                if (demandedCommands._.minMsg !== undefined) {
                    usage.fail(demandedCommands._.minMsg
                        ? demandedCommands._.minMsg
                            .replace(/\$0/g, _s.toString())
                            .replace(/\$1/, demandedCommands._.min.toString())
                        : null);
                }
                else {
                    usage.fail(__n('Not enough non-option arguments: got %s, need at least %s', 'Not enough non-option arguments: got %s, need at least %s', _s, _s.toString(), demandedCommands._.min.toString()));
                }
            }
            else if (_s > demandedCommands._.max) {
                if (demandedCommands._.maxMsg !== undefined) {
                    usage.fail(demandedCommands._.maxMsg
                        ? demandedCommands._.maxMsg
                            .replace(/\$0/g, _s.toString())
                            .replace(/\$1/, demandedCommands._.max.toString())
                        : null);
                }
                else {
                    usage.fail(__n('Too many non-option arguments: got %s, maximum of %s', 'Too many non-option arguments: got %s, maximum of %s', _s, _s.toString(), demandedCommands._.max.toString()));
                }
            }
        }
    };
    self.positionalCount = function positionalCount(required, observed) {
        if (observed < required) {
            usage.fail(__n('Not enough non-option arguments: got %s, need at least %s', 'Not enough non-option arguments: got %s, need at least %s', observed, observed + '', required + ''));
        }
    };
    self.requiredArguments = function requiredArguments(argv) {
        const demandedOptions = yargs.getDemandedOptions();
        let missing = null;
        for (const key of Object.keys(demandedOptions)) {
            if (!Object.prototype.hasOwnProperty.call(argv, key) ||
                typeof argv[key] === 'undefined') {
                missing = missing || {};
                missing[key] = demandedOptions[key];
            }
        }
        if (missing) {
            const customMsgs = [];
            for (const key of Object.keys(missing)) {
                const msg = missing[key];
                if (msg && customMsgs.indexOf(msg) < 0) {
                    customMsgs.push(msg);
                }
            }
            const customMsg = customMsgs.length ? `\n${customMsgs.join('\n')}` : '';
            usage.fail(__n('Missing required argument: %s', 'Missing required arguments: %s', Object.keys(missing).length, Object.keys(missing).join(', ') + customMsg));
        }
    };
    self.unknownArguments = function unknownArguments(argv, aliases, positionalMap, isDefaultCommand, checkPositionals = true) {
        const commandKeys = yargs.getCommandInstance().getCommands();
        const unknown = [];
        const currentContext = yargs.getContext();
        Object.keys(argv).forEach(key => {
            if (specialKeys.indexOf(key) === -1 &&
                !Object.prototype.hasOwnProperty.call(positionalMap, key) &&
                !Object.prototype.hasOwnProperty.call(yargs._getParseContext(), key) &&
                !self.isValidAndSomeAliasIsNotNew(key, aliases)) {
                unknown.push(key);
            }
        });
        if (checkPositionals &&
            (currentContext.commands.length > 0 ||
                commandKeys.length > 0 ||
                isDefaultCommand)) {
            argv._.slice(currentContext.commands.length).forEach(key => {
                if (commandKeys.indexOf('' + key) === -1) {
                    unknown.push('' + key);
                }
            });
        }
        if (unknown.length > 0) {
            usage.fail(__n('Unknown argument: %s', 'Unknown arguments: %s', unknown.length, unknown.join(', ')));
        }
    };
    self.unknownCommands = function unknownCommands(argv) {
        const commandKeys = yargs.getCommandInstance().getCommands();
        const unknown = [];
        const currentContext = yargs.getContext();
        if (currentContext.commands.length > 0 || commandKeys.length > 0) {
            argv._.slice(currentContext.commands.length).forEach(key => {
                if (commandKeys.indexOf('' + key) === -1) {
                    unknown.push('' + key);
                }
            });
        }
        if (unknown.length > 0) {
            usage.fail(__n('Unknown command: %s', 'Unknown commands: %s', unknown.length, unknown.join(', ')));
            return true;
        }
        else {
            return false;
        }
    };
    self.isValidAndSomeAliasIsNotNew = function isValidAndSomeAliasIsNotNew(key, aliases) {
        if (!Object.prototype.hasOwnProperty.call(aliases, key)) {
            return false;
        }
        const newAliases = yargs.parsed.newAliases;
        for (const a of [key, ...aliases[key]]) {
            if (!Object.prototype.hasOwnProperty.call(newAliases, a) ||
                !newAliases[key]) {
                return true;
            }
        }
        return false;
    };
    self.limitedChoices = function limitedChoices(argv) {
        const options = yargs.getOptions();
        const invalid = {};
        if (!Object.keys(options.choices).length)
            return;
        Object.keys(argv).forEach(key => {
            if (specialKeys.indexOf(key) === -1 &&
                Object.prototype.hasOwnProperty.call(options.choices, key)) {
                [].concat(argv[key]).forEach(value => {
                    if (options.choices[key].indexOf(value) === -1 &&
                        value !== undefined) {
                        invalid[key] = (invalid[key] || []).concat(value);
                    }
                });
            }
        });
        const invalidKeys = Object.keys(invalid);
        if (!invalidKeys.length)
            return;
        let msg = __('Invalid values:');
        invalidKeys.forEach(key => {
            msg += `\n  ${__('Argument: %s, Given: %s, Choices: %s', key, usage.stringifiedValues(invalid[key]), usage.stringifiedValues(options.choices[key]))}`;
        });
        usage.fail(msg);
    };
    let checks = [];
    self.check = function check(f, global) {
        checks.push({
            func: f,
            global,
        });
    };
    self.customChecks = function customChecks(argv, aliases) {
        for (let i = 0, f; (f = checks[i]) !== undefined; i++) {
            const func = f.func;
            let result = null;
            try {
                result = func(argv, aliases);
            }
            catch (err) {
                usage.fail(err.message ? err.message : err, err);
                continue;
            }
            if (!result) {
                usage.fail(__('Argument check failed: %s', func.toString()));
            }
            else if (typeof result === 'string' || result instanceof Error) {
                usage.fail(result.toString(), result);
            }
        }
    };
    let implied = {};
    self.implies = function implies(key, value) {
        argsert('<string|object> [array|number|string]', [key, value], arguments.length);
        if (typeof key === 'object') {
            Object.keys(key).forEach(k => {
                self.implies(k, key[k]);
            });
        }
        else {
            yargs.global(key);
            if (!implied[key]) {
                implied[key] = [];
            }
            if (Array.isArray(value)) {
                value.forEach(i => self.implies(key, i));
            }
            else {
                assertNotStrictEqual(value, undefined, shim);
                implied[key].push(value);
            }
        }
    };
    self.getImplied = function getImplied() {
        return implied;
    };
    function keyExists(argv, val) {
        const num = Number(val);
        val = isNaN(num) ? val : num;
        if (typeof val === 'number') {
            val = argv._.length >= val;
        }
        else if (val.match(/^--no-.+/)) {
            val = val.match(/^--no-(.+)/)[1];
            val = !argv[val];
        }
        else {
            val = argv[val];
        }
        return val;
    }
    self.implications = function implications(argv) {
        const implyFail = [];
        Object.keys(implied).forEach(key => {
            const origKey = key;
            (implied[key] || []).forEach(value => {
                let key = origKey;
                const origValue = value;
                key = keyExists(argv, key);
                value = keyExists(argv, value);
                if (key && !value) {
                    implyFail.push(` ${origKey} -> ${origValue}`);
                }
            });
        });
        if (implyFail.length) {
            let msg = `${__('Implications failed:')}\n`;
            implyFail.forEach(value => {
                msg += value;
            });
            usage.fail(msg);
        }
    };
    let conflicting = {};
    self.conflicts = function conflicts(key, value) {
        argsert('<string|object> [array|string]', [key, value], arguments.length);
        if (typeof key === 'object') {
            Object.keys(key).forEach(k => {
                self.conflicts(k, key[k]);
            });
        }
        else {
            yargs.global(key);
            if (!conflicting[key]) {
                conflicting[key] = [];
            }
            if (Array.isArray(value)) {
                value.forEach(i => self.conflicts(key, i));
            }
            else {
                conflicting[key].push(value);
            }
        }
    };
    self.getConflicting = () => conflicting;
    self.conflicting = function conflictingFn(argv) {
        Object.keys(argv).forEach(key => {
            if (conflicting[key]) {
                conflicting[key].forEach(value => {
                    if (value && argv[key] !== undefined && argv[value] !== undefined) {
                        usage.fail(__('Arguments %s and %s are mutually exclusive', key, value));
                    }
                });
            }
        });
    };
    self.recommendCommands = function recommendCommands(cmd, potentialCommands) {
        const threshold = 3;
        potentialCommands = potentialCommands.sort((a, b) => b.length - a.length);
        let recommended = null;
        let bestDistance = Infinity;
        for (let i = 0, candidate; (candidate = potentialCommands[i]) !== undefined; i++) {
            const d = levenshtein(cmd, candidate);
            if (d <= threshold && d < bestDistance) {
                bestDistance = d;
                recommended = candidate;
            }
        }
        if (recommended)
            usage.fail(__('Did you mean %s?', recommended));
    };
    self.reset = function reset(localLookup) {
        implied = objFilter(implied, k => !localLookup[k]);
        conflicting = objFilter(conflicting, k => !localLookup[k]);
        checks = checks.filter(c => c.global);
        return self;
    };
    const frozens = [];
    self.freeze = function freeze() {
        frozens.push({
            implied,
            checks,
            conflicting,
        });
    };
    self.unfreeze = function unfreeze() {
        const frozen = frozens.pop();
        assertNotStrictEqual(frozen, undefined, shim);
        ({ implied, checks, conflicting } = frozen);
    };
    return self;
}

let shim$1;
function YargsWithShim(_shim) {
    shim$1 = _shim;
    return Yargs;
}
function Yargs(processArgs = [], cwd = shim$1.process.cwd(), parentRequire) {
    const self = {};
    let command$1;
    let completion$1 = null;
    let groups = {};
    const globalMiddleware = [];
    let output = '';
    const preservedGroups = {};
    let usage$1;
    let validation$1;
    let handlerFinishCommand = null;
    const y18n = shim$1.y18n;
    self.middleware = globalMiddlewareFactory(globalMiddleware, self);
    self.scriptName = function (scriptName) {
        self.customScriptName = true;
        self.$0 = scriptName;
        return self;
    };
    let default$0;
    if (/\b(node|iojs|electron)(\.exe)?$/.test(shim$1.process.argv()[0])) {
        default$0 = shim$1.process.argv().slice(1, 2);
    }
    else {
        default$0 = shim$1.process.argv().slice(0, 1);
    }
    self.$0 = default$0
        .map(x => {
        const b = rebase(cwd, x);
        return x.match(/^(\/|([a-zA-Z]:)?\\)/) && b.length < x.length ? b : x;
    })
        .join(' ')
        .trim();
    if (shim$1.getEnv('_') && shim$1.getProcessArgvBin() === shim$1.getEnv('_')) {
        self.$0 = shim$1
            .getEnv('_')
            .replace(`${shim$1.path.dirname(shim$1.process.execPath())}/`, '');
    }
    const context = { resets: -1, commands: [], fullCommands: [], files: [] };
    self.getContext = () => context;
    let hasOutput = false;
    let exitError = null;
    self.exit = (code, err) => {
        hasOutput = true;
        exitError = err;
        if (exitProcess)
            shim$1.process.exit(code);
    };
    let completionCommand = null;
    self.completion = function (cmd, desc, fn) {
        argsert('[string] [string|boolean|function] [function]', [cmd, desc, fn], arguments.length);
        if (typeof desc === 'function') {
            fn = desc;
            desc = undefined;
        }
        completionCommand = cmd || completionCommand || 'completion';
        if (!desc && desc !== false) {
            desc = 'generate completion script';
        }
        self.command(completionCommand, desc);
        if (fn)
            completion$1.registerFunction(fn);
        return self;
    };
    let options;
    self.resetOptions = self.reset = function resetOptions(aliases = {}) {
        context.resets++;
        options = options || {};
        const tmpOptions = {};
        tmpOptions.local = options.local ? options.local : [];
        tmpOptions.configObjects = options.configObjects
            ? options.configObjects
            : [];
        const localLookup = {};
        tmpOptions.local.forEach(l => {
            localLookup[l] = true;
            (aliases[l] || []).forEach(a => {
                localLookup[a] = true;
            });
        });
        Object.assign(preservedGroups, Object.keys(groups).reduce((acc, groupName) => {
            const keys = groups[groupName].filter(key => !(key in localLookup));
            if (keys.length > 0) {
                acc[groupName] = keys;
            }
            return acc;
        }, {}));
        groups = {};
        const arrayOptions = [
            'array',
            'boolean',
            'string',
            'skipValidation',
            'count',
            'normalize',
            'number',
            'hiddenOptions',
        ];
        const objectOptions = [
            'narg',
            'key',
            'alias',
            'default',
            'defaultDescription',
            'config',
            'choices',
            'demandedOptions',
            'demandedCommands',
            'coerce',
            'deprecatedOptions',
        ];
        arrayOptions.forEach(k => {
            tmpOptions[k] = (options[k] || []).filter((k) => !localLookup[k]);
        });
        objectOptions.forEach((k) => {
            tmpOptions[k] = objFilter(options[k], k => !localLookup[k]);
        });
        tmpOptions.envPrefix = options.envPrefix;
        options = tmpOptions;
        usage$1 = usage$1 ? usage$1.reset(localLookup) : usage(self, y18n, shim$1);
        validation$1 = validation$1
            ? validation$1.reset(localLookup)
            : validation(self, usage$1, y18n, shim$1);
        command$1 = command$1
            ? command$1.reset()
            : command(self, usage$1, validation$1, globalMiddleware, shim$1);
        if (!completion$1)
            completion$1 = completion(self, usage$1, command$1, shim$1);
        completionCommand = null;
        output = '';
        exitError = null;
        hasOutput = false;
        self.parsed = false;
        return self;
    };
    self.resetOptions();
    const frozens = [];
    function freeze() {
        frozens.push({
            options,
            configObjects: options.configObjects.slice(0),
            exitProcess,
            groups,
            strict,
            strictCommands,
            strictOptions,
            completionCommand,
            output,
            exitError,
            hasOutput,
            parsed: self.parsed,
            parseFn,
            parseContext,
            handlerFinishCommand,
        });
        usage$1.freeze();
        validation$1.freeze();
        command$1.freeze();
    }
    function unfreeze() {
        const frozen = frozens.pop();
        assertNotStrictEqual(frozen, undefined, shim$1);
        let configObjects;
        ({
            options,
            configObjects,
            exitProcess,
            groups,
            output,
            exitError,
            hasOutput,
            parsed: self.parsed,
            strict,
            strictCommands,
            strictOptions,
            completionCommand,
            parseFn,
            parseContext,
            handlerFinishCommand,
        } = frozen);
        options.configObjects = configObjects;
        usage$1.unfreeze();
        validation$1.unfreeze();
        command$1.unfreeze();
    }
    self.boolean = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('boolean', keys);
        return self;
    };
    self.array = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('array', keys);
        return self;
    };
    self.number = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('number', keys);
        return self;
    };
    self.normalize = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('normalize', keys);
        return self;
    };
    self.count = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('count', keys);
        return self;
    };
    self.string = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('string', keys);
        return self;
    };
    self.requiresArg = function (keys) {
        argsert('<array|string|object> [number]', [keys], arguments.length);
        if (typeof keys === 'string' && options.narg[keys]) {
            return self;
        }
        else {
            populateParserHintSingleValueDictionary(self.requiresArg, 'narg', keys, NaN);
        }
        return self;
    };
    self.skipValidation = function (keys) {
        argsert('<array|string>', [keys], arguments.length);
        populateParserHintArray('skipValidation', keys);
        return self;
    };
    function populateParserHintArray(type, keys) {
        keys = [].concat(keys);
        keys.forEach(key => {
            key = sanitizeKey(key);
            options[type].push(key);
        });
    }
    self.nargs = function (key, value) {
        argsert('<string|object|array> [number]', [key, value], arguments.length);
        populateParserHintSingleValueDictionary(self.nargs, 'narg', key, value);
        return self;
    };
    self.choices = function (key, value) {
        argsert('<object|string|array> [string|array]', [key, value], arguments.length);
        populateParserHintArrayDictionary(self.choices, 'choices', key, value);
        return self;
    };
    self.alias = function (key, value) {
        argsert('<object|string|array> [string|array]', [key, value], arguments.length);
        populateParserHintArrayDictionary(self.alias, 'alias', key, value);
        return self;
    };
    self.default = self.defaults = function (key, value, defaultDescription) {
        argsert('<object|string|array> [*] [string]', [key, value, defaultDescription], arguments.length);
        if (defaultDescription) {
            assertSingleKey(key, shim$1);
            options.defaultDescription[key] = defaultDescription;
        }
        if (typeof value === 'function') {
            assertSingleKey(key, shim$1);
            if (!options.defaultDescription[key])
                options.defaultDescription[key] = usage$1.functionDescription(value);
            value = value.call();
        }
        populateParserHintSingleValueDictionary(self.default, 'default', key, value);
        return self;
    };
    self.describe = function (key, desc) {
        argsert('<object|string|array> [string]', [key, desc], arguments.length);
        setKey(key, true);
        usage$1.describe(key, desc);
        return self;
    };
    function setKey(key, set) {
        populateParserHintSingleValueDictionary(setKey, 'key', key, set);
        return self;
    }
    function demandOption(keys, msg) {
        argsert('<object|string|array> [string]', [keys, msg], arguments.length);
        populateParserHintSingleValueDictionary(self.demandOption, 'demandedOptions', keys, msg);
        return self;
    }
    self.demandOption = demandOption;
    self.coerce = function (keys, value) {
        argsert('<object|string|array> [function]', [keys, value], arguments.length);
        populateParserHintSingleValueDictionary(self.coerce, 'coerce', keys, value);
        return self;
    };
    function populateParserHintSingleValueDictionary(builder, type, key, value) {
        populateParserHintDictionary(builder, type, key, value, (type, key, value) => {
            options[type][key] = value;
        });
    }
    function populateParserHintArrayDictionary(builder, type, key, value) {
        populateParserHintDictionary(builder, type, key, value, (type, key, value) => {
            options[type][key] = (options[type][key] || []).concat(value);
        });
    }
    function populateParserHintDictionary(builder, type, key, value, singleKeyHandler) {
        if (Array.isArray(key)) {
            key.forEach(k => {
                builder(k, value);
            });
        }
        else if (((key) => typeof key === 'object')(key)) {
            for (const k of objectKeys(key)) {
                builder(k, key[k]);
            }
        }
        else {
            singleKeyHandler(type, sanitizeKey(key), value);
        }
    }
    function sanitizeKey(key) {
        if (key === '__proto__')
            return '___proto___';
        return key;
    }
    function deleteFromParserHintObject(optionKey) {
        objectKeys(options).forEach((hintKey) => {
            if (((key) => key === 'configObjects')(hintKey))
                return;
            const hint = options[hintKey];
            if (Array.isArray(hint)) {
                if (~hint.indexOf(optionKey))
                    hint.splice(hint.indexOf(optionKey), 1);
            }
            else if (typeof hint === 'object') {
                delete hint[optionKey];
            }
        });
        delete usage$1.getDescriptions()[optionKey];
    }
    self.config = function config(key = 'config', msg, parseFn) {
        argsert('[object|string] [string|function] [function]', [key, msg, parseFn], arguments.length);
        if (typeof key === 'object' && !Array.isArray(key)) {
            key = applyExtends(key, cwd, self.getParserConfiguration()['deep-merge-config'] || false, shim$1);
            options.configObjects = (options.configObjects || []).concat(key);
            return self;
        }
        if (typeof msg === 'function') {
            parseFn = msg;
            msg = undefined;
        }
        self.describe(key, msg || usage$1.deferY18nLookup('Path to JSON config file'));
        (Array.isArray(key) ? key : [key]).forEach(k => {
            options.config[k] = parseFn || true;
        });
        return self;
    };
    self.example = function (cmd, description) {
        argsert('<string|array> [string]', [cmd, description], arguments.length);
        if (Array.isArray(cmd)) {
            cmd.forEach(exampleParams => self.example(...exampleParams));
        }
        else {
            usage$1.example(cmd, description);
        }
        return self;
    };
    self.command = function (cmd, description, builder, handler, middlewares, deprecated) {
        argsert('<string|array|object> [string|boolean] [function|object] [function] [array] [boolean|string]', [cmd, description, builder, handler, middlewares, deprecated], arguments.length);
        command$1.addHandler(cmd, description, builder, handler, middlewares, deprecated);
        return self;
    };
    self.commandDir = function (dir, opts) {
        argsert('<string> [object]', [dir, opts], arguments.length);
        const req = parentRequire || shim$1.require;
        command$1.addDirectory(dir, self.getContext(), req, shim$1.getCallerFile(), opts);
        return self;
    };
    self.demand = self.required = self.require = function demand(keys, max, msg) {
        if (Array.isArray(max)) {
            max.forEach(key => {
                assertNotStrictEqual(msg, true, shim$1);
                demandOption(key, msg);
            });
            max = Infinity;
        }
        else if (typeof max !== 'number') {
            msg = max;
            max = Infinity;
        }
        if (typeof keys === 'number') {
            assertNotStrictEqual(msg, true, shim$1);
            self.demandCommand(keys, max, msg, msg);
        }
        else if (Array.isArray(keys)) {
            keys.forEach(key => {
                assertNotStrictEqual(msg, true, shim$1);
                demandOption(key, msg);
            });
        }
        else {
            if (typeof msg === 'string') {
                demandOption(keys, msg);
            }
            else if (msg === true || typeof msg === 'undefined') {
                demandOption(keys);
            }
        }
        return self;
    };
    self.demandCommand = function demandCommand(min = 1, max, minMsg, maxMsg) {
        argsert('[number] [number|string] [string|null|undefined] [string|null|undefined]', [min, max, minMsg, maxMsg], arguments.length);
        if (typeof max !== 'number') {
            minMsg = max;
            max = Infinity;
        }
        self.global('_', false);
        options.demandedCommands._ = {
            min,
            max,
            minMsg,
            maxMsg,
        };
        return self;
    };
    self.getDemandedOptions = () => {
        argsert([], 0);
        return options.demandedOptions;
    };
    self.getDemandedCommands = () => {
        argsert([], 0);
        return options.demandedCommands;
    };
    self.deprecateOption = function deprecateOption(option, message) {
        argsert('<string> [string|boolean]', [option, message], arguments.length);
        options.deprecatedOptions[option] = message;
        return self;
    };
    self.getDeprecatedOptions = () => {
        argsert([], 0);
        return options.deprecatedOptions;
    };
    self.implies = function (key, value) {
        argsert('<string|object> [number|string|array]', [key, value], arguments.length);
        validation$1.implies(key, value);
        return self;
    };
    self.conflicts = function (key1, key2) {
        argsert('<string|object> [string|array]', [key1, key2], arguments.length);
        validation$1.conflicts(key1, key2);
        return self;
    };
    self.usage = function (msg, description, builder, handler) {
        argsert('<string|null|undefined> [string|boolean] [function|object] [function]', [msg, description, builder, handler], arguments.length);
        if (description !== undefined) {
            assertNotStrictEqual(msg, null, shim$1);
            if ((msg || '').match(/^\$0( |$)/)) {
                return self.command(msg, description, builder, handler);
            }
            else {
                throw new YError('.usage() description must start with $0 if being used as alias for .command()');
            }
        }
        else {
            usage$1.usage(msg);
            return self;
        }
    };
    self.epilogue = self.epilog = function (msg) {
        argsert('<string>', [msg], arguments.length);
        usage$1.epilog(msg);
        return self;
    };
    self.fail = function (f) {
        argsert('<function>', [f], arguments.length);
        usage$1.failFn(f);
        return self;
    };
    self.onFinishCommand = function (f) {
        argsert('<function>', [f], arguments.length);
        handlerFinishCommand = f;
        return self;
    };
    self.getHandlerFinishCommand = () => handlerFinishCommand;
    self.check = function (f, _global) {
        argsert('<function> [boolean]', [f, _global], arguments.length);
        validation$1.check(f, _global !== false);
        return self;
    };
    self.global = function global(globals, global) {
        argsert('<string|array> [boolean]', [globals, global], arguments.length);
        globals = [].concat(globals);
        if (global !== false) {
            options.local = options.local.filter(l => globals.indexOf(l) === -1);
        }
        else {
            globals.forEach(g => {
                if (options.local.indexOf(g) === -1)
                    options.local.push(g);
            });
        }
        return self;
    };
    self.pkgConf = function pkgConf(key, rootPath) {
        argsert('<string> [string]', [key, rootPath], arguments.length);
        let conf = null;
        const obj = pkgUp(rootPath || cwd);
        if (obj[key] && typeof obj[key] === 'object') {
            conf = applyExtends(obj[key], rootPath || cwd, self.getParserConfiguration()['deep-merge-config'] || false, shim$1);
            options.configObjects = (options.configObjects || []).concat(conf);
        }
        return self;
    };
    const pkgs = {};
    function pkgUp(rootPath) {
        const npath = rootPath || '*';
        if (pkgs[npath])
            return pkgs[npath];
        let obj = {};
        try {
            let startDir = rootPath || shim$1.mainFilename;
            if (!rootPath && shim$1.path.extname(startDir)) {
                startDir = shim$1.path.dirname(startDir);
            }
            const pkgJsonPath = shim$1.findUp(startDir, (dir, names) => {
                if (names.includes('package.json')) {
                    return 'package.json';
                }
                else {
                    return undefined;
                }
            });
            assertNotStrictEqual(pkgJsonPath, undefined, shim$1);
            obj = JSON.parse(shim$1.readFileSync(pkgJsonPath, 'utf8'));
        }
        catch (_noop) { }
        pkgs[npath] = obj || {};
        return pkgs[npath];
    }
    let parseFn = null;
    let parseContext = null;
    self.parse = function parse(args, shortCircuit, _parseFn) {
        argsert('[string|array] [function|boolean|object] [function]', [args, shortCircuit, _parseFn], arguments.length);
        freeze();
        if (typeof args === 'undefined') {
            const argv = self._parseArgs(processArgs);
            const tmpParsed = self.parsed;
            unfreeze();
            self.parsed = tmpParsed;
            return argv;
        }
        if (typeof shortCircuit === 'object') {
            parseContext = shortCircuit;
            shortCircuit = _parseFn;
        }
        if (typeof shortCircuit === 'function') {
            parseFn = shortCircuit;
            shortCircuit = false;
        }
        if (!shortCircuit)
            processArgs = args;
        if (parseFn)
            exitProcess = false;
        const parsed = self._parseArgs(args, !!shortCircuit);
        completion$1.setParsed(self.parsed);
        if (parseFn)
            parseFn(exitError, parsed, output);
        unfreeze();
        return parsed;
    };
    self._getParseContext = () => parseContext || {};
    self._hasParseCallback = () => !!parseFn;
    self.option = self.options = function option(key, opt) {
        argsert('<string|object> [object]', [key, opt], arguments.length);
        if (typeof key === 'object') {
            Object.keys(key).forEach(k => {
                self.options(k, key[k]);
            });
        }
        else {
            if (typeof opt !== 'object') {
                opt = {};
            }
            options.key[key] = true;
            if (opt.alias)
                self.alias(key, opt.alias);
            const deprecate = opt.deprecate || opt.deprecated;
            if (deprecate) {
                self.deprecateOption(key, deprecate);
            }
            const demand = opt.demand || opt.required || opt.require;
            if (demand) {
                self.demand(key, demand);
            }
            if (opt.demandOption) {
                self.demandOption(key, typeof opt.demandOption === 'string' ? opt.demandOption : undefined);
            }
            if (opt.conflicts) {
                self.conflicts(key, opt.conflicts);
            }
            if ('default' in opt) {
                self.default(key, opt.default);
            }
            if (opt.implies !== undefined) {
                self.implies(key, opt.implies);
            }
            if (opt.nargs !== undefined) {
                self.nargs(key, opt.nargs);
            }
            if (opt.config) {
                self.config(key, opt.configParser);
            }
            if (opt.normalize) {
                self.normalize(key);
            }
            if (opt.choices) {
                self.choices(key, opt.choices);
            }
            if (opt.coerce) {
                self.coerce(key, opt.coerce);
            }
            if (opt.group) {
                self.group(key, opt.group);
            }
            if (opt.boolean || opt.type === 'boolean') {
                self.boolean(key);
                if (opt.alias)
                    self.boolean(opt.alias);
            }
            if (opt.array || opt.type === 'array') {
                self.array(key);
                if (opt.alias)
                    self.array(opt.alias);
            }
            if (opt.number || opt.type === 'number') {
                self.number(key);
                if (opt.alias)
                    self.number(opt.alias);
            }
            if (opt.string || opt.type === 'string') {
                self.string(key);
                if (opt.alias)
                    self.string(opt.alias);
            }
            if (opt.count || opt.type === 'count') {
                self.count(key);
            }
            if (typeof opt.global === 'boolean') {
                self.global(key, opt.global);
            }
            if (opt.defaultDescription) {
                options.defaultDescription[key] = opt.defaultDescription;
            }
            if (opt.skipValidation) {
                self.skipValidation(key);
            }
            const desc = opt.describe || opt.description || opt.desc;
            self.describe(key, desc);
            if (opt.hidden) {
                self.hide(key);
            }
            if (opt.requiresArg) {
                self.requiresArg(key);
            }
        }
        return self;
    };
    self.getOptions = () => options;
    self.positional = function (key, opts) {
        argsert('<string> <object>', [key, opts], arguments.length);
        if (context.resets === 0) {
            throw new YError(".positional() can only be called in a command's builder function");
        }
        const supportedOpts = [
            'default',
            'defaultDescription',
            'implies',
            'normalize',
            'choices',
            'conflicts',
            'coerce',
            'type',
            'describe',
            'desc',
            'description',
            'alias',
        ];
        opts = objFilter(opts, (k, v) => {
            let accept = supportedOpts.indexOf(k) !== -1;
            if (k === 'type' && ['string', 'number', 'boolean'].indexOf(v) === -1)
                accept = false;
            return accept;
        });
        const fullCommand = context.fullCommands[context.fullCommands.length - 1];
        const parseOptions = fullCommand
            ? command$1.cmdToParseOptions(fullCommand)
            : {
                array: [],
                alias: {},
                default: {},
                demand: {},
            };
        objectKeys(parseOptions).forEach(pk => {
            const parseOption = parseOptions[pk];
            if (Array.isArray(parseOption)) {
                if (parseOption.indexOf(key) !== -1)
                    opts[pk] = true;
            }
            else {
                if (parseOption[key] && !(pk in opts))
                    opts[pk] = parseOption[key];
            }
        });
        self.group(key, usage$1.getPositionalGroupName());
        return self.option(key, opts);
    };
    self.group = function group(opts, groupName) {
        argsert('<string|array> <string>', [opts, groupName], arguments.length);
        const existing = preservedGroups[groupName] || groups[groupName];
        if (preservedGroups[groupName]) {
            delete preservedGroups[groupName];
        }
        const seen = {};
        groups[groupName] = (existing || []).concat(opts).filter(key => {
            if (seen[key])
                return false;
            return (seen[key] = true);
        });
        return self;
    };
    self.getGroups = () => Object.assign({}, groups, preservedGroups);
    self.env = function (prefix) {
        argsert('[string|boolean]', [prefix], arguments.length);
        if (prefix === false)
            delete options.envPrefix;
        else
            options.envPrefix = prefix || '';
        return self;
    };
    self.wrap = function (cols) {
        argsert('<number|null|undefined>', [cols], arguments.length);
        usage$1.wrap(cols);
        return self;
    };
    let strict = false;
    self.strict = function (enabled) {
        argsert('[boolean]', [enabled], arguments.length);
        strict = enabled !== false;
        return self;
    };
    self.getStrict = () => strict;
    let strictCommands = false;
    self.strictCommands = function (enabled) {
        argsert('[boolean]', [enabled], arguments.length);
        strictCommands = enabled !== false;
        return self;
    };
    self.getStrictCommands = () => strictCommands;
    let strictOptions = false;
    self.strictOptions = function (enabled) {
        argsert('[boolean]', [enabled], arguments.length);
        strictOptions = enabled !== false;
        return self;
    };
    self.getStrictOptions = () => strictOptions;
    let parserConfig = {};
    self.parserConfiguration = function parserConfiguration(config) {
        argsert('<object>', [config], arguments.length);
        parserConfig = config;
        return self;
    };
    self.getParserConfiguration = () => parserConfig;
    self.showHelp = function (level) {
        argsert('[string|function]', [level], arguments.length);
        if (!self.parsed)
            self._parseArgs(processArgs);
        if (command$1.hasDefaultCommand()) {
            context.resets++;
            command$1.runDefaultBuilderOn(self);
        }
        usage$1.showHelp(level);
        return self;
    };
    let versionOpt = null;
    self.version = function version(opt, msg, ver) {
        const defaultVersionOpt = 'version';
        argsert('[boolean|string] [string] [string]', [opt, msg, ver], arguments.length);
        if (versionOpt) {
            deleteFromParserHintObject(versionOpt);
            usage$1.version(undefined);
            versionOpt = null;
        }
        if (arguments.length === 0) {
            ver = guessVersion();
            opt = defaultVersionOpt;
        }
        else if (arguments.length === 1) {
            if (opt === false) {
                return self;
            }
            ver = opt;
            opt = defaultVersionOpt;
        }
        else if (arguments.length === 2) {
            ver = msg;
            msg = undefined;
        }
        versionOpt = typeof opt === 'string' ? opt : defaultVersionOpt;
        msg = msg || usage$1.deferY18nLookup('Show version number');
        usage$1.version(ver || undefined);
        self.boolean(versionOpt);
        self.describe(versionOpt, msg);
        return self;
    };
    function guessVersion() {
        const obj = pkgUp();
        return obj.version || 'unknown';
    }
    let helpOpt = null;
    self.addHelpOpt = self.help = function addHelpOpt(opt, msg) {
        const defaultHelpOpt = 'help';
        argsert('[string|boolean] [string]', [opt, msg], arguments.length);
        if (helpOpt) {
            deleteFromParserHintObject(helpOpt);
            helpOpt = null;
        }
        if (arguments.length === 1) {
            if (opt === false)
                return self;
        }
        helpOpt = typeof opt === 'string' ? opt : defaultHelpOpt;
        self.boolean(helpOpt);
        self.describe(helpOpt, msg || usage$1.deferY18nLookup('Show help'));
        return self;
    };
    const defaultShowHiddenOpt = 'show-hidden';
    options.showHiddenOpt = defaultShowHiddenOpt;
    self.addShowHiddenOpt = self.showHidden = function addShowHiddenOpt(opt, msg) {
        argsert('[string|boolean] [string]', [opt, msg], arguments.length);
        if (arguments.length === 1) {
            if (opt === false)
                return self;
        }
        const showHiddenOpt = typeof opt === 'string' ? opt : defaultShowHiddenOpt;
        self.boolean(showHiddenOpt);
        self.describe(showHiddenOpt, msg || usage$1.deferY18nLookup('Show hidden options'));
        options.showHiddenOpt = showHiddenOpt;
        return self;
    };
    self.hide = function hide(key) {
        argsert('<string>', [key], arguments.length);
        options.hiddenOptions.push(key);
        return self;
    };
    self.showHelpOnFail = function showHelpOnFail(enabled, message) {
        argsert('[boolean|string] [string]', [enabled, message], arguments.length);
        usage$1.showHelpOnFail(enabled, message);
        return self;
    };
    let exitProcess = true;
    self.exitProcess = function (enabled = true) {
        argsert('[boolean]', [enabled], arguments.length);
        exitProcess = enabled;
        return self;
    };
    self.getExitProcess = () => exitProcess;
    self.showCompletionScript = function ($0, cmd) {
        argsert('[string] [string]', [$0, cmd], arguments.length);
        $0 = $0 || self.$0;
        _logger.log(completion$1.generateCompletionScript($0, cmd || completionCommand || 'completion'));
        return self;
    };
    self.getCompletion = function (args, done) {
        argsert('<array> <function>', [args, done], arguments.length);
        completion$1.getCompletion(args, done);
    };
    self.locale = function (locale) {
        argsert('[string]', [locale], arguments.length);
        if (!locale) {
            guessLocale();
            return y18n.getLocale();
        }
        detectLocale = false;
        y18n.setLocale(locale);
        return self;
    };
    self.updateStrings = self.updateLocale = function (obj) {
        argsert('<object>', [obj], arguments.length);
        detectLocale = false;
        y18n.updateLocale(obj);
        return self;
    };
    let detectLocale = true;
    self.detectLocale = function (detect) {
        argsert('<boolean>', [detect], arguments.length);
        detectLocale = detect;
        return self;
    };
    self.getDetectLocale = () => detectLocale;
    const _logger = {
        log(...args) {
            if (!self._hasParseCallback())
                console.log(...args);
            hasOutput = true;
            if (output.length)
                output += '\n';
            output += args.join(' ');
        },
        error(...args) {
            if (!self._hasParseCallback())
                console.error(...args);
            hasOutput = true;
            if (output.length)
                output += '\n';
            output += args.join(' ');
        },
    };
    self._getLoggerInstance = () => _logger;
    self._hasOutput = () => hasOutput;
    self._setHasOutput = () => {
        hasOutput = true;
    };
    let recommendCommands;
    self.recommendCommands = function (recommend = true) {
        argsert('[boolean]', [recommend], arguments.length);
        recommendCommands = recommend;
        return self;
    };
    self.getUsageInstance = () => usage$1;
    self.getValidationInstance = () => validation$1;
    self.getCommandInstance = () => command$1;
    self.terminalWidth = () => {
        argsert([], 0);
        return shim$1.process.stdColumns;
    };
    Object.defineProperty(self, 'argv', {
        get: () => self._parseArgs(processArgs),
        enumerable: true,
    });
    self._parseArgs = function parseArgs(args, shortCircuit, _calledFromCommand, commandIndex) {
        let skipValidation = !!_calledFromCommand;
        args = args || processArgs;
        options.__ = y18n.__;
        options.configuration = self.getParserConfiguration();
        const populateDoubleDash = !!options.configuration['populate--'];
        const config = Object.assign({}, options.configuration, {
            'populate--': true,
        });
        const parsed = shim$1.Parser.detailed(args, Object.assign({}, options, {
            configuration: Object.assign({ 'parse-positional-numbers': false }, config),
        }));
        let argv = parsed.argv;
        if (parseContext)
            argv = Object.assign({}, argv, parseContext);
        const aliases = parsed.aliases;
        argv.$0 = self.$0;
        self.parsed = parsed;
        try {
            guessLocale();
            if (shortCircuit) {
                return self._postProcess(argv, populateDoubleDash, _calledFromCommand);
            }
            if (helpOpt) {
                const helpCmds = [helpOpt]
                    .concat(aliases[helpOpt] || [])
                    .filter(k => k.length > 1);
                if (~helpCmds.indexOf('' + argv._[argv._.length - 1])) {
                    argv._.pop();
                    argv[helpOpt] = true;
                }
            }
            const handlerKeys = command$1.getCommands();
            const requestCompletions = completion$1.completionKey in argv;
            const skipRecommendation = argv[helpOpt] || requestCompletions;
            const skipDefaultCommand = skipRecommendation &&
                (handlerKeys.length > 1 || handlerKeys[0] !== '$0');
            if (argv._.length) {
                if (handlerKeys.length) {
                    let firstUnknownCommand;
                    for (let i = commandIndex || 0, cmd; argv._[i] !== undefined; i++) {
                        cmd = String(argv._[i]);
                        if (~handlerKeys.indexOf(cmd) && cmd !== completionCommand) {
                            const innerArgv = command$1.runCommand(cmd, self, parsed, i + 1);
                            return self._postProcess(innerArgv, populateDoubleDash);
                        }
                        else if (!firstUnknownCommand && cmd !== completionCommand) {
                            firstUnknownCommand = cmd;
                            break;
                        }
                    }
                    if (command$1.hasDefaultCommand() && !skipDefaultCommand) {
                        const innerArgv = command$1.runCommand(null, self, parsed);
                        return self._postProcess(innerArgv, populateDoubleDash);
                    }
                    if (recommendCommands && firstUnknownCommand && !skipRecommendation) {
                        validation$1.recommendCommands(firstUnknownCommand, handlerKeys);
                    }
                }
                if (completionCommand &&
                    ~argv._.indexOf(completionCommand) &&
                    !requestCompletions) {
                    if (exitProcess)
                        setBlocking(true);
                    self.showCompletionScript();
                    self.exit(0);
                }
            }
            else if (command$1.hasDefaultCommand() && !skipDefaultCommand) {
                const innerArgv = command$1.runCommand(null, self, parsed);
                return self._postProcess(innerArgv, populateDoubleDash);
            }
            if (requestCompletions) {
                if (exitProcess)
                    setBlocking(true);
                args = [].concat(args);
                const completionArgs = args.slice(args.indexOf(`--${completion$1.completionKey}`) + 1);
                completion$1.getCompletion(completionArgs, completions => {
                    (completions || []).forEach(completion => {
                        _logger.log(completion);
                    });
                    self.exit(0);
                });
                return self._postProcess(argv, !populateDoubleDash, _calledFromCommand);
            }
            if (!hasOutput) {
                Object.keys(argv).forEach(key => {
                    if (key === helpOpt && argv[key]) {
                        if (exitProcess)
                            setBlocking(true);
                        skipValidation = true;
                        self.showHelp('log');
                        self.exit(0);
                    }
                    else if (key === versionOpt && argv[key]) {
                        if (exitProcess)
                            setBlocking(true);
                        skipValidation = true;
                        usage$1.showVersion();
                        self.exit(0);
                    }
                });
            }
            if (!skipValidation && options.skipValidation.length > 0) {
                skipValidation = Object.keys(argv).some(key => options.skipValidation.indexOf(key) >= 0 && argv[key] === true);
            }
            if (!skipValidation) {
                if (parsed.error)
                    throw new YError(parsed.error.message);
                if (!requestCompletions) {
                    self._runValidation(argv, aliases, {}, parsed.error);
                }
            }
        }
        catch (err) {
            if (err instanceof YError)
                usage$1.fail(err.message, err);
            else
                throw err;
        }
        return self._postProcess(argv, populateDoubleDash, _calledFromCommand);
    };
    self._postProcess = function (argv, populateDoubleDash, calledFromCommand = false) {
        if (isPromise(argv))
            return argv;
        if (calledFromCommand)
            return argv;
        if (!populateDoubleDash) {
            argv = self._copyDoubleDash(argv);
        }
        const parsePositionalNumbers = self.getParserConfiguration()['parse-positional-numbers'] ||
            self.getParserConfiguration()['parse-positional-numbers'] === undefined;
        if (parsePositionalNumbers) {
            argv = self._parsePositionalNumbers(argv);
        }
        return argv;
    };
    self._copyDoubleDash = function (argv) {
        if (!argv._ || !argv['--'])
            return argv;
        argv._.push.apply(argv._, argv['--']);
        try {
            delete argv['--'];
        }
        catch (_err) { }
        return argv;
    };
    self._parsePositionalNumbers = function (argv) {
        const args = argv['--'] ? argv['--'] : argv._;
        for (let i = 0, arg; (arg = args[i]) !== undefined; i++) {
            if (shim$1.Parser.looksLikeNumber(arg) &&
                Number.isSafeInteger(Math.floor(parseFloat(`${arg}`)))) {
                args[i] = Number(arg);
            }
        }
        return argv;
    };
    self._runValidation = function runValidation(argv, aliases, positionalMap, parseErrors, isDefaultCommand = false) {
        if (parseErrors)
            throw new YError(parseErrors.message);
        validation$1.nonOptionCount(argv);
        validation$1.requiredArguments(argv);
        let failedStrictCommands = false;
        if (strictCommands) {
            failedStrictCommands = validation$1.unknownCommands(argv);
        }
        if (strict && !failedStrictCommands) {
            validation$1.unknownArguments(argv, aliases, positionalMap, isDefaultCommand);
        }
        else if (strictOptions) {
            validation$1.unknownArguments(argv, aliases, {}, false, false);
        }
        validation$1.customChecks(argv, aliases);
        validation$1.limitedChoices(argv);
        validation$1.implications(argv);
        validation$1.conflicting(argv);
    };
    function guessLocale() {
        if (!detectLocale)
            return;
        const locale = shim$1.getEnv('LC_ALL') ||
            shim$1.getEnv('LC_MESSAGES') ||
            shim$1.getEnv('LANG') ||
            shim$1.getEnv('LANGUAGE') ||
            'en_US';
        self.locale(locale.replace(/[.:].*/, ''));
    }
    self.help();
    self.version();
    return self;
}
const rebase = (base, dir) => shim$1.path.relative(base, dir);
function isYargsInstance(y) {
    return !!y && typeof y._parseArgs === 'function';
}

var _a, _b;
const { readFileSync } = __webpack_require__(5747);
const { inspect } = __webpack_require__(1669);
const { resolve } = __webpack_require__(5622);
const y18n = __webpack_require__(9087);
const Parser = __webpack_require__(8909);
var cjsPlatformShim = {
    assert: {
        notStrictEqual: assert.notStrictEqual,
        strictEqual: assert.strictEqual,
    },
    cliui: __webpack_require__(6702),
    findUp: __webpack_require__(2644),
    getEnv: (key) => {
        return process.env[key];
    },
    getCallerFile: __webpack_require__(351),
    getProcessArgvBin: getProcessArgvBin,
    inspect,
    mainFilename: (_b = (_a =  false || __webpack_require__(9167) === void 0 ? void 0 : __webpack_require__.c[__webpack_require__.s]) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : process.cwd(),
    Parser,
    path: __webpack_require__(5622),
    process: {
        argv: () => process.argv,
        cwd: process.cwd,
        execPath: () => process.execPath,
        exit: (code) => {
            process.exit(code);
        },
        nextTick: process.nextTick,
        stdColumns: typeof process.stdout.columns !== 'undefined'
            ? process.stdout.columns
            : null,
    },
    readFileSync,
    require: __webpack_require__(9167),
    requireDirectory: __webpack_require__(9200),
    stringWidth: __webpack_require__(2577),
    y18n: y18n({
        directory: resolve(__dirname, '../locales'),
        updateFiles: false,
    }),
};

const minNodeVersion = process && process.env && process.env.YARGS_MIN_NODE_VERSION
    ? Number(process.env.YARGS_MIN_NODE_VERSION)
    : 10;
if (process && process.version) {
    const major = Number(process.version.match(/v([^.]+)/)[1]);
    if (major < minNodeVersion) {
        throw Error(`yargs supports a minimum Node.js version of ${minNodeVersion}. Read our version support policy: https://github.com/yargs/yargs#supported-nodejs-versions`);
    }
}
const Parser$1 = __webpack_require__(8909);
const Yargs$1 = YargsWithShim(cjsPlatformShim);
var cjs = {
    applyExtends,
    cjsPlatformShim,
    Yargs: Yargs$1,
    argsert,
    globalMiddlewareFactory,
    isPromise,
    objFilter,
    parseCommand,
    Parser: Parser$1,
    processArgv,
    rebase,
    YError,
};

module.exports = cjs;


/***/ }),

/***/ 4139:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// classic singleton yargs API, to use yargs
// without running as a singleton do:
// require('yargs/yargs')(process.argv.slice(2))
const {Yargs, processArgv} = __webpack_require__(9567);

Argv(processArgv.hideBin(process.argv));

module.exports = Argv;

function Argv(processArgs, cwd) {
  const argv = Yargs(processArgs, cwd, __webpack_require__(4907));
  singletonify(argv);
  return argv;
}

/*  Hack an instance of Argv with process.argv into Argv
    so people can do
    require('yargs')(['--beeble=1','-z','zizzle']).argv
    to parse a list of args and
    require('yargs').argv
    to get a parsed version of process.argv.
*/
function singletonify(inst) {
  Object.keys(inst).forEach(key => {
    if (key === 'argv') {
      Argv.__defineGetter__(key, inst.__lookupGetter__(key));
    } else if (typeof inst[key] === 'function') {
      Argv[key] = inst[key].bind(inst);
    } else {
      Argv.__defineGetter__('$0', () => {
        return inst.$0;
      });
      Argv.__defineGetter__('parsed', () => {
        return inst.parsed;
      });
    }
  });
}


/***/ }),

/***/ 696:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"axios\",\"version\":\"0.21.0\",\"description\":\"Promise based HTTP client for the browser and node.js\",\"main\":\"index.js\",\"scripts\":{\"test\":\"grunt test && bundlesize\",\"start\":\"node ./sandbox/server.js\",\"build\":\"NODE_ENV=production grunt build\",\"preversion\":\"npm test\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\",\"postversion\":\"git push && git push --tags\",\"examples\":\"node ./examples/server.js\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"fix\":\"eslint --fix lib/**/*.js\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/axios/axios.git\"},\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"author\":\"Matt Zabriskie\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"homepage\":\"https://github.com/axios/axios\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"jsdelivr\":\"dist/axios.min.js\",\"unpkg\":\"dist/axios.min.js\",\"typings\":\"./index.d.ts\",\"dependencies\":{\"follow-redirects\":\"^1.10.0\"},\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}]}");

/***/ }),

/***/ 5670:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => [];
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 5670;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 9167:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => [];
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 9167;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 4907:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => [];
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 4907;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 306:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"name\":\"samfirm\",\"version\":\"0.2.0\",\"description\":\"A streaming downloader, decryptor and extractor of Samsung firmware\",\"keywords\":[\"samsung\",\"firmware\",\"samfirm\"],\"author\":\"Jesse Chan\",\"license\":\"GPL-3.0-or-later\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/chrmhoffmann/samfirm.js.git\"},\"bugs\":{\"url\":\"https://github.com/jesec/samfirm.js/issues\"},\"files\":[\"dist\"],\"bin\":{\"samfirm\":\"dist/index.js\"},\"scripts\":{\"build\":\"ncc build index.ts -m -t\",\"check-source-formatting\":\"prettier -c .\",\"check-types\":\"tsc --noEmit\",\"format-source\":\"prettier -w .\",\"lint\":\"eslint --max-warnings 0 --ext .ts .\",\"prepack\":\"rm -rf dist && npm run build\",\"prepare\":\"npm run build\",\"start\":\"ts-node-dev --transpile-only index.ts\"},\"devDependencies\":{\"@types/cli-progress\":\"^3.8.0\",\"@types/node\":\"^14.14.6\",\"@types/yargs\":\"^15.0.9\",\"@typescript-eslint/eslint-plugin\":\"^4.6.1\",\"@typescript-eslint/parser\":\"^4.6.1\",\"@vercel/ncc\":\"^0.25.1\",\"axios\":\"^0.21.0\",\"cli-progress\":\"^3.8.2\",\"eslint\":\"^7.13.0\",\"eslint-config-prettier\":\"^6.15.0\",\"fast-xml-parser\":\"^3.17.4\",\"prettier\":\"^2.1.2\",\"ts-node-dev\":\"^1.0.0\",\"typescript\":\"^4.0.5\",\"unzip-stream\":\"^0.3.1\",\"yargs\":\"^16.1.0\"}}");

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 1058:
/***/ ((module) => {

"use strict";
module.exports = require("readline");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 3867:
/***/ ((module) => {

"use strict";
module.exports = require("tty");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4177);
/******/ })()
;