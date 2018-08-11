webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _withParams.default;
  }
});
exports.regex = exports.ref = exports.len = exports.req = void 0;

var _withParams = _interopRequireDefault(__webpack_require__(81));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var req = function req(value) {
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (_typeof(value) === 'object') {
    for (var _ in value) {
      return true;
    }

    return false;
  }

  return !!String(value).length;
};

exports.req = req;

var len = function len(value) {
  if (Array.isArray(value)) return value.length;

  if (_typeof(value) === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};

exports.len = len;

var ref = function ref(reference, vm, parentVm) {
  return typeof reference === 'function' ? reference.call(vm, parentVm) : parentVm[reference];
};

exports.ref = ref;

var regex = function regex(type, expr) {
  return (0, _withParams.default)({
    type: type
  }, function (value) {
    return !req(value) || expr.test(value);
  });
};

exports.regex = regex;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(71)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vuelidate = Vuelidate;
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _params.withParams;
  }
});
exports.default = exports.validationMixin = void 0;

var _vval = __webpack_require__(79);

var _params = __webpack_require__(20);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var NIL = function NIL() {
  return null;
};

var buildFromKeys = function buildFromKeys(keys, fn, keyFn) {
  return keys.reduce(function (build, key) {
    build[keyFn ? keyFn(key) : key] = fn(key);
    return build;
  }, {});
};

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && (_typeof(val) === 'object' || isFunction(val));
}

function isPromise(object) {
  return isObject(object) && isFunction(object.then);
}

var getPath = function getPath(ctx, obj, path, fallback) {
  if (typeof path === 'function') {
    return path.call(ctx, obj, fallback);
  }

  path = Array.isArray(path) ? path : path.split('.');

  for (var i = 0; i < path.length; i++) {
    if (obj && _typeof(obj) === 'object') {
      obj = obj[path[i]];
    } else {
      return fallback;
    }
  }

  return typeof obj === 'undefined' ? fallback : obj;
};

var __isVuelidateAsyncVm = '__isVuelidateAsyncVm';

function makePendingAsyncVm(Vue, promise) {
  var asyncVm = new Vue({
    data: {
      p: true,
      v: false
    }
  });
  promise.then(function (value) {
    asyncVm.p = false;
    asyncVm.v = value;
  }, function (error) {
    asyncVm.p = false;
    asyncVm.v = false;
    throw error;
  });
  asyncVm[__isVuelidateAsyncVm] = true;
  return asyncVm;
}

var validationGetters = {
  $invalid: function $invalid() {
    var _this = this;

    var proxy = this.proxy;
    return this.nestedKeys.some(function (nested) {
      return _this.refProxy(nested).$invalid;
    }) || this.ruleKeys.some(function (rule) {
      return !proxy[rule];
    });
  },
  $dirty: function $dirty() {
    var _this2 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.every(function (key) {
      return _this2.refProxy(key).$dirty;
    });
  },
  $anyDirty: function $anyDirty() {
    var _this3 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.some(function (key) {
      return _this3.refProxy(key).$anyDirty;
    });
  },
  $error: function $error() {
    return this.$dirty && !this.$pending && this.$invalid;
  },
  $anyError: function $anyError() {
    return this.$anyDirty && !this.$pending && this.$invalid;
  },
  $pending: function $pending() {
    var _this4 = this;

    return this.ruleKeys.some(function (key) {
      return _this4.getRef(key).$pending;
    }) || this.nestedKeys.some(function (key) {
      return _this4.refProxy(key).$pending;
    });
  },
  $params: function $params() {
    var _this5 = this;

    var vals = this.validations;
    return _objectSpread({}, buildFromKeys(this.nestedKeys, function (key) {
      return vals[key] && vals[key].$params || null;
    }), buildFromKeys(this.ruleKeys, function (key) {
      return _this5.getRef(key).$params;
    }));
  }
};

function setDirtyRecursive(newState) {
  this.dirty = newState;
  var proxy = this.proxy;
  var method = newState ? '$touch' : '$reset';
  this.nestedKeys.forEach(function (key) {
    proxy[key][method]();
  });
}

var validationMethods = {
  $touch: function $touch() {
    setDirtyRecursive.call(this, true);
  },
  $reset: function $reset() {
    setDirtyRecursive.call(this, false);
  },
  $flattenParams: function $flattenParams() {
    var proxy = this.proxy;
    var params = [];

    for (var key in this.$params) {
      if (this.isNested(key)) {
        var childParams = proxy[key].$flattenParams();

        for (var j = 0; j < childParams.length; j++) {
          childParams[j].path.unshift(key);
        }

        params = params.concat(childParams);
      } else {
        params.push({
          path: [],
          name: key,
          params: this.$params[key]
        });
      }
    }

    return params;
  }
};
var getterNames = Object.keys(validationGetters);
var methodNames = Object.keys(validationMethods);
var _cachedComponent = null;

var getComponent = function getComponent(Vue) {
  if (_cachedComponent) {
    return _cachedComponent;
  }

  var VBase = Vue.extend({
    computed: {
      refs: function refs() {
        var oldVval = this._vval;
        this._vval = this.children;
        (0, _vval.patchChildren)(oldVval, this._vval);
        var refs = {};

        this._vval.forEach(function (c) {
          refs[c.key] = c.vm;
        });

        return refs;
      }
    },
    beforeCreate: function beforeCreate() {
      this._vval = null;
    },
    beforeDestroy: function beforeDestroy() {
      if (this._vval) {
        (0, _vval.patchChildren)(this._vval);
        this._vval = null;
      }
    },
    methods: {
      getModel: function getModel() {
        return this.lazyModel ? this.lazyModel(this.prop) : this.model;
      },
      getModelKey: function getModelKey(key) {
        var model = this.getModel();

        if (model) {
          return model[key];
        }
      },
      hasIter: function hasIter() {
        return false;
      }
    }
  });
  var ValidationRule = VBase.extend({
    data: function data() {
      return {
        rule: null,
        lazyModel: null,
        model: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: {
      runRule: function runRule(parent) {
        var model = this.getModel();
        (0, _params.pushParams)();
        var rawOutput = this.rule.call(this.rootModel, model, parent);
        var output = isPromise(rawOutput) ? makePendingAsyncVm(Vue, rawOutput) : rawOutput;
        var rawParams = (0, _params.popParams)();
        var params = rawParams && rawParams.$sub ? rawParams.$sub.length > 1 ? rawParams : rawParams.$sub[0] : null;
        return {
          output: output,
          params: params
        };
      }
    },
    computed: {
      run: function run() {
        var _this6 = this;

        var parent = this.lazyParentModel();

        var isArrayDependant = Array.isArray(parent) && parent.__ob__;

        if (isArrayDependant) {
          var arrayDep = parent.__ob__.dep;
          arrayDep.depend();
          var target = arrayDep.constructor.target;

          if (!this._indirectWatcher) {
            var Watcher = target.constructor;
            this._indirectWatcher = new Watcher(this, function () {
              return _this6.runRule(parent);
            }, null, {
              lazy: true
            });
          }

          var model = this.getModel();

          if (!this._indirectWatcher.dirty && this._lastModel === model) {
            this._indirectWatcher.depend();

            return target.value;
          }

          this._lastModel = model;

          this._indirectWatcher.evaluate();

          this._indirectWatcher.depend();
        } else if (this._indirectWatcher) {
          this._indirectWatcher.teardown();

          this._indirectWatcher = null;
        }

        return this._indirectWatcher ? this._indirectWatcher.value : this.runRule(parent);
      },
      $params: function $params() {
        return this.run.params;
      },
      proxy: function proxy() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return !!output.v;
        }

        return !!output;
      },
      $pending: function $pending() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return output.p;
        }

        return false;
      }
    },
    destroyed: function destroyed() {
      if (this._indirectWatcher) {
        this._indirectWatcher.teardown();

        this._indirectWatcher = null;
      }
    }
  });
  var Validation = VBase.extend({
    data: function data() {
      return {
        dirty: false,
        validations: null,
        lazyModel: null,
        model: null,
        prop: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: _objectSpread({}, validationMethods, {
      refProxy: function refProxy(key) {
        return this.getRef(key).proxy;
      },
      getRef: function getRef(key) {
        return this.refs[key];
      },
      isNested: function isNested(key) {
        return typeof this.validations[key] !== 'function';
      }
    }),
    computed: _objectSpread({}, validationGetters, {
      nestedKeys: function nestedKeys() {
        return this.keys.filter(this.isNested);
      },
      ruleKeys: function ruleKeys() {
        var _this7 = this;

        return this.keys.filter(function (k) {
          return !_this7.isNested(k);
        });
      },
      keys: function keys() {
        return Object.keys(this.validations).filter(function (k) {
          return k !== '$params';
        });
      },
      proxy: function proxy() {
        var _this8 = this;

        var keyDefs = buildFromKeys(this.keys, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this8.refProxy(key);
            }
          };
        });
        var getterDefs = buildFromKeys(getterNames, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this8[key];
            }
          };
        });
        var methodDefs = buildFromKeys(methodNames, function (key) {
          return {
            enumerable: false,
            configurable: true,
            get: function get() {
              return _this8[key];
            }
          };
        });
        var iterDefs = this.hasIter() ? {
          $iter: {
            enumerable: true,
            value: Object.defineProperties({}, _objectSpread({}, keyDefs))
          }
        } : {};
        return Object.defineProperties({}, _objectSpread({}, keyDefs, iterDefs, {
          $model: {
            enumerable: true,
            get: function get() {
              var parent = _this8.lazyParentModel();

              if (parent != null) {
                return parent[_this8.prop];
              } else {
                return null;
              }
            },
            set: function set(value) {
              var parent = _this8.lazyParentModel();

              if (parent != null) {
                parent[_this8.prop] = value;

                _this8.$touch();
              }
            }
          }
        }, getterDefs, methodDefs));
      },
      children: function children() {
        var _this9 = this;

        return _toConsumableArray(this.nestedKeys.map(function (key) {
          return renderNested(_this9, key);
        })).concat(_toConsumableArray(this.ruleKeys.map(function (key) {
          return renderRule(_this9, key);
        }))).filter(Boolean);
      }
    })
  });
  var GroupValidation = Validation.extend({
    methods: {
      isNested: function isNested(key) {
        return typeof this.validations[key]() !== 'undefined';
      },
      getRef: function getRef(key) {
        var vm = this;
        return {
          get proxy() {
            return vm.validations[key]() || false;
          }

        };
      }
    }
  });
  var EachValidation = Validation.extend({
    computed: {
      keys: function keys() {
        var model = this.getModel();

        if (isObject(model)) {
          return Object.keys(model);
        } else {
          return [];
        }
      },
      tracker: function tracker() {
        var _this10 = this;

        var trackBy = this.validations.$trackBy;
        return trackBy ? function (key) {
          return "".concat(getPath(_this10.rootModel, _this10.getModelKey(key), trackBy));
        } : function (x) {
          return "".concat(x);
        };
      },
      getModelLazy: function getModelLazy() {
        var _this11 = this;

        return function () {
          return _this11.getModel();
        };
      },
      children: function children() {
        var _this12 = this;

        var def = this.validations;
        var model = this.getModel();

        var validations = _objectSpread({}, def);

        delete validations['$trackBy'];
        var usedTracks = {};
        return this.keys.map(function (key) {
          var track = _this12.tracker(key);

          if (usedTracks.hasOwnProperty(track)) {
            return null;
          }

          usedTracks[track] = true;
          return (0, _vval.h)(Validation, track, {
            validations: validations,
            prop: key,
            lazyParentModel: _this12.getModelLazy,
            model: model[key],
            rootModel: _this12.rootModel
          });
        }).filter(Boolean);
      }
    },
    methods: {
      isNested: function isNested() {
        return true;
      },
      getRef: function getRef(key) {
        return this.refs[this.tracker(key)];
      },
      hasIter: function hasIter() {
        return true;
      }
    }
  });

  var renderNested = function renderNested(vm, key) {
    if (key === '$each') {
      return (0, _vval.h)(EachValidation, key, {
        validations: vm.validations[key],
        lazyParentModel: vm.lazyParentModel,
        prop: key,
        lazyModel: vm.getModel,
        rootModel: vm.rootModel
      });
    }

    var validations = vm.validations[key];

    if (Array.isArray(validations)) {
      var root = vm.rootModel;
      var refVals = buildFromKeys(validations, function (path) {
        return function () {
          return getPath(root, root.$v, path);
        };
      }, function (v) {
        return Array.isArray(v) ? v.join('.') : v;
      });
      return (0, _vval.h)(GroupValidation, key, {
        validations: refVals,
        lazyParentModel: NIL,
        prop: key,
        lazyModel: NIL,
        rootModel: root
      });
    }

    return (0, _vval.h)(Validation, key, {
      validations: validations,
      lazyParentModel: vm.getModel,
      prop: key,
      lazyModel: vm.getModelKey,
      rootModel: vm.rootModel
    });
  };

  var renderRule = function renderRule(vm, key) {
    return (0, _vval.h)(ValidationRule, key, {
      rule: vm.validations[key],
      lazyParentModel: vm.lazyParentModel,
      lazyModel: vm.getModel,
      rootModel: vm.rootModel
    });
  };

  _cachedComponent = {
    VBase: VBase,
    Validation: Validation
  };
  return _cachedComponent;
};

var _cachedVue = null;

function getVue(rootVm) {
  if (_cachedVue) return _cachedVue;
  var Vue = rootVm.constructor;

  while (Vue.super) {
    Vue = Vue.super;
  }

  _cachedVue = Vue;
  return Vue;
}

var validateModel = function validateModel(model, validations) {
  var Vue = getVue(model);

  var _getComponent = getComponent(Vue),
      Validation = _getComponent.Validation,
      VBase = _getComponent.VBase;

  var root = new VBase({
    computed: {
      children: function children() {
        var vals = typeof validations === 'function' ? validations.call(model) : validations;
        return [(0, _vval.h)(Validation, '$v', {
          validations: vals,
          lazyParentModel: NIL,
          prop: '$v',
          model: model,
          rootModel: model
        })];
      }
    }
  });
  return root;
};

var validationMixin = {
  data: function data() {
    var vals = this.$options.validations;

    if (vals) {
      this._vuelidate = validateModel(this, vals);
    }

    return {};
  },
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    var vals = options.validations;
    if (!vals) return;
    if (!options.computed) options.computed = {};
    if (options.computed.$v) return;

    options.computed.$v = function () {
      return this._vuelidate ? this._vuelidate.refs.$v.proxy : null;
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (this._vuelidate) {
      this._vuelidate.$destroy();

      this._vuelidate = null;
    }
  }
};
exports.validationMixin = validationMixin;

function Vuelidate(Vue) {
  Vue.mixin(validationMixin);
}

var _default = Vuelidate;
exports.default = _default;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushParams = pushParams;
exports.popParams = popParams;
exports.withParams = withParams;
exports._setTarget = exports.target = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var stack = [];
var target = null;
exports.target = target;

var _setTarget = function _setTarget(x) {
  exports.target = target = x;
};

exports._setTarget = _setTarget;

function pushParams() {
  if (target !== null) {
    stack.push(target);
  }

  exports.target = target = {};
}

function popParams() {
  var lastTarget = target;
  var newTarget = exports.target = target = stack.pop() || null;

  if (newTarget) {
    if (!Array.isArray(newTarget.$sub)) {
      newTarget.$sub = [];
    }

    newTarget.$sub.push(lastTarget);
  }

  return lastTarget;
}

function addParams(params) {
  if (_typeof(params) === 'object' && !Array.isArray(params)) {
    exports.target = target = _objectSpread({}, target, params);
  } else {
    throw new Error('params must be an object');
  }
}

function withParamsDirect(params, validator) {
  return withParamsClosure(function (add) {
    return function () {
      add(params);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return validator.apply(this, args);
    };
  });
}

function withParamsClosure(closure) {
  var validator = closure(addParams);
  return function () {
    pushParams();

    try {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return validator.apply(this, args);
    } finally {
      popParams();
    }
  };
}

function withParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return withParamsDirect(paramsOrClosure, maybeValidator);
  }

  return withParamsClosure(paramsOrClosure);
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function get() {
    return _alpha.default;
  }
});
Object.defineProperty(exports, "alphaNum", {
  enumerable: true,
  get: function get() {
    return _alphaNum.default;
  }
});
Object.defineProperty(exports, "numeric", {
  enumerable: true,
  get: function get() {
    return _numeric.default;
  }
});
Object.defineProperty(exports, "between", {
  enumerable: true,
  get: function get() {
    return _between.default;
  }
});
Object.defineProperty(exports, "email", {
  enumerable: true,
  get: function get() {
    return _email.default;
  }
});
Object.defineProperty(exports, "ipAddress", {
  enumerable: true,
  get: function get() {
    return _ipAddress.default;
  }
});
Object.defineProperty(exports, "macAddress", {
  enumerable: true,
  get: function get() {
    return _macAddress.default;
  }
});
Object.defineProperty(exports, "maxLength", {
  enumerable: true,
  get: function get() {
    return _maxLength.default;
  }
});
Object.defineProperty(exports, "minLength", {
  enumerable: true,
  get: function get() {
    return _minLength.default;
  }
});
Object.defineProperty(exports, "required", {
  enumerable: true,
  get: function get() {
    return _required.default;
  }
});
Object.defineProperty(exports, "requiredIf", {
  enumerable: true,
  get: function get() {
    return _requiredIf.default;
  }
});
Object.defineProperty(exports, "requiredUnless", {
  enumerable: true,
  get: function get() {
    return _requiredUnless.default;
  }
});
Object.defineProperty(exports, "sameAs", {
  enumerable: true,
  get: function get() {
    return _sameAs.default;
  }
});
Object.defineProperty(exports, "url", {
  enumerable: true,
  get: function get() {
    return _url.default;
  }
});
Object.defineProperty(exports, "or", {
  enumerable: true,
  get: function get() {
    return _or.default;
  }
});
Object.defineProperty(exports, "and", {
  enumerable: true,
  get: function get() {
    return _and.default;
  }
});
Object.defineProperty(exports, "not", {
  enumerable: true,
  get: function get() {
    return _not.default;
  }
});
Object.defineProperty(exports, "minValue", {
  enumerable: true,
  get: function get() {
    return _minValue.default;
  }
});
Object.defineProperty(exports, "maxValue", {
  enumerable: true,
  get: function get() {
    return _maxValue.default;
  }
});
Object.defineProperty(exports, "integer", {
  enumerable: true,
  get: function get() {
    return _integer.default;
  }
});
Object.defineProperty(exports, "decimal", {
  enumerable: true,
  get: function get() {
    return _decimal.default;
  }
});
exports.helpers = void 0;

var _alpha = _interopRequireDefault(__webpack_require__(80));

var _alphaNum = _interopRequireDefault(__webpack_require__(83));

var _numeric = _interopRequireDefault(__webpack_require__(84));

var _between = _interopRequireDefault(__webpack_require__(85));

var _email = _interopRequireDefault(__webpack_require__(86));

var _ipAddress = _interopRequireDefault(__webpack_require__(87));

var _macAddress = _interopRequireDefault(__webpack_require__(88));

var _maxLength = _interopRequireDefault(__webpack_require__(89));

var _minLength = _interopRequireDefault(__webpack_require__(90));

var _required = _interopRequireDefault(__webpack_require__(91));

var _requiredIf = _interopRequireDefault(__webpack_require__(92));

var _requiredUnless = _interopRequireDefault(__webpack_require__(93));

var _sameAs = _interopRequireDefault(__webpack_require__(94));

var _url = _interopRequireDefault(__webpack_require__(95));

var _or = _interopRequireDefault(__webpack_require__(96));

var _and = _interopRequireDefault(__webpack_require__(97));

var _not = _interopRequireDefault(__webpack_require__(98));

var _minValue = _interopRequireDefault(__webpack_require__(99));

var _maxValue = _interopRequireDefault(__webpack_require__(100));

var _integer = _interopRequireDefault(__webpack_require__(101));

var _decimal = _interopRequireDefault(__webpack_require__(102));

var helpers = _interopRequireWildcard(__webpack_require__(0));

exports.helpers = helpers;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(108);
__webpack_require__(109);
module.exports = __webpack_require__(110);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

__webpack_require__(24);

__webpack_require__(44);
// require('./bite/app.init.overlay');
// require('./bite/app-style-switcher');
__webpack_require__(45);
// require('./bite/sidebarmenu');
__webpack_require__(46);

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/ImportEmployee');
// require('./components/ExportEmployee');
// require('./components/PayrollProcess');

// window.axios.get('/me').then(response => {
//     const user = response.data.user;
//     window.Echo.private('payrolls.user.' + user.id)
//         .listen('.processed', (e) => {
//             console.log(e);
//             const r = confirm('payroll with #' + e.payroll.id + ' id processed, do you want to download?');
//             console.log(window.location);
//             if (r) {
//                 window.location.href = window.location.origin + `/payroll/${e.payroll.id}/output/download`
//             } else {
//                 if (window.location.pathname.includes('/payrolls/history')) {
//                     document.location.reload();
//                 }
//             }
//
//
//         })
//         .listen('.error', (e) => {
//             alert('payroll process failed');
//             if (window.location.pathname.includes('/payrolls/history')) {
//                 document.location.reload();
//             }
//
//         });
// })
window.Vue = __webpack_require__(16);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', __webpack_require__(50));
Vue.component('card', __webpack_require__(53));
Vue.component('card-header', __webpack_require__(56));
Vue.component('card-body', __webpack_require__(59));
Vue.component('card-group', __webpack_require__(62));
Vue.component('wizard', __webpack_require__(65));

var app = new Vue({
  el: '#main-wrapper'
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {window._ = __webpack_require__(6);

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  global.$ = global.jQuery = __webpack_require__(4);
  __webpack_require__(7);
  __webpack_require__(8);
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(9);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// import Echo from "laravel-echo"
//
// window.Pusher = require('pusher-js');
//
//
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '229a862ffdd2adc9b055',
//     cluster: 'us2',
//     encrypted: true,
//     authEndpoint: '/broadcasting/auth',
//     auth: {
//         headers: {
//             'X-CSRF-TOKEN': token.content
//         }
//     }
// });

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, exports) {

// Admin Panel settings
$.fn.AdminSettings = function (settings) {
    var myid = this.attr("id");
    // General option for vertical header 
    var defaults = {
        Theme: true, // this can be true or false ( true means dark and false means light ),
        Layout: 'vertical', // 
        LogoBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6 
        NavbarBg: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6 
        SidebarType: 'full', // You can change it full / mini-sidebar
        SidebarColor: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
        SidebarPosition: false, // it can be true / false
        HeaderPosition: false, // it can be true / false
        BoxedLayout: false // it can be true / false 
    };
    var settings = $.extend({}, defaults, settings);
    // Attribute functions 
    var AdminSettings = {
        // Settings INIT
        AdminSettingsInit: function AdminSettingsInit() {
            AdminSettings.ManageTheme();
            AdminSettings.ManageThemeLayout();
            AdminSettings.ManageThemeBackground();
            AdminSettings.ManageSidebarType();
            AdminSettings.ManageSidebarColor();
            AdminSettings.ManageSidebarPosition();
            AdminSettings.ManageBoxedLayout();
        },
        //****************************
        // ManageThemeLayout functions
        //****************************
        ManageTheme: function ManageTheme() {
            var themeview = settings.Theme;
            switch (settings.Layout) {
                case 'vertical':
                    if (themeview == true) {
                        $('body').attr("data-theme", 'dark');
                        $("#theme-view").prop("checked", !0);
                    } else {
                        $('#' + myid).attr("data-theme", 'light');
                        $("body").prop("checked", !1);
                    }
                    break;

                default:
            }
        },
        //****************************
        // ManageThemeLayout functions
        //****************************
        ManageThemeLayout: function ManageThemeLayout() {
            switch (settings.Layout) {
                case 'horizontal':
                    $('#' + myid).attr("data-layout", "horizontal");
                    break;
                case 'vertical':
                    $('#' + myid).attr("data-layout", "vertical");
                    $('.scroll-sidebar').perfectScrollbar({});
                    break;
                default:
            }
        },
        //****************************
        // ManageSidebarType functions 
        //****************************
        ManageThemeBackground: function ManageThemeBackground() {
            // Logo bg attribute
            function setlogobg() {
                var lbg = settings.LogoBg;
                if (lbg != undefined && lbg != "") {
                    $('#' + myid + ' .topbar .top-navbar .navbar-header').attr("data-logobg", lbg);
                } else {
                    $('#' + myid + ' .topbar .top-navbar .navbar-header').attr("data-logobg", "skin1");
                }
            };
            setlogobg();
            // Navbar bg attribute
            function setnavbarbg() {
                var nbg = settings.NavbarBg;
                if (nbg != undefined && nbg != "") {
                    $('#' + myid + ' .topbar .navbar-collapse').attr("data-navbarbg", nbg);
                    $('#' + myid + ' .topbar').attr("data-navbarbg", nbg);
                    $('#' + myid).attr("data-navbarbg", nbg);
                } else {
                    $('#' + myid + ' .topbar .navbar-collapse').attr("data-navbarbg", "skin1");
                    $('#' + myid + ' .topbar').attr("data-navbarbg", "skin1");
                    $('#' + myid).attr("data-navbarbg", "skin1");
                }
            };
            setnavbarbg();
        },
        //****************************
        // ManageThemeLayout functions
        //****************************
        ManageSidebarType: function ManageSidebarType() {
            switch (settings.SidebarType) {
                //****************************
                // If the sidebar type has full
                //****************************     
                case 'full':
                    $('#' + myid).attr("data-sidebartype", "full");
                    //****************************
                    /* This is for the mini-sidebar if width is less then 1170*/
                    //**************************** 
                    var setsidebartype = function setsidebartype() {
                        var width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
                        if (width < 1170) {
                            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                        } else {
                            $("#main-wrapper").attr("data-sidebartype", "full");
                        }
                    };
                    $(window).ready(setsidebartype);
                    $(window).on("resize", setsidebartype);
                    //****************************
                    /* This is for sidebartoggler*/
                    //****************************
                    $('.sidebartoggler').on("click", function () {
                        $("#main-wrapper").toggleClass("mini-sidebar");
                        if ($("#main-wrapper").hasClass("mini-sidebar")) {
                            $(".sidebartoggler").prop("checked", !0);
                            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                        } else {
                            $(".sidebartoggler").prop("checked", !1);
                            $("#main-wrapper").attr("data-sidebartype", "full");
                        }
                    });
                    break;
                //****************************
                // If the sidebar type has mini-sidebar
                //****************************       
                case 'mini-sidebar':
                    $('#' + myid).attr("data-sidebartype", "mini-sidebar");
                    //****************************
                    /* This is for sidebartoggler*/
                    //****************************
                    $('.sidebartoggler').on("click", function () {
                        $("#main-wrapper").toggleClass("mini-sidebar");
                        if ($("#main-wrapper").hasClass("mini-sidebar")) {
                            $(".sidebartoggler").prop("checked", !0);
                            $("#main-wrapper").attr("data-sidebartype", "full");
                        } else {
                            $(".sidebartoggler").prop("checked", !1);
                            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                        }
                    });
                    break;
                //****************************
                // If the sidebar type has iconbar
                //****************************       
                case 'iconbar':
                    $('#' + myid).attr("data-sidebartype", "iconbar");
                    //****************************
                    /* This is for the mini-sidebar if width is less then 1170*/
                    //**************************** 
                    var setsidebartype = function setsidebartype() {
                        var width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
                        if (width < 1170) {
                            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                            $("#main-wrapper").addClass("mini-sidebar");
                        } else {
                            $("#main-wrapper").attr("data-sidebartype", "iconbar");
                            $("#main-wrapper").removeClass("mini-sidebar");
                        }
                    };
                    $(window).ready(setsidebartype);
                    $(window).on("resize", setsidebartype);
                    //****************************
                    /* This is for sidebartoggler*/
                    //****************************
                    $('.sidebartoggler').on("click", function () {
                        $("#main-wrapper").toggleClass("mini-sidebar");
                        if ($("#main-wrapper").hasClass("mini-sidebar")) {
                            $(".sidebartoggler").prop("checked", !0);
                            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                        } else {
                            $(".sidebartoggler").prop("checked", !1);
                            $("#main-wrapper").attr("data-sidebartype", "iconbar");
                        }
                    });
                    break;
                //****************************
                // If the sidebar type has overlay
                //****************************       
                case 'overlay':
                    $('#' + myid).attr("data-sidebartype", "overlay");
                    var setsidebartype = function setsidebartype() {
                        var width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
                        if (width < 767) {
                            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                            $("#main-wrapper").addClass("mini-sidebar");
                        } else {
                            $("#main-wrapper").attr("data-sidebartype", "overlay");
                            $("#main-wrapper").removeClass("mini-sidebar");
                        }
                    };
                    $(window).ready(setsidebartype);
                    $(window).on("resize", setsidebartype);
                    //****************************
                    /* This is for sidebartoggler*/
                    //****************************
                    $('.sidebartoggler').on("click", function () {
                        $("#main-wrapper").toggleClass("show-sidebar");
                        if ($("#main-wrapper").hasClass("show-sidebar")) {
                            //$(".sidebartoggler").prop("checked", !0);
                            //$("#main-wrapper").attr("data-sidebartype","mini-sidebar");
                        } else {
                                //$(".sidebartoggler").prop("checked", !1);
                                //$("#main-wrapper").attr("data-sidebartype","iconbar");
                            }
                    });
                    break;
                default:
            }
        },
        //****************************
        // ManageSidebarColor functions 
        //****************************
        ManageSidebarColor: function ManageSidebarColor() {
            // Logo bg attribute
            function setsidebarbg() {
                var sbg = settings.SidebarColor;
                if (sbg != undefined && sbg != "") {
                    $('#' + myid + ' .left-sidebar').attr("data-sidebarbg", sbg);
                } else {
                    $('#' + myid + ' .left-sidebar').attr("data-sidebarbg", "skin1");
                }
            };
            setsidebarbg();
        },
        //****************************
        // ManageSidebarPosition functions
        //****************************
        ManageSidebarPosition: function ManageSidebarPosition() {
            var sidebarposition = settings.SidebarPosition;
            var headerposition = settings.HeaderPosition;
            switch (settings.Layout) {
                case 'vertical':
                    if (sidebarposition == true) {
                        $('#' + myid).attr("data-sidebar-position", 'fixed');
                        $("#sidebar-position").prop("checked", !0);
                    } else {
                        $('#' + myid).attr("data-sidebar-position", 'absolute');
                        $("#sidebar-position").prop("checked", !1);
                    }
                    if (headerposition == true) {
                        $('#' + myid).attr("data-header-position", 'fixed');
                        $("#header-position").prop("checked", !0);
                    } else {
                        $('#' + myid).attr("data-header-position", 'relative');
                        $("#header-position").prop("checked", !1);
                    }
                    break;
                default:
            }
        },
        //****************************
        // ManageBoxedLayout functions
        //****************************
        ManageBoxedLayout: function ManageBoxedLayout() {
            var boxedlayout = settings.BoxedLayout;
            switch (settings.Layout) {
                case 'vertical':
                    if (boxedlayout == true) {
                        $('#' + myid).attr("data-boxed-layout", 'boxed');
                        $("#boxed-layout").prop("checked", !0);
                    } else {
                        $('#' + myid).attr("data-boxed-layout", 'full');
                        $("#boxed-layout").prop("checked", !1);
                    }
                    break;
                case 'horizontal':
                    if (boxedlayout == true) {
                        $('#' + myid).attr("data-boxed-layout", 'boxed');
                        $("#boxed-layout").prop("checked", !0);
                    } else {
                        $('#' + myid).attr("data-boxed-layout", 'full');
                        $("#boxed-layout").prop("checked", !1);
                    }
                    break;
                default:
            }
        }
    };
    AdminSettings.AdminSettingsInit();
};
//****************************
// This is for the chat customizer setting
//****************************
$(function () {
    var chatarea = $("#chat");
    $('#chat .message-center a').on('click', function () {
        var name = $(this).find(".mail-contnet h5").text();
        var img = $(this).find(".user-img img").attr("src");
        var id = $(this).attr("data-user-id");
        var status = $(this).find(".profile-status").attr("data-status");
        if ($(this).hasClass("active")) {
            $(this).toggleClass("active");
            $(".chat-windows #user-chat" + id).hide();
        } else {
            $(this).toggleClass("active");
            if ($(".chat-windows #user-chat" + id).length) {
                $(".chat-windows #user-chat" + id).removeClass("mini-chat").show();
            } else {
                var msg = msg_receive('I watched the storm, so beautiful yet terrific.');
                msg += msg_sent('That is very deep indeed!');
                var html = "<div class='user-chat' id='user-chat" + id + "' data-user-id='" + id + "'>";
                html += "<div class='chat-head'><img src='" + img + "' data-user-id='" + id + "'><span class='status " + status + "'></span><span class='name'>" + name + "</span><span class='opts'><i class='ti-close closeit' data-user-id='" + id + "'></i><i class='ti-minus mini-chat' data-user-id='" + id + "'></i></span></div>";
                html += "<div class='chat-body'><ul class='chat-list'>" + msg + "</ul></div>";
                html += "<div class='chat-footer'><input type='text' data-user-id='" + id + "' placeholder='Type & Enter' class='form-control'></div>";
                html += "</div>";
                $(".chat-windows").append(html);
            }
        }
    });
    $(document).on('click', ".chat-windows .user-chat .chat-head .closeit", function (e) {
        var id = $(this).attr("data-user-id");
        $(".chat-windows #user-chat" + id).hide();
        $("#chat .message-center .user-info#chat_user_" + id).removeClass("active");
    });
    $(document).on('click', ".chat-windows .user-chat .chat-head img, .chat-windows .user-chat .chat-head .mini-chat", function (e) {
        var id = $(this).attr("data-user-id");
        if (!$(".chat-windows #user-chat" + id).hasClass("mini-chat")) {
            $(".chat-windows #user-chat" + id).addClass("mini-chat");
        } else {
            $(".chat-windows #user-chat" + id).removeClass("mini-chat");
        }
    });
    $(document).on('keypress', ".chat-windows .user-chat .chat-footer input", function (e) {
        if (e.keyCode == 13) {
            var id = $(this).attr("data-user-id");
            var msg = $(this).val();
            msg = msg_sent(msg);
            $(".chat-windows #user-chat" + id + " .chat-body .chat-list").append(msg);
            $(this).val("");
            $(this).focus();
        }
        $(".chat-windows #user-chat" + id + " .chat-body").perfectScrollbar({
            suppressScrollX: true
        });
    });
    $(".page-wrapper").on('click', function (e) {
        $('.chat-windows').addClass('hide-chat');
        $('.chat-windows').removeClass('show-chat');
    });
    $(".service-panel-toggle").on('click', function (e) {
        $('.chat-windows').addClass('show-chat');
        $('.chat-windows').removeClass('hide-chat');
    });
});

function msg_receive(msg) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    return "<li class='msg_receive'><div class='chat-content'><div class='box bg-light-info'>" + msg + "</div></div><div class='chat-time'>" + h + ":" + m + "</div></li>";
}

function msg_sent(msg) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    return "<li class='odd msg_sent'><div class='chat-content'><div class='box bg-light-info'>" + msg + "</div><br></div><div class='chat-time'>" + h + ":" + m + "</div></li>";
}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

!function (t) {
  "use strict";
  function e(t) {
    return null !== t && t === t.window;
  }function n(t) {
    return e(t) ? t : 9 === t.nodeType && t.defaultView;
  }function a(t) {
    var e,
        a,
        i = { top: 0, left: 0 },
        o = t && t.ownerDocument;return e = o.documentElement, "undefined" != typeof t.getBoundingClientRect && (i = t.getBoundingClientRect()), a = n(o), { top: i.top + a.pageYOffset - e.clientTop, left: i.left + a.pageXOffset - e.clientLeft };
  }function i(t) {
    var e = "";for (var n in t) {
      t.hasOwnProperty(n) && (e += n + ":" + t[n] + ";");
    }return e;
  }function o(t) {
    if (d.allowEvent(t) === !1) return null;for (var e = null, n = t.target || t.srcElement; null !== n.parentElement;) {
      if (!(n instanceof SVGElement || -1 === n.className.indexOf("waves-effect"))) {
        e = n;break;
      }if (n.classList.contains("waves-effect")) {
        e = n;break;
      }n = n.parentElement;
    }return e;
  }function r(e) {
    var n = o(e);null !== n && (c.show(e, n), "ontouchstart" in t && (n.addEventListener("touchend", c.hide, !1), n.addEventListener("touchcancel", c.hide, !1)), n.addEventListener("mouseup", c.hide, !1), n.addEventListener("mouseleave", c.hide, !1));
  }var s = s || {},
      u = document.querySelectorAll.bind(document),
      c = { duration: 750, show: function show(t, e) {
      if (2 === t.button) return !1;var n = e || this,
          o = document.createElement("div");o.className = "waves-ripple", n.appendChild(o);var r = a(n),
          s = t.pageY - r.top,
          u = t.pageX - r.left,
          d = "scale(" + n.clientWidth / 100 * 10 + ")";"touches" in t && (s = t.touches[0].pageY - r.top, u = t.touches[0].pageX - r.left), o.setAttribute("data-hold", Date.now()), o.setAttribute("data-scale", d), o.setAttribute("data-x", u), o.setAttribute("data-y", s);var l = { top: s + "px", left: u + "px" };o.className = o.className + " waves-notransition", o.setAttribute("style", i(l)), o.className = o.className.replace("waves-notransition", ""), l["-webkit-transform"] = d, l["-moz-transform"] = d, l["-ms-transform"] = d, l["-o-transform"] = d, l.transform = d, l.opacity = "1", l["-webkit-transition-duration"] = c.duration + "ms", l["-moz-transition-duration"] = c.duration + "ms", l["-o-transition-duration"] = c.duration + "ms", l["transition-duration"] = c.duration + "ms", l["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", l["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", o.setAttribute("style", i(l));
    }, hide: function hide(t) {
      d.touchup(t);var e = this,
          n = (1.4 * e.clientWidth, null),
          a = e.getElementsByClassName("waves-ripple");if (!(a.length > 0)) return !1;n = a[a.length - 1];var o = n.getAttribute("data-x"),
          r = n.getAttribute("data-y"),
          s = n.getAttribute("data-scale"),
          u = Date.now() - Number(n.getAttribute("data-hold")),
          l = 350 - u;0 > l && (l = 0), setTimeout(function () {
        var t = { top: r + "px", left: o + "px", opacity: "0", "-webkit-transition-duration": c.duration + "ms", "-moz-transition-duration": c.duration + "ms", "-o-transition-duration": c.duration + "ms", "transition-duration": c.duration + "ms", "-webkit-transform": s, "-moz-transform": s, "-ms-transform": s, "-o-transform": s, transform: s };n.setAttribute("style", i(t)), setTimeout(function () {
          try {
            e.removeChild(n);
          } catch (t) {
            return !1;
          }
        }, c.duration);
      }, l);
    }, wrapInput: function wrapInput(t) {
      for (var e = 0; e < t.length; e++) {
        var n = t[e];if ("input" === n.tagName.toLowerCase()) {
          var a = n.parentNode;if ("i" === a.tagName.toLowerCase() && -1 !== a.className.indexOf("waves-effect")) continue;var i = document.createElement("i");i.className = n.className + " waves-input-wrapper";var o = n.getAttribute("style");o || (o = ""), i.setAttribute("style", o), n.className = "waves-button-input", n.removeAttribute("style"), a.replaceChild(i, n), i.appendChild(n);
        }
      }
    } },
      d = { touches: 0, allowEvent: function allowEvent(t) {
      var e = !0;return "touchstart" === t.type ? d.touches += 1 : "touchend" === t.type || "touchcancel" === t.type ? setTimeout(function () {
        d.touches > 0 && (d.touches -= 1);
      }, 500) : "mousedown" === t.type && d.touches > 0 && (e = !1), e;
    }, touchup: function touchup(t) {
      d.allowEvent(t);
    } };s.displayEffect = function (e) {
    e = e || {}, "duration" in e && (c.duration = e.duration), c.wrapInput(u(".waves-effect")), "ontouchstart" in t && document.body.addEventListener("touchstart", r, !1), document.body.addEventListener("mousedown", r, !1);
  }, s.attach = function (e) {
    "input" === e.tagName.toLowerCase() && (c.wrapInput([e]), e = e.parentElement), "ontouchstart" in t && e.addEventListener("touchstart", r, !1), e.addEventListener("mousedown", r, !1);
  }, t.Waves = s, document.addEventListener("DOMContentLoaded", function () {
    s.displayEffect();
  }, !1);
}(window);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_perfect_scrollbar__ = __webpack_require__(47);


$(function () {
  'use strict';

  $('.preloader').fadeOut();
  // ==============================================================
  // Theme options
  // ==============================================================
  // ==============================================================
  // sidebar-hover
  // ==============================================================

  $('.left-sidebar').hover(function () {
    $('.navbar-header').addClass('expand-logo');
  }, function () {
    $('.navbar-header').removeClass('expand-logo');
  });
  // this is for close icon when navigation open in mobile view
  $('.nav-toggler').on('click', function () {
    $('#main-wrapper').toggleClass('show-sidebar');
    $('.nav-toggler i').toggleClass('ti-menu');
  });
  $('.nav-lock').on('click', function () {
    $('body').toggleClass('lock-nav');
    $('.nav-lock i').toggleClass('mdi-toggle-switch-off');
    $('body, .page-wrapper').trigger('resize');
  });
  $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
    $('.app-search').toggle(200);
    $('.app-search input').focus();
  });

  // ==============================================================
  // Right sidebar options
  // ==============================================================
  $(function () {
    $('.service-panel-toggle').on('click', function () {
      $('.customizer').toggleClass('show-service-panel');
    });
    $('.page-wrapper').on('click', function () {
      $('.customizer').removeClass('show-service-panel');
    });
  });
  // ==============================================================
  // This is for the floating labels
  // ==============================================================
  $('.floating-labels .form-control').on('focus blur', function (e) {
    $(this).parents('.form-group').toggleClass('focused', e.type === 'focus' || this.value.length > 0);
  }).trigger('blur');

  // ==============================================================
  //tooltip
  // ==============================================================
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  // ==============================================================
  //Popover
  // ==============================================================
  $(function () {
    $('[data-toggle="popover"]').popover();
  });

  // ==============================================================
  // Perfact scrollbar
  // ==============================================================
  // $('.message-center, .customizer-body, .scrollable').perfectScrollbar({
  //   wheelPropagation: !0
  // });

  var ps = new __WEBPACK_IMPORTED_MODULE_0_perfect_scrollbar__["a" /* default */]('.message-body');
  var ps = new __WEBPACK_IMPORTED_MODULE_0_perfect_scrollbar__["a" /* default */]('.notifications');
  var ps = new __WEBPACK_IMPORTED_MODULE_0_perfect_scrollbar__["a" /* default */]('.scroll-sidebar');
  var ps = new __WEBPACK_IMPORTED_MODULE_0_perfect_scrollbar__["a" /* default */]('.customizer-body');

  // ==============================================================
  // Resize all elements
  // ==============================================================
  $('body, .page-wrapper').trigger('resize');
  $('.page-wrapper').delay(20).show();
  // ==============================================================
  // To do list
  // ==============================================================
  $('.list-task li label').click(function () {
    $(this).toggleClass('task-done');
  });
  // ==============================================================
  // Collapsable cards
  // ==============================================================
  $('a[data-action="collapse"]').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
    $(this).closest('.card').children('.card-body').collapse('toggle');
  });
  // Toggle fullscreen
  $('a[data-action="expand"]').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
    $(this).closest('.card').toggleClass('card-fullscreen');
  });
  // Close Card
  $('a[data-action="close"]').on('click', function () {
    $(this).closest('.card').removeClass().slideUp('fast');
  });
  // ==============================================================
  // LThis is for mega menu
  // ==============================================================
  $(document).on('click', '.mega-dropdown', function (e) {
    e.stopPropagation();
  });
  // ==============================================================
  // Last month earning
  // ==============================================================
  var sparklineLogin = function sparklineLogin() {
    $('.lastmonth').sparkline([6, 10, 9, 11, 9, 10, 12], {
      type: 'bar',
      height: '35',
      barWidth: '4',
      width: '100%',
      resize: true,
      barSpacing: '8',
      barColor: '#2961ff'
    });
  };
  var sparkResize;

  $(window).resize(function (e) {
    clearTimeout(sparkResize);
    sparkResize = setTimeout(sparklineLogin, 500);
  });
  sparklineLogin();

  // ==============================================================
  // This is for the innerleft sidebar
  // ==============================================================
  $('.show-left-part').on('click', function () {
    $('.left-part').toggleClass('show-panel');
    $('.show-left-part').toggleClass('ti-menu');
  });

  // Disable right click and f12
  /*
    $("html").on("contextmenu",function(e){
       return false;
    });
    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
            return false;
        }   
    }); */
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
    var this$1 = this;

  for (var name in this$1.handlers) {
    this$1.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

var processScrollDiff = function(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
};

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

var updateGeometry = function(i) {
  var element = i.element;
  var roundedScrollTop = Math.floor(element.scrollTop);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt(i.railXWidth * i.containerWidth / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      (i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt(i.railYHeight * i.containerHeight / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      roundedScrollTop *
        (i.railYHeight - i.scrollbarYHeight) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
};

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  var roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

var clickRail = function(i) {
  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
};

var dragThumb = function(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail' ]);
};

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];
  var scrollbarYRail = ref[8];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i[scrollbarYRail].classList.remove(cls.state.clicking);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    startingScrollTop = element[scrollTop];
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    i[scrollbarYRail].classList.add(cls.state.clicking);

    e.stopPropagation();
    e.preventDefault();
  });
}

var keyboard = function(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
};

var wheel = function(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var roundedScrollTop = Math.floor(element.scrollTop);
    var isTop = element.scrollTop === 0;
    var isBottom =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
};

var touch = function(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);
      var overflow = [style.overflow, style.overflowX, style.overflowY].join(
        ''
      );

      // if scrollable
      if (overflow.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            !(cursor.scrollTop === 0 && deltaY > 0) &&
            !(cursor.scrollTop === maxScrollTop && deltaY < 0)
          ) {
            return true;
          }
        }
        var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            !(cursor.scrollLeft === 0 && deltaX < 0) &&
            !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
};

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: true,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this$1.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = Math.floor(this.element.scrollTop);
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

/* harmony default export */ __webpack_exports__["a"] = (PerfectScrollbar);


/***/ }),
/* 48 */,
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(51)
/* template */
var __vue_template__ = __webpack_require__(52)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Example.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-650f2efa", Component.options)
  } else {
    hotAPI.reload("data-v-650f2efa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        console.log('Component mounted.');
    }
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-8 col-md-offset-2" }, [
          _c("div", { staticClass: "panel panel-default" }, [
            _c("div", { staticClass: "panel-heading" }, [
              _vm._v("Example Component")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "panel-body" }, [
              _vm._v(
                "\n                    I'm an example component!\n                "
              )
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-650f2efa", module.exports)
  }
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(54)
/* template */
var __vue_template__ = __webpack_require__(55)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Card.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e0dd872", Component.options)
  } else {
    hotAPI.reload("data-v-2e0dd872", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2e0dd872", module.exports)
  }
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(57)
/* template */
var __vue_template__ = __webpack_require__(58)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/CardHeader.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16b9e4b4", Component.options)
  } else {
    hotAPI.reload("data-v-16b9e4b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card-header" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16b9e4b4", module.exports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(60)
/* template */
var __vue_template__ = __webpack_require__(61)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/CardBody.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6aa5e109", Component.options)
  } else {
    hotAPI.reload("data-v-6aa5e109", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['title', 'text']
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "card-body" },
    [
      _c("h3", { staticClass: "card-title" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c("p", { staticClass: "card-text" }, [_vm._v(_vm._s(_vm.text))]),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6aa5e109", module.exports)
  }
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(63)
/* template */
var __vue_template__ = __webpack_require__(64)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/CardGroup.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49a275a8", Component.options)
  } else {
    hotAPI.reload("data-v-49a275a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card-group" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-49a275a8", module.exports)
  }
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(66)
/* template */
var __vue_template__ = __webpack_require__(107)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/Wizard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-34fff468", Component.options)
  } else {
    hotAPI.reload("data-v-34fff468", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_stepper__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_stepper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_stepper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StepOne_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StepOne_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__StepOne_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StepTwo_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StepTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__StepTwo_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// This components will have the content for each stepper step.



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        HorizontalStepper: __WEBPACK_IMPORTED_MODULE_0_vue_stepper___default.a
    },
    data: function data() {
        return {
            demoSteps: [{
                icon: 'assignment',
                name: 'first',
                title: 'Company',
                subtitle: 'Information',
                component: __WEBPACK_IMPORTED_MODULE_1__StepOne_vue___default.a,
                completed: false
            }, {
                icon: 'place',
                name: 'second',
                title: 'Address',
                subtitle: 'Company location',
                component: __WEBPACK_IMPORTED_MODULE_2__StepTwo_vue___default.a,
                completed: false
            }, {
                icon: 'grade',
                name: 'second',
                title: 'Plan',
                subtitle: 'Choose a plan',
                component: __WEBPACK_IMPORTED_MODULE_2__StepTwo_vue___default.a,
                completed: false
            }, {
                icon: 'done_all',
                name: 'second',
                title: 'Review',
                subtitle: 'check and go',
                component: __WEBPACK_IMPORTED_MODULE_2__StepTwo_vue___default.a,
                completed: false
            }]
        };
    },

    methods: {
        // Executed when @completed-step event is triggered
        completeStep: function completeStep(payload) {
            this.demoSteps.forEach(function (step) {
                if (step.name === payload.name) {
                    step.completed = true;
                }
            });
        },

        // Executed when @active-step event is triggered
        isStepActive: function isStepActive(payload) {
            this.demoSteps.forEach(function (step) {
                if (step.name === payload.name) {
                    if (step.completed === true) {
                        step.completed = false;
                    }
                }
            });
        },

        // Executed when @stepper-finished event is triggered
        alert: function (_alert) {
            function alert(_x) {
                return _alert.apply(this, arguments);
            }

            alert.toString = function () {
                return _alert.toString();
            };

            return alert;
        }(function (payload) {
            alert('end');
        })
    }
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(69)
  __webpack_require__(72)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(74)
/* template */
var __vue_template__ = __webpack_require__(76)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3ee86246"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules/vue-stepper/src/HorizontalStepper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ee86246", Component.options)
  } else {
    hotAPI.reload("data-v-3ee86246", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(18)("7ebd7fc6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../css-loader/index.js?sourceMap!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3ee86246\",\"scoped\":true,\"hasInlineConfig\":true}!../../sass-loader/lib/loader.js!./HorizontalStepper.scss", function() {
     var newContent = require("!!../../css-loader/index.js?sourceMap!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3ee86246\",\"scoped\":true,\"hasInlineConfig\":true}!../../sass-loader/lib/loader.js!./HorizontalStepper.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(true);
// imports


// module
exports.push([module.i, "\n.stepper-box[data-v-3ee86246] {\n  background-color: white;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  min-height: 200px;\n}\n.stepper-box .top[data-v-3ee86246] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: relative;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.stepper-box .top .stepper-button-top[data-v-3ee86246] {\n      z-index: 20;\n      padding: .4rem;\n      border-radius: 100rem;\n      cursor: pointer;\n      position: absolute;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n}\n.stepper-box .top .stepper-button-top.next[data-v-3ee86246] {\n        border: 2px solid #3383c8;\n        color: #3383c8;\n        right: 1%;\n}\n.stepper-box .top .stepper-button-top.next.deactivated[data-v-3ee86246] {\n          border: 2px solid #cccccc !important;\n          color: #cccccc;\n          cursor: not-allowed !important;\n}\n.stepper-box .top .stepper-button-top.previous[data-v-3ee86246] {\n        color: #333333;\n        left: 1%;\n}\n.stepper-box .top .divider-line[data-v-3ee86246] {\n      border-bottom: 1px solid #cccccc;\n      height: 2px;\n      position: absolute;\n}\n@media (max-width: 767px) {\n.stepper-box .top .divider-line[data-v-3ee86246] {\n          width: 90%;\n}\n}\n.stepper-box .top .steps-wrapper[data-v-3ee86246] {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      position: relative;\n      width: 95%;\n      left: 0;\n      padding: 2% 4%;\n}\n@media (max-width: 767px) {\n.stepper-box .top .steps-wrapper[data-v-3ee86246] {\n          width: 90%;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n}\n}\n.stepper-box .top .steps-wrapper .step[data-v-3ee86246] {\n        position: relative;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        text-align: center;\n}\n@media (max-width: 767px) {\n.stepper-box .top .steps-wrapper .step[data-v-3ee86246] {\n            width: 100% !important;\n}\n}\n@media (max-width: 767px) {\n.stepper-box .top .steps-wrapper .step.deactivated[data-v-3ee86246] {\n            display: none;\n}\n}\n.stepper-box .top .steps-wrapper .step.deactivated .circle i[data-v-3ee86246] {\n          background-color: #bbbbbb !important;\n}\n.stepper-box .top .steps-wrapper .step.deactivated .step-title[data-v-3ee86246] {\n          opacity: .35;\n}\n.stepper-box .top .steps-wrapper .step .circle[data-v-3ee86246] {\n          margin-bottom: 1rem;\n          padding: 0 1rem;\n          background-color: white;\n}\n.stepper-box .top .steps-wrapper .step .circle i[data-v-3ee86246] {\n            background-color: #3383c8;\n            color: #fff;\n            border-radius: 100rem;\n            padding: 1rem;\n}\n.stepper-box .top .steps-wrapper .step .step-title[data-v-3ee86246] {\n          position: absolute;\n          top: 90%;\n          width: 100%;\n}\n.stepper-box .top .steps-wrapper .step .step-title h1[data-v-3ee86246],\n          .stepper-box .top .steps-wrapper .step .step-title h2[data-v-3ee86246],\n          .stepper-box .top .steps-wrapper .step .step-title h3[data-v-3ee86246],\n          .stepper-box .top .steps-wrapper .step .step-title h4[data-v-3ee86246],\n          .stepper-box .top .steps-wrapper .step .step-title h5[data-v-3ee86246] {\n            margin: 0 0 .2rem 0;\n            color: #333333;\n            font-weight: bold;\n}\n.stepper-box .top .steps-wrapper .step .step-title .step-subtitle[data-v-3ee86246] {\n            font-weight: lighter;\n            margin: 0;\n            color: #555555;\n}\n.stepper-box .content[data-v-3ee86246] {\n    overflow: hidden;\n    margin: 1.5rem 0;\n}\n.stepper-box .bottom[data-v-3ee86246] {\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    padding: 2rem;\n    border-top: 1px solid #cccccc;\n}\n.stepper-box .bottom.only-next[data-v-3ee86246] {\n      -webkit-box-pack: end;\n          -ms-flex-pack: end;\n              justify-content: flex-end;\n}\n.stepper-box .bottom .stepper-button[data-v-3ee86246] {\n      padding: .5rem 1rem;\n      cursor: pointer;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n}\n.stepper-box .bottom .stepper-button.next[data-v-3ee86246] {\n        background-color: #3383c8;\n        color: white;\n        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n}\n.stepper-box .bottom .stepper-button.next.deactivated[data-v-3ee86246] {\n          background-color: #cccccc !important;\n          cursor: not-allowed !important;\n}\n.stepper-box .bottom .stepper-button.previous[data-v-3ee86246] {\n        color: #333333;\n}\n", "", {"version":3,"sources":["/home/pyramid/Desktop/newyork-backend/node_modules/vue-stepper/src/HorizontalStepper.scss"],"names":[],"mappings":";AAAA;EACE,wBAAwB;EACxB,iFAAyE;UAAzE,yEAAyE;EACzE,kBAAkB;CAAE;AACpB;IACE,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,0BAAoB;QAApB,uBAAoB;YAApB,oBAAoB;IACpB,mBAAmB;IACnB,yBAAwB;QAAxB,sBAAwB;YAAxB,wBAAwB;CAAE;AAC1B;MACE,YAAY;MACZ,eAAe;MACf,sBAAsB;MACtB,gBAAgB;MAChB,mBAAmB;MACnB,qBAAc;MAAd,qBAAc;MAAd,cAAc;MACd,0BAAoB;UAApB,uBAAoB;cAApB,oBAAoB;MACpB,0BAA+B;UAA/B,uBAA+B;cAA/B,+BAA+B;CAAE;AACjC;QACE,0BAA0B;QAC1B,eAAe;QACf,UAAU;CAAE;AACZ;UACE,qCAAqC;UACrC,eAAe;UACf,+BAA+B;CAAE;AACrC;QACE,eAAe;QACf,SAAS;CAAE;AACf;MACE,iCAAiC;MACjC,YAAY;MACZ,mBAAmB;CAAE;AACrB;AACE;UACE,WAAW;CAAE;CAAE;AACrB;MACE,qBAAc;MAAd,qBAAc;MAAd,cAAc;MACd,0BAAoB;UAApB,uBAAoB;cAApB,oBAAoB;MACpB,0BAA+B;UAA/B,uBAA+B;cAA/B,+BAA+B;MAC/B,mBAAmB;MACnB,WAAW;MACX,QAAQ;MACR,eAAe;CAAE;AACjB;AACE;UACE,WAAW;UACX,yBAAwB;cAAxB,sBAAwB;kBAAxB,wBAAwB;CAAE;CAAE;AAChC;QACE,mBAAmB;QACnB,qBAAc;QAAd,qBAAc;QAAd,cAAc;QACd,6BAAuB;QAAvB,8BAAuB;YAAvB,2BAAuB;gBAAvB,uBAAuB;QACvB,0BAAoB;YAApB,uBAAoB;gBAApB,oBAAoB;QACpB,mBAAmB;CAAE;AACrB;AACE;YACE,uBAAuB;CAAE;CAAE;AAC/B;AACE;YACE,cAAc;CAAE;CAAE;AACtB;UACE,qCAAqC;CAAE;AACzC;UACE,aAAa;CAAE;AACjB;UACE,oBAAoB;UACpB,gBAAgB;UAChB,wBAAwB;CAAE;AAC1B;YACE,0BAA0B;YAC1B,YAAY;YACZ,sBAAsB;YACtB,cAAc;CAAE;AACpB;UACE,mBAAmB;UACnB,SAAS;UACT,YAAY;CAAE;AACd;;;;;YAKE,oBAAoB;YACpB,eAAe;YACf,kBAAkB;CAAE;AACtB;YACE,qBAAqB;YACrB,UAAU;YACV,eAAe;CAAE;AAC3B;IACE,iBAAiB;IACjB,iBAAiB;CAAE;AACrB;IACE,mBAAmB;IACnB,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,0BAA+B;QAA/B,uBAA+B;YAA/B,+BAA+B;IAC/B,0BAAoB;QAApB,uBAAoB;YAApB,oBAAoB;IACpB,cAAc;IACd,8BAA8B;CAAE;AAChC;MACE,sBAA0B;UAA1B,mBAA0B;cAA1B,0BAA0B;CAAE;AAC9B;MACE,oBAAoB;MACpB,gBAAgB;MAChB,qBAAc;MAAd,qBAAc;MAAd,cAAc;MACd,0BAAoB;UAApB,uBAAoB;cAApB,oBAAoB;MACpB,0BAA+B;UAA/B,uBAA+B;cAA/B,+BAA+B;CAAE;AACjC;QACE,0BAA0B;QAC1B,aAAa;QACb,iFAAyE;gBAAzE,yEAAyE;CAAE;AAC3E;UACE,qCAAqC;UACrC,+BAA+B;CAAE;AACrC;QACE,eAAe;CAAE","file":"HorizontalStepper.scss","sourcesContent":[".stepper-box {\n  background-color: white;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  min-height: 200px; }\n  .stepper-box .top {\n    display: flex;\n    align-items: center;\n    position: relative;\n    justify-content: center; }\n    .stepper-box .top .stepper-button-top {\n      z-index: 20;\n      padding: .4rem;\n      border-radius: 100rem;\n      cursor: pointer;\n      position: absolute;\n      display: flex;\n      align-items: center;\n      justify-content: space-between; }\n      .stepper-box .top .stepper-button-top.next {\n        border: 2px solid #3383c8;\n        color: #3383c8;\n        right: 1%; }\n        .stepper-box .top .stepper-button-top.next.deactivated {\n          border: 2px solid #cccccc !important;\n          color: #cccccc;\n          cursor: not-allowed !important; }\n      .stepper-box .top .stepper-button-top.previous {\n        color: #333333;\n        left: 1%; }\n    .stepper-box .top .divider-line {\n      border-bottom: 1px solid #cccccc;\n      height: 2px;\n      position: absolute; }\n      @media (max-width: 767px) {\n        .stepper-box .top .divider-line {\n          width: 90%; } }\n    .stepper-box .top .steps-wrapper {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      position: relative;\n      width: 95%;\n      left: 0;\n      padding: 2% 4%; }\n      @media (max-width: 767px) {\n        .stepper-box .top .steps-wrapper {\n          width: 90%;\n          justify-content: center; } }\n      .stepper-box .top .steps-wrapper .step {\n        position: relative;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        text-align: center; }\n        @media (max-width: 767px) {\n          .stepper-box .top .steps-wrapper .step {\n            width: 100% !important; } }\n        @media (max-width: 767px) {\n          .stepper-box .top .steps-wrapper .step.deactivated {\n            display: none; } }\n        .stepper-box .top .steps-wrapper .step.deactivated .circle i {\n          background-color: #bbbbbb !important; }\n        .stepper-box .top .steps-wrapper .step.deactivated .step-title {\n          opacity: .35; }\n        .stepper-box .top .steps-wrapper .step .circle {\n          margin-bottom: 1rem;\n          padding: 0 1rem;\n          background-color: white; }\n          .stepper-box .top .steps-wrapper .step .circle i {\n            background-color: #3383c8;\n            color: #fff;\n            border-radius: 100rem;\n            padding: 1rem; }\n        .stepper-box .top .steps-wrapper .step .step-title {\n          position: absolute;\n          top: 90%;\n          width: 100%; }\n          .stepper-box .top .steps-wrapper .step .step-title h1,\n          .stepper-box .top .steps-wrapper .step .step-title h2,\n          .stepper-box .top .steps-wrapper .step .step-title h3,\n          .stepper-box .top .steps-wrapper .step .step-title h4,\n          .stepper-box .top .steps-wrapper .step .step-title h5 {\n            margin: 0 0 .2rem 0;\n            color: #333333;\n            font-weight: bold; }\n          .stepper-box .top .steps-wrapper .step .step-title .step-subtitle {\n            font-weight: lighter;\n            margin: 0;\n            color: #555555; }\n  .stepper-box .content {\n    overflow: hidden;\n    margin: 1.5rem 0; }\n  .stepper-box .bottom {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 2rem;\n    border-top: 1px solid #cccccc; }\n    .stepper-box .bottom.only-next {\n      justify-content: flex-end; }\n    .stepper-box .bottom .stepper-button {\n      padding: .5rem 1rem;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: space-between; }\n      .stepper-box .bottom .stepper-button.next {\n        background-color: #3383c8;\n        color: white;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); }\n        .stepper-box .bottom .stepper-button.next.deactivated {\n          background-color: #cccccc !important;\n          cursor: not-allowed !important; }\n      .stepper-box .bottom .stepper-button.previous {\n        color: #333333; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(18)("bb081566", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../css-loader/index.js?sourceMap!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3ee86246\",\"scoped\":true,\"hasInlineConfig\":true}!../../vue-loader/lib/selector.js?type=styles&index=1!./HorizontalStepper.vue", function() {
     var newContent = require("!!../../css-loader/index.js?sourceMap!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3ee86246\",\"scoped\":true,\"hasInlineConfig\":true}!../../vue-loader/lib/selector.js?type=styles&index=1!./HorizontalStepper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* fallback */\n@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"),\n    url(https://fonts.gstatic.com/s/materialicons/v17/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2)\n      format(\"woff2\");\n}\n.material-icons[data-v-3ee86246] {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: \"liga\";\n  -webkit-font-smoothing: antialiased;\n}\n", "", {"version":3,"sources":["/home/pyramid/Desktop/newyork-backend/node_modules/vue-stepper/src/node_modules/vue-stepper/src/HorizontalStepper.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAqNA,cAAA;AACA;EACA,8BAAA;EACA,mBAAA;EACA,iBAAA;EACA;;sBAEA;CACA;AAEA;EACA,8BAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;EACA,uBAAA;EACA,qBAAA;EACA,sBAAA;EACA,oBAAA;EACA,kBAAA;EACA,eAAA;EACA,sCAAA;EACA,oCAAA;CACA","file":"HorizontalStepper.vue","sourcesContent":["<template>\n    <div class=\"stepper-box\">\n        <div class=\"top\">\n            <div class=\"divider-line\" :style=\"{width: `${(100/(steps.length) * (steps.length - 1)) - 10}%`}\"></div>\n            <div class=\"steps-wrapper\">\n                <template v-if=\"topButtons\">\n                    <div v-if=\"currentStep.index > 0\" class=\"stepper-button-top previous\" @click=\"backStep()\">\n                        <i class=\"material-icons\">keyboard_arrow_left</i>\n                    </div>\n                </template>\n                <template v-for=\"(step, index) in steps\">\n                    <div :class=\"['step', isStepActive(index, step)]\" :key=\"index\" :style=\"{width: `${100 / steps.length}%`}\">\n                        <div class=\"circle\">\n                            <i class=\"material-icons md-18\">\n                                {{ (step.completed) ? 'done' : step.icon }}\n                            </i>\n                        </div>\n                        <div class=\"step-title\">\n                            <h4>{{step.title}}</h4>\n                            <h5 class=\"step-subtitle\">{{step.subtitle}}</h5>\n                        </div>\n                    </div>\n                </template>\n                <div v-if=\"topButtons\" :class=\"['stepper-button-top next', !canContinue ? 'deactivated' : '']\" @click=\"nextStep()\">\n                    <i class=\"material-icons\">keyboard_arrow_right</i>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">\n            <transition :enter-active-class=\"enterAnimation\" :leave-active-class=\"leaveAnimation\" mode=\"out-in\">\n                <!--If keep alive-->\n                <keep-alive v-if=\"keepAlive\">\n                    <component :is=\"steps[currentStep.index].component\" :clickedNext=\"nextButton[currentStep.name]\" @can-continue=\"proceed\" @change-next=\"changeNextBtnValue\" :current-step=\"currentStep\"></component>\n                </keep-alive>\n                <!--If not show component and destroy it in each step change-->\n                <component v-else :is=\"steps[currentStep.index].component\" :clickedNext=\"nextButton[currentStep.name]\" @can-continue=\"proceed\" @change-next=\"changeNextBtnValue\" :current-step=\"currentStep\"></component>\n            </transition>\n        </div>\n        <div :class=\"['bottom', (currentStep.index > 0) ? '' : 'only-next']\">\n            <div v-if=\"currentStep.index > 0\" class=\"stepper-button previous\" @click=\"backStep()\">\n                <i class=\"material-icons\">keyboard_arrow_left</i>\n                <span>{{ 'back' | translate(locale) }}</span>\n            </div>\n            <div :class=\"['stepper-button next', !canContinue ? 'deactivated' : '']\" @click=\"nextStep()\">\n                <span>{{ (finalStep) ? 'finish' : 'next' | translate(locale) }}</span>\n                <i class=\"material-icons\">keyboard_arrow_right</i>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\nimport translations from \"./Translations.js\";\n\nexport default {\n  filters: {\n    translate: function(value, locale) {\n      return translations[locale][value];\n    }\n  },\n\n  props: {\n    locale: {\n      type: String,\n      default: \"en\"\n    },\n    topButtons: {\n      type: Boolean,\n      default: false\n    },\n    steps: {\n      type: Array,\n      default: function() {\n        return [\n          {\n            icon: \"mail\",\n            name: \"first\",\n            title: \"Sample title 1\",\n            subtitle: \"Subtitle sample\"\n          },\n          {\n            icon: \"report_problem\",\n            name: \"second\",\n            title: \"Sample title 2\",\n            subtitle: \"Subtitle sample\"\n          }\n        ];\n      }\n    },\n    keepAlive: {\n      type: Boolean,\n      default: true\n    }\n  },\n\n  data() {\n    return {\n      currentStep: {},\n      previousStep: {},\n      nextButton: {},\n      canContinue: false,\n      finalStep: false\n    };\n  },\n\n  computed: {\n    enterAnimation() {\n      if (this.currentStep.index < this.previousStep.index) {\n        return \"animated quick fadeInLeft\";\n      } else {\n        return \"animated quick fadeInRight\";\n      }\n    },\n    leaveAnimation() {\n      if (this.currentStep.index > this.previousStep.index) {\n        return \"animated quick fadeOutLeft\";\n      } else {\n        return \"animated quick fadeOutRight\";\n      }\n    }\n  },\n\n  methods: {\n    isStepActive(index, step) {\n      if (this.currentStep.index === index) {\n        return \"activated\";\n      } else {\n        return \"deactivated\";\n      }\n    },\n\n    activateStep(index, back = false) {\n      if (this.steps[index]) {\n        this.previousStep = this.currentStep;\n        this.currentStep = {\n          name: this.steps[index].name,\n          index: index\n        };\n\n        if (index + 1 === this.steps.length) {\n          this.finalStep = true;\n        } else {\n          this.finalStep = false;\n        }\n\n        if (!back) {\n          this.$emit(\"completed-step\", this.previousStep);\n        }\n      }\n      this.$emit(\"active-step\", this.currentStep);\n    },\n\n    nextStepAction() {\n      this.nextButton[this.currentStep.name] = true;\n      if (this.canContinue) {\n        if (this.finalStep) {\n          this.$emit(\"stepper-finished\", this.currentStep);\n        }\n        let currentIndex = this.currentStep.index + 1;\n\n        this.activateStep(currentIndex);\n      }\n      this.canContinue = false;\n      this.$forceUpdate();\n    },\n\n    nextStep () {\n\n      if (!this.$listeners || !this.$listeners['before-next-step']) {\n        this.nextStepAction()\n      }\n\n      this.canContinue = false;\n\n      this.$emit(\"before-next-step\", { currentStep: this.currentStep }, (next = true) => {\n        this.canContinue = true;\n        if (next) {\n          this.nextStepAction()\n        }\n      });\n    },\n    backStep() {\n      this.$emit(\"clicking-back\");\n      let currentIndex = this.currentStep.index - 1;\n      if (currentIndex >= 0) {\n        this.activateStep(currentIndex, true);\n      }\n    },\n\n    proceed(payload) {\n      this.canContinue = payload.value;\n    },\n\n    changeNextBtnValue(payload) {\n      this.nextButton[this.currentStep.name] = payload.nextBtnValue;\n      this.$forceUpdate();\n    }\n  },\n\n  created() {\n    // Initiate stepper\n    this.activateStep(0);\n    this.steps.forEach(step => {\n      this.nextButton[step.name] = false;\n    });\n  }\n};\n</script>\n\n<style src=\"./HorizontalStepper.scss\" scoped lang=\"scss\">\n\n</style>\n<style scoped>\n/* fallback */\n@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"),\n    url(https://fonts.gstatic.com/s/materialicons/v17/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2)\n      format(\"woff2\");\n}\n\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: \"liga\";\n  -webkit-font-smoothing: antialiased;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Translations_js__ = __webpack_require__(75);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  filters: {
    translate: function translate(value, locale) {
      return __WEBPACK_IMPORTED_MODULE_0__Translations_js__["a" /* default */][locale][value];
    }
  },

  props: {
    locale: {
      type: String,
      default: "en"
    },
    topButtons: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array,
      default: function _default() {
        return [{
          icon: "mail",
          name: "first",
          title: "Sample title 1",
          subtitle: "Subtitle sample"
        }, {
          icon: "report_problem",
          name: "second",
          title: "Sample title 2",
          subtitle: "Subtitle sample"
        }];
      }
    },
    keepAlive: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      currentStep: {},
      previousStep: {},
      nextButton: {},
      canContinue: false,
      finalStep: false
    };
  },


  computed: {
    enterAnimation: function enterAnimation() {
      if (this.currentStep.index < this.previousStep.index) {
        return "animated quick fadeInLeft";
      } else {
        return "animated quick fadeInRight";
      }
    },
    leaveAnimation: function leaveAnimation() {
      if (this.currentStep.index > this.previousStep.index) {
        return "animated quick fadeOutLeft";
      } else {
        return "animated quick fadeOutRight";
      }
    }
  },

  methods: {
    isStepActive: function isStepActive(index, step) {
      if (this.currentStep.index === index) {
        return "activated";
      } else {
        return "deactivated";
      }
    },
    activateStep: function activateStep(index) {
      var back = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.steps[index]) {
        this.previousStep = this.currentStep;
        this.currentStep = {
          name: this.steps[index].name,
          index: index
        };

        if (index + 1 === this.steps.length) {
          this.finalStep = true;
        } else {
          this.finalStep = false;
        }

        if (!back) {
          this.$emit("completed-step", this.previousStep);
        }
      }
      this.$emit("active-step", this.currentStep);
    },
    nextStepAction: function nextStepAction() {
      this.nextButton[this.currentStep.name] = true;
      if (this.canContinue) {
        if (this.finalStep) {
          this.$emit("stepper-finished", this.currentStep);
        }
        var currentIndex = this.currentStep.index + 1;

        this.activateStep(currentIndex);
      }
      this.canContinue = false;
      this.$forceUpdate();
    },
    nextStep: function nextStep() {
      var _this = this;

      if (!this.$listeners || !this.$listeners['before-next-step']) {
        this.nextStepAction();
      }

      this.canContinue = false;

      this.$emit("before-next-step", { currentStep: this.currentStep }, function () {
        var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        _this.canContinue = true;
        if (next) {
          _this.nextStepAction();
        }
      });
    },
    backStep: function backStep() {
      this.$emit("clicking-back");
      var currentIndex = this.currentStep.index - 1;
      if (currentIndex >= 0) {
        this.activateStep(currentIndex, true);
      }
    },
    proceed: function proceed(payload) {
      this.canContinue = payload.value;
    },
    changeNextBtnValue: function changeNextBtnValue(payload) {
      this.nextButton[this.currentStep.name] = payload.nextBtnValue;
      this.$forceUpdate();
    }
  },

  created: function created() {
    var _this2 = this;

    // Initiate stepper
    this.activateStep(0);
    this.steps.forEach(function (step) {
      _this2.nextButton[step.name] = false;
    });
  }
});

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    en: {
        next: 'Next',
        back: 'Back',
        finish: 'Finish'
    },
    es: {
        next: 'Siguiente',
        back: 'Atrás',
        finish: 'Finalizar'
    },
    pt: {
        next: 'Próximo',
        back: 'Voltar',
        finish: 'Finalizar'
    },
    ja: {
        next: '次へ',
        back: '戻る',
        finish: '完了'
    },
    he: {
        next: 'הבא',
        back: 'חזרה',
        finish: 'סיום'
    },
    cn: {
        next: '下一步',
        back: '返回',
        finish: '完成'
    },
    ru: {
        next: 'Вперед',
        back: 'Назад',
        finish: 'Готово'
    }
});


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "stepper-box" }, [
    _c("div", { staticClass: "top" }, [
      _c("div", {
        staticClass: "divider-line",
        style: {
          width: (100 / _vm.steps.length) * (_vm.steps.length - 1) - 10 + "%"
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "steps-wrapper" },
        [
          _vm.topButtons
            ? [
                _vm.currentStep.index > 0
                  ? _c(
                      "div",
                      {
                        staticClass: "stepper-button-top previous",
                        on: {
                          click: function($event) {
                            _vm.backStep()
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "material-icons" }, [
                          _vm._v("keyboard_arrow_left")
                        ])
                      ]
                    )
                  : _vm._e()
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.steps, function(step, index) {
            return [
              _c(
                "div",
                {
                  key: index,
                  class: ["step", _vm.isStepActive(index, step)],
                  style: { width: 100 / _vm.steps.length + "%" }
                },
                [
                  _c("div", { staticClass: "circle" }, [
                    _c("i", { staticClass: "material-icons md-18" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(step.completed ? "done" : step.icon) +
                          "\n                        "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "step-title" }, [
                    _c("h4", [_vm._v(_vm._s(step.title))]),
                    _vm._v(" "),
                    _c("h5", { staticClass: "step-subtitle" }, [
                      _vm._v(_vm._s(step.subtitle))
                    ])
                  ])
                ]
              )
            ]
          }),
          _vm._v(" "),
          _vm.topButtons
            ? _c(
                "div",
                {
                  class: [
                    "stepper-button-top next",
                    !_vm.canContinue ? "deactivated" : ""
                  ],
                  on: {
                    click: function($event) {
                      _vm.nextStep()
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons" }, [
                    _vm._v("keyboard_arrow_right")
                  ])
                ]
              )
            : _vm._e()
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "content" },
      [
        _c(
          "transition",
          {
            attrs: {
              "enter-active-class": _vm.enterAnimation,
              "leave-active-class": _vm.leaveAnimation,
              mode: "out-in"
            }
          },
          [
            _vm.keepAlive
              ? _c(
                  "keep-alive",
                  [
                    _c(_vm.steps[_vm.currentStep.index].component, {
                      tag: "component",
                      attrs: {
                        clickedNext: _vm.nextButton[_vm.currentStep.name],
                        "current-step": _vm.currentStep
                      },
                      on: {
                        "can-continue": _vm.proceed,
                        "change-next": _vm.changeNextBtnValue
                      }
                    })
                  ],
                  1
                )
              : _c(_vm.steps[_vm.currentStep.index].component, {
                  tag: "component",
                  attrs: {
                    clickedNext: _vm.nextButton[_vm.currentStep.name],
                    "current-step": _vm.currentStep
                  },
                  on: {
                    "can-continue": _vm.proceed,
                    "change-next": _vm.changeNextBtnValue
                  }
                })
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { class: ["bottom", _vm.currentStep.index > 0 ? "" : "only-next"] },
      [
        _vm.currentStep.index > 0
          ? _c(
              "div",
              {
                staticClass: "stepper-button previous",
                on: {
                  click: function($event) {
                    _vm.backStep()
                  }
                }
              },
              [
                _c("i", { staticClass: "material-icons" }, [
                  _vm._v("keyboard_arrow_left")
                ]),
                _vm._v(" "),
                _c("span", [
                  _vm._v(_vm._s(_vm._f("translate")("back", _vm.locale)))
                ])
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          {
            class: [
              "stepper-button next",
              !_vm.canContinue ? "deactivated" : ""
            ],
            on: {
              click: function($event) {
                _vm.nextStep()
              }
            }
          },
          [
            _c("span", [
              _vm._v(
                _vm._s(
                  _vm._f("translate")(
                    _vm.finalStep ? "finish" : "next",
                    _vm.locale
                  )
                )
              )
            ]),
            _vm._v(" "),
            _c("i", { staticClass: "material-icons" }, [
              _vm._v("keyboard_arrow_right")
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3ee86246", module.exports)
  }
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(78)
/* template */
var __vue_template__ = __webpack_require__(103)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/StepOne.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ba4e44d", Component.options)
  } else {
    hotAPI.reload("data-v-5ba4e44d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['clickedNext', 'currentStep'],
    mixins: [__WEBPACK_IMPORTED_MODULE_0_vuelidate__["validationMixin"]],
    data: function data() {
        return {
            form: {
                username: '',
                demoEmail: '',
                message: ''
            }
        };
    },

    validations: {
        form: {
            username: {
                required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"]
            },
            demoEmail: {
                required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
                email: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["email"]
            },
            message: {
                required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"]
            }
        }
    },
    watch: {
        $v: {
            handler: function handler(val) {
                if (!val.$invalid) {
                    this.$emit('can-continue', { value: true });
                } else {
                    this.$emit('can-continue', { value: false });
                }
            },
            deep: true
        },
        clickedNext: function clickedNext(val) {
            if (val === true) {
                this.$v.form.$touch();
            }
        }
    },
    mounted: function mounted() {
        if (!this.$v.$invalid) {
            this.$emit('can-continue', { value: true });
        } else {
            this.$emit('can-continue', { value: false });
        }
    }
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchChildren = patchChildren;
exports.h = h;

function isUndef(v) {
  return v === null || v === undefined;
}

function isDef(v) {
  return v !== null && v !== undefined;
}

function sameVval(oldVval, vval) {
  return vval.tag === oldVval.tag && vval.key === oldVval.key;
}

function createVm(vval) {
  var Vm = vval.tag;
  vval.vm = new Vm({
    data: vval.args
  });
}

function updateVval(vval) {
  var keys = Object.keys(vval.args);

  for (var i = 0; i < keys.length; i++) {
    keys.forEach(function (k) {
      vval.vm[k] = vval.args[k];
    });
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }

  return map;
}

function updateChildren(oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVval = oldCh[0];
  var oldEndVval = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVval = newCh[0];
  var newEndVval = newCh[newEndIdx];
  var oldKeyToIdx, idxInOld, elmToMove;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVval)) {
      oldStartVval = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVval)) {
      oldEndVval = oldCh[--oldEndIdx];
    } else if (sameVval(oldStartVval, newStartVval)) {
      patchVval(oldStartVval, newStartVval);
      oldStartVval = oldCh[++oldStartIdx];
      newStartVval = newCh[++newStartIdx];
    } else if (sameVval(oldEndVval, newEndVval)) {
      patchVval(oldEndVval, newEndVval);
      oldEndVval = oldCh[--oldEndIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldStartVval, newEndVval)) {
      patchVval(oldStartVval, newEndVval);
      oldStartVval = oldCh[++oldStartIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldEndVval, newStartVval)) {
      patchVval(oldEndVval, newStartVval);
      oldEndVval = oldCh[--oldEndIdx];
      newStartVval = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVval.key) ? oldKeyToIdx[newStartVval.key] : null;

      if (isUndef(idxInOld)) {
        createVm(newStartVval);
        newStartVval = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];

        if (sameVval(elmToMove, newStartVval)) {
          patchVval(elmToMove, newStartVval);
          oldCh[idxInOld] = undefined;
          newStartVval = newCh[++newStartIdx];
        } else {
          createVm(newStartVval);
          newStartVval = newCh[++newStartIdx];
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) {
    addVvals(newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVvals(oldCh, oldStartIdx, oldEndIdx);
  }
}

function addVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createVm(vvals[startIdx]);
  }
}

function removeVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vvals[startIdx];

    if (isDef(ch)) {
      ch.vm.$destroy();
      ch.vm = null;
    }
  }
}

function patchVval(oldVval, vval) {
  if (oldVval === vval) {
    return;
  }

  vval.vm = oldVval.vm;
  updateVval(vval);
}

function patchChildren(oldCh, ch) {
  if (isDef(oldCh) && isDef(ch)) {
    if (oldCh !== ch) updateChildren(oldCh, ch);
  } else if (isDef(ch)) {
    addVvals(ch, 0, ch.length - 1);
  } else if (isDef(oldCh)) {
    removeVvals(oldCh, 0, oldCh.length - 1);
  }
}

function h(tag, key, args) {
  return {
    tag: tag,
    key: key,
    args: args
  };
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('alpha', /^[a-zA-Z]*$/);

exports.default = _default;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var withParams = Object({"NODE_ENV":"development"}).BUILD === 'web' ? __webpack_require__(82).withParams : __webpack_require__(20).withParams;
var _default = withParams;
exports.default = _default;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withParams = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

var fakeWithParams = function fakeWithParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return maybeValidator;
  }

  return paramsOrClosure(function () {});
};

var withParams = root.vuelidate ? root.vuelidate.withParams : fakeWithParams;
exports.withParams = withParams;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('alphaNum', /^[a-zA-Z0-9]*$/);

exports.default = _default;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('numeric', /^[0-9]*$/);

exports.default = _default;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(min, max) {
  return (0, _common.withParams)({
    type: 'between',
    min: min,
    max: max
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +min <= +value && +max >= +value;
  });
};

exports.default = _default;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

var _default = (0, _common.regex)('email', emailRegex);

exports.default = _default;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.withParams)({
  type: 'ipAddress'
}, function (value) {
  if (!(0, _common.req)(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  var nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
});

exports.default = _default;

var nibbleValid = function nibbleValid(nibble) {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  var numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default() {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return (0, _common.withParams)({
    type: 'macAddress'
  }, function (value) {
    if (!(0, _common.req)(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  });
};

exports.default = _default;

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(length) {
  return (0, _common.withParams)({
    type: 'maxLength',
    max: length
  }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) <= length;
  });
};

exports.default = _default;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(length) {
  return (0, _common.withParams)({
    type: 'minLength',
    min: length
  }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) >= length;
  });
};

exports.default = _default;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.withParams)({
  type: 'required'
}, _common.req);

exports.default = _default;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(prop) {
  return (0, _common.withParams)({
    type: 'requiredIf',
    prop: prop
  }, function (value, parentVm) {
    return (0, _common.ref)(prop, this, parentVm) ? (0, _common.req)(value) : true;
  });
};

exports.default = _default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(prop) {
  return (0, _common.withParams)({
    type: 'requiredUnless',
    prop: prop
  }, function (value, parentVm) {
    return !(0, _common.ref)(prop, this, parentVm) ? (0, _common.req)(value) : true;
  });
};

exports.default = _default;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(equalTo) {
  return (0, _common.withParams)({
    type: 'sameAs',
    eq: equalTo
  }, function (value, parentVm) {
    return value === (0, _common.ref)(equalTo, this, parentVm);
  });
};

exports.default = _default;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var _default = (0, _common.regex)('url', urlRegex);

exports.default = _default;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, _common.withParams)({
    type: 'or'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid || fn.apply(_this, args);
    }, false);
  });
};

exports.default = _default;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, _common.withParams)({
    type: 'and'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid && fn.apply(_this, args);
    }, true);
  });
};

exports.default = _default;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(validator) {
  return (0, _common.withParams)({
    type: 'not'
  }, function (value, vm) {
    return !(0, _common.req)(value) || !validator.call(this, value, vm);
  });
};

exports.default = _default;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(min) {
  return (0, _common.withParams)({
    type: 'minValue',
    min: min
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +min;
  });
};

exports.default = _default;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = function _default(max) {
  return (0, _common.withParams)({
    type: 'maxValue',
    max: max
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +max;
  });
};

exports.default = _default;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('integer', /^-?[0-9]*$/);

exports.default = _default;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(0);

var _default = (0, _common.regex)('decimal', /^[-]?\d*(\.\d+)?$/);

exports.default = _default;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-12" }, [
        _c("div", { staticClass: "card card-body no-card-border" }, [
          _c("h4", { staticClass: "card-title" }, [
            _vm._v("Company Information")
          ]),
          _vm._v(" "),
          _c("h5", { staticClass: "card-subtitle" }, [
            _vm._v(" please fill below form for your company info ")
          ]),
          _vm._v(" "),
          _c("form", { staticClass: "form-horizontal m-t-30" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", [_vm._v("Company Name")]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Constellation" }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "ft_threshold" } }, [
                _vm._v("Full Time Threshold")
              ]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control",
                attrs: { type: "number", id: "ft_threshold", value: "58" }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group m-b-30" }, [
              _c(
                "label",
                { staticClass: "mr-sm-2", attrs: { for: "review_period" } },
                [_vm._v("Review Period")]
              ),
              _vm._v(" "),
              _c(
                "select",
                {
                  staticClass: "custom-select mr-sm-2",
                  attrs: { id: "review_period" }
                },
                [
                  _c("option", { attrs: { value: "1", selected: "" } }, [
                    _vm._v("Weekly")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "2", selected: "" } }, [
                    _vm._v("Bi Weekly")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "3", selected: "" } }, [
                    _vm._v("Monthly")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "4", selected: "" } }, [
                    _vm._v("Bi Monthly")
                  ])
                ]
              )
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ba4e44d", module.exports)
  }
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(105)
/* template */
var __vue_template__ = __webpack_require__(106)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/StepTwo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-740c9533", Component.options)
  } else {
    hotAPI.reload("data-v-740c9533", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['clickedNext', 'currentStep'],
    mixins: [__WEBPACK_IMPORTED_MODULE_0_vuelidate__["validationMixin"]],
    data: function data() {
        return {
            form: {
                username: '',
                demoEmail: '',
                message: ''
            }
        };
    },

    validations: {
        form: {
            username: {
                required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"]
            },
            demoEmail: {
                required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
                email: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["email"]
            },
            message: {
                required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"]
            }
        }
    },
    watch: {
        $v: {
            handler: function handler(val) {
                if (!val.$invalid) {
                    this.$emit('can-continue', { value: true });
                } else {
                    this.$emit('can-continue', { value: false });
                }
            },
            deep: true
        },
        clickedNext: function clickedNext(val) {
            if (val === true) {
                this.$v.form.$touch();
            }
        }
    },
    mounted: function mounted() {
        if (!this.$v.$invalid) {
            this.$emit('can-continue', { value: true });
        } else {
            this.$emit('can-continue', { value: false });
        }
    }
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { padding: "2rem 3rem", "text-align": "left" } },
    [
      _c("div", { staticClass: "field" }, [
        _c("label", { staticClass: "label" }, [_vm._v("Username")]),
        _vm._v(" "),
        _c("div", { staticClass: "control" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.form.username,
                expression: "form.username"
              }
            ],
            class: ["input", _vm.$v.form.username.$error ? "is-danger" : ""],
            attrs: { type: "text", placeholder: "Text input" },
            domProps: { value: _vm.form.username },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.form, "username", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _vm.$v.form.username.$error
          ? _c("p", { staticClass: "help is-danger" }, [
              _vm._v("This username is invalid")
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "field" }, [
        _c("label", { staticClass: "label" }, [_vm._v("Email")]),
        _vm._v(" "),
        _c("div", { staticClass: "control" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.form.demoEmail,
                expression: "form.demoEmail"
              }
            ],
            class: ["input", _vm.$v.form.demoEmail.$error ? "is-danger" : ""],
            attrs: { type: "text", placeholder: "Email input" },
            domProps: { value: _vm.form.demoEmail },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.form, "demoEmail", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _vm.$v.form.demoEmail.$error
          ? _c("p", { staticClass: "help is-danger" }, [
              _vm._v("This email is invalid")
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "field" }, [
        _c("label", { staticClass: "label" }, [_vm._v("Message")]),
        _vm._v(" "),
        _c("div", { staticClass: "control" }, [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.form.message,
                expression: "form.message"
              }
            ],
            class: ["textarea", _vm.$v.form.message.$error ? "is-danger" : ""],
            attrs: { placeholder: "Textarea" },
            domProps: { value: _vm.form.message },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.form, "message", $event.target.value)
              }
            }
          })
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-740c9533", module.exports)
  }
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "section" }, [
    _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "columns" }, [
        _c(
          "div",
          { staticClass: "column is-8 is-offset-2" },
          [
            _c("horizontal-stepper", {
              attrs: { steps: _vm.demoSteps, "top-buttons": true },
              on: {
                "completed-step": _vm.completeStep,
                "active-step": _vm.isStepActive,
                "stepper-finished": _vm.alert
              }
            })
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-34fff468", module.exports)
  }
}

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[22]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvcGFyYW1zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9iaXRlL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2JpdGUvd2F2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9iaXRlL2N1c3RvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvZGlzdC9wZXJmZWN0LXNjcm9sbGJhci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0V4YW1wbGUudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRXhhbXBsZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0V4YW1wbGUudnVlP2U2MjgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmQudnVlPzY3NjciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRIZWFkZXIudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FyZEhlYWRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRIZWFkZXIudnVlPzZlZDciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRCb2R5LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRCb2R5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FyZEJvZHkudnVlP2QzOTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRHcm91cC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkR3JvdXAudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkR3JvdXAudnVlPzM3NWYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9XaXphcmQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1dpemFyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdGVwcGVyL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnNjc3M/MDgxNiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnZ1ZT83YTI2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlP2RjMGEiLCJ3ZWJwYWNrOi8vL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvVHJhbnNsYXRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlPzNlYTIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TdGVwT25lLnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TdGVwT25lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92dmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvYWxwaGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvd2l0aFBhcmFtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi93aXRoUGFyYW1zQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2FscGhhTnVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbnVtZXJpYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2JldHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9lbWFpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2lwQWRkcmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL21hY0FkZHJlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9tYXhMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9taW5MZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9yZXF1aXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL3JlcXVpcmVkSWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9yZXF1aXJlZFVubGVzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL3NhbWVBcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL29yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvYW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbm90LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbWluVmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9tYXhWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2ludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9kZWNpbWFsLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU3RlcE9uZS52dWU/ZGE1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1N0ZXBUd28udnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1N0ZXBUd28udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU3RlcFR3by52dWU/NTk5YiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1dpemFyZC52dWU/ZmM0NSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYm9vdHN0cmFwLnNjc3M/OTgyNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2JpdGUvc3R5bGUuc2Nzcz8wZDdlIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCJWdWUiLCJjb21wb25lbnQiLCJhcHAiLCJlbCIsIl8iLCJnbG9iYWwiLCIkIiwialF1ZXJ5IiwiZSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwidG9rZW4iLCJkb2N1bWVudCIsImhlYWQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNvbnNvbGUiLCJlcnJvciIsImZuIiwiQWRtaW5TZXR0aW5ncyIsInNldHRpbmdzIiwibXlpZCIsImF0dHIiLCJUaGVtZSIsIkxheW91dCIsIkxvZ29CZyIsIk5hdmJhckJnIiwiU2lkZWJhclR5cGUiLCJTaWRlYmFyQ29sb3IiLCJTaWRlYmFyUG9zaXRpb24iLCJIZWFkZXJQb3NpdGlvbiIsIkJveGVkTGF5b3V0IiwiZXh0ZW5kIiwiQWRtaW5TZXR0aW5nc0luaXQiLCJNYW5hZ2VUaGVtZSIsIk1hbmFnZVRoZW1lTGF5b3V0IiwiTWFuYWdlVGhlbWVCYWNrZ3JvdW5kIiwiTWFuYWdlU2lkZWJhclR5cGUiLCJNYW5hZ2VTaWRlYmFyQ29sb3IiLCJNYW5hZ2VTaWRlYmFyUG9zaXRpb24iLCJNYW5hZ2VCb3hlZExheW91dCIsInRoZW1ldmlldyIsInByb3AiLCJwZXJmZWN0U2Nyb2xsYmFyIiwic2V0bG9nb2JnIiwibGJnIiwidW5kZWZpbmVkIiwic2V0bmF2YmFyYmciLCJuYmciLCJzZXRzaWRlYmFydHlwZSIsIndpZHRoIiwiaW5uZXJXaWR0aCIsInNjcmVlbiIsInJlYWR5Iiwib24iLCJ0b2dnbGVDbGFzcyIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNldHNpZGViYXJiZyIsInNiZyIsInNpZGViYXJwb3NpdGlvbiIsImhlYWRlcnBvc2l0aW9uIiwiYm94ZWRsYXlvdXQiLCJjaGF0YXJlYSIsIm5hbWUiLCJmaW5kIiwidGV4dCIsImltZyIsImlkIiwic3RhdHVzIiwiaGlkZSIsImxlbmd0aCIsInNob3ciLCJtc2ciLCJtc2dfcmVjZWl2ZSIsIm1zZ19zZW50IiwiaHRtbCIsImFwcGVuZCIsImtleUNvZGUiLCJ2YWwiLCJmb2N1cyIsInN1cHByZXNzU2Nyb2xsWCIsImQiLCJEYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJ0IiwibiIsIm5vZGVUeXBlIiwiZGVmYXVsdFZpZXciLCJhIiwiaSIsInRvcCIsImxlZnQiLCJvIiwib3duZXJEb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VZT2Zmc2V0IiwiY2xpZW50VG9wIiwicGFnZVhPZmZzZXQiLCJjbGllbnRMZWZ0IiwiaGFzT3duUHJvcGVydHkiLCJhbGxvd0V2ZW50IiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJTVkdFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiciIsImMiLCJhZGRFdmVudExpc3RlbmVyIiwicyIsInUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYmluZCIsImR1cmF0aW9uIiwiYnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwicGFnZVkiLCJwYWdlWCIsImNsaWVudFdpZHRoIiwidG91Y2hlcyIsInNldEF0dHJpYnV0ZSIsIm5vdyIsImwiLCJyZXBsYWNlIiwidHJhbnNmb3JtIiwib3BhY2l0eSIsInRvdWNodXAiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZ2V0QXR0cmlidXRlIiwiTnVtYmVyIiwic2V0VGltZW91dCIsInJlbW92ZUNoaWxkIiwid3JhcElucHV0IiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwicGFyZW50Tm9kZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlcGxhY2VDaGlsZCIsInR5cGUiLCJkaXNwbGF5RWZmZWN0IiwiYm9keSIsImF0dGFjaCIsIldhdmVzIiwiZmFkZU91dCIsImhvdmVyIiwidHJpZ2dlciIsInRvZ2dsZSIsInBhcmVudHMiLCJ2YWx1ZSIsInRvb2x0aXAiLCJwb3BvdmVyIiwicHMiLCJkZWxheSIsImNsaWNrIiwicHJldmVudERlZmF1bHQiLCJjbG9zZXN0IiwiY2hpbGRyZW4iLCJjb2xsYXBzZSIsInNsaWRlVXAiLCJzdG9wUHJvcGFnYXRpb24iLCJzcGFya2xpbmVMb2dpbiIsInNwYXJrbGluZSIsImhlaWdodCIsImJhcldpZHRoIiwicmVzaXplIiwiYmFyU3BhY2luZyIsImJhckNvbG9yIiwic3BhcmtSZXNpemUiLCJjbGVhclRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rix1QkFBdUIsMkVBQTJFLGtDQUFrQyxtQkFBbUIsR0FBRyxFQUFFLE9BQU8sa0NBQWtDLDhIQUE4SCxHQUFHLEVBQUUscUJBQXFCOztBQUU3VjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsc0I7Ozs7Ozs7QUN6RUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsa0JBQWtCO0FBQy9EO0FBQ0EsU0FBUztBQUNULHlDQUF5QyxrQkFBa0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCOzs7Ozs7O0FDbHFCQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxnQkFBZ0Isc0JBQXNCLE9BQU8sdURBQXVELG1DQUFtQywwREFBMEQsc0ZBQXNGLGdFQUFnRSxFQUFFLEdBQUcsRUFBRSxpQ0FBaUMsMkNBQTJDLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRS9kLDJDQUEyQyxrQkFBa0Isa0NBQWtDLHFFQUFxRSxFQUFFLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxZQUFZOztBQUUvTSx1QkFBdUIsMkVBQTJFLGtDQUFrQyxtQkFBbUIsR0FBRyxFQUFFLE9BQU8sa0NBQWtDLDhIQUE4SCxHQUFHLEVBQUUscUJBQXFCOztBQUU3VjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUVBQXlFLGFBQWE7QUFDdEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEVBQTRFLGVBQWU7QUFDM0Y7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7QUM5RkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFF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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxzQkFBc0IsRUFBRTtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlFQUF5RSxtQkFBbUI7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxtQkFBbUI7QUFDNUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0Esd0RBQXdELDRCQUE0QixFQUFFO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSCx3REFBd0QsNEJBQTRCLEVBQUU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLG9DQUFvQyxtQ0FBbUM7QUFDdkUsc0NBQXNDLDJFQUEyRTs7QUFFakg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7O0FBRTNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pELGVBQWUsMkJBQTJCO0FBQzFDLGlCQUFpQix5QkFBeUI7QUFDMUM7QUFDQTtBQUNBLFdBQVcseUNBQXlDO0FBQ3BEO0FBQ0E7QUFDQSxzQkFBc0IsNENBQTRDO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7QUNsQ0EseUM7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSx5QyIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoUGFyYW1zXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF93aXRoUGFyYW1zLmRlZmF1bHQ7XG4gIH1cbn0pO1xuZXhwb3J0cy5yZWdleCA9IGV4cG9ydHMucmVmID0gZXhwb3J0cy5sZW4gPSBleHBvcnRzLnJlcSA9IHZvaWQgMDtcblxudmFyIF93aXRoUGFyYW1zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vd2l0aFBhcmFtc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciByZXEgPSBmdW5jdGlvbiByZXEodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gISF2YWx1ZS5sZW5ndGg7XG5cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuICFpc05hTih2YWx1ZS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgaWYgKF90eXBlb2YodmFsdWUpID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIF8gaW4gdmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAhIVN0cmluZyh2YWx1ZSkubGVuZ3RoO1xufTtcblxuZXhwb3J0cy5yZXEgPSByZXE7XG5cbnZhciBsZW4gPSBmdW5jdGlvbiBsZW4odmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gdmFsdWUubGVuZ3RoO1xuXG4gIGlmIChfdHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBTdHJpbmcodmFsdWUpLmxlbmd0aDtcbn07XG5cbmV4cG9ydHMubGVuID0gbGVuO1xuXG52YXIgcmVmID0gZnVuY3Rpb24gcmVmKHJlZmVyZW5jZSwgdm0sIHBhcmVudFZtKSB7XG4gIHJldHVybiB0eXBlb2YgcmVmZXJlbmNlID09PSAnZnVuY3Rpb24nID8gcmVmZXJlbmNlLmNhbGwodm0sIHBhcmVudFZtKSA6IHBhcmVudFZtW3JlZmVyZW5jZV07XG59O1xuXG5leHBvcnRzLnJlZiA9IHJlZjtcblxudmFyIHJlZ2V4ID0gZnVuY3Rpb24gcmVnZXgodHlwZSwgZXhwcikge1xuICByZXR1cm4gKDAsIF93aXRoUGFyYW1zLmRlZmF1bHQpKHtcbiAgICB0eXBlOiB0eXBlXG4gIH0sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiAhcmVxKHZhbHVlKSB8fCBleHByLnRlc3QodmFsdWUpO1xuICB9KTtcbn07XG5cbmV4cG9ydHMucmVnZXggPSByZWdleDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyBJTVBPUlRBTlQ6IERvIE5PVCB1c2UgRVMyMDE1IGZlYXR1cmVzIGluIHRoaXMgZmlsZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZS5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBmdW5jdGlvbmFsVGVtcGxhdGUsXG4gIGluamVjdFN0eWxlcyxcbiAgc2NvcGVJZCxcbiAgbW9kdWxlSWRlbnRpZmllciAvKiBzZXJ2ZXIgb25seSAqL1xuKSB7XG4gIHZhciBlc01vZHVsZVxuICB2YXIgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzIHx8IHt9XG5cbiAgLy8gRVM2IG1vZHVsZXMgaW50ZXJvcFxuICB2YXIgdHlwZSA9IHR5cGVvZiByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgaWYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlc01vZHVsZSA9IHJhd1NjcmlwdEV4cG9ydHNcbiAgICBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIH1cblxuICAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdEV4cG9ydHMgPT09ICdmdW5jdGlvbidcbiAgICA/IHNjcmlwdEV4cG9ydHMub3B0aW9uc1xuICAgIDogc2NyaXB0RXhwb3J0c1xuXG4gIC8vIHJlbmRlciBmdW5jdGlvbnNcbiAgaWYgKGNvbXBpbGVkVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGNvbXBpbGVkVGVtcGxhdGUucmVuZGVyXG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBjb21waWxlZFRlbXBsYXRlLnN0YXRpY1JlbmRlckZuc1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZVxuICB9XG5cbiAgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoZnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZVxuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBpbmplY3RTdHlsZXNcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgdmFyIGZ1bmN0aW9uYWwgPSBvcHRpb25zLmZ1bmN0aW9uYWxcbiAgICB2YXIgZXhpc3RpbmcgPSBmdW5jdGlvbmFsXG4gICAgICA/IG9wdGlvbnMucmVuZGVyXG4gICAgICA6IG9wdGlvbnMuYmVmb3JlQ3JlYXRlXG5cbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3IgdGVtcGxhdGUtb25seSBob3QtcmVsb2FkIGJlY2F1c2UgaW4gdGhhdCBjYXNlIHRoZSByZW5kZXIgZm4gZG9lc24ndFxuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgbm9ybWFsaXplclxuICAgICAgb3B0aW9ucy5faW5qZWN0U3R5bGVzID0gaG9va1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uIChoLCBjb250ZXh0KSB7XG4gICAgICAgIGhvb2suY2FsbChjb250ZXh0KVxuICAgICAgICByZXR1cm4gZXhpc3RpbmcoaCwgY29udGV4dClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVzTW9kdWxlOiBlc01vZHVsZSxcbiAgICBleHBvcnRzOiBzY3JpcHRFeHBvcnRzLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG52YXIgb3B0aW9ucyA9IG51bGxcbnZhciBzc3JJZEtleSA9ICdkYXRhLXZ1ZS1zc3ItaWQnXG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uLCBfb3B0aW9ucykge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9XG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbJyArIHNzcklkS2V5ICsgJ349XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG4gIGlmIChvcHRpb25zLnNzcklkKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShzc3JJZEtleSwgb2JqLmlkKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5WdWVsaWRhdGUgPSBWdWVsaWRhdGU7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoUGFyYW1zXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9wYXJhbXMud2l0aFBhcmFtcztcbiAgfVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnZhbGlkYXRpb25NaXhpbiA9IHZvaWQgMDtcblxudmFyIF92dmFsID0gcmVxdWlyZShcIi4vdnZhbFwiKTtcblxudmFyIF9wYXJhbXMgPSByZXF1aXJlKFwiLi9wYXJhbXNcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHsgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgeyBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlOyB9KSk7IH0gb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIE5JTCA9IGZ1bmN0aW9uIE5JTCgpIHtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgYnVpbGRGcm9tS2V5cyA9IGZ1bmN0aW9uIGJ1aWxkRnJvbUtleXMoa2V5cywgZm4sIGtleUZuKSB7XG4gIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoYnVpbGQsIGtleSkge1xuICAgIGJ1aWxkW2tleUZuID8ga2V5Rm4oa2V5KSA6IGtleV0gPSBmbihrZXkpO1xuICAgIHJldHVybiBidWlsZDtcbiAgfSwge30pO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIChfdHlwZW9mKHZhbCkgPT09ICdvYmplY3QnIHx8IGlzRnVuY3Rpb24odmFsKSk7XG59XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmplY3QpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgJiYgaXNGdW5jdGlvbihvYmplY3QudGhlbik7XG59XG5cbnZhciBnZXRQYXRoID0gZnVuY3Rpb24gZ2V0UGF0aChjdHgsIG9iaiwgcGF0aCwgZmFsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHBhdGguY2FsbChjdHgsIG9iaiwgZmFsbGJhY2spO1xuICB9XG5cbiAgcGF0aCA9IEFycmF5LmlzQXJyYXkocGF0aCkgPyBwYXRoIDogcGF0aC5zcGxpdCgnLicpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChvYmogJiYgX3R5cGVvZihvYmopID09PSAnb2JqZWN0Jykge1xuICAgICAgb2JqID0gb2JqW3BhdGhbaV1dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsbGJhY2s7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnID8gZmFsbGJhY2sgOiBvYmo7XG59O1xuXG52YXIgX19pc1Z1ZWxpZGF0ZUFzeW5jVm0gPSAnX19pc1Z1ZWxpZGF0ZUFzeW5jVm0nO1xuXG5mdW5jdGlvbiBtYWtlUGVuZGluZ0FzeW5jVm0oVnVlLCBwcm9taXNlKSB7XG4gIHZhciBhc3luY1ZtID0gbmV3IFZ1ZSh7XG4gICAgZGF0YToge1xuICAgICAgcDogdHJ1ZSxcbiAgICAgIHY6IGZhbHNlXG4gICAgfVxuICB9KTtcbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGFzeW5jVm0ucCA9IGZhbHNlO1xuICAgIGFzeW5jVm0udiA9IHZhbHVlO1xuICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBhc3luY1ZtLnAgPSBmYWxzZTtcbiAgICBhc3luY1ZtLnYgPSBmYWxzZTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfSk7XG4gIGFzeW5jVm1bX19pc1Z1ZWxpZGF0ZUFzeW5jVm1dID0gdHJ1ZTtcbiAgcmV0dXJuIGFzeW5jVm07XG59XG5cbnZhciB2YWxpZGF0aW9uR2V0dGVycyA9IHtcbiAgJGludmFsaWQ6IGZ1bmN0aW9uICRpbnZhbGlkKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcHJveHkgPSB0aGlzLnByb3h5O1xuICAgIHJldHVybiB0aGlzLm5lc3RlZEtleXMuc29tZShmdW5jdGlvbiAobmVzdGVkKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVmUHJveHkobmVzdGVkKS4kaW52YWxpZDtcbiAgICB9KSB8fCB0aGlzLnJ1bGVLZXlzLnNvbWUoZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgIHJldHVybiAhcHJveHlbcnVsZV07XG4gICAgfSk7XG4gIH0sXG4gICRkaXJ0eTogZnVuY3Rpb24gJGRpcnR5KCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5lc3RlZEtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmVzdGVkS2V5cy5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gX3RoaXMyLnJlZlByb3h5KGtleSkuJGRpcnR5O1xuICAgIH0pO1xuICB9LFxuICAkYW55RGlydHk6IGZ1bmN0aW9uICRhbnlEaXJ0eSgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIGlmICh0aGlzLmRpcnR5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZXN0ZWRLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5lc3RlZEtleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gX3RoaXMzLnJlZlByb3h5KGtleSkuJGFueURpcnR5O1xuICAgIH0pO1xuICB9LFxuICAkZXJyb3I6IGZ1bmN0aW9uICRlcnJvcigpIHtcbiAgICByZXR1cm4gdGhpcy4kZGlydHkgJiYgIXRoaXMuJHBlbmRpbmcgJiYgdGhpcy4kaW52YWxpZDtcbiAgfSxcbiAgJGFueUVycm9yOiBmdW5jdGlvbiAkYW55RXJyb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuJGFueURpcnR5ICYmICF0aGlzLiRwZW5kaW5nICYmIHRoaXMuJGludmFsaWQ7XG4gIH0sXG4gICRwZW5kaW5nOiBmdW5jdGlvbiAkcGVuZGluZygpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLnJ1bGVLZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIF90aGlzNC5nZXRSZWYoa2V5KS4kcGVuZGluZztcbiAgICB9KSB8fCB0aGlzLm5lc3RlZEtleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gX3RoaXM0LnJlZlByb3h5KGtleSkuJHBlbmRpbmc7XG4gICAgfSk7XG4gIH0sXG4gICRwYXJhbXM6IGZ1bmN0aW9uICRwYXJhbXMoKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB2YXIgdmFscyA9IHRoaXMudmFsaWRhdGlvbnM7XG4gICAgcmV0dXJuIF9vYmplY3RTcHJlYWQoe30sIGJ1aWxkRnJvbUtleXModGhpcy5uZXN0ZWRLZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gdmFsc1trZXldICYmIHZhbHNba2V5XS4kcGFyYW1zIHx8IG51bGw7XG4gICAgfSksIGJ1aWxkRnJvbUtleXModGhpcy5ydWxlS2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIF90aGlzNS5nZXRSZWYoa2V5KS4kcGFyYW1zO1xuICAgIH0pKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0RGlydHlSZWN1cnNpdmUobmV3U3RhdGUpIHtcbiAgdGhpcy5kaXJ0eSA9IG5ld1N0YXRlO1xuICB2YXIgcHJveHkgPSB0aGlzLnByb3h5O1xuICB2YXIgbWV0aG9kID0gbmV3U3RhdGUgPyAnJHRvdWNoJyA6ICckcmVzZXQnO1xuICB0aGlzLm5lc3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcHJveHlba2V5XVttZXRob2RdKCk7XG4gIH0pO1xufVxuXG52YXIgdmFsaWRhdGlvbk1ldGhvZHMgPSB7XG4gICR0b3VjaDogZnVuY3Rpb24gJHRvdWNoKCkge1xuICAgIHNldERpcnR5UmVjdXJzaXZlLmNhbGwodGhpcywgdHJ1ZSk7XG4gIH0sXG4gICRyZXNldDogZnVuY3Rpb24gJHJlc2V0KCkge1xuICAgIHNldERpcnR5UmVjdXJzaXZlLmNhbGwodGhpcywgZmFsc2UpO1xuICB9LFxuICAkZmxhdHRlblBhcmFtczogZnVuY3Rpb24gJGZsYXR0ZW5QYXJhbXMoKSB7XG4gICAgdmFyIHByb3h5ID0gdGhpcy5wcm94eTtcbiAgICB2YXIgcGFyYW1zID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kcGFyYW1zKSB7XG4gICAgICBpZiAodGhpcy5pc05lc3RlZChrZXkpKSB7XG4gICAgICAgIHZhciBjaGlsZFBhcmFtcyA9IHByb3h5W2tleV0uJGZsYXR0ZW5QYXJhbXMoKTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNoaWxkUGFyYW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY2hpbGRQYXJhbXNbal0ucGF0aC51bnNoaWZ0KGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuY29uY2F0KGNoaWxkUGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBbXSxcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgcGFyYW1zOiB0aGlzLiRwYXJhbXNba2V5XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG59O1xudmFyIGdldHRlck5hbWVzID0gT2JqZWN0LmtleXModmFsaWRhdGlvbkdldHRlcnMpO1xudmFyIG1ldGhvZE5hbWVzID0gT2JqZWN0LmtleXModmFsaWRhdGlvbk1ldGhvZHMpO1xudmFyIF9jYWNoZWRDb21wb25lbnQgPSBudWxsO1xuXG52YXIgZ2V0Q29tcG9uZW50ID0gZnVuY3Rpb24gZ2V0Q29tcG9uZW50KFZ1ZSkge1xuICBpZiAoX2NhY2hlZENvbXBvbmVudCkge1xuICAgIHJldHVybiBfY2FjaGVkQ29tcG9uZW50O1xuICB9XG5cbiAgdmFyIFZCYXNlID0gVnVlLmV4dGVuZCh7XG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIHJlZnM6IGZ1bmN0aW9uIHJlZnMoKSB7XG4gICAgICAgIHZhciBvbGRWdmFsID0gdGhpcy5fdnZhbDtcbiAgICAgICAgdGhpcy5fdnZhbCA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgICgwLCBfdnZhbC5wYXRjaENoaWxkcmVuKShvbGRWdmFsLCB0aGlzLl92dmFsKTtcbiAgICAgICAgdmFyIHJlZnMgPSB7fTtcblxuICAgICAgICB0aGlzLl92dmFsLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZWZzW2Mua2V5XSA9IGMudm07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZWZzO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmVmb3JlQ3JlYXRlOiBmdW5jdGlvbiBiZWZvcmVDcmVhdGUoKSB7XG4gICAgICB0aGlzLl92dmFsID0gbnVsbDtcbiAgICB9LFxuICAgIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICBpZiAodGhpcy5fdnZhbCkge1xuICAgICAgICAoMCwgX3Z2YWwucGF0Y2hDaGlsZHJlbikodGhpcy5fdnZhbCk7XG4gICAgICAgIHRoaXMuX3Z2YWwgPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgZ2V0TW9kZWw6IGZ1bmN0aW9uIGdldE1vZGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXp5TW9kZWwgPyB0aGlzLmxhenlNb2RlbCh0aGlzLnByb3ApIDogdGhpcy5tb2RlbDtcbiAgICAgIH0sXG4gICAgICBnZXRNb2RlbEtleTogZnVuY3Rpb24gZ2V0TW9kZWxLZXkoa2V5KSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoKTtcblxuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICByZXR1cm4gbW9kZWxba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhc0l0ZXI6IGZ1bmN0aW9uIGhhc0l0ZXIoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICB2YXIgVmFsaWRhdGlvblJ1bGUgPSBWQmFzZS5leHRlbmQoe1xuICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBydWxlOiBudWxsLFxuICAgICAgICBsYXp5TW9kZWw6IG51bGwsXG4gICAgICAgIG1vZGVsOiBudWxsLFxuICAgICAgICBsYXp5UGFyZW50TW9kZWw6IG51bGwsXG4gICAgICAgIHJvb3RNb2RlbDogbnVsbFxuICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHJ1blJ1bGU6IGZ1bmN0aW9uIHJ1blJ1bGUocGFyZW50KSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoKTtcbiAgICAgICAgKDAsIF9wYXJhbXMucHVzaFBhcmFtcykoKTtcbiAgICAgICAgdmFyIHJhd091dHB1dCA9IHRoaXMucnVsZS5jYWxsKHRoaXMucm9vdE1vZGVsLCBtb2RlbCwgcGFyZW50KTtcbiAgICAgICAgdmFyIG91dHB1dCA9IGlzUHJvbWlzZShyYXdPdXRwdXQpID8gbWFrZVBlbmRpbmdBc3luY1ZtKFZ1ZSwgcmF3T3V0cHV0KSA6IHJhd091dHB1dDtcbiAgICAgICAgdmFyIHJhd1BhcmFtcyA9ICgwLCBfcGFyYW1zLnBvcFBhcmFtcykoKTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IHJhd1BhcmFtcyAmJiByYXdQYXJhbXMuJHN1YiA/IHJhd1BhcmFtcy4kc3ViLmxlbmd0aCA+IDEgPyByYXdQYXJhbXMgOiByYXdQYXJhbXMuJHN1YlswXSA6IG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb3V0cHV0OiBvdXRwdXQsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBydW46IGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMubGF6eVBhcmVudE1vZGVsKCk7XG5cbiAgICAgICAgdmFyIGlzQXJyYXlEZXBlbmRhbnQgPSBBcnJheS5pc0FycmF5KHBhcmVudCkgJiYgcGFyZW50Ll9fb2JfXztcblxuICAgICAgICBpZiAoaXNBcnJheURlcGVuZGFudCkge1xuICAgICAgICAgIHZhciBhcnJheURlcCA9IHBhcmVudC5fX29iX18uZGVwO1xuICAgICAgICAgIGFycmF5RGVwLmRlcGVuZCgpO1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBhcnJheURlcC5jb25zdHJ1Y3Rvci50YXJnZXQ7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX2luZGlyZWN0V2F0Y2hlcikge1xuICAgICAgICAgICAgdmFyIFdhdGNoZXIgPSB0YXJnZXQuY29uc3RydWN0b3I7XG4gICAgICAgICAgICB0aGlzLl9pbmRpcmVjdFdhdGNoZXIgPSBuZXcgV2F0Y2hlcih0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczYucnVuUnVsZShwYXJlbnQpO1xuICAgICAgICAgICAgfSwgbnVsbCwge1xuICAgICAgICAgICAgICBsYXp5OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmdldE1vZGVsKCk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX2luZGlyZWN0V2F0Y2hlci5kaXJ0eSAmJiB0aGlzLl9sYXN0TW9kZWwgPT09IG1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRpcmVjdFdhdGNoZXIuZGVwZW5kKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbGFzdE1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgICB0aGlzLl9pbmRpcmVjdFdhdGNoZXIuZXZhbHVhdGUoKTtcblxuICAgICAgICAgIHRoaXMuX2luZGlyZWN0V2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9pbmRpcmVjdFdhdGNoZXIpIHtcbiAgICAgICAgICB0aGlzLl9pbmRpcmVjdFdhdGNoZXIudGVhcmRvd24oKTtcblxuICAgICAgICAgIHRoaXMuX2luZGlyZWN0V2F0Y2hlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faW5kaXJlY3RXYXRjaGVyID8gdGhpcy5faW5kaXJlY3RXYXRjaGVyLnZhbHVlIDogdGhpcy5ydW5SdWxlKHBhcmVudCk7XG4gICAgICB9LFxuICAgICAgJHBhcmFtczogZnVuY3Rpb24gJHBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuLnBhcmFtcztcbiAgICAgIH0sXG4gICAgICBwcm94eTogZnVuY3Rpb24gcHJveHkoKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLnJ1bi5vdXRwdXQ7XG5cbiAgICAgICAgaWYgKG91dHB1dFtfX2lzVnVlbGlkYXRlQXN5bmNWbV0pIHtcbiAgICAgICAgICByZXR1cm4gISFvdXRwdXQudjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhIW91dHB1dDtcbiAgICAgIH0sXG4gICAgICAkcGVuZGluZzogZnVuY3Rpb24gJHBlbmRpbmcoKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLnJ1bi5vdXRwdXQ7XG5cbiAgICAgICAgaWYgKG91dHB1dFtfX2lzVnVlbGlkYXRlQXN5bmNWbV0pIHtcbiAgICAgICAgICByZXR1cm4gb3V0cHV0LnA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95ZWQ6IGZ1bmN0aW9uIGRlc3Ryb3llZCgpIHtcbiAgICAgIGlmICh0aGlzLl9pbmRpcmVjdFdhdGNoZXIpIHtcbiAgICAgICAgdGhpcy5faW5kaXJlY3RXYXRjaGVyLnRlYXJkb3duKCk7XG5cbiAgICAgICAgdGhpcy5faW5kaXJlY3RXYXRjaGVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICB2YXIgVmFsaWRhdGlvbiA9IFZCYXNlLmV4dGVuZCh7XG4gICAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpcnR5OiBmYWxzZSxcbiAgICAgICAgdmFsaWRhdGlvbnM6IG51bGwsXG4gICAgICAgIGxhenlNb2RlbDogbnVsbCxcbiAgICAgICAgbW9kZWw6IG51bGwsXG4gICAgICAgIHByb3A6IG51bGwsXG4gICAgICAgIGxhenlQYXJlbnRNb2RlbDogbnVsbCxcbiAgICAgICAgcm9vdE1vZGVsOiBudWxsXG4gICAgICB9O1xuICAgIH0sXG4gICAgbWV0aG9kczogX29iamVjdFNwcmVhZCh7fSwgdmFsaWRhdGlvbk1ldGhvZHMsIHtcbiAgICAgIHJlZlByb3h5OiBmdW5jdGlvbiByZWZQcm94eShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVmKGtleSkucHJveHk7XG4gICAgICB9LFxuICAgICAgZ2V0UmVmOiBmdW5jdGlvbiBnZXRSZWYoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnNba2V5XTtcbiAgICAgIH0sXG4gICAgICBpc05lc3RlZDogZnVuY3Rpb24gaXNOZXN0ZWQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy52YWxpZGF0aW9uc1trZXldICE9PSAnZnVuY3Rpb24nO1xuICAgICAgfVxuICAgIH0pLFxuICAgIGNvbXB1dGVkOiBfb2JqZWN0U3ByZWFkKHt9LCB2YWxpZGF0aW9uR2V0dGVycywge1xuICAgICAgbmVzdGVkS2V5czogZnVuY3Rpb24gbmVzdGVkS2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5cy5maWx0ZXIodGhpcy5pc05lc3RlZCk7XG4gICAgICB9LFxuICAgICAgcnVsZUtleXM6IGZ1bmN0aW9uIHJ1bGVLZXlzKCkge1xuICAgICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgICAgICAgIHJldHVybiAhX3RoaXM3LmlzTmVzdGVkKGspO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBrZXlzOiBmdW5jdGlvbiBrZXlzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy52YWxpZGF0aW9ucykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgcmV0dXJuIGsgIT09ICckcGFyYW1zJztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcHJveHk6IGZ1bmN0aW9uIHByb3h5KCkge1xuICAgICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgICB2YXIga2V5RGVmcyA9IGJ1aWxkRnJvbUtleXModGhpcy5rZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzOC5yZWZQcm94eShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZ2V0dGVyRGVmcyA9IGJ1aWxkRnJvbUtleXMoZ2V0dGVyTmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXM4W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBtZXRob2REZWZzID0gYnVpbGRGcm9tS2V5cyhtZXRob2ROYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXM4W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpdGVyRGVmcyA9IHRoaXMuaGFzSXRlcigpID8ge1xuICAgICAgICAgICRpdGVyOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHt9LCBfb2JqZWN0U3ByZWFkKHt9LCBrZXlEZWZzKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gOiB7fTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHt9LCBfb2JqZWN0U3ByZWFkKHt9LCBrZXlEZWZzLCBpdGVyRGVmcywge1xuICAgICAgICAgICRtb2RlbDoge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gX3RoaXM4LmxhenlQYXJlbnRNb2RlbCgpO1xuXG4gICAgICAgICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRbX3RoaXM4LnByb3BdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IF90aGlzOC5sYXp5UGFyZW50TW9kZWwoKTtcblxuICAgICAgICAgICAgICBpZiAocGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRbX3RoaXM4LnByb3BdID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBfdGhpczguJHRvdWNoKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIGdldHRlckRlZnMsIG1ldGhvZERlZnMpKTtcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gICAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBfdG9Db25zdW1hYmxlQXJyYXkodGhpcy5uZXN0ZWRLZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHJlbmRlck5lc3RlZChfdGhpczksIGtleSk7XG4gICAgICAgIH0pKS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRoaXMucnVsZUtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gcmVuZGVyUnVsZShfdGhpczksIGtleSk7XG4gICAgICAgIH0pKSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgfVxuICAgIH0pXG4gIH0pO1xuICB2YXIgR3JvdXBWYWxpZGF0aW9uID0gVmFsaWRhdGlvbi5leHRlbmQoe1xuICAgIG1ldGhvZHM6IHtcbiAgICAgIGlzTmVzdGVkOiBmdW5jdGlvbiBpc05lc3RlZChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnZhbGlkYXRpb25zW2tleV0oKSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICB9LFxuICAgICAgZ2V0UmVmOiBmdW5jdGlvbiBnZXRSZWYoa2V5KSB7XG4gICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZ2V0IHByb3h5KCkge1xuICAgICAgICAgICAgcmV0dXJuIHZtLnZhbGlkYXRpb25zW2tleV0oKSB8fCBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICB2YXIgRWFjaFZhbGlkYXRpb24gPSBWYWxpZGF0aW9uLmV4dGVuZCh7XG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIGtleXM6IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoKTtcblxuICAgICAgICBpZiAoaXNPYmplY3QobW9kZWwpKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0cmFja2VyOiBmdW5jdGlvbiB0cmFja2VyKCkge1xuICAgICAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRyYWNrQnkgPSB0aGlzLnZhbGlkYXRpb25zLiR0cmFja0J5O1xuICAgICAgICByZXR1cm4gdHJhY2tCeSA/IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoZ2V0UGF0aChfdGhpczEwLnJvb3RNb2RlbCwgX3RoaXMxMC5nZXRNb2RlbEtleShrZXkpLCB0cmFja0J5KSk7XG4gICAgICAgIH0gOiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh4KTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBnZXRNb2RlbExhenk6IGZ1bmN0aW9uIGdldE1vZGVsTGF6eSgpIHtcbiAgICAgICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMTEuZ2V0TW9kZWwoKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gICAgICAgIHZhciBfdGhpczEyID0gdGhpcztcblxuICAgICAgICB2YXIgZGVmID0gdGhpcy52YWxpZGF0aW9ucztcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5nZXRNb2RlbCgpO1xuXG4gICAgICAgIHZhciB2YWxpZGF0aW9ucyA9IF9vYmplY3RTcHJlYWQoe30sIGRlZik7XG5cbiAgICAgICAgZGVsZXRlIHZhbGlkYXRpb25zWyckdHJhY2tCeSddO1xuICAgICAgICB2YXIgdXNlZFRyYWNrcyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHRyYWNrID0gX3RoaXMxMi50cmFja2VyKGtleSk7XG5cbiAgICAgICAgICBpZiAodXNlZFRyYWNrcy5oYXNPd25Qcm9wZXJ0eSh0cmFjaykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHVzZWRUcmFja3NbdHJhY2tdID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gKDAsIF92dmFsLmgpKFZhbGlkYXRpb24sIHRyYWNrLCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uczogdmFsaWRhdGlvbnMsXG4gICAgICAgICAgICBwcm9wOiBrZXksXG4gICAgICAgICAgICBsYXp5UGFyZW50TW9kZWw6IF90aGlzMTIuZ2V0TW9kZWxMYXp5LFxuICAgICAgICAgICAgbW9kZWw6IG1vZGVsW2tleV0sXG4gICAgICAgICAgICByb290TW9kZWw6IF90aGlzMTIucm9vdE1vZGVsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIGlzTmVzdGVkOiBmdW5jdGlvbiBpc05lc3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgZ2V0UmVmOiBmdW5jdGlvbiBnZXRSZWYoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZnNbdGhpcy50cmFja2VyKGtleSldO1xuICAgICAgfSxcbiAgICAgIGhhc0l0ZXI6IGZ1bmN0aW9uIGhhc0l0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHJlbmRlck5lc3RlZCA9IGZ1bmN0aW9uIHJlbmRlck5lc3RlZCh2bSwga2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJyRlYWNoJykge1xuICAgICAgcmV0dXJuICgwLCBfdnZhbC5oKShFYWNoVmFsaWRhdGlvbiwga2V5LCB7XG4gICAgICAgIHZhbGlkYXRpb25zOiB2bS52YWxpZGF0aW9uc1trZXldLFxuICAgICAgICBsYXp5UGFyZW50TW9kZWw6IHZtLmxhenlQYXJlbnRNb2RlbCxcbiAgICAgICAgcHJvcDoga2V5LFxuICAgICAgICBsYXp5TW9kZWw6IHZtLmdldE1vZGVsLFxuICAgICAgICByb290TW9kZWw6IHZtLnJvb3RNb2RlbFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkYXRpb25zID0gdm0udmFsaWRhdGlvbnNba2V5XTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbGlkYXRpb25zKSkge1xuICAgICAgdmFyIHJvb3QgPSB2bS5yb290TW9kZWw7XG4gICAgICB2YXIgcmVmVmFscyA9IGJ1aWxkRnJvbUtleXModmFsaWRhdGlvbnMsIGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldFBhdGgocm9vdCwgcm9vdC4kdiwgcGF0aCk7XG4gICAgICAgIH07XG4gICAgICB9LCBmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2KSA/IHYuam9pbignLicpIDogdjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICgwLCBfdnZhbC5oKShHcm91cFZhbGlkYXRpb24sIGtleSwge1xuICAgICAgICB2YWxpZGF0aW9uczogcmVmVmFscyxcbiAgICAgICAgbGF6eVBhcmVudE1vZGVsOiBOSUwsXG4gICAgICAgIHByb3A6IGtleSxcbiAgICAgICAgbGF6eU1vZGVsOiBOSUwsXG4gICAgICAgIHJvb3RNb2RlbDogcm9vdFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfdnZhbC5oKShWYWxpZGF0aW9uLCBrZXksIHtcbiAgICAgIHZhbGlkYXRpb25zOiB2YWxpZGF0aW9ucyxcbiAgICAgIGxhenlQYXJlbnRNb2RlbDogdm0uZ2V0TW9kZWwsXG4gICAgICBwcm9wOiBrZXksXG4gICAgICBsYXp5TW9kZWw6IHZtLmdldE1vZGVsS2V5LFxuICAgICAgcm9vdE1vZGVsOiB2bS5yb290TW9kZWxcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgcmVuZGVyUnVsZSA9IGZ1bmN0aW9uIHJlbmRlclJ1bGUodm0sIGtleSkge1xuICAgIHJldHVybiAoMCwgX3Z2YWwuaCkoVmFsaWRhdGlvblJ1bGUsIGtleSwge1xuICAgICAgcnVsZTogdm0udmFsaWRhdGlvbnNba2V5XSxcbiAgICAgIGxhenlQYXJlbnRNb2RlbDogdm0ubGF6eVBhcmVudE1vZGVsLFxuICAgICAgbGF6eU1vZGVsOiB2bS5nZXRNb2RlbCxcbiAgICAgIHJvb3RNb2RlbDogdm0ucm9vdE1vZGVsXG4gICAgfSk7XG4gIH07XG5cbiAgX2NhY2hlZENvbXBvbmVudCA9IHtcbiAgICBWQmFzZTogVkJhc2UsXG4gICAgVmFsaWRhdGlvbjogVmFsaWRhdGlvblxuICB9O1xuICByZXR1cm4gX2NhY2hlZENvbXBvbmVudDtcbn07XG5cbnZhciBfY2FjaGVkVnVlID0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0VnVlKHJvb3RWbSkge1xuICBpZiAoX2NhY2hlZFZ1ZSkgcmV0dXJuIF9jYWNoZWRWdWU7XG4gIHZhciBWdWUgPSByb290Vm0uY29uc3RydWN0b3I7XG5cbiAgd2hpbGUgKFZ1ZS5zdXBlcikge1xuICAgIFZ1ZSA9IFZ1ZS5zdXBlcjtcbiAgfVxuXG4gIF9jYWNoZWRWdWUgPSBWdWU7XG4gIHJldHVybiBWdWU7XG59XG5cbnZhciB2YWxpZGF0ZU1vZGVsID0gZnVuY3Rpb24gdmFsaWRhdGVNb2RlbChtb2RlbCwgdmFsaWRhdGlvbnMpIHtcbiAgdmFyIFZ1ZSA9IGdldFZ1ZShtb2RlbCk7XG5cbiAgdmFyIF9nZXRDb21wb25lbnQgPSBnZXRDb21wb25lbnQoVnVlKSxcbiAgICAgIFZhbGlkYXRpb24gPSBfZ2V0Q29tcG9uZW50LlZhbGlkYXRpb24sXG4gICAgICBWQmFzZSA9IF9nZXRDb21wb25lbnQuVkJhc2U7XG5cbiAgdmFyIHJvb3QgPSBuZXcgVkJhc2Uoe1xuICAgIGNvbXB1dGVkOiB7XG4gICAgICBjaGlsZHJlbjogZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gICAgICAgIHZhciB2YWxzID0gdHlwZW9mIHZhbGlkYXRpb25zID09PSAnZnVuY3Rpb24nID8gdmFsaWRhdGlvbnMuY2FsbChtb2RlbCkgOiB2YWxpZGF0aW9ucztcbiAgICAgICAgcmV0dXJuIFsoMCwgX3Z2YWwuaCkoVmFsaWRhdGlvbiwgJyR2Jywge1xuICAgICAgICAgIHZhbGlkYXRpb25zOiB2YWxzLFxuICAgICAgICAgIGxhenlQYXJlbnRNb2RlbDogTklMLFxuICAgICAgICAgIHByb3A6ICckdicsXG4gICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgIHJvb3RNb2RlbDogbW9kZWxcbiAgICAgICAgfSldO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiByb290O1xufTtcblxudmFyIHZhbGlkYXRpb25NaXhpbiA9IHtcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICB2YXIgdmFscyA9IHRoaXMuJG9wdGlvbnMudmFsaWRhdGlvbnM7XG5cbiAgICBpZiAodmFscykge1xuICAgICAgdGhpcy5fdnVlbGlkYXRlID0gdmFsaWRhdGVNb2RlbCh0aGlzLCB2YWxzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH0sXG4gIGJlZm9yZUNyZWF0ZTogZnVuY3Rpb24gYmVmb3JlQ3JlYXRlKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICB2YXIgdmFscyA9IG9wdGlvbnMudmFsaWRhdGlvbnM7XG4gICAgaWYgKCF2YWxzKSByZXR1cm47XG4gICAgaWYgKCFvcHRpb25zLmNvbXB1dGVkKSBvcHRpb25zLmNvbXB1dGVkID0ge307XG4gICAgaWYgKG9wdGlvbnMuY29tcHV0ZWQuJHYpIHJldHVybjtcblxuICAgIG9wdGlvbnMuY29tcHV0ZWQuJHYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdnVlbGlkYXRlID8gdGhpcy5fdnVlbGlkYXRlLnJlZnMuJHYucHJveHkgOiBudWxsO1xuICAgIH07XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3Z1ZWxpZGF0ZSkge1xuICAgICAgdGhpcy5fdnVlbGlkYXRlLiRkZXN0cm95KCk7XG5cbiAgICAgIHRoaXMuX3Z1ZWxpZGF0ZSA9IG51bGw7XG4gICAgfVxuICB9XG59O1xuZXhwb3J0cy52YWxpZGF0aW9uTWl4aW4gPSB2YWxpZGF0aW9uTWl4aW47XG5cbmZ1bmN0aW9uIFZ1ZWxpZGF0ZShWdWUpIHtcbiAgVnVlLm1peGluKHZhbGlkYXRpb25NaXhpbik7XG59XG5cbnZhciBfZGVmYXVsdCA9IFZ1ZWxpZGF0ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wdXNoUGFyYW1zID0gcHVzaFBhcmFtcztcbmV4cG9ydHMucG9wUGFyYW1zID0gcG9wUGFyYW1zO1xuZXhwb3J0cy53aXRoUGFyYW1zID0gd2l0aFBhcmFtcztcbmV4cG9ydHMuX3NldFRhcmdldCA9IGV4cG9ydHMudGFyZ2V0ID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHsgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTsgfSkpOyB9IG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciBzdGFjayA9IFtdO1xudmFyIHRhcmdldCA9IG51bGw7XG5leHBvcnRzLnRhcmdldCA9IHRhcmdldDtcblxudmFyIF9zZXRUYXJnZXQgPSBmdW5jdGlvbiBfc2V0VGFyZ2V0KHgpIHtcbiAgZXhwb3J0cy50YXJnZXQgPSB0YXJnZXQgPSB4O1xufTtcblxuZXhwb3J0cy5fc2V0VGFyZ2V0ID0gX3NldFRhcmdldDtcblxuZnVuY3Rpb24gcHVzaFBhcmFtcygpIHtcbiAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgIHN0YWNrLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIGV4cG9ydHMudGFyZ2V0ID0gdGFyZ2V0ID0ge307XG59XG5cbmZ1bmN0aW9uIHBvcFBhcmFtcygpIHtcbiAgdmFyIGxhc3RUYXJnZXQgPSB0YXJnZXQ7XG4gIHZhciBuZXdUYXJnZXQgPSBleHBvcnRzLnRhcmdldCA9IHRhcmdldCA9IHN0YWNrLnBvcCgpIHx8IG51bGw7XG5cbiAgaWYgKG5ld1RhcmdldCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShuZXdUYXJnZXQuJHN1YikpIHtcbiAgICAgIG5ld1RhcmdldC4kc3ViID0gW107XG4gICAgfVxuXG4gICAgbmV3VGFyZ2V0LiRzdWIucHVzaChsYXN0VGFyZ2V0KTtcbiAgfVxuXG4gIHJldHVybiBsYXN0VGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBhZGRQYXJhbXMocGFyYW1zKSB7XG4gIGlmIChfdHlwZW9mKHBhcmFtcykgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHBhcmFtcykpIHtcbiAgICBleHBvcnRzLnRhcmdldCA9IHRhcmdldCA9IF9vYmplY3RTcHJlYWQoe30sIHRhcmdldCwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdpdGhQYXJhbXNEaXJlY3QocGFyYW1zLCB2YWxpZGF0b3IpIHtcbiAgcmV0dXJuIHdpdGhQYXJhbXNDbG9zdXJlKGZ1bmN0aW9uIChhZGQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgYWRkKHBhcmFtcyk7XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsaWRhdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB3aXRoUGFyYW1zQ2xvc3VyZShjbG9zdXJlKSB7XG4gIHZhciB2YWxpZGF0b3IgPSBjbG9zdXJlKGFkZFBhcmFtcyk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcHVzaFBhcmFtcygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxpZGF0b3IuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHBvcFBhcmFtcygpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gd2l0aFBhcmFtcyhwYXJhbXNPckNsb3N1cmUsIG1heWJlVmFsaWRhdG9yKSB7XG4gIGlmIChfdHlwZW9mKHBhcmFtc09yQ2xvc3VyZSkgPT09ICdvYmplY3QnICYmIG1heWJlVmFsaWRhdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gd2l0aFBhcmFtc0RpcmVjdChwYXJhbXNPckNsb3N1cmUsIG1heWJlVmFsaWRhdG9yKTtcbiAgfVxuXG4gIHJldHVybiB3aXRoUGFyYW1zQ2xvc3VyZShwYXJhbXNPckNsb3N1cmUpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvcGFyYW1zLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFscGhhXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hbHBoYS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFscGhhTnVtXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hbHBoYU51bS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm51bWVyaWNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX251bWVyaWMuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJiZXR3ZWVuXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9iZXR3ZWVuLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW1haWxcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2VtYWlsLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaXBBZGRyZXNzXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pcEFkZHJlc3MuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWNBZGRyZXNzXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9tYWNBZGRyZXNzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWF4TGVuZ3RoXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9tYXhMZW5ndGguZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtaW5MZW5ndGhcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX21pbkxlbmd0aC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJlcXVpcmVkXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9yZXF1aXJlZC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJlcXVpcmVkSWZcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3JlcXVpcmVkSWYuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZXF1aXJlZFVubGVzc1wiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfcmVxdWlyZWRVbmxlc3MuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzYW1lQXNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3NhbWVBcy5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInVybFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdXJsLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib3JcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX29yLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYW5kXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hbmQuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJub3RcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX25vdC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1pblZhbHVlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9taW5WYWx1ZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1heFZhbHVlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9tYXhWYWx1ZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImludGVnZXJcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2ludGVnZXIuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkZWNpbWFsXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9kZWNpbWFsLmRlZmF1bHQ7XG4gIH1cbn0pO1xuZXhwb3J0cy5oZWxwZXJzID0gdm9pZCAwO1xuXG52YXIgX2FscGhhID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9hbHBoYVwiKSk7XG5cbnZhciBfYWxwaGFOdW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2FscGhhTnVtXCIpKTtcblxudmFyIF9udW1lcmljID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9udW1lcmljXCIpKTtcblxudmFyIF9iZXR3ZWVuID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9iZXR3ZWVuXCIpKTtcblxudmFyIF9lbWFpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZW1haWxcIikpO1xuXG52YXIgX2lwQWRkcmVzcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXBBZGRyZXNzXCIpKTtcblxudmFyIF9tYWNBZGRyZXNzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tYWNBZGRyZXNzXCIpKTtcblxudmFyIF9tYXhMZW5ndGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL21heExlbmd0aFwiKSk7XG5cbnZhciBfbWluTGVuZ3RoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9taW5MZW5ndGhcIikpO1xuXG52YXIgX3JlcXVpcmVkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZXF1aXJlZFwiKSk7XG5cbnZhciBfcmVxdWlyZWRJZiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcmVxdWlyZWRJZlwiKSk7XG5cbnZhciBfcmVxdWlyZWRVbmxlc3MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JlcXVpcmVkVW5sZXNzXCIpKTtcblxudmFyIF9zYW1lQXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NhbWVBc1wiKSk7XG5cbnZhciBfdXJsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91cmxcIikpO1xuXG52YXIgX29yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9vclwiKSk7XG5cbnZhciBfYW5kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9hbmRcIikpO1xuXG52YXIgX25vdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbm90XCIpKTtcblxudmFyIF9taW5WYWx1ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbWluVmFsdWVcIikpO1xuXG52YXIgX21heFZhbHVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tYXhWYWx1ZVwiKSk7XG5cbnZhciBfaW50ZWdlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaW50ZWdlclwiKSk7XG5cbnZhciBfZGVjaW1hbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZGVjaW1hbFwiKSk7XG5cbnZhciBoZWxwZXJzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vY29tbW9uXCIpKTtcblxuZXhwb3J0cy5oZWxwZXJzID0gaGVscGVycztcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiB7fTsgaWYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIEZpcnN0IHdlIHdpbGwgbG9hZCBhbGwgb2YgdGhpcyBwcm9qZWN0J3MgSmF2YVNjcmlwdCBkZXBlbmRlbmNpZXMgd2hpY2hcbiAqIGluY2x1ZGVzIFJlYWN0IGFuZCBvdGhlciBoZWxwZXJzLiBJdCdzIGEgZ3JlYXQgc3RhcnRpbmcgcG9pbnQgd2hpbGVcbiAqIGJ1aWxkaW5nIHJvYnVzdCwgcG93ZXJmdWwgd2ViIGFwcGxpY2F0aW9ucyB1c2luZyBSZWFjdCArIExhcmF2ZWwuXG4gKi9cblxucmVxdWlyZSgnLi9ib290c3RyYXAnKTtcblxucmVxdWlyZSgnLi9iaXRlL2FwcCcpO1xuLy8gcmVxdWlyZSgnLi9iaXRlL2FwcC5pbml0Lm92ZXJsYXknKTtcbi8vIHJlcXVpcmUoJy4vYml0ZS9hcHAtc3R5bGUtc3dpdGNoZXInKTtcbnJlcXVpcmUoJy4vYml0ZS93YXZlcycpO1xuLy8gcmVxdWlyZSgnLi9iaXRlL3NpZGViYXJtZW51Jyk7XG5yZXF1aXJlKCcuL2JpdGUvY3VzdG9tJyk7XG5cblxuLyoqXG4gKiBOZXh0LCB3ZSB3aWxsIGNyZWF0ZSBhIGZyZXNoIFJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZSBhbmQgYXR0YWNoIGl0IHRvXG4gKiB0aGUgcGFnZS4gVGhlbiwgeW91IG1heSBiZWdpbiBhZGRpbmcgY29tcG9uZW50cyB0byB0aGlzIGFwcGxpY2F0aW9uXG4gKiBvciBjdXN0b21pemUgdGhlIEphdmFTY3JpcHQgc2NhZmZvbGRpbmcgdG8gZml0IHlvdXIgdW5pcXVlIG5lZWRzLlxuICovXG5cbi8vIHJlcXVpcmUoJy4vY29tcG9uZW50cy9JbXBvcnRFbXBsb3llZScpO1xuLy8gcmVxdWlyZSgnLi9jb21wb25lbnRzL0V4cG9ydEVtcGxveWVlJyk7XG4vLyByZXF1aXJlKCcuL2NvbXBvbmVudHMvUGF5cm9sbFByb2Nlc3MnKTtcblxuLy8gd2luZG93LmF4aW9zLmdldCgnL21lJykudGhlbihyZXNwb25zZSA9PiB7XG4vLyAgICAgY29uc3QgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICB3aW5kb3cuRWNoby5wcml2YXRlKCdwYXlyb2xscy51c2VyLicgKyB1c2VyLmlkKVxuLy8gICAgICAgICAubGlzdGVuKCcucHJvY2Vzc2VkJywgKGUpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuLy8gICAgICAgICAgICAgY29uc3QgciA9IGNvbmZpcm0oJ3BheXJvbGwgd2l0aCAjJyArIGUucGF5cm9sbC5pZCArICcgaWQgcHJvY2Vzc2VkLCBkbyB5b3Ugd2FudCB0byBkb3dubG9hZD8nKTtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sb2NhdGlvbik7XG4vLyAgICAgICAgICAgICBpZiAocikge1xuLy8gICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIGAvcGF5cm9sbC8ke2UucGF5cm9sbC5pZH0vb3V0cHV0L2Rvd25sb2FkYFxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCcvcGF5cm9sbHMvaGlzdG9yeScpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vXG4vL1xuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAubGlzdGVuKCcuZXJyb3InLCAoZSkgPT4ge1xuLy8gICAgICAgICAgICAgYWxlcnQoJ3BheXJvbGwgcHJvY2VzcyBmYWlsZWQnKTtcbi8vICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJy9wYXlyb2xscy9oaXN0b3J5JykpIHtcbi8vICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcbi8vICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIH0pO1xuLy8gfSlcbndpbmRvdy5WdWUgPSByZXF1aXJlKCd2dWUnKTtcblxuLyoqXG4gKiBOZXh0LCB3ZSB3aWxsIGNyZWF0ZSBhIGZyZXNoIFZ1ZSBhcHBsaWNhdGlvbiBpbnN0YW5jZSBhbmQgYXR0YWNoIGl0IHRvXG4gKiB0aGUgcGFnZS4gVGhlbiwgeW91IG1heSBiZWdpbiBhZGRpbmcgY29tcG9uZW50cyB0byB0aGlzIGFwcGxpY2F0aW9uXG4gKiBvciBjdXN0b21pemUgdGhlIEphdmFTY3JpcHQgc2NhZmZvbGRpbmcgdG8gZml0IHlvdXIgdW5pcXVlIG5lZWRzLlxuICovXG5cblZ1ZS5jb21wb25lbnQoJ2V4YW1wbGUnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvRXhhbXBsZS52dWUnKSk7XG5WdWUuY29tcG9uZW50KCdjYXJkJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL0NhcmQudnVlJykpO1xuVnVlLmNvbXBvbmVudCgnY2FyZC1oZWFkZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ2FyZEhlYWRlci52dWUnKSk7XG5WdWUuY29tcG9uZW50KCdjYXJkLWJvZHknLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ2FyZEJvZHkudnVlJykpO1xuVnVlLmNvbXBvbmVudCgnY2FyZC1ncm91cCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9DYXJkR3JvdXAudnVlJykpO1xuVnVlLmNvbXBvbmVudCgnd2l6YXJkJywgcmVxdWlyZSgnLi9wYWdlcy9XaXphcmQudnVlJykpO1xuXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNtYWluLXdyYXBwZXInXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIndpbmRvdy5fID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cblxuLyoqXG4gKiBXZSdsbCBsb2FkIGpRdWVyeSBhbmQgdGhlIEJvb3RzdHJhcCBqUXVlcnkgcGx1Z2luIHdoaWNoIHByb3ZpZGVzIHN1cHBvcnRcbiAqIGZvciBKYXZhU2NyaXB0IGJhc2VkIEJvb3RzdHJhcCBmZWF0dXJlcyBzdWNoIGFzIG1vZGFscyBhbmQgdGFicy4gVGhpc1xuICogY29kZSBtYXkgYmUgbW9kaWZpZWQgdG8gZml0IHRoZSBzcGVjaWZpYyBuZWVkcyBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICovXG5cbnRyeSB7XG4gICAgZ2xvYmFsLiQgPSBnbG9iYWwualF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG4gICAgcmVxdWlyZSgncG9wcGVyLmpzJyk7XG4gICAgcmVxdWlyZSgnYm9vdHN0cmFwJyk7XG59IGNhdGNoIChlKSB7fVxuXG4vKipcbiAqIFdlJ2xsIGxvYWQgdGhlIGF4aW9zIEhUVFAgbGlicmFyeSB3aGljaCBhbGxvd3MgdXMgdG8gZWFzaWx5IGlzc3VlIHJlcXVlc3RzXG4gKiB0byBvdXIgTGFyYXZlbCBiYWNrLWVuZC4gVGhpcyBsaWJyYXJ5IGF1dG9tYXRpY2FsbHkgaGFuZGxlcyBzZW5kaW5nIHRoZVxuICogQ1NSRiB0b2tlbiBhcyBhIGhlYWRlciBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhlIFwiWFNSRlwiIHRva2VuIGNvb2tpZS5cbiAqL1xuXG53aW5kb3cuYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuXG53aW5kb3cuYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XG5cbi8qKlxuICogTmV4dCB3ZSB3aWxsIHJlZ2lzdGVyIHRoZSBDU1JGIFRva2VuIGFzIGEgY29tbW9uIGhlYWRlciB3aXRoIEF4aW9zIHNvIHRoYXRcbiAqIGFsbCBvdXRnb2luZyBIVFRQIHJlcXVlc3RzIGF1dG9tYXRpY2FsbHkgaGF2ZSBpdCBhdHRhY2hlZC4gVGhpcyBpcyBqdXN0XG4gKiBhIHNpbXBsZSBjb252ZW5pZW5jZSBzbyB3ZSBkb24ndCBoYXZlIHRvIGF0dGFjaCBldmVyeSB0b2tlbiBtYW51YWxseS5cbiAqL1xuXG5sZXQgdG9rZW4gPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKTtcblxuaWYgKHRva2VuKSB7XG4gICAgd2luZG93LmF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUNTUkYtVE9LRU4nXSA9IHRva2VuLmNvbnRlbnQ7XG59IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0NTUkYgdG9rZW4gbm90IGZvdW5kOiBodHRwczovL2xhcmF2ZWwuY29tL2RvY3MvY3NyZiNjc3JmLXgtY3NyZi10b2tlbicpO1xufVxuXG4vLyBpbXBvcnQgRWNobyBmcm9tIFwibGFyYXZlbC1lY2hvXCJcbi8vXG4vLyB3aW5kb3cuUHVzaGVyID0gcmVxdWlyZSgncHVzaGVyLWpzJyk7XG4vL1xuLy9cbi8vIHdpbmRvdy5FY2hvID0gbmV3IEVjaG8oe1xuLy8gICAgIGJyb2FkY2FzdGVyOiAncHVzaGVyJyxcbi8vICAgICBrZXk6ICcyMjlhODYyZmZkZDJhZGM5YjA1NScsXG4vLyAgICAgY2x1c3RlcjogJ3VzMicsXG4vLyAgICAgZW5jcnlwdGVkOiB0cnVlLFxuLy8gICAgIGF1dGhFbmRwb2ludDogJy9icm9hZGNhc3RpbmcvYXV0aCcsXG4vLyAgICAgYXV0aDoge1xuLy8gICAgICAgICBoZWFkZXJzOiB7XG4vLyAgICAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogdG9rZW4uY29udGVudFxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSk7XG5cbi8qKlxuICogRWNobyBleHBvc2VzIGFuIGV4cHJlc3NpdmUgQVBJIGZvciBzdWJzY3JpYmluZyB0byBjaGFubmVscyBhbmQgbGlzdGVuaW5nXG4gKiBmb3IgZXZlbnRzIHRoYXQgYXJlIGJyb2FkY2FzdCBieSBMYXJhdmVsLiBFY2hvIGFuZCBldmVudCBicm9hZGNhc3RpbmdcbiAqIGFsbG93cyB5b3VyIHRlYW0gdG8gZWFzaWx5IGJ1aWxkIHJvYnVzdCByZWFsLXRpbWUgd2ViIGFwcGxpY2F0aW9ucy5cbiAqL1xuXG4vLyBpbXBvcnQgRWNobyBmcm9tICdsYXJhdmVsLWVjaG8nXG5cbi8vIHdpbmRvdy5QdXNoZXIgPSByZXF1aXJlKCdwdXNoZXItanMnKTtcblxuLy8gd2luZG93LkVjaG8gPSBuZXcgRWNobyh7XG4vLyAgICAgYnJvYWRjYXN0ZXI6ICdwdXNoZXInLFxuLy8gICAgIGtleTogJ3lvdXItcHVzaGVyLWtleSdcbi8vIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9ib290c3RyYXAuanMiLCIvLyBBZG1pbiBQYW5lbCBzZXR0aW5nc1xyXG4kLmZuLkFkbWluU2V0dGluZ3MgPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcclxuICAgIHZhciBteWlkID0gdGhpcy5hdHRyKFwiaWRcIik7XHJcbiAgICAvLyBHZW5lcmFsIG9wdGlvbiBmb3IgdmVydGljYWwgaGVhZGVyIFxyXG4gICAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgICAgIFRoZW1lOiB0cnVlLCAvLyB0aGlzIGNhbiBiZSB0cnVlIG9yIGZhbHNlICggdHJ1ZSBtZWFucyBkYXJrIGFuZCBmYWxzZSBtZWFucyBsaWdodCApLFxyXG4gICAgICAgIExheW91dDogJ3ZlcnRpY2FsJywgLy8gXHJcbiAgICAgICAgTG9nb0JnOiAnc2tpbjEnLCAvLyBZb3UgY2FuIGNoYW5nZSB0aGUgVmFsdWUgdG8gYmUgc2tpbjEvc2tpbjIvc2tpbjMvc2tpbjQvc2tpbjUvc2tpbjYgXHJcbiAgICAgICAgTmF2YmFyQmc6ICdza2luNicsIC8vIFlvdSBjYW4gY2hhbmdlIHRoZSBWYWx1ZSB0byBiZSBza2luMS9za2luMi9za2luMy9za2luNC9za2luNS9za2luNiBcclxuICAgICAgICBTaWRlYmFyVHlwZTogJ2Z1bGwnLCAvLyBZb3UgY2FuIGNoYW5nZSBpdCBmdWxsIC8gbWluaS1zaWRlYmFyXHJcbiAgICAgICAgU2lkZWJhckNvbG9yOiAnc2tpbjEnLCAvLyBZb3UgY2FuIGNoYW5nZSB0aGUgVmFsdWUgdG8gYmUgc2tpbjEvc2tpbjIvc2tpbjMvc2tpbjQvc2tpbjUvc2tpbjZcclxuICAgICAgICBTaWRlYmFyUG9zaXRpb246IGZhbHNlLCAvLyBpdCBjYW4gYmUgdHJ1ZSAvIGZhbHNlXHJcbiAgICAgICAgSGVhZGVyUG9zaXRpb246IGZhbHNlLCAvLyBpdCBjYW4gYmUgdHJ1ZSAvIGZhbHNlXHJcbiAgICAgICAgQm94ZWRMYXlvdXQ6IGZhbHNlLCAvLyBpdCBjYW4gYmUgdHJ1ZSAvIGZhbHNlIFxyXG4gICAgfTtcclxuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgc2V0dGluZ3MpO1xyXG4gICAgLy8gQXR0cmlidXRlIGZ1bmN0aW9ucyBcclxuICAgIHZhciBBZG1pblNldHRpbmdzID0ge1xyXG4gICAgICAgIC8vIFNldHRpbmdzIElOSVRcclxuICAgICAgICBBZG1pblNldHRpbmdzSW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBBZG1pblNldHRpbmdzLk1hbmFnZVRoZW1lKCk7XHJcbiAgICAgICAgICAgIEFkbWluU2V0dGluZ3MuTWFuYWdlVGhlbWVMYXlvdXQoKTtcclxuICAgICAgICAgICAgQWRtaW5TZXR0aW5ncy5NYW5hZ2VUaGVtZUJhY2tncm91bmQoKTtcclxuICAgICAgICAgICAgQWRtaW5TZXR0aW5ncy5NYW5hZ2VTaWRlYmFyVHlwZSgpO1xyXG4gICAgICAgICAgICBBZG1pblNldHRpbmdzLk1hbmFnZVNpZGViYXJDb2xvcigpO1xyXG4gICAgICAgICAgICBBZG1pblNldHRpbmdzLk1hbmFnZVNpZGViYXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBBZG1pblNldHRpbmdzLk1hbmFnZUJveGVkTGF5b3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICwgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gTWFuYWdlVGhlbWVMYXlvdXQgZnVuY3Rpb25zXHJcbiAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgTWFuYWdlVGhlbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoZW1ldmlldyA9IHNldHRpbmdzLlRoZW1lO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHNldHRpbmdzLkxheW91dCkge1xyXG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhlbWV2aWV3ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYXR0cihcImRhdGEtdGhlbWVcIiwgJ2RhcmsnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3RoZW1lLXZpZXdcIikucHJvcChcImNoZWNrZWRcIiwgITApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS10aGVtZVwiLCAnbGlnaHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICwgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gTWFuYWdlVGhlbWVMYXlvdXQgZnVuY3Rpb25zXHJcbiAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgTWFuYWdlVGhlbWVMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChzZXR0aW5ncy5MYXlvdXQpIHtcclxuICAgICAgICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQpLmF0dHIoXCJkYXRhLWxheW91dFwiLCBcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1sYXlvdXRcIiwgXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICAgICAgICAgICQoJy5zY3JvbGwtc2lkZWJhcicpLnBlcmZlY3RTY3JvbGxiYXIoeyB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICwgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gTWFuYWdlU2lkZWJhclR5cGUgZnVuY3Rpb25zIFxyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgIE1hbmFnZVRoZW1lQmFja2dyb3VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBMb2dvIGJnIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRsb2dvYmcoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGJnID0gc2V0dGluZ3MuTG9nb0JnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxiZyAhPSB1bmRlZmluZWQgJiYgbGJnICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQgKyAnIC50b3BiYXIgLnRvcC1uYXZiYXIgLm5hdmJhci1oZWFkZXInKS5hdHRyKFwiZGF0YS1sb2dvYmdcIiwgbGJnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgbXlpZCArICcgLnRvcGJhciAudG9wLW5hdmJhciAubmF2YmFyLWhlYWRlcicpLmF0dHIoXCJkYXRhLWxvZ29iZ1wiLCBcInNraW4xXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXRsb2dvYmcoKTtcclxuICAgICAgICAgICAgLy8gTmF2YmFyIGJnIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRuYXZiYXJiZygpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYmcgPSBzZXR0aW5ncy5OYXZiYXJCZztcclxuICAgICAgICAgICAgICAgIGlmIChuYmcgIT0gdW5kZWZpbmVkICYmIG5iZyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkICsgJyAudG9wYmFyIC5uYXZiYXItY29sbGFwc2UnKS5hdHRyKFwiZGF0YS1uYXZiYXJiZ1wiLCBuYmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgbXlpZCArICcgLnRvcGJhcicpLmF0dHIoXCJkYXRhLW5hdmJhcmJnXCIsIG5iZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1uYXZiYXJiZ1wiLCBuYmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkICsgJyAudG9wYmFyIC5uYXZiYXItY29sbGFwc2UnKS5hdHRyKFwiZGF0YS1uYXZiYXJiZ1wiLCBcInNraW4xXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQgKyAnIC50b3BiYXInKS5hdHRyKFwiZGF0YS1uYXZiYXJiZ1wiLCBcInNraW4xXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgbXlpZCkuYXR0cihcImRhdGEtbmF2YmFyYmdcIiwgXCJza2luMVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2V0bmF2YmFyYmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLCAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAvLyBNYW5hZ2VUaGVtZUxheW91dCBmdW5jdGlvbnNcclxuICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBNYW5hZ2VTaWRlYmFyVHlwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHNldHRpbmdzLlNpZGViYXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaWRlYmFyIHR5cGUgaGFzIGZ1bGxcclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgJ2Z1bGwnOlxyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcImZ1bGxcIik7XHJcbiAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgIC8qIFRoaXMgaXMgZm9yIHRoZSBtaW5pLXNpZGViYXIgaWYgd2lkdGggaXMgbGVzcyB0aGVuIDExNzAqL1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqIFxyXG4gICAgICAgICAgICAgICAgdmFyIHNldHNpZGViYXJ0eXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCA+IDApID8gd2luZG93LmlubmVyV2lkdGggOiB0aGlzLnNjcmVlbi53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGggPCAxMTcwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLmF0dHIoXCJkYXRhLXNpZGViYXJ0eXBlXCIsIFwibWluaS1zaWRlYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNtYWluLXdyYXBwZXJcIikuYXR0cihcImRhdGEtc2lkZWJhcnR5cGVcIiwgXCJmdWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVhZHkoc2V0c2lkZWJhcnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHNldHNpZGViYXJ0eXBlKTtcclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgLyogVGhpcyBpcyBmb3Igc2lkZWJhcnRvZ2dsZXIqL1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAkKCcuc2lkZWJhcnRvZ2dsZXInKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS50b2dnbGVDbGFzcyhcIm1pbmktc2lkZWJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNtYWluLXdyYXBwZXJcIikuaGFzQ2xhc3MoXCJtaW5pLXNpZGViYXJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zaWRlYmFydG9nZ2xlclwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLmF0dHIoXCJkYXRhLXNpZGViYXJ0eXBlXCIsIFwibWluaS1zaWRlYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zaWRlYmFydG9nZ2xlclwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLmF0dHIoXCJkYXRhLXNpZGViYXJ0eXBlXCIsIFwiZnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2lkZWJhciB0eXBlIGhhcyBtaW5pLXNpZGViYXJcclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgICBcclxuICAgICAgICAgICAgY2FzZSAnbWluaS1zaWRlYmFyJzpcclxuICAgICAgICAgICAgICAgICQoJyMnICsgbXlpZCkuYXR0cihcImRhdGEtc2lkZWJhcnR5cGVcIiwgXCJtaW5pLXNpZGViYXJcIik7XHJcbiAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgIC8qIFRoaXMgaXMgZm9yIHNpZGViYXJ0b2dnbGVyKi9cclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgJCgnLnNpZGViYXJ0b2dnbGVyJykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNtYWluLXdyYXBwZXJcIikudG9nZ2xlQ2xhc3MoXCJtaW5pLXNpZGViYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCIjbWFpbi13cmFwcGVyXCIpLmhhc0NsYXNzKFwibWluaS1zaWRlYmFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2lkZWJhcnRvZ2dsZXJcIikucHJvcChcImNoZWNrZWRcIiwgITApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcImZ1bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNpZGViYXJ0b2dnbGVyXCIpLnByb3AoXCJjaGVja2VkXCIsICExKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNtYWluLXdyYXBwZXJcIikuYXR0cihcImRhdGEtc2lkZWJhcnR5cGVcIiwgXCJtaW5pLXNpZGViYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNpZGViYXIgdHlwZSBoYXMgaWNvbmJhclxyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlICdpY29uYmFyJzpcclxuICAgICAgICAgICAgICAgICQoJyMnICsgbXlpZCkuYXR0cihcImRhdGEtc2lkZWJhcnR5cGVcIiwgXCJpY29uYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAvKiBUaGlzIGlzIGZvciB0aGUgbWluaS1zaWRlYmFyIGlmIHdpZHRoIGlzIGxlc3MgdGhlbiAxMTcwKi9cclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBcclxuICAgICAgICAgICAgICAgIHZhciBzZXRzaWRlYmFydHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSAod2luZG93LmlubmVyV2lkdGggPiAwKSA/IHdpbmRvdy5pbm5lcldpZHRoIDogdGhpcy5zY3JlZW4ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpZHRoIDwgMTE3MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcIm1pbmktc2lkZWJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNtYWluLXdyYXBwZXJcIikuYWRkQ2xhc3MoXCJtaW5pLXNpZGViYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcImljb25iYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwibWluaS1zaWRlYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVhZHkoc2V0c2lkZWJhcnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHNldHNpZGViYXJ0eXBlKTtcclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgLyogVGhpcyBpcyBmb3Igc2lkZWJhcnRvZ2dsZXIqL1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAkKCcuc2lkZWJhcnRvZ2dsZXInKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS50b2dnbGVDbGFzcyhcIm1pbmktc2lkZWJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNtYWluLXdyYXBwZXJcIikuaGFzQ2xhc3MoXCJtaW5pLXNpZGViYXJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zaWRlYmFydG9nZ2xlclwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLmF0dHIoXCJkYXRhLXNpZGViYXJ0eXBlXCIsIFwibWluaS1zaWRlYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zaWRlYmFydG9nZ2xlclwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLmF0dHIoXCJkYXRhLXNpZGViYXJ0eXBlXCIsIFwiaWNvbmJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2lkZWJhciB0eXBlIGhhcyBvdmVybGF5XHJcbiAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgJ292ZXJsYXknOlxyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcIm92ZXJsYXlcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0c2lkZWJhcnR5cGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoID4gMCkgPyB3aW5kb3cuaW5uZXJXaWR0aCA6IHRoaXMuc2NyZWVuLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aWR0aCA8IDc2Nykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcIm1pbmktc2lkZWJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNtYWluLXdyYXBwZXJcIikuYWRkQ2xhc3MoXCJtaW5pLXNpZGViYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLCBcIm92ZXJsYXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFpbi13cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwibWluaS1zaWRlYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVhZHkoc2V0c2lkZWJhcnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHNldHNpZGViYXJ0eXBlKTtcclxuICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgLyogVGhpcyBpcyBmb3Igc2lkZWJhcnRvZ2dsZXIqL1xyXG4gICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAkKCcuc2lkZWJhcnRvZ2dsZXInKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI21haW4td3JhcHBlclwiKS50b2dnbGVDbGFzcyhcInNob3ctc2lkZWJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChcIiNtYWluLXdyYXBwZXJcIikuaGFzQ2xhc3MoXCJzaG93LXNpZGViYXJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiLnNpZGViYXJ0b2dnbGVyXCIpLnByb3AoXCJjaGVja2VkXCIsICEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLFwibWluaS1zaWRlYmFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiLnNpZGViYXJ0b2dnbGVyXCIpLnByb3AoXCJjaGVja2VkXCIsICExKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiI21haW4td3JhcHBlclwiKS5hdHRyKFwiZGF0YS1zaWRlYmFydHlwZVwiLFwiaWNvbmJhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICwgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gTWFuYWdlU2lkZWJhckNvbG9yIGZ1bmN0aW9ucyBcclxuICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBNYW5hZ2VTaWRlYmFyQ29sb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gTG9nbyBiZyBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0c2lkZWJhcmJnKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNiZyA9IHNldHRpbmdzLlNpZGViYXJDb2xvcjtcclxuICAgICAgICAgICAgICAgIGlmIChzYmcgIT0gdW5kZWZpbmVkICYmIHNiZyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkICsgJyAubGVmdC1zaWRlYmFyJykuYXR0cihcImRhdGEtc2lkZWJhcmJnXCIsIHNiZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQgKyAnIC5sZWZ0LXNpZGViYXInKS5hdHRyKFwiZGF0YS1zaWRlYmFyYmdcIiwgXCJza2luMVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2V0c2lkZWJhcmJnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICwgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gTWFuYWdlU2lkZWJhclBvc2l0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgIE1hbmFnZVNpZGViYXJQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2lkZWJhcnBvc2l0aW9uID0gc2V0dGluZ3MuU2lkZWJhclBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVycG9zaXRpb24gPSBzZXR0aW5ncy5IZWFkZXJQb3NpdGlvbjtcclxuICAgICAgICAgICAgc3dpdGNoIChzZXR0aW5ncy5MYXlvdXQpIHtcclxuICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHNpZGViYXJwb3NpdGlvbiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1zaWRlYmFyLXBvc2l0aW9uXCIsICdmaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc2lkZWJhci1wb3NpdGlvblwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQpLmF0dHIoXCJkYXRhLXNpZGViYXItcG9zaXRpb25cIiwgJ2Fic29sdXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzaWRlYmFyLXBvc2l0aW9uXCIpLnByb3AoXCJjaGVja2VkXCIsICExKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChoZWFkZXJwb3NpdGlvbiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1oZWFkZXItcG9zaXRpb25cIiwgJ2ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNoZWFkZXItcG9zaXRpb25cIikucHJvcChcImNoZWNrZWRcIiwgITApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1oZWFkZXItcG9zaXRpb25cIiwgJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNoZWFkZXItcG9zaXRpb25cIikucHJvcChcImNoZWNrZWRcIiwgITEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLCAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAvLyBNYW5hZ2VCb3hlZExheW91dCBmdW5jdGlvbnNcclxuICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBNYW5hZ2VCb3hlZExheW91dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYm94ZWRsYXlvdXQgPSBzZXR0aW5ncy5Cb3hlZExheW91dDtcclxuICAgICAgICAgICAgc3dpdGNoIChzZXR0aW5ncy5MYXlvdXQpIHtcclxuICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGJveGVkbGF5b3V0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQpLmF0dHIoXCJkYXRhLWJveGVkLWxheW91dFwiLCAnYm94ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2JveGVkLWxheW91dFwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG15aWQpLmF0dHIoXCJkYXRhLWJveGVkLWxheW91dFwiLCAnZnVsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjYm94ZWQtbGF5b3V0XCIpLnByb3AoXCJjaGVja2VkXCIsICExKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChib3hlZGxheW91dCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1ib3hlZC1sYXlvdXRcIiwgJ2JveGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNib3hlZC1sYXlvdXRcIikucHJvcChcImNoZWNrZWRcIiwgITApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBteWlkKS5hdHRyKFwiZGF0YS1ib3hlZC1sYXlvdXRcIiwgJ2Z1bGwnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2JveGVkLWxheW91dFwiKS5wcm9wKFwiY2hlY2tlZFwiLCAhMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhazsgICAgICAgIFxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgLCB9O1xyXG4gICAgQWRtaW5TZXR0aW5ncy5BZG1pblNldHRpbmdzSW5pdCgpO1xyXG59O1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gVGhpcyBpcyBmb3IgdGhlIGNoYXQgY3VzdG9taXplciBzZXR0aW5nXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjaGF0YXJlYSA9ICQoXCIjY2hhdFwiKTtcclxuICAgICQoJyNjaGF0IC5tZXNzYWdlLWNlbnRlciBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5maW5kKFwiLm1haWwtY29udG5ldCBoNVwiKS50ZXh0KCk7XHJcbiAgICAgICAgdmFyIGltZyA9ICQodGhpcykuZmluZChcIi51c2VyLWltZyBpbWdcIikuYXR0cihcInNyY1wiKTtcclxuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXVzZXItaWRcIik7XHJcbiAgICAgICAgdmFyIHN0YXR1cyA9ICQodGhpcykuZmluZChcIi5wcm9maWxlLXN0YXR1c1wiKS5hdHRyKFwiZGF0YS1zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgJChcIi5jaGF0LXdpbmRvd3MgI3VzZXItY2hhdFwiICsgaWQpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGlmICgkKFwiLmNoYXQtd2luZG93cyAjdXNlci1jaGF0XCIgKyBpZCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmNoYXQtd2luZG93cyAjdXNlci1jaGF0XCIgKyBpZCkucmVtb3ZlQ2xhc3MoXCJtaW5pLWNoYXRcIikuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IG1zZ19yZWNlaXZlKCdJIHdhdGNoZWQgdGhlIHN0b3JtLCBzbyBiZWF1dGlmdWwgeWV0IHRlcnJpZmljLicpO1xyXG4gICAgICAgICAgICAgICAgbXNnICs9IG1zZ19zZW50KCdUaGF0IGlzIHZlcnkgZGVlcCBpbmRlZWQhJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz0ndXNlci1jaGF0JyBpZD0ndXNlci1jaGF0XCIgKyBpZCArIFwiJyBkYXRhLXVzZXItaWQ9J1wiICsgaWQgKyBcIic+XCI7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPGRpdiBjbGFzcz0nY2hhdC1oZWFkJz48aW1nIHNyYz0nXCIgKyBpbWcgKyBcIicgZGF0YS11c2VyLWlkPSdcIiArIGlkICsgXCInPjxzcGFuIGNsYXNzPSdzdGF0dXMgXCIgKyBzdGF0dXMgKyBcIic+PC9zcGFuPjxzcGFuIGNsYXNzPSduYW1lJz5cIiArIG5hbWUgKyBcIjwvc3Bhbj48c3BhbiBjbGFzcz0nb3B0cyc+PGkgY2xhc3M9J3RpLWNsb3NlIGNsb3NlaXQnIGRhdGEtdXNlci1pZD0nXCIgKyBpZCArIFwiJz48L2k+PGkgY2xhc3M9J3RpLW1pbnVzIG1pbmktY2hhdCcgZGF0YS11c2VyLWlkPSdcIiArIGlkICsgXCInPjwvaT48L3NwYW4+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPGRpdiBjbGFzcz0nY2hhdC1ib2R5Jz48dWwgY2xhc3M9J2NoYXQtbGlzdCc+XCIgKyBtc2cgKyBcIjwvdWw+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPGRpdiBjbGFzcz0nY2hhdC1mb290ZXInPjxpbnB1dCB0eXBlPSd0ZXh0JyBkYXRhLXVzZXItaWQ9J1wiICsgaWQgKyBcIicgcGxhY2Vob2xkZXI9J1R5cGUgJiBFbnRlcicgY2xhc3M9J2Zvcm0tY29udHJvbCc+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmNoYXQtd2luZG93c1wiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiLmNoYXQtd2luZG93cyAudXNlci1jaGF0IC5jaGF0LWhlYWQgLmNsb3NlaXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXVzZXItaWRcIik7XHJcbiAgICAgICAgJChcIi5jaGF0LXdpbmRvd3MgI3VzZXItY2hhdFwiICsgaWQpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2NoYXQgLm1lc3NhZ2UtY2VudGVyIC51c2VyLWluZm8jY2hhdF91c2VyX1wiICsgaWQpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBcIi5jaGF0LXdpbmRvd3MgLnVzZXItY2hhdCAuY2hhdC1oZWFkIGltZywgLmNoYXQtd2luZG93cyAudXNlci1jaGF0IC5jaGF0LWhlYWQgLm1pbmktY2hhdFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImRhdGEtdXNlci1pZFwiKTtcclxuICAgICAgICBpZiAoISQoXCIuY2hhdC13aW5kb3dzICN1c2VyLWNoYXRcIiArIGlkKS5oYXNDbGFzcyhcIm1pbmktY2hhdFwiKSkge1xyXG4gICAgICAgICAgICAkKFwiLmNoYXQtd2luZG93cyAjdXNlci1jaGF0XCIgKyBpZCkuYWRkQ2xhc3MoXCJtaW5pLWNoYXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiLmNoYXQtd2luZG93cyAjdXNlci1jaGF0XCIgKyBpZCkucmVtb3ZlQ2xhc3MoXCJtaW5pLWNoYXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5cHJlc3MnLCBcIi5jaGF0LXdpbmRvd3MgLnVzZXItY2hhdCAuY2hhdC1mb290ZXIgaW5wdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImRhdGEtdXNlci1pZFwiKTtcclxuICAgICAgICAgICAgdmFyIG1zZyA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIG1zZyA9IG1zZ19zZW50KG1zZyk7XHJcbiAgICAgICAgICAgICQoXCIuY2hhdC13aW5kb3dzICN1c2VyLWNoYXRcIiArIGlkICsgXCIgLmNoYXQtYm9keSAuY2hhdC1saXN0XCIpLmFwcGVuZChtc2cpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiLmNoYXQtd2luZG93cyAjdXNlci1jaGF0XCIgKyBpZCArIFwiIC5jaGF0LWJvZHlcIikucGVyZmVjdFNjcm9sbGJhcih7XHJcbiAgICAgICAgICAgIHN1cHByZXNzU2Nyb2xsWDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiLnBhZ2Utd3JhcHBlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoJy5jaGF0LXdpbmRvd3MnKS5hZGRDbGFzcygnaGlkZS1jaGF0Jyk7XHJcbiAgICAgICAgJCgnLmNoYXQtd2luZG93cycpLnJlbW92ZUNsYXNzKCdzaG93LWNoYXQnKTtcclxuICAgIH0pO1xyXG4gICAgJChcIi5zZXJ2aWNlLXBhbmVsLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoJy5jaGF0LXdpbmRvd3MnKS5hZGRDbGFzcygnc2hvdy1jaGF0Jyk7XHJcbiAgICAgICAgJCgnLmNoYXQtd2luZG93cycpLnJlbW92ZUNsYXNzKCdoaWRlLWNoYXQnKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIG1zZ19yZWNlaXZlKG1zZykge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGggPSBkLmdldEhvdXJzKCk7XHJcbiAgICB2YXIgbSA9IGQuZ2V0TWludXRlcygpO1xyXG4gICAgcmV0dXJuIFwiPGxpIGNsYXNzPSdtc2dfcmVjZWl2ZSc+PGRpdiBjbGFzcz0nY2hhdC1jb250ZW50Jz48ZGl2IGNsYXNzPSdib3ggYmctbGlnaHQtaW5mbyc+XCIgKyBtc2cgKyBcIjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9J2NoYXQtdGltZSc+XCIgKyBoICsgXCI6XCIgKyBtICsgXCI8L2Rpdj48L2xpPlwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtc2dfc2VudChtc2cpIHtcclxuICAgIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgIHZhciBoID0gZC5nZXRIb3VycygpO1xyXG4gICAgdmFyIG0gPSBkLmdldE1pbnV0ZXMoKTtcclxuICAgIHJldHVybiBcIjxsaSBjbGFzcz0nb2RkIG1zZ19zZW50Jz48ZGl2IGNsYXNzPSdjaGF0LWNvbnRlbnQnPjxkaXYgY2xhc3M9J2JveCBiZy1saWdodC1pbmZvJz5cIiArIG1zZyArIFwiPC9kaXY+PGJyPjwvZGl2PjxkaXYgY2xhc3M9J2NoYXQtdGltZSc+XCIgKyBoICsgXCI6XCIgKyBtICsgXCI8L2Rpdj48L2xpPlwiO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9iaXRlL2FwcC5qcyIsIiFmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKHQpe3JldHVybiBudWxsIT09dCYmdD09PXQud2luZG93fWZ1bmN0aW9uIG4odCl7cmV0dXJuIGUodCk/dDo5PT09dC5ub2RlVHlwZSYmdC5kZWZhdWx0Vmlld31mdW5jdGlvbiBhKHQpe3ZhciBlLGEsaT17dG9wOjAsbGVmdDowfSxvPXQmJnQub3duZXJEb2N1bWVudDtyZXR1cm4gZT1vLmRvY3VtZW50RWxlbWVudCxcInVuZGVmaW5lZFwiIT10eXBlb2YgdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QmJihpPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpLGE9bihvKSx7dG9wOmkudG9wK2EucGFnZVlPZmZzZXQtZS5jbGllbnRUb3AsbGVmdDppLmxlZnQrYS5wYWdlWE9mZnNldC1lLmNsaWVudExlZnR9fWZ1bmN0aW9uIGkodCl7dmFyIGU9XCJcIjtmb3IodmFyIG4gaW4gdCl0Lmhhc093blByb3BlcnR5KG4pJiYoZSs9bitcIjpcIit0W25dK1wiO1wiKTtyZXR1cm4gZX1mdW5jdGlvbiBvKHQpe2lmKGQuYWxsb3dFdmVudCh0KT09PSExKXJldHVybiBudWxsO2Zvcih2YXIgZT1udWxsLG49dC50YXJnZXR8fHQuc3JjRWxlbWVudDtudWxsIT09bi5wYXJlbnRFbGVtZW50Oyl7aWYoIShuIGluc3RhbmNlb2YgU1ZHRWxlbWVudHx8LTE9PT1uLmNsYXNzTmFtZS5pbmRleE9mKFwid2F2ZXMtZWZmZWN0XCIpKSl7ZT1uO2JyZWFrfWlmKG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwid2F2ZXMtZWZmZWN0XCIpKXtlPW47YnJlYWt9bj1uLnBhcmVudEVsZW1lbnR9cmV0dXJuIGV9ZnVuY3Rpb24gcihlKXt2YXIgbj1vKGUpO251bGwhPT1uJiYoYy5zaG93KGUsbiksXCJvbnRvdWNoc3RhcnRcImluIHQmJihuLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLGMuaGlkZSwhMSksbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIixjLmhpZGUsITEpKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsYy5oaWRlLCExKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsYy5oaWRlLCExKSl9dmFyIHM9c3x8e30sdT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpLGM9e2R1cmF0aW9uOjc1MCxzaG93OmZ1bmN0aW9uKHQsZSl7aWYoMj09PXQuYnV0dG9uKXJldHVybiExO3ZhciBuPWV8fHRoaXMsbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO28uY2xhc3NOYW1lPVwid2F2ZXMtcmlwcGxlXCIsbi5hcHBlbmRDaGlsZChvKTt2YXIgcj1hKG4pLHM9dC5wYWdlWS1yLnRvcCx1PXQucGFnZVgtci5sZWZ0LGQ9XCJzY2FsZShcIituLmNsaWVudFdpZHRoLzEwMCoxMCtcIilcIjtcInRvdWNoZXNcImluIHQmJihzPXQudG91Y2hlc1swXS5wYWdlWS1yLnRvcCx1PXQudG91Y2hlc1swXS5wYWdlWC1yLmxlZnQpLG8uc2V0QXR0cmlidXRlKFwiZGF0YS1ob2xkXCIsRGF0ZS5ub3coKSksby5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNjYWxlXCIsZCksby5zZXRBdHRyaWJ1dGUoXCJkYXRhLXhcIix1KSxvLnNldEF0dHJpYnV0ZShcImRhdGEteVwiLHMpO3ZhciBsPXt0b3A6cytcInB4XCIsbGVmdDp1K1wicHhcIn07by5jbGFzc05hbWU9by5jbGFzc05hbWUrXCIgd2F2ZXMtbm90cmFuc2l0aW9uXCIsby5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLGkobCkpLG8uY2xhc3NOYW1lPW8uY2xhc3NOYW1lLnJlcGxhY2UoXCJ3YXZlcy1ub3RyYW5zaXRpb25cIixcIlwiKSxsW1wiLXdlYmtpdC10cmFuc2Zvcm1cIl09ZCxsW1wiLW1vei10cmFuc2Zvcm1cIl09ZCxsW1wiLW1zLXRyYW5zZm9ybVwiXT1kLGxbXCItby10cmFuc2Zvcm1cIl09ZCxsLnRyYW5zZm9ybT1kLGwub3BhY2l0eT1cIjFcIixsW1wiLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uXCJdPWMuZHVyYXRpb24rXCJtc1wiLGxbXCItbW96LXRyYW5zaXRpb24tZHVyYXRpb25cIl09Yy5kdXJhdGlvbitcIm1zXCIsbFtcIi1vLXRyYW5zaXRpb24tZHVyYXRpb25cIl09Yy5kdXJhdGlvbitcIm1zXCIsbFtcInRyYW5zaXRpb24tZHVyYXRpb25cIl09Yy5kdXJhdGlvbitcIm1zXCIsbFtcIi13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIl09XCJjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApXCIsbFtcIi1tb3otdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIl09XCJjdWJpYy1iZXppZXIoMC4yNTAsIDAuNDYwLCAwLjQ1MCwgMC45NDApXCIsbFtcIi1vLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uXCJdPVwiY3ViaWMtYmV6aWVyKDAuMjUwLCAwLjQ2MCwgMC40NTAsIDAuOTQwKVwiLGxbXCJ0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblwiXT1cImN1YmljLWJlemllcigwLjI1MCwgMC40NjAsIDAuNDUwLCAwLjk0MClcIixvLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsaShsKSl9LGhpZGU6ZnVuY3Rpb24odCl7ZC50b3VjaHVwKHQpO3ZhciBlPXRoaXMsbj0oMS40KmUuY2xpZW50V2lkdGgsbnVsbCksYT1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ3YXZlcy1yaXBwbGVcIik7aWYoIShhLmxlbmd0aD4wKSlyZXR1cm4hMTtuPWFbYS5sZW5ndGgtMV07dmFyIG89bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXhcIikscj1uLmdldEF0dHJpYnV0ZShcImRhdGEteVwiKSxzPW4uZ2V0QXR0cmlidXRlKFwiZGF0YS1zY2FsZVwiKSx1PURhdGUubm93KCktTnVtYmVyKG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1ob2xkXCIpKSxsPTM1MC11OzA+bCYmKGw9MCksc2V0VGltZW91dChmdW5jdGlvbigpe3ZhciB0PXt0b3A6citcInB4XCIsbGVmdDpvK1wicHhcIixvcGFjaXR5OlwiMFwiLFwiLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uXCI6Yy5kdXJhdGlvbitcIm1zXCIsXCItbW96LXRyYW5zaXRpb24tZHVyYXRpb25cIjpjLmR1cmF0aW9uK1wibXNcIixcIi1vLXRyYW5zaXRpb24tZHVyYXRpb25cIjpjLmR1cmF0aW9uK1wibXNcIixcInRyYW5zaXRpb24tZHVyYXRpb25cIjpjLmR1cmF0aW9uK1wibXNcIixcIi13ZWJraXQtdHJhbnNmb3JtXCI6cyxcIi1tb3otdHJhbnNmb3JtXCI6cyxcIi1tcy10cmFuc2Zvcm1cIjpzLFwiLW8tdHJhbnNmb3JtXCI6cyx0cmFuc2Zvcm06c307bi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLGkodCkpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cnl7ZS5yZW1vdmVDaGlsZChuKX1jYXRjaCh0KXtyZXR1cm4hMX19LGMuZHVyYXRpb24pfSxsKX0sd3JhcElucHV0OmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT0wO2U8dC5sZW5ndGg7ZSsrKXt2YXIgbj10W2VdO2lmKFwiaW5wdXRcIj09PW4udGFnTmFtZS50b0xvd2VyQ2FzZSgpKXt2YXIgYT1uLnBhcmVudE5vZGU7aWYoXCJpXCI9PT1hLnRhZ05hbWUudG9Mb3dlckNhc2UoKSYmLTEhPT1hLmNsYXNzTmFtZS5pbmRleE9mKFwid2F2ZXMtZWZmZWN0XCIpKWNvbnRpbnVlO3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO2kuY2xhc3NOYW1lPW4uY2xhc3NOYW1lK1wiIHdhdmVzLWlucHV0LXdyYXBwZXJcIjt2YXIgbz1uLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpO298fChvPVwiXCIpLGkuc2V0QXR0cmlidXRlKFwic3R5bGVcIixvKSxuLmNsYXNzTmFtZT1cIndhdmVzLWJ1dHRvbi1pbnB1dFwiLG4ucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIiksYS5yZXBsYWNlQ2hpbGQoaSxuKSxpLmFwcGVuZENoaWxkKG4pfX19fSxkPXt0b3VjaGVzOjAsYWxsb3dFdmVudDpmdW5jdGlvbih0KXt2YXIgZT0hMDtyZXR1cm5cInRvdWNoc3RhcnRcIj09PXQudHlwZT9kLnRvdWNoZXMrPTE6XCJ0b3VjaGVuZFwiPT09dC50eXBlfHxcInRvdWNoY2FuY2VsXCI9PT10LnR5cGU/c2V0VGltZW91dChmdW5jdGlvbigpe2QudG91Y2hlcz4wJiYoZC50b3VjaGVzLT0xKX0sNTAwKTpcIm1vdXNlZG93blwiPT09dC50eXBlJiZkLnRvdWNoZXM+MCYmKGU9ITEpLGV9LHRvdWNodXA6ZnVuY3Rpb24odCl7ZC5hbGxvd0V2ZW50KHQpfX07cy5kaXNwbGF5RWZmZWN0PWZ1bmN0aW9uKGUpe2U9ZXx8e30sXCJkdXJhdGlvblwiaW4gZSYmKGMuZHVyYXRpb249ZS5kdXJhdGlvbiksYy53cmFwSW5wdXQodShcIi53YXZlcy1lZmZlY3RcIikpLFwib250b3VjaHN0YXJ0XCJpbiB0JiZkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsciwhMSksZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsciwhMSl9LHMuYXR0YWNoPWZ1bmN0aW9uKGUpe1wiaW5wdXRcIj09PWUudGFnTmFtZS50b0xvd2VyQ2FzZSgpJiYoYy53cmFwSW5wdXQoW2VdKSxlPWUucGFyZW50RWxlbWVudCksXCJvbnRvdWNoc3RhcnRcImluIHQmJmUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixyLCExKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIixyLCExKX0sdC5XYXZlcz1zLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXtzLmRpc3BsYXlFZmZlY3QoKX0sITEpfSh3aW5kb3cpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYml0ZS93YXZlcy5qcyIsImltcG9ydCBQZXJmZWN0U2Nyb2xsYmFyIGZyb20gXCJwZXJmZWN0LXNjcm9sbGJhclwiO1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBUaGVtZSBvcHRpb25zXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIHNpZGViYXItaG92ZXJcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAkKCcubGVmdC1zaWRlYmFyJykuaG92ZXIoXHJcbiAgICBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLm5hdmJhci1oZWFkZXInKS5hZGRDbGFzcygnZXhwYW5kLWxvZ28nKTtcclxuICAgIH0sXHJcbiAgICBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLm5hdmJhci1oZWFkZXInKS5yZW1vdmVDbGFzcygnZXhwYW5kLWxvZ28nKTtcclxuICAgIH1cclxuICApO1xyXG4gIC8vIHRoaXMgaXMgZm9yIGNsb3NlIGljb24gd2hlbiBuYXZpZ2F0aW9uIG9wZW4gaW4gbW9iaWxlIHZpZXdcclxuICAkKCcubmF2LXRvZ2dsZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQoJyNtYWluLXdyYXBwZXInKS50b2dnbGVDbGFzcygnc2hvdy1zaWRlYmFyJyk7XHJcbiAgICAkKCcubmF2LXRvZ2dsZXIgaScpLnRvZ2dsZUNsYXNzKCd0aS1tZW51Jyk7XHJcbiAgfSk7XHJcbiAgJCgnLm5hdi1sb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2xvY2stbmF2Jyk7XHJcbiAgICAkKCcubmF2LWxvY2sgaScpLnRvZ2dsZUNsYXNzKCdtZGktdG9nZ2xlLXN3aXRjaC1vZmYnKTtcclxuICAgICQoJ2JvZHksIC5wYWdlLXdyYXBwZXInKS50cmlnZ2VyKCdyZXNpemUnKTtcclxuICB9KTtcclxuICAkKCcuc2VhcmNoLWJveCBhLCAuc2VhcmNoLWJveCAuYXBwLXNlYXJjaCAuc3JoLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmFwcC1zZWFyY2gnKS50b2dnbGUoMjAwKTtcclxuICAgICQoJy5hcHAtc2VhcmNoIGlucHV0JykuZm9jdXMoKTtcclxuICB9KTtcclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBSaWdodCBzaWRlYmFyIG9wdGlvbnNcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuc2VydmljZS1wYW5lbC10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLmN1c3RvbWl6ZXInKS50b2dnbGVDbGFzcygnc2hvdy1zZXJ2aWNlLXBhbmVsJyk7XHJcbiAgICB9KTtcclxuICAgICQoJy5wYWdlLXdyYXBwZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLmN1c3RvbWl6ZXInKS5yZW1vdmVDbGFzcygnc2hvdy1zZXJ2aWNlLXBhbmVsJyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFRoaXMgaXMgZm9yIHRoZSBmbG9hdGluZyBsYWJlbHNcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICQoJy5mbG9hdGluZy1sYWJlbHMgLmZvcm0tY29udHJvbCcpXHJcbiAgICAub24oJ2ZvY3VzIGJsdXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICQodGhpcylcclxuICAgICAgICAucGFyZW50cygnLmZvcm0tZ3JvdXAnKVxyXG4gICAgICAgIC50b2dnbGVDbGFzcygnZm9jdXNlZCcsIGUudHlwZSA9PT0gJ2ZvY3VzJyB8fCB0aGlzLnZhbHVlLmxlbmd0aCA+IDApO1xyXG4gICAgfSlcclxuICAgIC50cmlnZ2VyKCdibHVyJyk7XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy90b29sdGlwXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcclxuICB9KTtcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vUG9wb3ZlclxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgJChmdW5jdGlvbigpIHtcclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gUGVyZmFjdCBzY3JvbGxiYXJcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vICQoJy5tZXNzYWdlLWNlbnRlciwgLmN1c3RvbWl6ZXItYm9keSwgLnNjcm9sbGFibGUnKS5wZXJmZWN0U2Nyb2xsYmFyKHtcclxuICAvLyAgIHdoZWVsUHJvcGFnYXRpb246ICEwXHJcbiAgLy8gfSk7XHJcblxyXG4gIHZhciBwcyA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKCcubWVzc2FnZS1ib2R5Jyk7XHJcbiAgdmFyIHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoJy5ub3RpZmljYXRpb25zJyk7XHJcbiAgdmFyIHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoJy5zY3JvbGwtc2lkZWJhcicpO1xyXG4gIHZhciBwcyA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKCcuY3VzdG9taXplci1ib2R5Jyk7XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gUmVzaXplIGFsbCBlbGVtZW50c1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgJCgnYm9keSwgLnBhZ2Utd3JhcHBlcicpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xyXG4gICQoJy5wYWdlLXdyYXBwZXInKVxyXG4gICAgLmRlbGF5KDIwKVxyXG4gICAgLnNob3coKTtcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFRvIGRvIGxpc3RcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICQoJy5saXN0LXRhc2sgbGkgbGFiZWwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3Rhc2stZG9uZScpO1xyXG4gIH0pO1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gQ29sbGFwc2FibGUgY2FyZHNcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICQoJ2FbZGF0YS1hY3Rpb249XCJjb2xsYXBzZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQodGhpcylcclxuICAgICAgLmNsb3Nlc3QoJy5jYXJkJylcclxuICAgICAgLmZpbmQoJ1tkYXRhLWFjdGlvbj1cImNvbGxhcHNlXCJdIGknKVxyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ3RpLW1pbnVzIHRpLXBsdXMnKTtcclxuICAgICQodGhpcylcclxuICAgICAgLmNsb3Nlc3QoJy5jYXJkJylcclxuICAgICAgLmNoaWxkcmVuKCcuY2FyZC1ib2R5JylcclxuICAgICAgLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuICB9KTtcclxuICAvLyBUb2dnbGUgZnVsbHNjcmVlblxyXG4gICQoJ2FbZGF0YS1hY3Rpb249XCJleHBhbmRcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKHRoaXMpXHJcbiAgICAgIC5jbG9zZXN0KCcuY2FyZCcpXHJcbiAgICAgIC5maW5kKCdbZGF0YS1hY3Rpb249XCJleHBhbmRcIl0gaScpXHJcbiAgICAgIC50b2dnbGVDbGFzcygnbWRpLWFycm93LWV4cGFuZCBtZGktYXJyb3ctY29tcHJlc3MnKTtcclxuICAgICQodGhpcylcclxuICAgICAgLmNsb3Nlc3QoJy5jYXJkJylcclxuICAgICAgLnRvZ2dsZUNsYXNzKCdjYXJkLWZ1bGxzY3JlZW4nKTtcclxuICB9KTtcclxuICAvLyBDbG9zZSBDYXJkXHJcbiAgJCgnYVtkYXRhLWFjdGlvbj1cImNsb3NlXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKHRoaXMpXHJcbiAgICAgIC5jbG9zZXN0KCcuY2FyZCcpXHJcbiAgICAgIC5yZW1vdmVDbGFzcygpXHJcbiAgICAgIC5zbGlkZVVwKCdmYXN0Jyk7XHJcbiAgfSk7XHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBMVGhpcyBpcyBmb3IgbWVnYSBtZW51XHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm1lZ2EtZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gTGFzdCBtb250aCBlYXJuaW5nXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICB2YXIgc3BhcmtsaW5lTG9naW4gPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5sYXN0bW9udGgnKS5zcGFya2xpbmUoWzYsIDEwLCA5LCAxMSwgOSwgMTAsIDEyXSwge1xyXG4gICAgICB0eXBlOiAnYmFyJyxcclxuICAgICAgaGVpZ2h0OiAnMzUnLFxyXG4gICAgICBiYXJXaWR0aDogJzQnLFxyXG4gICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICByZXNpemU6IHRydWUsXHJcbiAgICAgIGJhclNwYWNpbmc6ICc4JyxcclxuICAgICAgYmFyQ29sb3I6ICcjMjk2MWZmJ1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICB2YXIgc3BhcmtSZXNpemU7XHJcblxyXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oZSkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHNwYXJrUmVzaXplKTtcclxuICAgIHNwYXJrUmVzaXplID0gc2V0VGltZW91dChzcGFya2xpbmVMb2dpbiwgNTAwKTtcclxuICB9KTtcclxuICBzcGFya2xpbmVMb2dpbigpO1xyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFRoaXMgaXMgZm9yIHRoZSBpbm5lcmxlZnQgc2lkZWJhclxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgJCgnLnNob3ctbGVmdC1wYXJ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcubGVmdC1wYXJ0JykudG9nZ2xlQ2xhc3MoJ3Nob3ctcGFuZWwnKTtcclxuICAgICQoJy5zaG93LWxlZnQtcGFydCcpLnRvZ2dsZUNsYXNzKCd0aS1tZW51Jyk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIERpc2FibGUgcmlnaHQgY2xpY2sgYW5kIGYxMlxyXG4gIC8qXHJcbiAgICAkKFwiaHRtbFwiKS5vbihcImNvbnRleHRtZW51XCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMTIzKSB7IC8vIFByZXZlbnQgRjEyXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PSA3MykgeyAvLyBQcmV2ZW50IEN0cmwrU2hpZnQrSSAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ICAgXHJcbiAgICB9KTsgKi9cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYml0ZS9jdXN0b20uanMiLCIvKiFcbiAqIHBlcmZlY3Qtc2Nyb2xsYmFyIHYxLjQuMFxuICogKGMpIDIwMTggSHl1bmplIEp1blxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbmZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBzZXQoZWxlbWVudCwgb2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB2YWwgPSB2YWwgKyBcInB4XCI7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbDtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZGl2KGNsYXNzTmFtZSkge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gIHJldHVybiBkaXY7XG59XG5cbnZhciBlbE1hdGNoZXMgPVxuICB0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgKEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHxcbiAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3Rvcik7XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudCwgcXVlcnkpIHtcbiAgaWYgKCFlbE1hdGNoZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgbWF0Y2hpbmcgbWV0aG9kIHN1cHBvcnRlZCcpO1xuICB9XG5cbiAgcmV0dXJuIGVsTWF0Y2hlcy5jYWxsKGVsZW1lbnQsIHF1ZXJ5KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQucmVtb3ZlKSB7XG4gICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbGVtZW50LmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIG1hdGNoZXMoY2hpbGQsIHNlbGVjdG9yKTsgfVxuICApO1xufVxuXG52YXIgY2xzID0ge1xuICBtYWluOiAncHMnLFxuICBlbGVtZW50OiB7XG4gICAgdGh1bWI6IGZ1bmN0aW9uICh4KSB7IHJldHVybiAoXCJwc19fdGh1bWItXCIgKyB4KTsgfSxcbiAgICByYWlsOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gKFwicHNfX3JhaWwtXCIgKyB4KTsgfSxcbiAgICBjb25zdW1pbmc6ICdwc19fY2hpbGQtLWNvbnN1bWUnLFxuICB9LFxuICBzdGF0ZToge1xuICAgIGZvY3VzOiAncHMtLWZvY3VzJyxcbiAgICBjbGlja2luZzogJ3BzLS1jbGlja2luZycsXG4gICAgYWN0aXZlOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gKFwicHMtLWFjdGl2ZS1cIiArIHgpOyB9LFxuICAgIHNjcm9sbGluZzogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzLS1zY3JvbGxpbmctXCIgKyB4KTsgfSxcbiAgfSxcbn07XG5cbi8qXG4gKiBIZWxwZXIgbWV0aG9kc1xuICovXG52YXIgc2Nyb2xsaW5nQ2xhc3NUaW1lb3V0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XG5cbmZ1bmN0aW9uIGFkZFNjcm9sbGluZ0NsYXNzKGksIHgpIHtcbiAgdmFyIGNsYXNzTGlzdCA9IGkuZWxlbWVudC5jbGFzc0xpc3Q7XG4gIHZhciBjbGFzc05hbWUgPSBjbHMuc3RhdGUuc2Nyb2xsaW5nKHgpO1xuXG4gIGlmIChjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgIGNsZWFyVGltZW91dChzY3JvbGxpbmdDbGFzc1RpbWVvdXRbeF0pO1xuICB9IGVsc2Uge1xuICAgIGNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVTY3JvbGxpbmdDbGFzcyhpLCB4KSB7XG4gIHNjcm9sbGluZ0NsYXNzVGltZW91dFt4XSA9IHNldFRpbWVvdXQoXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gaS5pc0FsaXZlICYmIGkuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5zY3JvbGxpbmcoeCkpOyB9LFxuICAgIGkuc2V0dGluZ3Muc2Nyb2xsaW5nVGhyZXNob2xkXG4gICk7XG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbGluZ0NsYXNzSW5zdGFudGx5KGksIHgpIHtcbiAgYWRkU2Nyb2xsaW5nQ2xhc3MoaSwgeCk7XG4gIHJlbW92ZVNjcm9sbGluZ0NsYXNzKGksIHgpO1xufVxuXG52YXIgRXZlbnRFbGVtZW50ID0gZnVuY3Rpb24gRXZlbnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgdGhpcy5oYW5kbGVycyA9IHt9O1xufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgaXNFbXB0eTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG5FdmVudEVsZW1lbnQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiBiaW5kIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gIH1cbiAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiB1bmJpbmQgKGV2ZW50TmFtZSwgdGFyZ2V0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID0gdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdLmZpbHRlcihmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgIGlmICh0YXJnZXQgJiYgaGFuZGxlciAhPT0gdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcyQxLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiB1bmJpbmRBbGwgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGZvciAodmFyIG5hbWUgaW4gdGhpcyQxLmhhbmRsZXJzKSB7XG4gICAgdGhpcyQxLnVuYmluZChuYW1lKTtcbiAgfVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLmlzRW1wdHkuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmhhbmRsZXJzKS5ldmVyeShcbiAgICBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0aGlzJDEuaGFuZGxlcnNba2V5XS5sZW5ndGggPT09IDA7IH1cbiAgKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBFdmVudEVsZW1lbnQucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxudmFyIEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uIEV2ZW50TWFuYWdlcigpIHtcbiAgdGhpcy5ldmVudEVsZW1lbnRzID0gW107XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIGV2ZW50RWxlbWVudCAoZWxlbWVudCkge1xuICB2YXIgZWUgPSB0aGlzLmV2ZW50RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlZSkgeyByZXR1cm4gZWUuZWxlbWVudCA9PT0gZWxlbWVudDsgfSlbMF07XG4gIGlmICghZWUpIHtcbiAgICBlZSA9IG5ldyBFdmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgdGhpcy5ldmVudEVsZW1lbnRzLnB1c2goZWUpO1xuICB9XG4gIHJldHVybiBlZTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIGJpbmQgKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KS5iaW5kKGV2ZW50TmFtZSwgaGFuZGxlcik7XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIHVuYmluZCAoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICBlZS51bmJpbmQoZXZlbnROYW1lLCBoYW5kbGVyKTtcblxuICBpZiAoZWUuaXNFbXB0eSkge1xuICAgIC8vIHJlbW92ZVxuICAgIHRoaXMuZXZlbnRFbGVtZW50cy5zcGxpY2UodGhpcy5ldmVudEVsZW1lbnRzLmluZGV4T2YoZWUpLCAxKTtcbiAgfVxufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiB1bmJpbmRBbGwgKCkge1xuICB0aGlzLmV2ZW50RWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS51bmJpbmRBbGwoKTsgfSk7XG4gIHRoaXMuZXZlbnRFbGVtZW50cyA9IFtdO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSAoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgb25jZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZWUudW5iaW5kKGV2ZW50TmFtZSwgb25jZUhhbmRsZXIpO1xuICAgIGhhbmRsZXIoZXZ0KTtcbiAgfTtcbiAgZWUuYmluZChldmVudE5hbWUsIG9uY2VIYW5kbGVyKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KG5hbWUpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG59XG5cbnZhciBwcm9jZXNzU2Nyb2xsRGlmZiA9IGZ1bmN0aW9uKFxuICBpLFxuICBheGlzLFxuICBkaWZmLFxuICB1c2VTY3JvbGxpbmdDbGFzcyxcbiAgZm9yY2VGaXJlUmVhY2hFdmVudFxuKSB7XG4gIGlmICggdXNlU2Nyb2xsaW5nQ2xhc3MgPT09IHZvaWQgMCApIHVzZVNjcm9sbGluZ0NsYXNzID0gdHJ1ZTtcbiAgaWYgKCBmb3JjZUZpcmVSZWFjaEV2ZW50ID09PSB2b2lkIDAgKSBmb3JjZUZpcmVSZWFjaEV2ZW50ID0gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcztcbiAgaWYgKGF4aXMgPT09ICd0b3AnKSB7XG4gICAgZmllbGRzID0gW1xuICAgICAgJ2NvbnRlbnRIZWlnaHQnLFxuICAgICAgJ2NvbnRhaW5lckhlaWdodCcsXG4gICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgICd5JyxcbiAgICAgICd1cCcsXG4gICAgICAnZG93bicgXTtcbiAgfSBlbHNlIGlmIChheGlzID09PSAnbGVmdCcpIHtcbiAgICBmaWVsZHMgPSBbXG4gICAgICAnY29udGVudFdpZHRoJyxcbiAgICAgICdjb250YWluZXJXaWR0aCcsXG4gICAgICAnc2Nyb2xsTGVmdCcsXG4gICAgICAneCcsXG4gICAgICAnbGVmdCcsXG4gICAgICAncmlnaHQnIF07XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIHByb3BlciBheGlzIHNob3VsZCBiZSBwcm92aWRlZCcpO1xuICB9XG5cbiAgcHJvY2Vzc1Njcm9sbERpZmYkMShpLCBkaWZmLCBmaWVsZHMsIHVzZVNjcm9sbGluZ0NsYXNzLCBmb3JjZUZpcmVSZWFjaEV2ZW50KTtcbn07XG5cbmZ1bmN0aW9uIHByb2Nlc3NTY3JvbGxEaWZmJDEoXG4gIGksXG4gIGRpZmYsXG4gIHJlZixcbiAgdXNlU2Nyb2xsaW5nQ2xhc3MsXG4gIGZvcmNlRmlyZVJlYWNoRXZlbnRcbikge1xuICB2YXIgY29udGVudEhlaWdodCA9IHJlZlswXTtcbiAgdmFyIGNvbnRhaW5lckhlaWdodCA9IHJlZlsxXTtcbiAgdmFyIHNjcm9sbFRvcCA9IHJlZlsyXTtcbiAgdmFyIHkgPSByZWZbM107XG4gIHZhciB1cCA9IHJlZls0XTtcbiAgdmFyIGRvd24gPSByZWZbNV07XG4gIGlmICggdXNlU2Nyb2xsaW5nQ2xhc3MgPT09IHZvaWQgMCApIHVzZVNjcm9sbGluZ0NsYXNzID0gdHJ1ZTtcbiAgaWYgKCBmb3JjZUZpcmVSZWFjaEV2ZW50ID09PSB2b2lkIDAgKSBmb3JjZUZpcmVSZWFjaEV2ZW50ID0gZmFsc2U7XG5cbiAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgLy8gcmVzZXQgcmVhY2hcbiAgaS5yZWFjaFt5XSA9IG51bGw7XG5cbiAgLy8gMSBmb3Igc3VicGl4ZWwgcm91bmRpbmdcbiAgaWYgKGVsZW1lbnRbc2Nyb2xsVG9wXSA8IDEpIHtcbiAgICBpLnJlYWNoW3ldID0gJ3N0YXJ0JztcbiAgfVxuXG4gIC8vIDEgZm9yIHN1YnBpeGVsIHJvdW5kaW5nXG4gIGlmIChlbGVtZW50W3Njcm9sbFRvcF0gPiBpW2NvbnRlbnRIZWlnaHRdIC0gaVtjb250YWluZXJIZWlnaHRdIC0gMSkge1xuICAgIGkucmVhY2hbeV0gPSAnZW5kJztcbiAgfVxuXG4gIGlmIChkaWZmKSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLXNjcm9sbC1cIiArIHkpKSk7XG5cbiAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1zY3JvbGwtXCIgKyB1cCkpKTtcbiAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoKFwicHMtc2Nyb2xsLVwiICsgZG93bikpKTtcbiAgICB9XG5cbiAgICBpZiAodXNlU2Nyb2xsaW5nQ2xhc3MpIHtcbiAgICAgIHNldFNjcm9sbGluZ0NsYXNzSW5zdGFudGx5KGksIHkpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpLnJlYWNoW3ldICYmIChkaWZmIHx8IGZvcmNlRmlyZVJlYWNoRXZlbnQpKSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLVwiICsgeSArIFwiLXJlYWNoLVwiICsgKGkucmVhY2hbeV0pKSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvSW50KHgpIHtcbiAgcmV0dXJuIHBhcnNlSW50KHgsIDEwKSB8fCAwO1xufVxuXG5mdW5jdGlvbiBpc0VkaXRhYmxlKGVsKSB7XG4gIHJldHVybiAoXG4gICAgbWF0Y2hlcyhlbCwgJ2lucHV0LFtjb250ZW50ZWRpdGFibGVdJykgfHxcbiAgICBtYXRjaGVzKGVsLCAnc2VsZWN0LFtjb250ZW50ZWRpdGFibGVdJykgfHxcbiAgICBtYXRjaGVzKGVsLCAndGV4dGFyZWEsW2NvbnRlbnRlZGl0YWJsZV0nKSB8fFxuICAgIG1hdGNoZXMoZWwsICdidXR0b24sW2NvbnRlbnRlZGl0YWJsZV0nKVxuICApO1xufVxuXG5mdW5jdGlvbiBvdXRlcldpZHRoKGVsZW1lbnQpIHtcbiAgdmFyIHN0eWxlcyA9IGdldChlbGVtZW50KTtcbiAgcmV0dXJuIChcbiAgICB0b0ludChzdHlsZXMud2lkdGgpICtcbiAgICB0b0ludChzdHlsZXMucGFkZGluZ0xlZnQpICtcbiAgICB0b0ludChzdHlsZXMucGFkZGluZ1JpZ2h0KSArXG4gICAgdG9JbnQoc3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgK1xuICAgIHRvSW50KHN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKVxuICApO1xufVxuXG52YXIgZW52ID0ge1xuICBpc1dlYktpdDpcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgJ1dlYmtpdEFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSxcbiAgc3VwcG9ydHNUb3VjaDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHxcbiAgICAgICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSksXG4gIHN1cHBvcnRzSWVQb2ludGVyOlxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzLFxuICBpc0Nocm9tZTpcbiAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC9DaHJvbWUvaS50ZXN0KG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50KSxcbn07XG5cbnZhciB1cGRhdGVHZW9tZXRyeSA9IGZ1bmN0aW9uKGkpIHtcbiAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG4gIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG5cbiAgaS5jb250YWluZXJXaWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIGkuY29udGFpbmVySGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIGkuY29udGVudFdpZHRoID0gZWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgaS5jb250ZW50SGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG5cbiAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKGkuc2Nyb2xsYmFyWFJhaWwpKSB7XG4gICAgLy8gY2xlYW4gdXAgYW5kIGFwcGVuZFxuICAgIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgY2xzLmVsZW1lbnQucmFpbCgneCcpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcmVtb3ZlKGVsKTsgfVxuICAgICk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChpLnNjcm9sbGJhclhSYWlsKTtcbiAgfVxuICBpZiAoIWVsZW1lbnQuY29udGFpbnMoaS5zY3JvbGxiYXJZUmFpbCkpIHtcbiAgICAvLyBjbGVhbiB1cCBhbmQgYXBwZW5kXG4gICAgcXVlcnlDaGlsZHJlbihlbGVtZW50LCBjbHMuZWxlbWVudC5yYWlsKCd5JykpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiByZW1vdmUoZWwpOyB9XG4gICAgKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGkuc2Nyb2xsYmFyWVJhaWwpO1xuICB9XG5cbiAgaWYgKFxuICAgICFpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWCAmJlxuICAgIGkuY29udGFpbmVyV2lkdGggKyBpLnNldHRpbmdzLnNjcm9sbFhNYXJnaW5PZmZzZXQgPCBpLmNvbnRlbnRXaWR0aFxuICApIHtcbiAgICBpLnNjcm9sbGJhclhBY3RpdmUgPSB0cnVlO1xuICAgIGkucmFpbFhXaWR0aCA9IGkuY29udGFpbmVyV2lkdGggLSBpLnJhaWxYTWFyZ2luV2lkdGg7XG4gICAgaS5yYWlsWFJhdGlvID0gaS5jb250YWluZXJXaWR0aCAvIGkucmFpbFhXaWR0aDtcbiAgICBpLnNjcm9sbGJhclhXaWR0aCA9IGdldFRodW1iU2l6ZShcbiAgICAgIGksXG4gICAgICB0b0ludChpLnJhaWxYV2lkdGggKiBpLmNvbnRhaW5lcldpZHRoIC8gaS5jb250ZW50V2lkdGgpXG4gICAgKTtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gdG9JbnQoXG4gICAgICAoaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQpICpcbiAgICAgICAgKGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSAvXG4gICAgICAgIChpLmNvbnRlbnRXaWR0aCAtIGkuY29udGFpbmVyV2lkdGgpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBpLnNjcm9sbGJhclhBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChcbiAgICAhaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFkgJiZcbiAgICBpLmNvbnRhaW5lckhlaWdodCArIGkuc2V0dGluZ3Muc2Nyb2xsWU1hcmdpbk9mZnNldCA8IGkuY29udGVudEhlaWdodFxuICApIHtcbiAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSB0cnVlO1xuICAgIGkucmFpbFlIZWlnaHQgPSBpLmNvbnRhaW5lckhlaWdodCAtIGkucmFpbFlNYXJnaW5IZWlnaHQ7XG4gICAgaS5yYWlsWVJhdGlvID0gaS5jb250YWluZXJIZWlnaHQgLyBpLnJhaWxZSGVpZ2h0O1xuICAgIGkuc2Nyb2xsYmFyWUhlaWdodCA9IGdldFRodW1iU2l6ZShcbiAgICAgIGksXG4gICAgICB0b0ludChpLnJhaWxZSGVpZ2h0ICogaS5jb250YWluZXJIZWlnaHQgLyBpLmNvbnRlbnRIZWlnaHQpXG4gICAgKTtcbiAgICBpLnNjcm9sbGJhcllUb3AgPSB0b0ludChcbiAgICAgIHJvdW5kZWRTY3JvbGxUb3AgKlxuICAgICAgICAoaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkgL1xuICAgICAgICAoaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpLnNjcm9sbGJhclhMZWZ0ID49IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSB7XG4gICAgaS5zY3JvbGxiYXJYTGVmdCA9IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllUb3AgPj0gaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkge1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDc3MoZWxlbWVudCwgaSk7XG5cbiAgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICAgIGkuc2Nyb2xsYmFyWFdpZHRoID0gMDtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gMDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSAwO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSAwO1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IDA7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRUaHVtYlNpemUoaSwgdGh1bWJTaXplKSB7XG4gIGlmIChpLnNldHRpbmdzLm1pblNjcm9sbGJhckxlbmd0aCkge1xuICAgIHRodW1iU2l6ZSA9IE1hdGgubWF4KHRodW1iU2l6ZSwgaS5zZXR0aW5ncy5taW5TY3JvbGxiYXJMZW5ndGgpO1xuICB9XG4gIGlmIChpLnNldHRpbmdzLm1heFNjcm9sbGJhckxlbmd0aCkge1xuICAgIHRodW1iU2l6ZSA9IE1hdGgubWluKHRodW1iU2l6ZSwgaS5zZXR0aW5ncy5tYXhTY3JvbGxiYXJMZW5ndGgpO1xuICB9XG4gIHJldHVybiB0aHVtYlNpemU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNzcyhlbGVtZW50LCBpKSB7XG4gIHZhciB4UmFpbE9mZnNldCA9IHsgd2lkdGg6IGkucmFpbFhXaWR0aCB9O1xuICB2YXIgcm91bmRlZFNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApO1xuXG4gIGlmIChpLmlzUnRsKSB7XG4gICAgeFJhaWxPZmZzZXQubGVmdCA9XG4gICAgICBpLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCArXG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgK1xuICAgICAgaS5jb250YWluZXJXaWR0aCAtXG4gICAgICBpLmNvbnRlbnRXaWR0aDtcbiAgfSBlbHNlIHtcbiAgICB4UmFpbE9mZnNldC5sZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICB9XG4gIGlmIChpLmlzU2Nyb2xsYmFyWFVzaW5nQm90dG9tKSB7XG4gICAgeFJhaWxPZmZzZXQuYm90dG9tID0gaS5zY3JvbGxiYXJYQm90dG9tIC0gcm91bmRlZFNjcm9sbFRvcDtcbiAgfSBlbHNlIHtcbiAgICB4UmFpbE9mZnNldC50b3AgPSBpLnNjcm9sbGJhclhUb3AgKyByb3VuZGVkU2Nyb2xsVG9wO1xuICB9XG4gIHNldChpLnNjcm9sbGJhclhSYWlsLCB4UmFpbE9mZnNldCk7XG5cbiAgdmFyIHlSYWlsT2Zmc2V0ID0geyB0b3A6IHJvdW5kZWRTY3JvbGxUb3AsIGhlaWdodDogaS5yYWlsWUhlaWdodCB9O1xuICBpZiAoaS5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0KSB7XG4gICAgaWYgKGkuaXNSdGwpIHtcbiAgICAgIHlSYWlsT2Zmc2V0LnJpZ2h0ID1cbiAgICAgICAgaS5jb250ZW50V2lkdGggLVxuICAgICAgICAoaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQpIC1cbiAgICAgICAgaS5zY3JvbGxiYXJZUmlnaHQgLVxuICAgICAgICBpLnNjcm9sbGJhcllPdXRlcldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5yaWdodCA9IGkuc2Nyb2xsYmFyWVJpZ2h0IC0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgeVJhaWxPZmZzZXQubGVmdCA9XG4gICAgICAgIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICtcbiAgICAgICAgaS5jb250YWluZXJXaWR0aCAqIDIgLVxuICAgICAgICBpLmNvbnRlbnRXaWR0aCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWUxlZnQgLVxuICAgICAgICBpLnNjcm9sbGJhcllPdXRlcldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5sZWZ0ID0gaS5zY3JvbGxiYXJZTGVmdCArIGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9XG4gIH1cbiAgc2V0KGkuc2Nyb2xsYmFyWVJhaWwsIHlSYWlsT2Zmc2V0KTtcblxuICBzZXQoaS5zY3JvbGxiYXJYLCB7XG4gICAgbGVmdDogaS5zY3JvbGxiYXJYTGVmdCxcbiAgICB3aWR0aDogaS5zY3JvbGxiYXJYV2lkdGggLSBpLnJhaWxCb3JkZXJYV2lkdGgsXG4gIH0pO1xuICBzZXQoaS5zY3JvbGxiYXJZLCB7XG4gICAgdG9wOiBpLnNjcm9sbGJhcllUb3AsXG4gICAgaGVpZ2h0OiBpLnNjcm9sbGJhcllIZWlnaHQgLSBpLnJhaWxCb3JkZXJZV2lkdGgsXG4gIH0pO1xufVxuXG52YXIgY2xpY2tSYWlsID0gZnVuY3Rpb24oaSkge1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uVG9wID1cbiAgICAgIGUucGFnZVkgLVxuICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IC1cbiAgICAgIGkuc2Nyb2xsYmFyWVJhaWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIHZhciBkaXJlY3Rpb24gPSBwb3NpdGlvblRvcCA+IGkuc2Nyb2xsYmFyWVRvcCA/IDEgOiAtMTtcblxuICAgIGkuZWxlbWVudC5zY3JvbGxUb3AgKz0gZGlyZWN0aW9uICogaS5jb250YWluZXJIZWlnaHQ7XG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uTGVmdCA9XG4gICAgICBlLnBhZ2VYIC1cbiAgICAgIHdpbmRvdy5wYWdlWE9mZnNldCAtXG4gICAgICBpLnNjcm9sbGJhclhSYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHBvc2l0aW9uTGVmdCA+IGkuc2Nyb2xsYmFyWExlZnQgPyAxIDogLTE7XG5cbiAgICBpLmVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lcldpZHRoO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59O1xuXG52YXIgZHJhZ1RodW1iID0gZnVuY3Rpb24oaSkge1xuICBiaW5kTW91c2VTY3JvbGxIYW5kbGVyKGksIFtcbiAgICAnY29udGFpbmVyV2lkdGgnLFxuICAgICdjb250ZW50V2lkdGgnLFxuICAgICdwYWdlWCcsXG4gICAgJ3JhaWxYV2lkdGgnLFxuICAgICdzY3JvbGxiYXJYJyxcbiAgICAnc2Nyb2xsYmFyWFdpZHRoJyxcbiAgICAnc2Nyb2xsTGVmdCcsXG4gICAgJ3gnLFxuICAgICdzY3JvbGxiYXJYUmFpbCcgXSk7XG4gIGJpbmRNb3VzZVNjcm9sbEhhbmRsZXIoaSwgW1xuICAgICdjb250YWluZXJIZWlnaHQnLFxuICAgICdjb250ZW50SGVpZ2h0JyxcbiAgICAncGFnZVknLFxuICAgICdyYWlsWUhlaWdodCcsXG4gICAgJ3Njcm9sbGJhclknLFxuICAgICdzY3JvbGxiYXJZSGVpZ2h0JyxcbiAgICAnc2Nyb2xsVG9wJyxcbiAgICAneScsXG4gICAgJ3Njcm9sbGJhcllSYWlsJyBdKTtcbn07XG5cbmZ1bmN0aW9uIGJpbmRNb3VzZVNjcm9sbEhhbmRsZXIoXG4gIGksXG4gIHJlZlxuKSB7XG4gIHZhciBjb250YWluZXJIZWlnaHQgPSByZWZbMF07XG4gIHZhciBjb250ZW50SGVpZ2h0ID0gcmVmWzFdO1xuICB2YXIgcGFnZVkgPSByZWZbMl07XG4gIHZhciByYWlsWUhlaWdodCA9IHJlZlszXTtcbiAgdmFyIHNjcm9sbGJhclkgPSByZWZbNF07XG4gIHZhciBzY3JvbGxiYXJZSGVpZ2h0ID0gcmVmWzVdO1xuICB2YXIgc2Nyb2xsVG9wID0gcmVmWzZdO1xuICB2YXIgeSA9IHJlZls3XTtcbiAgdmFyIHNjcm9sbGJhcllSYWlsID0gcmVmWzhdO1xuXG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIHZhciBzdGFydGluZ1Njcm9sbFRvcCA9IG51bGw7XG4gIHZhciBzdGFydGluZ01vdXNlUGFnZVkgPSBudWxsO1xuICB2YXIgc2Nyb2xsQnkgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZSkge1xuICAgIGVsZW1lbnRbc2Nyb2xsVG9wXSA9XG4gICAgICBzdGFydGluZ1Njcm9sbFRvcCArIHNjcm9sbEJ5ICogKGVbcGFnZVldIC0gc3RhcnRpbmdNb3VzZVBhZ2VZKTtcbiAgICBhZGRTY3JvbGxpbmdDbGFzcyhpLCB5KTtcbiAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VVcEhhbmRsZXIoKSB7XG4gICAgcmVtb3ZlU2Nyb2xsaW5nQ2xhc3MoaSwgeSk7XG4gICAgaVtzY3JvbGxiYXJZUmFpbF0uY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuY2xpY2tpbmcpO1xuICAgIGkuZXZlbnQudW5iaW5kKGkub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgaS5ldmVudC5iaW5kKGlbc2Nyb2xsYmFyWV0sICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIHN0YXJ0aW5nU2Nyb2xsVG9wID0gZWxlbWVudFtzY3JvbGxUb3BdO1xuICAgIHN0YXJ0aW5nTW91c2VQYWdlWSA9IGVbcGFnZVldO1xuICAgIHNjcm9sbEJ5ID1cbiAgICAgIChpW2NvbnRlbnRIZWlnaHRdIC0gaVtjb250YWluZXJIZWlnaHRdKSAvXG4gICAgICAoaVtyYWlsWUhlaWdodF0gLSBpW3Njcm9sbGJhcllIZWlnaHRdKTtcblxuICAgIGkuZXZlbnQuYmluZChpLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICBpLmV2ZW50Lm9uY2UoaS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcblxuICAgIGlbc2Nyb2xsYmFyWVJhaWxdLmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmNsaWNraW5nKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcbn1cblxudmFyIGtleWJvYXJkID0gZnVuY3Rpb24oaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICB2YXIgZWxlbWVudEhvdmVyZWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRjaGVzKGVsZW1lbnQsICc6aG92ZXInKTsgfTtcbiAgdmFyIHNjcm9sbGJhckZvY3VzZWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRjaGVzKGkuc2Nyb2xsYmFyWCwgJzpmb2N1cycpIHx8IG1hdGNoZXMoaS5zY3JvbGxiYXJZLCAnOmZvY3VzJyk7IH07XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgaWYgKGRlbHRhWCA9PT0gMCkge1xuICAgICAgaWYgKCFpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAoc2Nyb2xsVG9wID09PSAwICYmIGRlbHRhWSA+IDApIHx8XG4gICAgICAgIChzY3JvbGxUb3AgPj0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQgJiYgZGVsdGFZIDwgMClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICBpZiAoZGVsdGFZID09PSAwKSB7XG4gICAgICBpZiAoIWkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIChzY3JvbGxMZWZ0ID09PSAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgIChzY3JvbGxMZWZ0ID49IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCAmJiBkZWx0YVggPiAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGkuZXZlbnQuYmluZChpLm93bmVyRG9jdW1lbnQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoXG4gICAgICAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQgJiYgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgfHxcbiAgICAgIGUuZGVmYXVsdFByZXZlbnRlZFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZWxlbWVudEhvdmVyZWQoKSAmJiAhc2Nyb2xsYmFyRm9jdXNlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIDogaS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGlmIChhY3RpdmVFbGVtZW50LnRhZ05hbWUgPT09ICdJRlJBTUUnKSB7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZ28gZGVlcGVyIGlmIGVsZW1lbnQgaXMgYSB3ZWJjb21wb25lbnRcbiAgICAgICAgd2hpbGUgKGFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCkge1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LnNoYWRvd1Jvb3QuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzRWRpdGFibGUoYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWx0YVggPSAwO1xuICAgIHZhciBkZWx0YVkgPSAwO1xuXG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDM3OiAvLyBsZWZ0XG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSAtaS5jb250ZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSAtaS5jb250YWluZXJXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVggPSAtMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OiAvLyB1cFxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gaS5jb250ZW50SGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsdGFZID0gMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OiAvLyByaWdodFxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgZGVsdGFYID0gaS5jb250ZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSBpLmNvbnRhaW5lcldpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWCA9IDMwO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDogLy8gZG93blxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gLWkuY29udGVudEhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVkgPSAtMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMyOiAvLyBzcGFjZSBiYXJcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMzOiAvLyBwYWdlIHVwXG4gICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzQ6IC8vIHBhZ2UgZG93blxuICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNjogLy8gaG9tZVxuICAgICAgICBkZWx0YVkgPSBpLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNTogLy8gZW5kXG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWCAmJiBkZWx0YVggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxZICYmIGRlbHRhWSAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRlbHRhWTtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgaWYgKHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgd2hlZWwgPSBmdW5jdGlvbihpKSB7XG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHJvdW5kZWRTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICB2YXIgaXNUb3AgPSBlbGVtZW50LnNjcm9sbFRvcCA9PT0gMDtcbiAgICB2YXIgaXNCb3R0b20gPVxuICAgICAgcm91bmRlZFNjcm9sbFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID09PSBlbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICB2YXIgaXNMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0ID09PSAwO1xuICAgIHZhciBpc1JpZ2h0ID1cbiAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggPT09IGVsZW1lbnQuc2Nyb2xsV2lkdGg7XG5cbiAgICB2YXIgaGl0c0JvdW5kO1xuXG4gICAgLy8gcGljayBheGlzIHdpdGggcHJpbWFyeSBkaXJlY3Rpb25cbiAgICBpZiAoTWF0aC5hYnMoZGVsdGFZKSA+IE1hdGguYWJzKGRlbHRhWCkpIHtcbiAgICAgIGhpdHNCb3VuZCA9IGlzVG9wIHx8IGlzQm90dG9tO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaXRzQm91bmQgPSBpc0xlZnQgfHwgaXNSaWdodDtcbiAgICB9XG5cbiAgICByZXR1cm4gaGl0c0JvdW5kID8gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbiA6IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZWx0YUZyb21FdmVudChlKSB7XG4gICAgdmFyIGRlbHRhWCA9IGUuZGVsdGFYO1xuICAgIHZhciBkZWx0YVkgPSAtMSAqIGUuZGVsdGFZO1xuXG4gICAgaWYgKHR5cGVvZiBkZWx0YVggPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkZWx0YVkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBPUyBYIFNhZmFyaVxuICAgICAgZGVsdGFYID0gLTEgKiBlLndoZWVsRGVsdGFYIC8gNjtcbiAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVkgLyA2O1xuICAgIH1cblxuICAgIGlmIChlLmRlbHRhTW9kZSAmJiBlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgLy8gRmlyZWZveCBpbiBkZWx0YU1vZGUgMTogTGluZSBzY3JvbGxpbmdcbiAgICAgIGRlbHRhWCAqPSAxMDtcbiAgICAgIGRlbHRhWSAqPSAxMDtcbiAgICB9XG5cbiAgICBpZiAoZGVsdGFYICE9PSBkZWx0YVggJiYgZGVsdGFZICE9PSBkZWx0YVkgLyogTmFOIGNoZWNrcyAqLykge1xuICAgICAgLy8gSUUgaW4gc29tZSBtb3VzZSBkcml2ZXJzXG4gICAgICBkZWx0YVggPSAwO1xuICAgICAgZGVsdGFZID0gZS53aGVlbERlbHRhO1xuICAgIH1cblxuICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAvLyByZXZlcnNlIGF4aXMgd2l0aCBzaGlmdCBrZXlcbiAgICAgIHJldHVybiBbLWRlbHRhWSwgLWRlbHRhWF07XG4gICAgfVxuICAgIHJldHVybiBbZGVsdGFYLCBkZWx0YVldO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQodGFyZ2V0LCBkZWx0YVgsIGRlbHRhWSkge1xuICAgIC8vIEZJWE1FOiB0aGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgPHNlbGVjdD4gaXNzdWUgaW4gRkYgYW5kIElFICM1NzFcbiAgICBpZiAoIWVudi5pc1dlYktpdCAmJiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdDpmb2N1cycpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjdXJzb3IgPSB0YXJnZXQ7XG5cbiAgICB3aGlsZSAoY3Vyc29yICYmIGN1cnNvciAhPT0gZWxlbWVudCkge1xuICAgICAgaWYgKGN1cnNvci5jbGFzc0xpc3QuY29udGFpbnMoY2xzLmVsZW1lbnQuY29uc3VtaW5nKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0eWxlID0gZ2V0KGN1cnNvcik7XG4gICAgICB2YXIgb3ZlcmZsb3cgPSBbc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZXS5qb2luKFxuICAgICAgICAnJ1xuICAgICAgKTtcblxuICAgICAgLy8gaWYgc2Nyb2xsYWJsZVxuICAgICAgaWYgKG92ZXJmbG93Lm1hdGNoKC8oc2Nyb2xsfGF1dG8pLykpIHtcbiAgICAgICAgdmFyIG1heFNjcm9sbFRvcCA9IGN1cnNvci5zY3JvbGxIZWlnaHQgLSBjdXJzb3IuY2xpZW50SGVpZ2h0O1xuICAgICAgICBpZiAobWF4U2Nyb2xsVG9wID4gMCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICEoY3Vyc29yLnNjcm9sbFRvcCA9PT0gMCAmJiBkZWx0YVkgPiAwKSAmJlxuICAgICAgICAgICAgIShjdXJzb3Iuc2Nyb2xsVG9wID09PSBtYXhTY3JvbGxUb3AgJiYgZGVsdGFZIDwgMClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF4U2Nyb2xsTGVmdCA9IGN1cnNvci5zY3JvbGxXaWR0aCAtIGN1cnNvci5jbGllbnRXaWR0aDtcbiAgICAgICAgaWYgKG1heFNjcm9sbExlZnQgPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIShjdXJzb3Iuc2Nyb2xsTGVmdCA9PT0gMCAmJiBkZWx0YVggPCAwKSAmJlxuICAgICAgICAgICAgIShjdXJzb3Iuc2Nyb2xsTGVmdCA9PT0gbWF4U2Nyb2xsTGVmdCAmJiBkZWx0YVggPiAwKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA9IGN1cnNvci5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNld2hlZWxIYW5kbGVyKGUpIHtcbiAgICB2YXIgcmVmID0gZ2V0RGVsdGFGcm9tRXZlbnQoZSk7XG4gICAgdmFyIGRlbHRhWCA9IHJlZlswXTtcbiAgICB2YXIgZGVsdGFZID0gcmVmWzFdO1xuXG4gICAgaWYgKHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKGUudGFyZ2V0LCBkZWx0YVgsIGRlbHRhWSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2hvdWxkUHJldmVudCA9IGZhbHNlO1xuICAgIGlmICghaS5zZXR0aW5ncy51c2VCb3RoV2hlZWxBeGVzKSB7XG4gICAgICAvLyBkZWx0YVggd2lsbCBvbmx5IGJlIHVzZWQgZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGFuZCBkZWx0YVkgd2lsbFxuICAgICAgLy8gb25seSBiZSB1c2VkIGZvciB2ZXJ0aWNhbCBzY3JvbGxpbmcgLSB0aGlzIGlzIHRoZSBkZWZhdWx0XG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCAtPSBkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgIH0gZWxzZSBpZiAoaS5zY3JvbGxiYXJZQWN0aXZlICYmICFpLnNjcm9sbGJhclhBY3RpdmUpIHtcbiAgICAgIC8vIG9ubHkgdmVydGljYWwgc2Nyb2xsYmFyIGlzIGFjdGl2ZSBhbmQgdXNlQm90aFdoZWVsQXhlcyBvcHRpb24gaXNcbiAgICAgIC8vIGFjdGl2ZSwgc28gbGV0J3Mgc2Nyb2xsIHZlcnRpY2FsIGJhciB1c2luZyBib3RoIG1vdXNlIHdoZWVsIGF4ZXNcbiAgICAgIGlmIChkZWx0YVkpIHtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgKz0gZGVsdGFYICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgfVxuICAgICAgc2hvdWxkUHJldmVudCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpLnNjcm9sbGJhclhBY3RpdmUgJiYgIWkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgICAgLy8gdXNlQm90aFdoZWVsQXhlcyBhbmQgb25seSBob3Jpem9udGFsIGJhciBpcyBhY3RpdmUsIHNvIHVzZSBib3RoXG4gICAgICAvLyB3aGVlbCBheGVzIGZvciBob3Jpem9udGFsIGJhclxuICAgICAgaWYgKGRlbHRhWCkge1xuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0IC09IGRlbHRhWSAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH1cbiAgICAgIHNob3VsZFByZXZlbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgc2hvdWxkUHJldmVudCA9IHNob3VsZFByZXZlbnQgfHwgc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpO1xuICAgIGlmIChzaG91bGRQcmV2ZW50ICYmICFlLmN0cmxLZXkpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cub253aGVlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3doZWVsJywgbW91c2V3aGVlbEhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cub25tb3VzZXdoZWVsICE9PSAndW5kZWZpbmVkJykge1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnbW91c2V3aGVlbCcsIG1vdXNld2hlZWxIYW5kbGVyKTtcbiAgfVxufTtcblxudmFyIHRvdWNoID0gZnVuY3Rpb24oaSkge1xuICBpZiAoIWVudi5zdXBwb3J0c1RvdWNoICYmICFlbnYuc3VwcG9ydHNJZVBvaW50ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIHZhciBtYWduaXR1ZGVYID0gTWF0aC5hYnMoZGVsdGFYKTtcbiAgICB2YXIgbWFnbml0dWRlWSA9IE1hdGguYWJzKGRlbHRhWSk7XG5cbiAgICBpZiAobWFnbml0dWRlWSA+IG1hZ25pdHVkZVgpIHtcbiAgICAgIC8vIHVzZXIgaXMgcGVyaGFwcyB0cnlpbmcgdG8gc3dpcGUgdXAvZG93biB0aGUgcGFnZVxuXG4gICAgICBpZiAoXG4gICAgICAgIChkZWx0YVkgPCAwICYmIHNjcm9sbFRvcCA9PT0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpIHx8XG4gICAgICAgIChkZWx0YVkgPiAwICYmIHNjcm9sbFRvcCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICAvLyBzZXQgcHJldmVudCBmb3IgbW9iaWxlIENocm9tZSByZWZyZXNoXG4gICAgICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSA9PT0gMCAmJiBkZWx0YVkgPiAwICYmIGVudi5pc0Nocm9tZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hZ25pdHVkZVggPiBtYWduaXR1ZGVZKSB7XG4gICAgICAvLyB1c2VyIGlzIHBlcmhhcHMgdHJ5aW5nIHRvIHN3aXBlIGxlZnQvcmlnaHQgYWNyb3NzIHRoZSBwYWdlXG5cbiAgICAgIGlmIChcbiAgICAgICAgKGRlbHRhWCA8IDAgJiYgc2Nyb2xsTGVmdCA9PT0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKSB8fFxuICAgICAgICAoZGVsdGFYID4gMCAmJiBzY3JvbGxMZWZ0ID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKSB7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGlmZmVyZW5jZVk7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0IC09IGRpZmZlcmVuY2VYO1xuXG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG4gIH1cblxuICB2YXIgc3RhcnRPZmZzZXQgPSB7fTtcbiAgdmFyIHN0YXJ0VGltZSA9IDA7XG4gIHZhciBzcGVlZCA9IHt9O1xuICB2YXIgZWFzaW5nTG9vcCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gZ2V0VG91Y2goZSkge1xuICAgIGlmIChlLnRhcmdldFRvdWNoZXMpIHtcbiAgICAgIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1heWJlIElFIHBvaW50ZXJcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEhhbmRsZShlKSB7XG4gICAgaWYgKGUucG9pbnRlclR5cGUgJiYgZS5wb2ludGVyVHlwZSA9PT0gJ3BlbicgJiYgZS5idXR0b25zID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGUucG9pbnRlclR5cGUgJiZcbiAgICAgIGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiZcbiAgICAgIGUucG9pbnRlclR5cGUgIT09IGUuTVNQT0lOVEVSX1RZUEVfTU9VU0VcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0b3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAoIXNob3VsZEhhbmRsZShlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0b3VjaCA9IGdldFRvdWNoKGUpO1xuXG4gICAgc3RhcnRPZmZzZXQucGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICBzdGFydE9mZnNldC5wYWdlWSA9IHRvdWNoLnBhZ2VZO1xuXG4gICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICBpZiAoZWFzaW5nTG9vcCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRCZUNvbnN1bWVkQnlDaGlsZCh0YXJnZXQsIGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY3Vyc29yID0gdGFyZ2V0O1xuXG4gICAgd2hpbGUgKGN1cnNvciAmJiBjdXJzb3IgIT09IGVsZW1lbnQpIHtcbiAgICAgIGlmIChjdXJzb3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNscy5lbGVtZW50LmNvbnN1bWluZykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldChjdXJzb3IpO1xuICAgICAgdmFyIG92ZXJmbG93ID0gW3N0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1gsIHN0eWxlLm92ZXJmbG93WV0uam9pbihcbiAgICAgICAgJydcbiAgICAgICk7XG5cbiAgICAgIC8vIGlmIHNjcm9sbGFibGVcbiAgICAgIGlmIChvdmVyZmxvdy5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgIHZhciBtYXhTY3JvbGxUb3AgPSBjdXJzb3Iuc2Nyb2xsSGVpZ2h0IC0gY3Vyc29yLmNsaWVudEhlaWdodDtcbiAgICAgICAgaWYgKG1heFNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhKGN1cnNvci5zY3JvbGxUb3AgPT09IDAgJiYgZGVsdGFZID4gMCkgJiZcbiAgICAgICAgICAgICEoY3Vyc29yLnNjcm9sbFRvcCA9PT0gbWF4U2Nyb2xsVG9wICYmIGRlbHRhWSA8IDApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heFNjcm9sbExlZnQgPSBjdXJzb3Iuc2Nyb2xsTGVmdCAtIGN1cnNvci5jbGllbnRXaWR0aDtcbiAgICAgICAgaWYgKG1heFNjcm9sbExlZnQgPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIShjdXJzb3Iuc2Nyb2xsTGVmdCA9PT0gMCAmJiBkZWx0YVggPCAwKSAmJlxuICAgICAgICAgICAgIShjdXJzb3Iuc2Nyb2xsTGVmdCA9PT0gbWF4U2Nyb2xsTGVmdCAmJiBkZWx0YVggPiAwKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA9IGN1cnNvci5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdWNoTW92ZShlKSB7XG4gICAgaWYgKHNob3VsZEhhbmRsZShlKSkge1xuICAgICAgdmFyIHRvdWNoID0gZ2V0VG91Y2goZSk7XG5cbiAgICAgIHZhciBjdXJyZW50T2Zmc2V0ID0geyBwYWdlWDogdG91Y2gucGFnZVgsIHBhZ2VZOiB0b3VjaC5wYWdlWSB9O1xuXG4gICAgICB2YXIgZGlmZmVyZW5jZVggPSBjdXJyZW50T2Zmc2V0LnBhZ2VYIC0gc3RhcnRPZmZzZXQucGFnZVg7XG4gICAgICB2YXIgZGlmZmVyZW5jZVkgPSBjdXJyZW50T2Zmc2V0LnBhZ2VZIC0gc3RhcnRPZmZzZXQucGFnZVk7XG5cbiAgICAgIGlmIChzaG91bGRCZUNvbnN1bWVkQnlDaGlsZChlLnRhcmdldCwgZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwcGx5VG91Y2hNb3ZlKGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSk7XG4gICAgICBzdGFydE9mZnNldCA9IGN1cnJlbnRPZmZzZXQ7XG5cbiAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICB2YXIgdGltZUdhcCA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICAgICAgaWYgKHRpbWVHYXAgPiAwKSB7XG4gICAgICAgIHNwZWVkLnggPSBkaWZmZXJlbmNlWCAvIHRpbWVHYXA7XG4gICAgICAgIHNwZWVkLnkgPSBkaWZmZXJlbmNlWSAvIHRpbWVHYXA7XG4gICAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hvdWxkUHJldmVudChkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgaWYgKGkuc2V0dGluZ3Muc3dpcGVFYXNpbmcpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICBlYXNpbmdMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3BlZWQueCAmJiAhc3BlZWQueSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKHNwZWVkLngpIDwgMC4wMSAmJiBNYXRoLmFicyhzcGVlZC55KSA8IDAuMDEpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG91Y2hNb3ZlKHNwZWVkLnggKiAzMCwgc3BlZWQueSAqIDMwKTtcblxuICAgICAgICBzcGVlZC54ICo9IDAuODtcbiAgICAgICAgc3BlZWQueSAqPSAwLjg7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVudi5zdXBwb3J0c1RvdWNoKSB7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydCk7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2hlbmQnLCB0b3VjaEVuZCk7XG4gIH0gZWxzZSBpZiAoZW52LnN1cHBvcnRzSWVQb2ludGVyKSB7XG4gICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcmRvd24nLCB0b3VjaFN0YXJ0KTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcm1vdmUnLCB0b3VjaE1vdmUpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVydXAnLCB0b3VjaEVuZCk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnTVNQb2ludGVyRG93bicsIHRvdWNoU3RhcnQpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJNb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnTVNQb2ludGVyVXAnLCB0b3VjaEVuZCk7XG4gICAgfVxuICB9XG59O1xuXG52YXIgZGVmYXVsdFNldHRpbmdzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgaGFuZGxlcnM6IFsnY2xpY2stcmFpbCcsICdkcmFnLXRodW1iJywgJ2tleWJvYXJkJywgJ3doZWVsJywgJ3RvdWNoJ10sXG4gIG1heFNjcm9sbGJhckxlbmd0aDogbnVsbCxcbiAgbWluU2Nyb2xsYmFyTGVuZ3RoOiBudWxsLFxuICBzY3JvbGxpbmdUaHJlc2hvbGQ6IDEwMDAsXG4gIHNjcm9sbFhNYXJnaW5PZmZzZXQ6IDAsXG4gIHNjcm9sbFlNYXJnaW5PZmZzZXQ6IDAsXG4gIHN1cHByZXNzU2Nyb2xsWDogZmFsc2UsXG4gIHN1cHByZXNzU2Nyb2xsWTogZmFsc2UsXG4gIHN3aXBlRWFzaW5nOiB0cnVlLFxuICB1c2VCb3RoV2hlZWxBeGVzOiBmYWxzZSxcbiAgd2hlZWxQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgd2hlZWxTcGVlZDogMSxcbn0pOyB9O1xuXG52YXIgaGFuZGxlcnMgPSB7XG4gICdjbGljay1yYWlsJzogY2xpY2tSYWlsLFxuICAnZHJhZy10aHVtYic6IGRyYWdUaHVtYixcbiAga2V5Ym9hcmQ6IGtleWJvYXJkLFxuICB3aGVlbDogd2hlZWwsXG4gIHRvdWNoOiB0b3VjaCxcbn07XG5cbnZhciBQZXJmZWN0U2Nyb2xsYmFyID0gZnVuY3Rpb24gUGVyZmVjdFNjcm9sbGJhcihlbGVtZW50LCB1c2VyU2V0dGluZ3MpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gIGlmICggdXNlclNldHRpbmdzID09PSB2b2lkIDAgKSB1c2VyU2V0dGluZ3MgPSB7fTtcblxuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gIH1cblxuICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgaXMgc3BlY2lmaWVkIHRvIGluaXRpYWxpemUgUGVyZmVjdFNjcm9sbGJhcicpO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLm1haW4pO1xuXG4gIHRoaXMuc2V0dGluZ3MgPSBkZWZhdWx0U2V0dGluZ3MoKTtcbiAgZm9yICh2YXIga2V5IGluIHVzZXJTZXR0aW5ncykge1xuICAgIHRoaXMkMS5zZXR0aW5nc1trZXldID0gdXNlclNldHRpbmdzW2tleV07XG4gIH1cblxuICB0aGlzLmNvbnRhaW5lcldpZHRoID0gbnVsbDtcbiAgdGhpcy5jb250YWluZXJIZWlnaHQgPSBudWxsO1xuICB0aGlzLmNvbnRlbnRXaWR0aCA9IG51bGw7XG4gIHRoaXMuY29udGVudEhlaWdodCA9IG51bGw7XG5cbiAgdmFyIGZvY3VzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5mb2N1cyk7IH07XG4gIHZhciBibHVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5mb2N1cyk7IH07XG5cbiAgdGhpcy5pc1J0bCA9IGdldChlbGVtZW50KS5kaXJlY3Rpb24gPT09ICdydGwnO1xuICB0aGlzLmlzTmVnYXRpdmVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcmlnaW5hbFNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gLTE7XG4gICAgcmVzdWx0ID0gZWxlbWVudC5zY3JvbGxMZWZ0IDwgMDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSBvcmlnaW5hbFNjcm9sbExlZnQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSkoKTtcbiAgdGhpcy5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgPSB0aGlzLmlzTmVnYXRpdmVTY3JvbGxcbiAgICA/IGVsZW1lbnQuc2Nyb2xsV2lkdGggLSBlbGVtZW50LmNsaWVudFdpZHRoXG4gICAgOiAwO1xuICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICB0aGlzLm93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgdGhpcy5zY3JvbGxiYXJYUmFpbCA9IGRpdihjbHMuZWxlbWVudC5yYWlsKCd4JykpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsYmFyWFJhaWwpO1xuICB0aGlzLnNjcm9sbGJhclggPSBkaXYoY2xzLmVsZW1lbnQudGh1bWIoJ3gnKSk7XG4gIHRoaXMuc2Nyb2xsYmFyWFJhaWwuYXBwZW5kQ2hpbGQodGhpcy5zY3JvbGxiYXJYKTtcbiAgdGhpcy5zY3JvbGxiYXJYLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWCwgJ2ZvY3VzJywgZm9jdXMpO1xuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5zY3JvbGxiYXJYLCAnYmx1cicsIGJsdXIpO1xuICB0aGlzLnNjcm9sbGJhclhBY3RpdmUgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhclhXaWR0aCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWExlZnQgPSBudWxsO1xuICB2YXIgcmFpbFhTdHlsZSA9IGdldCh0aGlzLnNjcm9sbGJhclhSYWlsKTtcbiAgdGhpcy5zY3JvbGxiYXJYQm90dG9tID0gcGFyc2VJbnQocmFpbFhTdHlsZS5ib3R0b20sIDEwKTtcbiAgaWYgKGlzTmFOKHRoaXMuc2Nyb2xsYmFyWEJvdHRvbSkpIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWFVzaW5nQm90dG9tID0gZmFsc2U7XG4gICAgdGhpcy5zY3JvbGxiYXJYVG9wID0gdG9JbnQocmFpbFhTdHlsZS50b3ApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20gPSB0cnVlO1xuICB9XG4gIHRoaXMucmFpbEJvcmRlclhXaWR0aCA9XG4gICAgdG9JbnQocmFpbFhTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpICsgdG9JbnQocmFpbFhTdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcbiAgLy8gU2V0IHJhaWwgdG8gZGlzcGxheTpibG9jayB0byBjYWxjdWxhdGUgbWFyZ2luc1xuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICB0aGlzLnJhaWxYTWFyZ2luV2lkdGggPVxuICAgIHRvSW50KHJhaWxYU3R5bGUubWFyZ2luTGVmdCkgKyB0b0ludChyYWlsWFN0eWxlLm1hcmdpblJpZ2h0KTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gIHRoaXMucmFpbFhXaWR0aCA9IG51bGw7XG4gIHRoaXMucmFpbFhSYXRpbyA9IG51bGw7XG5cbiAgdGhpcy5zY3JvbGxiYXJZUmFpbCA9IGRpdihjbHMuZWxlbWVudC5yYWlsKCd5JykpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsYmFyWVJhaWwpO1xuICB0aGlzLnNjcm9sbGJhclkgPSBkaXYoY2xzLmVsZW1lbnQudGh1bWIoJ3knKSk7XG4gIHRoaXMuc2Nyb2xsYmFyWVJhaWwuYXBwZW5kQ2hpbGQodGhpcy5zY3JvbGxiYXJZKTtcbiAgdGhpcy5zY3JvbGxiYXJZLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWSwgJ2ZvY3VzJywgZm9jdXMpO1xuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5zY3JvbGxiYXJZLCAnYmx1cicsIGJsdXIpO1xuICB0aGlzLnNjcm9sbGJhcllBY3RpdmUgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhcllIZWlnaHQgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhcllUb3AgPSBudWxsO1xuICB2YXIgcmFpbFlTdHlsZSA9IGdldCh0aGlzLnNjcm9sbGJhcllSYWlsKTtcbiAgdGhpcy5zY3JvbGxiYXJZUmlnaHQgPSBwYXJzZUludChyYWlsWVN0eWxlLnJpZ2h0LCAxMCk7XG4gIGlmIChpc05hTih0aGlzLnNjcm9sbGJhcllSaWdodCkpIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQgPSBmYWxzZTtcbiAgICB0aGlzLnNjcm9sbGJhcllMZWZ0ID0gdG9JbnQocmFpbFlTdHlsZS5sZWZ0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQgPSB0cnVlO1xuICB9XG4gIHRoaXMuc2Nyb2xsYmFyWU91dGVyV2lkdGggPSB0aGlzLmlzUnRsID8gb3V0ZXJXaWR0aCh0aGlzLnNjcm9sbGJhclkpIDogbnVsbDtcbiAgdGhpcy5yYWlsQm9yZGVyWVdpZHRoID1cbiAgICB0b0ludChyYWlsWVN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHRvSW50KHJhaWxZU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuICBzZXQodGhpcy5zY3JvbGxiYXJZUmFpbCwgeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICB0aGlzLnJhaWxZTWFyZ2luSGVpZ2h0ID1cbiAgICB0b0ludChyYWlsWVN0eWxlLm1hcmdpblRvcCkgKyB0b0ludChyYWlsWVN0eWxlLm1hcmdpbkJvdHRvbSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICcnIH0pO1xuICB0aGlzLnJhaWxZSGVpZ2h0ID0gbnVsbDtcbiAgdGhpcy5yYWlsWVJhdGlvID0gbnVsbDtcblxuICB0aGlzLnJlYWNoID0ge1xuICAgIHg6XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgPD0gMFxuICAgICAgICA/ICdzdGFydCdcbiAgICAgICAgOiBlbGVtZW50LnNjcm9sbExlZnQgPj0gdGhpcy5jb250ZW50V2lkdGggLSB0aGlzLmNvbnRhaW5lcldpZHRoXG4gICAgICAgICAgPyAnZW5kJ1xuICAgICAgICAgIDogbnVsbCxcbiAgICB5OlxuICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPD0gMFxuICAgICAgICA/ICdzdGFydCdcbiAgICAgICAgOiBlbGVtZW50LnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRIZWlnaHQgLSB0aGlzLmNvbnRhaW5lckhlaWdodFxuICAgICAgICAgID8gJ2VuZCdcbiAgICAgICAgICA6IG51bGwsXG4gIH07XG5cbiAgdGhpcy5pc0FsaXZlID0gdHJ1ZTtcblxuICB0aGlzLnNldHRpbmdzLmhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXJOYW1lKSB7IHJldHVybiBoYW5kbGVyc1toYW5kbGVyTmFtZV0odGhpcyQxKTsgfSk7XG5cbiAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7IC8vIGZvciBvblNjcm9sbCBvbmx5XG4gIHRoaXMubGFzdFNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7IC8vIGZvciBvblNjcm9sbCBvbmx5XG4gIHRoaXMuZXZlbnQuYmluZCh0aGlzLmVsZW1lbnQsICdzY3JvbGwnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gdGhpcyQxLm9uU2Nyb2xsKGUpOyB9KTtcbiAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG59O1xuXG5QZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICBpZiAoIXRoaXMuaXNBbGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFJlY2FsY3VhdGUgbmVnYXRpdmUgc2Nyb2xsTGVmdCBhZGp1c3RtZW50XG4gIHRoaXMubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ID0gdGhpcy5pc05lZ2F0aXZlU2Nyb2xsXG4gICAgPyB0aGlzLmVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICA6IDA7XG5cbiAgLy8gUmVjYWxjdWxhdGUgcmFpbCBtYXJnaW5zXG4gIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gIHRoaXMucmFpbFhNYXJnaW5XaWR0aCA9XG4gICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwpLm1hcmdpbkxlZnQpICtcbiAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJYUmFpbCkubWFyZ2luUmlnaHQpO1xuICB0aGlzLnJhaWxZTWFyZ2luSGVpZ2h0ID1cbiAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCkubWFyZ2luVG9wKSArXG4gICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwpLm1hcmdpbkJvdHRvbSk7XG5cbiAgLy8gSGlkZSBzY3JvbGxiYXJzIG5vdCB0byBhZmZlY3Qgc2Nyb2xsV2lkdGggYW5kIHNjcm9sbEhlaWdodFxuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICdub25lJyB9KTtcblxuICB1cGRhdGVHZW9tZXRyeSh0aGlzKTtcblxuICBwcm9jZXNzU2Nyb2xsRGlmZih0aGlzLCAndG9wJywgMCwgZmFsc2UsIHRydWUpO1xuICBwcm9jZXNzU2Nyb2xsRGlmZih0aGlzLCAnbGVmdCcsIDAsIGZhbHNlLCB0cnVlKTtcblxuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnJyB9KTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJycgfSk7XG59O1xuXG5QZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS5vblNjcm9sbCA9IGZ1bmN0aW9uIG9uU2Nyb2xsIChlKSB7XG4gIGlmICghdGhpcy5pc0FsaXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG4gIHByb2Nlc3NTY3JvbGxEaWZmKHRoaXMsICd0b3AnLCB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wIC0gdGhpcy5sYXN0U2Nyb2xsVG9wKTtcbiAgcHJvY2Vzc1Njcm9sbERpZmYoXG4gICAgdGhpcyxcbiAgICAnbGVmdCcsXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbExlZnQgLSB0aGlzLmxhc3RTY3JvbGxMZWZ0XG4gICk7XG5cbiAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gTWF0aC5mbG9vcih0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgdGhpcy5sYXN0U2Nyb2xsTGVmdCA9IHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0O1xufTtcblxuUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICBpZiAoIXRoaXMuaXNBbGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZXZlbnQudW5iaW5kQWxsKCk7XG4gIHJlbW92ZSh0aGlzLnNjcm9sbGJhclgpO1xuICByZW1vdmUodGhpcy5zY3JvbGxiYXJZKTtcbiAgcmVtb3ZlKHRoaXMuc2Nyb2xsYmFyWFJhaWwpO1xuICByZW1vdmUodGhpcy5zY3JvbGxiYXJZUmFpbCk7XG4gIHRoaXMucmVtb3ZlUHNDbGFzc2VzKCk7XG5cbiAgLy8gdW5zZXQgZWxlbWVudHNcbiAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJYID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJZID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJYUmFpbCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWVJhaWwgPSBudWxsO1xuXG4gIHRoaXMuaXNBbGl2ZSA9IGZhbHNlO1xufTtcblxuUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUucmVtb3ZlUHNDbGFzc2VzID0gZnVuY3Rpb24gcmVtb3ZlUHNDbGFzc2VzICgpIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuZWxlbWVudC5jbGFzc05hbWVcbiAgICAuc3BsaXQoJyAnKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICFuYW1lLm1hdGNoKC9ecHMoWy1fXS4rfCkkLyk7IH0pXG4gICAgLmpvaW4oJyAnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBlcmZlY3RTY3JvbGxiYXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9kaXN0L3BlcmZlY3Qtc2Nyb2xsYmFyLmVzbS5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vRXhhbXBsZS52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTY1MGYyZWZhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vRXhhbXBsZS52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0V4YW1wbGUudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTY1MGYyZWZhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjUwZjJlZmFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9FeGFtcGxlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04IGNvbC1tZC1vZmZzZXQtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+RXhhbXBsZSBDb21wb25lbnQ8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgSSdtIGFuIGV4YW1wbGUgY29tcG9uZW50IVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvbXBvbmVudCBtb3VudGVkLicpXG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRXhhbXBsZS52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF92bS5fbSgwKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXJcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJwYW5lbC1oZWFkaW5nXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJFeGFtcGxlIENvbXBvbmVudFwiKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJwYW5lbC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIEknbSBhbiBleGFtcGxlIGNvbXBvbmVudCFcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi02NTBmMmVmYVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNjUwZjJlZmFcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvRXhhbXBsZS52dWVcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0NhcmQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTBkZDg3MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0NhcmQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0yZTBkZDg3MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTJlMGRkODcyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHt9XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbX3ZtLl90KFwiZGVmYXVsdFwiKV0sIDIpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTJlMGRkODcyXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yZTBkZDg3MlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQ2FyZEhlYWRlci52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTE2YjllNGI0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQ2FyZEhlYWRlci52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRIZWFkZXIudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTE2YjllNGI0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMTZiOWU0YjRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkSGVhZGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHt9XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRIZWFkZXIudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW192bS5fdChcImRlZmF1bHRcIildLCAyKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0xNmI5ZTRiNFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMTZiOWU0YjRcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FyZEhlYWRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0NhcmRCb2R5LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmFhNWUxMDlcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DYXJkQm9keS52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRCb2R5LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02YWE1ZTEwOVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTZhYTVlMTA5XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvQ2FyZEJvZHkudnVlXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJjYXJkLXRpdGxlXCI+e3sgdGl0bGUgfX08L2gzPlxuICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPnt7IHRleHQgfX08L3A+XG4gICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczogWyd0aXRsZScsICd0ZXh0J11cbiAgICB9XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRCb2R5LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sXG4gICAgW1xuICAgICAgX2MoXCJoM1wiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtdGl0bGVcIiB9LCBbX3ZtLl92KF92bS5fcyhfdm0udGl0bGUpKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtdGV4dFwiIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS50ZXh0KSldKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX3QoXCJkZWZhdWx0XCIpXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNmFhNWUxMDlcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTZhYTVlMTA5XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL0NhcmRCb2R5LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQ2FyZEdyb3VwLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDlhMjc1YThcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9DYXJkR3JvdXAudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkR3JvdXAudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTQ5YTI3NWE4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNDlhMjc1YThcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkR3JvdXAudnVlXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtZ3JvdXBcIj5cbiAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7fVxuPC9zY3JpcHQ+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkR3JvdXAudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZ3JvdXBcIiB9LCBbX3ZtLl90KFwiZGVmYXVsdFwiKV0sIDIpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTQ5YTI3NWE4XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00OWEyNzVhOFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9DYXJkR3JvdXAudnVlXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9XaXphcmQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0zNGZmZjQ2OFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1dpemFyZC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9XaXphcmQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTM0ZmZmNDY4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMzRmZmY0NjhcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvV2l6YXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtOCBpcy1vZmZzZXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aG9yaXpvbnRhbC1zdGVwcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3RlcHM9XCJkZW1vU3RlcHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNvbXBsZXRlZC1zdGVwPVwiY29tcGxldGVTdGVwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDp0b3AtYnV0dG9ucz1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGFjdGl2ZS1zdGVwPVwiaXNTdGVwQWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBzdGVwcGVyLWZpbmlzaGVkPVwiYWxlcnRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvaG9yaXpvbnRhbC1zdGVwcGVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IEhvcml6b250YWxTdGVwcGVyIGZyb20gJ3Z1ZS1zdGVwcGVyJztcblxuICAgIC8vIFRoaXMgY29tcG9uZW50cyB3aWxsIGhhdmUgdGhlIGNvbnRlbnQgZm9yIGVhY2ggc3RlcHBlciBzdGVwLlxuICAgIGltcG9ydCBTdGVwT25lIGZyb20gJy4vU3RlcE9uZS52dWUnO1xuICAgIGltcG9ydCBTdGVwVHdvIGZyb20gJy4vU3RlcFR3by52dWUnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBIb3Jpem9udGFsU3RlcHBlclxuICAgICAgICB9LFxuICAgICAgICBkYXRhKCl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRlbW9TdGVwczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnYXNzaWdubWVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZmlyc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDb21wYW55JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBTdGVwT25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAncGxhY2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NlY29uZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0FkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGU6ICdDb21wYW55IGxvY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogU3RlcFR3byxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2dyYWRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQbGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlOiAnQ2hvb3NlIGEgcGxhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFN0ZXBUd28sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdkb25lX2FsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc2Vjb25kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnUmV2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlOiAnY2hlY2sgYW5kIGdvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogU3RlcFR3byxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIC8vIEV4ZWN1dGVkIHdoZW4gQGNvbXBsZXRlZC1zdGVwIGV2ZW50IGlzIHRyaWdnZXJlZFxuICAgICAgICAgICAgY29tcGxldGVTdGVwKHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbW9TdGVwcy5mb3JFYWNoKChzdGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwLm5hbWUgPT09IHBheWxvYWQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcC5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBFeGVjdXRlZCB3aGVuIEBhY3RpdmUtc3RlcCBldmVudCBpcyB0cmlnZ2VyZWRcbiAgICAgICAgICAgIGlzU3RlcEFjdGl2ZShwYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZW1vU3RlcHMuZm9yRWFjaCgoc3RlcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5uYW1lID09PSBwYXlsb2FkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0ZXAuY29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcC5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gRXhlY3V0ZWQgd2hlbiBAc3RlcHBlci1maW5pc2hlZCBldmVudCBpcyB0cmlnZ2VyZWRcbiAgICAgICAgICAgIGFsZXJ0KHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnZW5kJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1dpemFyZC52dWUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vSG9yaXpvbnRhbFN0ZXBwZXIudnVlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2VlODYyNDZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi9Ib3Jpem9udGFsU3RlcHBlci5zY3NzXCIpXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNlZTg2MjQ2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTEhLi9Ib3Jpem9udGFsU3RlcHBlci52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0hvcml6b250YWxTdGVwcGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0zZWU4NjI0NlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Ib3Jpem9udGFsU3RlcHBlci52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTNlZTg2MjQ2XCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIm5vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTNlZTg2MjQ2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtM2VlODYyNDZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNlZTg2MjQ2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9Ib3Jpem9udGFsU3RlcHBlci5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjdlYmQ3ZmM2XCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2VlODYyNDZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL0hvcml6b250YWxTdGVwcGVyLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNlZTg2MjQ2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9Ib3Jpem9udGFsU3RlcHBlci5zY3NzXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTNlZTg2MjQ2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnN0ZXBwZXItYm94W2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI0KTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMjQpO1xcbiAgbWluLWhlaWdodDogMjAwcHg7XFxufVxcbi5zdGVwcGVyLWJveCAudG9wW2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHBlci1idXR0b24tdG9wW2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgICAgIHotaW5kZXg6IDIwO1xcbiAgICAgIHBhZGRpbmc6IC40cmVtO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHJlbTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBwZXItYnV0dG9uLXRvcC5uZXh0W2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzMzODNjODtcXG4gICAgICAgIGNvbG9yOiAjMzM4M2M4O1xcbiAgICAgICAgcmlnaHQ6IDElO1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHBlci1idXR0b24tdG9wLm5leHQuZGVhY3RpdmF0ZWRbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNjY2NjY2MgIWltcG9ydGFudDtcXG4gICAgICAgICAgY29sb3I6ICNjY2NjY2M7XFxuICAgICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQgIWltcG9ydGFudDtcXG59XFxuLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBwZXItYnV0dG9uLXRvcC5wcmV2aW91c1tkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICAgICAgbGVmdDogMSU7XFxufVxcbi5zdGVwcGVyLWJveCAudG9wIC5kaXZpZGVyLWxpbmVbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgICAgaGVpZ2h0OiAycHg7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4uc3RlcHBlci1ib3ggLnRvcCAuZGl2aWRlci1saW5lW2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgICAgICAgICB3aWR0aDogOTAlO1xcbn1cXG59XFxuLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXJbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICB3aWR0aDogOTUlO1xcbiAgICAgIGxlZnQ6IDA7XFxuICAgICAgcGFkZGluZzogMiUgNCU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbi5zdGVwcGVyLWJveCAudG9wIC5zdGVwcy13cmFwcGVyW2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgICAgICAgICB3aWR0aDogOTAlO1xcbiAgICAgICAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcFtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gICAgICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcFtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbn1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAuZGVhY3RpdmF0ZWRbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcXG59XFxufVxcbi5zdGVwcGVyLWJveCAudG9wIC5zdGVwcy13cmFwcGVyIC5zdGVwLmRlYWN0aXZhdGVkIC5jaXJjbGUgaVtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2JiYmJiYiAhaW1wb3J0YW50O1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcC5kZWFjdGl2YXRlZCAuc3RlcC10aXRsZVtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgICAgb3BhY2l0eTogLjM1O1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuY2lyY2xlW2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbiAgICAgICAgICBwYWRkaW5nOiAwIDFyZW07XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuY2lyY2xlIGlbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzODNjODtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDByZW07XFxuICAgICAgICAgICAgcGFkZGluZzogMXJlbTtcXG59XFxuLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAgLnN0ZXAtdGl0bGVbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgdG9wOiA5MCU7XFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoMVtkYXRhLXYtM2VlODYyNDZdLFxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoMltkYXRhLXYtM2VlODYyNDZdLFxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoM1tkYXRhLXYtM2VlODYyNDZdLFxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoNFtkYXRhLXYtM2VlODYyNDZdLFxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoNVtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgICAgICBtYXJnaW46IDAgMCAuMnJlbSAwO1xcbiAgICAgICAgICAgIGNvbG9yOiAjMzMzMzMzO1xcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4uc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSAuc3RlcC1zdWJ0aXRsZVtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcXG4gICAgICAgICAgICBtYXJnaW46IDA7XFxuICAgICAgICAgICAgY29sb3I6ICM1NTU1NTU7XFxufVxcbi5zdGVwcGVyLWJveCAuY29udGVudFtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgbWFyZ2luOiAxLjVyZW0gMDtcXG59XFxuLnN0ZXBwZXItYm94IC5ib3R0b21bZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDJyZW07XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjY2NjO1xcbn1cXG4uc3RlcHBlci1ib3ggLmJvdHRvbS5vbmx5LW5leHRbZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgLXdlYmtpdC1ib3gtcGFjazogZW5kO1xcbiAgICAgICAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbn1cXG4uc3RlcHBlci1ib3ggLmJvdHRvbSAuc3RlcHBlci1idXR0b25bZGF0YS12LTNlZTg2MjQ2XSB7XFxuICAgICAgcGFkZGluZzogLjVyZW0gMXJlbTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG4uc3RlcHBlci1ib3ggLmJvdHRvbSAuc3RlcHBlci1idXR0b24ubmV4dFtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzgzYzg7XFxuICAgICAgICBjb2xvcjogd2hpdGU7XFxuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI0KTtcXG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMjQpO1xcbn1cXG4uc3RlcHBlci1ib3ggLmJvdHRvbSAuc3RlcHBlci1idXR0b24ubmV4dC5kZWFjdGl2YXRlZFtkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYyAhaW1wb3J0YW50O1xcbiAgICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkICFpbXBvcnRhbnQ7XFxufVxcbi5zdGVwcGVyLWJveCAuYm90dG9tIC5zdGVwcGVyLWJ1dHRvbi5wcmV2aW91c1tkYXRhLXYtM2VlODYyNDZdIHtcXG4gICAgICAgIGNvbG9yOiAjMzMzMzMzO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL2hvbWUvcHlyYW1pZC9EZXNrdG9wL25ld3lvcmstYmFja2VuZC9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0Usd0JBQXdCO0VBQ3hCLGlGQUF5RTtVQUF6RSx5RUFBeUU7RUFDekUsa0JBQWtCO0NBQUU7QUFDcEI7SUFDRSxxQkFBYztJQUFkLHFCQUFjO0lBQWQsY0FBYztJQUNkLDBCQUFvQjtRQUFwQix1QkFBb0I7WUFBcEIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQix5QkFBd0I7UUFBeEIsc0JBQXdCO1lBQXhCLHdCQUF3QjtDQUFFO0FBQzFCO01BQ0UsWUFBWTtNQUNaLGVBQWU7TUFDZixzQkFBc0I7TUFDdEIsZ0JBQWdCO01BQ2hCLG1CQUFtQjtNQUNuQixxQkFBYztNQUFkLHFCQUFjO01BQWQsY0FBYztNQUNkLDBCQUFvQjtVQUFwQix1QkFBb0I7Y0FBcEIsb0JBQW9CO01BQ3BCLDBCQUErQjtVQUEvQix1QkFBK0I7Y0FBL0IsK0JBQStCO0NBQUU7QUFDakM7UUFDRSwwQkFBMEI7UUFDMUIsZUFBZTtRQUNmLFVBQVU7Q0FBRTtBQUNaO1VBQ0UscUNBQXFDO1VBQ3JDLGVBQWU7VUFDZiwrQkFBK0I7Q0FBRTtBQUNyQztRQUNFLGVBQWU7UUFDZixTQUFTO0NBQUU7QUFDZjtNQUNFLGlDQUFpQztNQUNqQyxZQUFZO01BQ1osbUJBQW1CO0NBQUU7QUFDckI7QUFDRTtVQUNFLFdBQVc7Q0FBRTtDQUFFO0FBQ3JCO01BQ0UscUJBQWM7TUFBZCxxQkFBYztNQUFkLGNBQWM7TUFDZCwwQkFBb0I7VUFBcEIsdUJBQW9CO2NBQXBCLG9CQUFvQjtNQUNwQiwwQkFBK0I7VUFBL0IsdUJBQStCO2NBQS9CLCtCQUErQjtNQUMvQixtQkFBbUI7TUFDbkIsV0FBVztNQUNYLFFBQVE7TUFDUixlQUFlO0NBQUU7QUFDakI7QUFDRTtVQUNFLFdBQVc7VUFDWCx5QkFBd0I7Y0FBeEIsc0JBQXdCO2tCQUF4Qix3QkFBd0I7Q0FBRTtDQUFFO0FBQ2hDO1FBQ0UsbUJBQW1CO1FBQ25CLHFCQUFjO1FBQWQscUJBQWM7UUFBZCxjQUFjO1FBQ2QsNkJBQXVCO1FBQXZCLDhCQUF1QjtZQUF2QiwyQkFBdUI7Z0JBQXZCLHVCQUF1QjtRQUN2QiwwQkFBb0I7WUFBcEIsdUJBQW9CO2dCQUFwQixvQkFBb0I7UUFDcEIsbUJBQW1CO0NBQUU7QUFDckI7QUFDRTtZQUNFLHVCQUF1QjtDQUFFO0NBQUU7QUFDL0I7QUFDRTtZQUNFLGNBQWM7Q0FBRTtDQUFFO0FBQ3RCO1VBQ0UscUNBQXFDO0NBQUU7QUFDekM7VUFDRSxhQUFhO0NBQUU7QUFDakI7VUFDRSxvQkFBb0I7VUFDcEIsZ0JBQWdCO1VBQ2hCLHdCQUF3QjtDQUFFO0FBQzFCO1lBQ0UsMEJBQTBCO1lBQzFCLFlBQVk7WUFDWixzQkFBc0I7WUFDdEIsY0FBYztDQUFFO0FBQ3BCO1VBQ0UsbUJBQW1CO1VBQ25CLFNBQVM7VUFDVCxZQUFZO0NBQUU7QUFDZDs7Ozs7WUFLRSxvQkFBb0I7WUFDcEIsZUFBZTtZQUNmLGtCQUFrQjtDQUFFO0FBQ3RCO1lBQ0UscUJBQXFCO1lBQ3JCLFVBQVU7WUFDVixlQUFlO0NBQUU7QUFDM0I7SUFDRSxpQkFBaUI7SUFDakIsaUJBQWlCO0NBQUU7QUFDckI7SUFDRSxtQkFBbUI7SUFDbkIscUJBQWM7SUFBZCxxQkFBYztJQUFkLGNBQWM7SUFDZCwwQkFBK0I7UUFBL0IsdUJBQStCO1lBQS9CLCtCQUErQjtJQUMvQiwwQkFBb0I7UUFBcEIsdUJBQW9CO1lBQXBCLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2QsOEJBQThCO0NBQUU7QUFDaEM7TUFDRSxzQkFBMEI7VUFBMUIsbUJBQTBCO2NBQTFCLDBCQUEwQjtDQUFFO0FBQzlCO01BQ0Usb0JBQW9CO01BQ3BCLGdCQUFnQjtNQUNoQixxQkFBYztNQUFkLHFCQUFjO01BQWQsY0FBYztNQUNkLDBCQUFvQjtVQUFwQix1QkFBb0I7Y0FBcEIsb0JBQW9CO01BQ3BCLDBCQUErQjtVQUEvQix1QkFBK0I7Y0FBL0IsK0JBQStCO0NBQUU7QUFDakM7UUFDRSwwQkFBMEI7UUFDMUIsYUFBYTtRQUNiLGlGQUF5RTtnQkFBekUseUVBQXlFO0NBQUU7QUFDM0U7VUFDRSxxQ0FBcUM7VUFDckMsK0JBQStCO0NBQUU7QUFDckM7UUFDRSxlQUFlO0NBQUVcIixcImZpbGVcIjpcIkhvcml6b250YWxTdGVwcGVyLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnN0ZXBwZXItYm94IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMjQpO1xcbiAgbWluLWhlaWdodDogMjAwcHg7IH1cXG4gIC5zdGVwcGVyLWJveCAudG9wIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcbiAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHBlci1idXR0b24tdG9wIHtcXG4gICAgICB6LWluZGV4OiAyMDtcXG4gICAgICBwYWRkaW5nOiAuNHJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDByZW07XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9XFxuICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBwZXItYnV0dG9uLXRvcC5uZXh0IHtcXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMzMzgzYzg7XFxuICAgICAgICBjb2xvcjogIzMzODNjODtcXG4gICAgICAgIHJpZ2h0OiAxJTsgfVxcbiAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBwZXItYnV0dG9uLXRvcC5uZXh0LmRlYWN0aXZhdGVkIHtcXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2NjY2NjYyAhaW1wb3J0YW50O1xcbiAgICAgICAgICBjb2xvcjogI2NjY2NjYztcXG4gICAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZCAhaW1wb3J0YW50OyB9XFxuICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBwZXItYnV0dG9uLXRvcC5wcmV2aW91cyB7XFxuICAgICAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgICAgIGxlZnQ6IDElOyB9XFxuICAgIC5zdGVwcGVyLWJveCAudG9wIC5kaXZpZGVyLWxpbmUge1xcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgICAgIGhlaWdodDogMnB4O1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgfVxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLmRpdmlkZXItbGluZSB7XFxuICAgICAgICAgIHdpZHRoOiA5MCU7IH0gfVxcbiAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgd2lkdGg6IDk1JTtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHBhZGRpbmc6IDIlIDQlOyB9XFxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxuICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciB7XFxuICAgICAgICAgIHdpZHRoOiA5MCU7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9IH1cXG4gICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCB7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCB7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfSB9XFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcXG4gICAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAuZGVhY3RpdmF0ZWQge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcbiAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAuZGVhY3RpdmF0ZWQgLmNpcmNsZSBpIHtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2JiYmJiYiAhaW1wb3J0YW50OyB9XFxuICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcC5kZWFjdGl2YXRlZCAuc3RlcC10aXRsZSB7XFxuICAgICAgICAgIG9wYWNpdHk6IC4zNTsgfVxcbiAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAgLmNpcmNsZSB7XFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICAgICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IH1cXG4gICAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAgLmNpcmNsZSBpIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM4M2M4O1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHJlbTtcXG4gICAgICAgICAgICBwYWRkaW5nOiAxcmVtOyB9XFxuICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgdG9wOiA5MCU7XFxuICAgICAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgICAgICAgIC5zdGVwcGVyLWJveCAudG9wIC5zdGVwcy13cmFwcGVyIC5zdGVwIC5zdGVwLXRpdGxlIGgxLFxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoMixcXG4gICAgICAgICAgLnN0ZXBwZXItYm94IC50b3AgLnN0ZXBzLXdyYXBwZXIgLnN0ZXAgLnN0ZXAtdGl0bGUgaDMsXFxuICAgICAgICAgIC5zdGVwcGVyLWJveCAudG9wIC5zdGVwcy13cmFwcGVyIC5zdGVwIC5zdGVwLXRpdGxlIGg0LFxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSBoNSB7XFxuICAgICAgICAgICAgbWFyZ2luOiAwIDAgLjJyZW0gMDtcXG4gICAgICAgICAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDsgfVxcbiAgICAgICAgICAuc3RlcHBlci1ib3ggLnRvcCAuc3RlcHMtd3JhcHBlciAuc3RlcCAuc3RlcC10aXRsZSAuc3RlcC1zdWJ0aXRsZSB7XFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XFxuICAgICAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgICAgIGNvbG9yOiAjNTU1NTU1OyB9XFxuICAuc3RlcHBlci1ib3ggLmNvbnRlbnQge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBtYXJnaW46IDEuNXJlbSAwOyB9XFxuICAuc3RlcHBlci1ib3ggLmJvdHRvbSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjY2NjYzsgfVxcbiAgICAuc3RlcHBlci1ib3ggLmJvdHRvbS5vbmx5LW5leHQge1xcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cXG4gICAgLnN0ZXBwZXItYm94IC5ib3R0b20gLnN0ZXBwZXItYnV0dG9uIHtcXG4gICAgICBwYWRkaW5nOiAuNXJlbSAxcmVtO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9XFxuICAgICAgLnN0ZXBwZXItYm94IC5ib3R0b20gLnN0ZXBwZXItYnV0dG9uLm5leHQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzODNjODtcXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI0KTsgfVxcbiAgICAgICAgLnN0ZXBwZXItYm94IC5ib3R0b20gLnN0ZXBwZXItYnV0dG9uLm5leHQuZGVhY3RpdmF0ZWQge1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjY2NjICFpbXBvcnRhbnQ7XFxuICAgICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQgIWltcG9ydGFudDsgfVxcbiAgICAgIC5zdGVwcGVyLWJveCAuYm90dG9tIC5zdGVwcGVyLWJ1dHRvbi5wcmV2aW91cyB7XFxuICAgICAgICBjb2xvcjogIzMzMzMzMzsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0zZWU4NjI0NlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZWU4NjI0NlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0xIS4vSG9yaXpvbnRhbFN0ZXBwZXIudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImJiMDgxNTY2XCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2VlODYyNDZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MSEuL0hvcml6b250YWxTdGVwcGVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2VlODYyNDZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MSEuL0hvcml6b250YWxTdGVwcGVyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0zZWU4NjI0NlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTEhLi9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuLyogZmFsbGJhY2sgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogbG9jYWwoXFxcIk1hdGVyaWFsIEljb25zXFxcIiksIGxvY2FsKFxcXCJNYXRlcmlhbEljb25zLVJlZ3VsYXJcXFwiKSxcXG4gICAgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9tYXRlcmlhbGljb25zL3YxNy8yZmNyWUZOYVRqY1M2ZzRVM3QtWTVaalpqVDVGZEVKMTQwVTJESllDM21ZLndvZmYyKVxcbiAgICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuLm1hdGVyaWFsLWljb25zW2RhdGEtdi0zZWU4NjI0Nl0ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICBkaXJlY3Rpb246IGx0cjtcXG4gIC13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcXFwibGlnYVxcXCI7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9ob21lL3B5cmFtaWQvRGVza3RvcC9uZXd5b3JrLWJhY2tlbmQvbm9kZV9tb2R1bGVzL3Z1ZS1zdGVwcGVyL3NyYy9ub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxTkEsY0FBQTtBQUNBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0E7O3NCQUVBO0NBQ0E7QUFFQTtFQUNBLDhCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esc0NBQUE7RUFDQSxvQ0FBQTtDQUNBXCIsXCJmaWxlXCI6XCJIb3Jpem9udGFsU3RlcHBlci52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzdGVwcGVyLWJveFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0b3BcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRpdmlkZXItbGluZVxcXCIgOnN0eWxlPVxcXCJ7d2lkdGg6IGAkeygxMDAvKHN0ZXBzLmxlbmd0aCkgKiAoc3RlcHMubGVuZ3RoIC0gMSkpIC0gMTB9JWB9XFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzdGVwcy13cmFwcGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XFxcInRvcEJ1dHRvbnNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJjdXJyZW50U3RlcC5pbmRleCA+IDBcXFwiIGNsYXNzPVxcXCJzdGVwcGVyLWJ1dHRvbi10b3AgcHJldmlvdXNcXFwiIEBjbGljaz1cXFwiYmFja1N0ZXAoKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zXFxcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cXFwiKHN0ZXAsIGluZGV4KSBpbiBzdGVwc1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cXFwiWydzdGVwJywgaXNTdGVwQWN0aXZlKGluZGV4LCBzdGVwKV1cXFwiIDprZXk9XFxcImluZGV4XFxcIiA6c3R5bGU9XFxcInt3aWR0aDogYCR7MTAwIC8gc3RlcHMubGVuZ3RofSVgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2lyY2xlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zIG1kLTE4XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IChzdGVwLmNvbXBsZXRlZCkgPyAnZG9uZScgOiBzdGVwLmljb24gfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInN0ZXAtdGl0bGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3tzdGVwLnRpdGxlfX08L2g0PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XFxcInN0ZXAtc3VidGl0bGVcXFwiPnt7c3RlcC5zdWJ0aXRsZX19PC9oNT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxcbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XFxcInRvcEJ1dHRvbnNcXFwiIDpjbGFzcz1cXFwiWydzdGVwcGVyLWJ1dHRvbi10b3AgbmV4dCcsICFjYW5Db250aW51ZSA/ICdkZWFjdGl2YXRlZCcgOiAnJ11cXFwiIEBjbGljaz1cXFwibmV4dFN0ZXAoKVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9pPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29udGVudFxcXCI+XFxuICAgICAgICAgICAgPHRyYW5zaXRpb24gOmVudGVyLWFjdGl2ZS1jbGFzcz1cXFwiZW50ZXJBbmltYXRpb25cXFwiIDpsZWF2ZS1hY3RpdmUtY2xhc3M9XFxcImxlYXZlQW5pbWF0aW9uXFxcIiBtb2RlPVxcXCJvdXQtaW5cXFwiPlxcbiAgICAgICAgICAgICAgICA8IS0tSWYga2VlcCBhbGl2ZS0tPlxcbiAgICAgICAgICAgICAgICA8a2VlcC1hbGl2ZSB2LWlmPVxcXCJrZWVwQWxpdmVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XFxcInN0ZXBzW2N1cnJlbnRTdGVwLmluZGV4XS5jb21wb25lbnRcXFwiIDpjbGlja2VkTmV4dD1cXFwibmV4dEJ1dHRvbltjdXJyZW50U3RlcC5uYW1lXVxcXCIgQGNhbi1jb250aW51ZT1cXFwicHJvY2VlZFxcXCIgQGNoYW5nZS1uZXh0PVxcXCJjaGFuZ2VOZXh0QnRuVmFsdWVcXFwiIDpjdXJyZW50LXN0ZXA9XFxcImN1cnJlbnRTdGVwXFxcIj48L2NvbXBvbmVudD5cXG4gICAgICAgICAgICAgICAgPC9rZWVwLWFsaXZlPlxcbiAgICAgICAgICAgICAgICA8IS0tSWYgbm90IHNob3cgY29tcG9uZW50IGFuZCBkZXN0cm95IGl0IGluIGVhY2ggc3RlcCBjaGFuZ2UtLT5cXG4gICAgICAgICAgICAgICAgPGNvbXBvbmVudCB2LWVsc2UgOmlzPVxcXCJzdGVwc1tjdXJyZW50U3RlcC5pbmRleF0uY29tcG9uZW50XFxcIiA6Y2xpY2tlZE5leHQ9XFxcIm5leHRCdXR0b25bY3VycmVudFN0ZXAubmFtZV1cXFwiIEBjYW4tY29udGludWU9XFxcInByb2NlZWRcXFwiIEBjaGFuZ2UtbmV4dD1cXFwiY2hhbmdlTmV4dEJ0blZhbHVlXFxcIiA6Y3VycmVudC1zdGVwPVxcXCJjdXJyZW50U3RlcFxcXCI+PC9jb21wb25lbnQ+XFxuICAgICAgICAgICAgPC90cmFuc2l0aW9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IDpjbGFzcz1cXFwiWydib3R0b20nLCAoY3VycmVudFN0ZXAuaW5kZXggPiAwKSA/ICcnIDogJ29ubHktbmV4dCddXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XFxcImN1cnJlbnRTdGVwLmluZGV4ID4gMFxcXCIgY2xhc3M9XFxcInN0ZXBwZXItYnV0dG9uIHByZXZpb3VzXFxcIiBAY2xpY2s9XFxcImJhY2tTdGVwKClcXFwiPlxcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+XFxuICAgICAgICAgICAgICAgIDxzcGFuPnt7ICdiYWNrJyB8IHRyYW5zbGF0ZShsb2NhbGUpIH19PC9zcGFuPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgOmNsYXNzPVxcXCJbJ3N0ZXBwZXItYnV0dG9uIG5leHQnLCAhY2FuQ29udGludWUgPyAnZGVhY3RpdmF0ZWQnIDogJyddXFxcIiBAY2xpY2s9XFxcIm5leHRTdGVwKClcXFwiPlxcbiAgICAgICAgICAgICAgICA8c3Bhbj57eyAoZmluYWxTdGVwKSA/ICdmaW5pc2gnIDogJ25leHQnIHwgdHJhbnNsYXRlKGxvY2FsZSkgfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJtYXRlcmlhbC1pY29uc1xcXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC90ZW1wbGF0ZT5cXG5cXG48c2NyaXB0PlxcbmltcG9ydCB0cmFuc2xhdGlvbnMgZnJvbSBcXFwiLi9UcmFuc2xhdGlvbnMuanNcXFwiO1xcblxcbmV4cG9ydCBkZWZhdWx0IHtcXG4gIGZpbHRlcnM6IHtcXG4gICAgdHJhbnNsYXRlOiBmdW5jdGlvbih2YWx1ZSwgbG9jYWxlKSB7XFxuICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uc1tsb2NhbGVdW3ZhbHVlXTtcXG4gICAgfVxcbiAgfSxcXG5cXG4gIHByb3BzOiB7XFxuICAgIGxvY2FsZToge1xcbiAgICAgIHR5cGU6IFN0cmluZyxcXG4gICAgICBkZWZhdWx0OiBcXFwiZW5cXFwiXFxuICAgIH0sXFxuICAgIHRvcEJ1dHRvbnM6IHtcXG4gICAgICB0eXBlOiBCb29sZWFuLFxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXFxuICAgIH0sXFxuICAgIHN0ZXBzOiB7XFxuICAgICAgdHlwZTogQXJyYXksXFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24oKSB7XFxuICAgICAgICByZXR1cm4gW1xcbiAgICAgICAgICB7XFxuICAgICAgICAgICAgaWNvbjogXFxcIm1haWxcXFwiLFxcbiAgICAgICAgICAgIG5hbWU6IFxcXCJmaXJzdFxcXCIsXFxuICAgICAgICAgICAgdGl0bGU6IFxcXCJTYW1wbGUgdGl0bGUgMVxcXCIsXFxuICAgICAgICAgICAgc3VidGl0bGU6IFxcXCJTdWJ0aXRsZSBzYW1wbGVcXFwiXFxuICAgICAgICAgIH0sXFxuICAgICAgICAgIHtcXG4gICAgICAgICAgICBpY29uOiBcXFwicmVwb3J0X3Byb2JsZW1cXFwiLFxcbiAgICAgICAgICAgIG5hbWU6IFxcXCJzZWNvbmRcXFwiLFxcbiAgICAgICAgICAgIHRpdGxlOiBcXFwiU2FtcGxlIHRpdGxlIDJcXFwiLFxcbiAgICAgICAgICAgIHN1YnRpdGxlOiBcXFwiU3VidGl0bGUgc2FtcGxlXFxcIlxcbiAgICAgICAgICB9XFxuICAgICAgICBdO1xcbiAgICAgIH1cXG4gICAgfSxcXG4gICAga2VlcEFsaXZlOiB7XFxuICAgICAgdHlwZTogQm9vbGVhbixcXG4gICAgICBkZWZhdWx0OiB0cnVlXFxuICAgIH1cXG4gIH0sXFxuXFxuICBkYXRhKCkge1xcbiAgICByZXR1cm4ge1xcbiAgICAgIGN1cnJlbnRTdGVwOiB7fSxcXG4gICAgICBwcmV2aW91c1N0ZXA6IHt9LFxcbiAgICAgIG5leHRCdXR0b246IHt9LFxcbiAgICAgIGNhbkNvbnRpbnVlOiBmYWxzZSxcXG4gICAgICBmaW5hbFN0ZXA6IGZhbHNlXFxuICAgIH07XFxuICB9LFxcblxcbiAgY29tcHV0ZWQ6IHtcXG4gICAgZW50ZXJBbmltYXRpb24oKSB7XFxuICAgICAgaWYgKHRoaXMuY3VycmVudFN0ZXAuaW5kZXggPCB0aGlzLnByZXZpb3VzU3RlcC5pbmRleCkge1xcbiAgICAgICAgcmV0dXJuIFxcXCJhbmltYXRlZCBxdWljayBmYWRlSW5MZWZ0XFxcIjtcXG4gICAgICB9IGVsc2Uge1xcbiAgICAgICAgcmV0dXJuIFxcXCJhbmltYXRlZCBxdWljayBmYWRlSW5SaWdodFxcXCI7XFxuICAgICAgfVxcbiAgICB9LFxcbiAgICBsZWF2ZUFuaW1hdGlvbigpIHtcXG4gICAgICBpZiAodGhpcy5jdXJyZW50U3RlcC5pbmRleCA+IHRoaXMucHJldmlvdXNTdGVwLmluZGV4KSB7XFxuICAgICAgICByZXR1cm4gXFxcImFuaW1hdGVkIHF1aWNrIGZhZGVPdXRMZWZ0XFxcIjtcXG4gICAgICB9IGVsc2Uge1xcbiAgICAgICAgcmV0dXJuIFxcXCJhbmltYXRlZCBxdWljayBmYWRlT3V0UmlnaHRcXFwiO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfSxcXG5cXG4gIG1ldGhvZHM6IHtcXG4gICAgaXNTdGVwQWN0aXZlKGluZGV4LCBzdGVwKSB7XFxuICAgICAgaWYgKHRoaXMuY3VycmVudFN0ZXAuaW5kZXggPT09IGluZGV4KSB7XFxuICAgICAgICByZXR1cm4gXFxcImFjdGl2YXRlZFxcXCI7XFxuICAgICAgfSBlbHNlIHtcXG4gICAgICAgIHJldHVybiBcXFwiZGVhY3RpdmF0ZWRcXFwiO1xcbiAgICAgIH1cXG4gICAgfSxcXG5cXG4gICAgYWN0aXZhdGVTdGVwKGluZGV4LCBiYWNrID0gZmFsc2UpIHtcXG4gICAgICBpZiAodGhpcy5zdGVwc1tpbmRleF0pIHtcXG4gICAgICAgIHRoaXMucHJldmlvdXNTdGVwID0gdGhpcy5jdXJyZW50U3RlcDtcXG4gICAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSB7XFxuICAgICAgICAgIG5hbWU6IHRoaXMuc3RlcHNbaW5kZXhdLm5hbWUsXFxuICAgICAgICAgIGluZGV4OiBpbmRleFxcbiAgICAgICAgfTtcXG5cXG4gICAgICAgIGlmIChpbmRleCArIDEgPT09IHRoaXMuc3RlcHMubGVuZ3RoKSB7XFxuICAgICAgICAgIHRoaXMuZmluYWxTdGVwID0gdHJ1ZTtcXG4gICAgICAgIH0gZWxzZSB7XFxuICAgICAgICAgIHRoaXMuZmluYWxTdGVwID0gZmFsc2U7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBpZiAoIWJhY2spIHtcXG4gICAgICAgICAgdGhpcy4kZW1pdChcXFwiY29tcGxldGVkLXN0ZXBcXFwiLCB0aGlzLnByZXZpb3VzU3RlcCk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICAgIHRoaXMuJGVtaXQoXFxcImFjdGl2ZS1zdGVwXFxcIiwgdGhpcy5jdXJyZW50U3RlcCk7XFxuICAgIH0sXFxuXFxuICAgIG5leHRTdGVwQWN0aW9uKCkge1xcbiAgICAgIHRoaXMubmV4dEJ1dHRvblt0aGlzLmN1cnJlbnRTdGVwLm5hbWVdID0gdHJ1ZTtcXG4gICAgICBpZiAodGhpcy5jYW5Db250aW51ZSkge1xcbiAgICAgICAgaWYgKHRoaXMuZmluYWxTdGVwKSB7XFxuICAgICAgICAgIHRoaXMuJGVtaXQoXFxcInN0ZXBwZXItZmluaXNoZWRcXFwiLCB0aGlzLmN1cnJlbnRTdGVwKTtcXG4gICAgICAgIH1cXG4gICAgICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnRTdGVwLmluZGV4ICsgMTtcXG5cXG4gICAgICAgIHRoaXMuYWN0aXZhdGVTdGVwKGN1cnJlbnRJbmRleCk7XFxuICAgICAgfVxcbiAgICAgIHRoaXMuY2FuQ29udGludWUgPSBmYWxzZTtcXG4gICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpO1xcbiAgICB9LFxcblxcbiAgICBuZXh0U3RlcCAoKSB7XFxuXFxuICAgICAgaWYgKCF0aGlzLiRsaXN0ZW5lcnMgfHwgIXRoaXMuJGxpc3RlbmVyc1snYmVmb3JlLW5leHQtc3RlcCddKSB7XFxuICAgICAgICB0aGlzLm5leHRTdGVwQWN0aW9uKClcXG4gICAgICB9XFxuXFxuICAgICAgdGhpcy5jYW5Db250aW51ZSA9IGZhbHNlO1xcblxcbiAgICAgIHRoaXMuJGVtaXQoXFxcImJlZm9yZS1uZXh0LXN0ZXBcXFwiLCB7IGN1cnJlbnRTdGVwOiB0aGlzLmN1cnJlbnRTdGVwIH0sIChuZXh0ID0gdHJ1ZSkgPT4ge1xcbiAgICAgICAgdGhpcy5jYW5Db250aW51ZSA9IHRydWU7XFxuICAgICAgICBpZiAobmV4dCkge1xcbiAgICAgICAgICB0aGlzLm5leHRTdGVwQWN0aW9uKClcXG4gICAgICAgIH1cXG4gICAgICB9KTtcXG4gICAgfSxcXG4gICAgYmFja1N0ZXAoKSB7XFxuICAgICAgdGhpcy4kZW1pdChcXFwiY2xpY2tpbmctYmFja1xcXCIpO1xcbiAgICAgIGxldCBjdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnRTdGVwLmluZGV4IC0gMTtcXG4gICAgICBpZiAoY3VycmVudEluZGV4ID49IDApIHtcXG4gICAgICAgIHRoaXMuYWN0aXZhdGVTdGVwKGN1cnJlbnRJbmRleCwgdHJ1ZSk7XFxuICAgICAgfVxcbiAgICB9LFxcblxcbiAgICBwcm9jZWVkKHBheWxvYWQpIHtcXG4gICAgICB0aGlzLmNhbkNvbnRpbnVlID0gcGF5bG9hZC52YWx1ZTtcXG4gICAgfSxcXG5cXG4gICAgY2hhbmdlTmV4dEJ0blZhbHVlKHBheWxvYWQpIHtcXG4gICAgICB0aGlzLm5leHRCdXR0b25bdGhpcy5jdXJyZW50U3RlcC5uYW1lXSA9IHBheWxvYWQubmV4dEJ0blZhbHVlO1xcbiAgICAgIHRoaXMuJGZvcmNlVXBkYXRlKCk7XFxuICAgIH1cXG4gIH0sXFxuXFxuICBjcmVhdGVkKCkge1xcbiAgICAvLyBJbml0aWF0ZSBzdGVwcGVyXFxuICAgIHRoaXMuYWN0aXZhdGVTdGVwKDApO1xcbiAgICB0aGlzLnN0ZXBzLmZvckVhY2goc3RlcCA9PiB7XFxuICAgICAgdGhpcy5uZXh0QnV0dG9uW3N0ZXAubmFtZV0gPSBmYWxzZTtcXG4gICAgfSk7XFxuICB9XFxufTtcXG48L3NjcmlwdD5cXG5cXG48c3R5bGUgc3JjPVxcXCIuL0hvcml6b250YWxTdGVwcGVyLnNjc3NcXFwiIHNjb3BlZCBsYW5nPVxcXCJzY3NzXFxcIj5cXG5cXG48L3N0eWxlPlxcbjxzdHlsZSBzY29wZWQ+XFxuLyogZmFsbGJhY2sgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHNyYzogbG9jYWwoXFxcIk1hdGVyaWFsIEljb25zXFxcIiksIGxvY2FsKFxcXCJNYXRlcmlhbEljb25zLVJlZ3VsYXJcXFwiKSxcXG4gICAgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9tYXRlcmlhbGljb25zL3YxNy8yZmNyWUZOYVRqY1M2ZzRVM3QtWTVaalpqVDVGZEVKMTQwVTJESllDM21ZLndvZmYyKVxcbiAgICAgIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuXFxuLm1hdGVyaWFsLWljb25zIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAtd2Via2l0LWZvbnQtZmVhdHVyZS1zZXR0aW5nczogXFxcImxpZ2FcXFwiO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxufVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTNlZTg2MjQ2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MSEuL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInN0ZXBwZXItYm94XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXZpZGVyLWxpbmVcIiA6c3R5bGU9XCJ7d2lkdGg6IGAkeygxMDAvKHN0ZXBzLmxlbmd0aCkgKiAoc3RlcHMubGVuZ3RoIC0gMSkpIC0gMTB9JWB9XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RlcHMtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwidG9wQnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJjdXJyZW50U3RlcC5pbmRleCA+IDBcIiBjbGFzcz1cInN0ZXBwZXItYnV0dG9uLXRvcCBwcmV2aW91c1wiIEBjbGljaz1cImJhY2tTdGVwKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIihzdGVwLCBpbmRleCkgaW4gc3RlcHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCJbJ3N0ZXAnLCBpc1N0ZXBBY3RpdmUoaW5kZXgsIHN0ZXApXVwiIDprZXk9XCJpbmRleFwiIDpzdHlsZT1cInt3aWR0aDogYCR7MTAwIC8gc3RlcHMubGVuZ3RofSVgfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWQtMThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgKHN0ZXAuY29tcGxldGVkKSA/ICdkb25lJyA6IHN0ZXAuaWNvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0ZXAtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3tzdGVwLnRpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cInN0ZXAtc3VidGl0bGVcIj57e3N0ZXAuc3VidGl0bGV9fTwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJ0b3BCdXR0b25zXCIgOmNsYXNzPVwiWydzdGVwcGVyLWJ1dHRvbi10b3AgbmV4dCcsICFjYW5Db250aW51ZSA/ICdkZWFjdGl2YXRlZCcgOiAnJ11cIiBAY2xpY2s9XCJuZXh0U3RlcCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDx0cmFuc2l0aW9uIDplbnRlci1hY3RpdmUtY2xhc3M9XCJlbnRlckFuaW1hdGlvblwiIDpsZWF2ZS1hY3RpdmUtY2xhc3M9XCJsZWF2ZUFuaW1hdGlvblwiIG1vZGU9XCJvdXQtaW5cIj5cbiAgICAgICAgICAgICAgICA8IS0tSWYga2VlcCBhbGl2ZS0tPlxuICAgICAgICAgICAgICAgIDxrZWVwLWFsaXZlIHYtaWY9XCJrZWVwQWxpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XCJzdGVwc1tjdXJyZW50U3RlcC5pbmRleF0uY29tcG9uZW50XCIgOmNsaWNrZWROZXh0PVwibmV4dEJ1dHRvbltjdXJyZW50U3RlcC5uYW1lXVwiIEBjYW4tY29udGludWU9XCJwcm9jZWVkXCIgQGNoYW5nZS1uZXh0PVwiY2hhbmdlTmV4dEJ0blZhbHVlXCIgOmN1cnJlbnQtc3RlcD1cImN1cnJlbnRTdGVwXCI+PC9jb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPC9rZWVwLWFsaXZlPlxuICAgICAgICAgICAgICAgIDwhLS1JZiBub3Qgc2hvdyBjb21wb25lbnQgYW5kIGRlc3Ryb3kgaXQgaW4gZWFjaCBzdGVwIGNoYW5nZS0tPlxuICAgICAgICAgICAgICAgIDxjb21wb25lbnQgdi1lbHNlIDppcz1cInN0ZXBzW2N1cnJlbnRTdGVwLmluZGV4XS5jb21wb25lbnRcIiA6Y2xpY2tlZE5leHQ9XCJuZXh0QnV0dG9uW2N1cnJlbnRTdGVwLm5hbWVdXCIgQGNhbi1jb250aW51ZT1cInByb2NlZWRcIiBAY2hhbmdlLW5leHQ9XCJjaGFuZ2VOZXh0QnRuVmFsdWVcIiA6Y3VycmVudC1zdGVwPVwiY3VycmVudFN0ZXBcIj48L2NvbXBvbmVudD5cbiAgICAgICAgICAgIDwvdHJhbnNpdGlvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgOmNsYXNzPVwiWydib3R0b20nLCAoY3VycmVudFN0ZXAuaW5kZXggPiAwKSA/ICcnIDogJ29ubHktbmV4dCddXCI+XG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJjdXJyZW50U3RlcC5pbmRleCA+IDBcIiBjbGFzcz1cInN0ZXBwZXItYnV0dG9uIHByZXZpb3VzXCIgQGNsaWNrPVwiYmFja1N0ZXAoKVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt7ICdiYWNrJyB8IHRyYW5zbGF0ZShsb2NhbGUpIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIlsnc3RlcHBlci1idXR0b24gbmV4dCcsICFjYW5Db250aW51ZSA/ICdkZWFjdGl2YXRlZCcgOiAnJ11cIiBAY2xpY2s9XCJuZXh0U3RlcCgpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3sgKGZpbmFsU3RlcCkgPyAnZmluaXNoJyA6ICduZXh0JyB8IHRyYW5zbGF0ZShsb2NhbGUpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgdHJhbnNsYXRpb25zIGZyb20gXCIuL1RyYW5zbGF0aW9ucy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZpbHRlcnM6IHtcbiAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHZhbHVlLCBsb2NhbGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGlvbnNbbG9jYWxlXVt2YWx1ZV07XG4gICAgfVxuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgbG9jYWxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBcImVuXCJcbiAgICB9LFxuICAgIHRvcEJ1dHRvbnM6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc3RlcHM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWNvbjogXCJtYWlsXCIsXG4gICAgICAgICAgICBuYW1lOiBcImZpcnN0XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJTYW1wbGUgdGl0bGUgMVwiLFxuICAgICAgICAgICAgc3VidGl0bGU6IFwiU3VidGl0bGUgc2FtcGxlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGljb246IFwicmVwb3J0X3Byb2JsZW1cIixcbiAgICAgICAgICAgIG5hbWU6IFwic2Vjb25kXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJTYW1wbGUgdGl0bGUgMlwiLFxuICAgICAgICAgICAgc3VidGl0bGU6IFwiU3VidGl0bGUgc2FtcGxlXCJcbiAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICB9XG4gICAgfSxcbiAgICBrZWVwQWxpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRTdGVwOiB7fSxcbiAgICAgIHByZXZpb3VzU3RlcDoge30sXG4gICAgICBuZXh0QnV0dG9uOiB7fSxcbiAgICAgIGNhbkNvbnRpbnVlOiBmYWxzZSxcbiAgICAgIGZpbmFsU3RlcDogZmFsc2VcbiAgICB9O1xuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgZW50ZXJBbmltYXRpb24oKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U3RlcC5pbmRleCA8IHRoaXMucHJldmlvdXNTdGVwLmluZGV4KSB7XG4gICAgICAgIHJldHVybiBcImFuaW1hdGVkIHF1aWNrIGZhZGVJbkxlZnRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImFuaW1hdGVkIHF1aWNrIGZhZGVJblJpZ2h0XCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZWF2ZUFuaW1hdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwLmluZGV4ID4gdGhpcy5wcmV2aW91c1N0ZXAuaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIFwiYW5pbWF0ZWQgcXVpY2sgZmFkZU91dExlZnRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImFuaW1hdGVkIHF1aWNrIGZhZGVPdXRSaWdodFwiO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaXNTdGVwQWN0aXZlKGluZGV4LCBzdGVwKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U3RlcC5pbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIFwiYWN0aXZhdGVkXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJkZWFjdGl2YXRlZFwiO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhY3RpdmF0ZVN0ZXAoaW5kZXgsIGJhY2sgPSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMuc3RlcHNbaW5kZXhdKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTdGVwID0gdGhpcy5jdXJyZW50U3RlcDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IHtcbiAgICAgICAgICBuYW1lOiB0aGlzLnN0ZXBzW2luZGV4XS5uYW1lLFxuICAgICAgICAgIGluZGV4OiBpbmRleFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpbmRleCArIDEgPT09IHRoaXMuc3RlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5maW5hbFN0ZXAgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZmluYWxTdGVwID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJhY2spIHtcbiAgICAgICAgICB0aGlzLiRlbWl0KFwiY29tcGxldGVkLXN0ZXBcIiwgdGhpcy5wcmV2aW91c1N0ZXApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KFwiYWN0aXZlLXN0ZXBcIiwgdGhpcy5jdXJyZW50U3RlcCk7XG4gICAgfSxcblxuICAgIG5leHRTdGVwQWN0aW9uKCkge1xuICAgICAgdGhpcy5uZXh0QnV0dG9uW3RoaXMuY3VycmVudFN0ZXAubmFtZV0gPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuY2FuQ29udGludWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZmluYWxTdGVwKSB7XG4gICAgICAgICAgdGhpcy4kZW1pdChcInN0ZXBwZXItZmluaXNoZWRcIiwgdGhpcy5jdXJyZW50U3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudFN0ZXAuaW5kZXggKyAxO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVTdGVwKGN1cnJlbnRJbmRleCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNhbkNvbnRpbnVlID0gZmFsc2U7XG4gICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpO1xuICAgIH0sXG5cbiAgICBuZXh0U3RlcCAoKSB7XG5cbiAgICAgIGlmICghdGhpcy4kbGlzdGVuZXJzIHx8ICF0aGlzLiRsaXN0ZW5lcnNbJ2JlZm9yZS1uZXh0LXN0ZXAnXSkge1xuICAgICAgICB0aGlzLm5leHRTdGVwQWN0aW9uKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYW5Db250aW51ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLiRlbWl0KFwiYmVmb3JlLW5leHQtc3RlcFwiLCB7IGN1cnJlbnRTdGVwOiB0aGlzLmN1cnJlbnRTdGVwIH0sIChuZXh0ID0gdHJ1ZSkgPT4ge1xuICAgICAgICB0aGlzLmNhbkNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICB0aGlzLm5leHRTdGVwQWN0aW9uKClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBiYWNrU3RlcCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoXCJjbGlja2luZy1iYWNrXCIpO1xuICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudFN0ZXAuaW5kZXggLSAxO1xuICAgICAgaWYgKGN1cnJlbnRJbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVTdGVwKGN1cnJlbnRJbmRleCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHByb2NlZWQocGF5bG9hZCkge1xuICAgICAgdGhpcy5jYW5Db250aW51ZSA9IHBheWxvYWQudmFsdWU7XG4gICAgfSxcblxuICAgIGNoYW5nZU5leHRCdG5WYWx1ZShwYXlsb2FkKSB7XG4gICAgICB0aGlzLm5leHRCdXR0b25bdGhpcy5jdXJyZW50U3RlcC5uYW1lXSA9IHBheWxvYWQubmV4dEJ0blZhbHVlO1xuICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCgpIHtcbiAgICAvLyBJbml0aWF0ZSBzdGVwcGVyXG4gICAgdGhpcy5hY3RpdmF0ZVN0ZXAoMCk7XG4gICAgdGhpcy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xuICAgICAgdGhpcy5uZXh0QnV0dG9uW3N0ZXAubmFtZV0gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc3JjPVwiLi9Ib3Jpem9udGFsU3RlcHBlci5zY3NzXCIgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XG5cbjwvc3R5bGU+XG48c3R5bGUgc2NvcGVkPlxuLyogZmFsbGJhY2sgKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29uc1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHNyYzogbG9jYWwoXCJNYXRlcmlhbCBJY29uc1wiKSwgbG9jYWwoXCJNYXRlcmlhbEljb25zLVJlZ3VsYXJcIiksXG4gICAgdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9tYXRlcmlhbGljb25zL3YxNy8yZmNyWUZOYVRqY1M2ZzRVM3QtWTVaalpqVDVGZEVKMTQwVTJESllDM21ZLndvZmYyKVxuICAgICAgZm9ybWF0KFwid29mZjJcIik7XG59XG5cbi5tYXRlcmlhbC1pY29ucyB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zXCI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIGRpcmVjdGlvbjogbHRyO1xuICAtd2Via2l0LWZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJsaWdhXCI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xufVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBub2RlX21vZHVsZXMvdnVlLXN0ZXBwZXIvc3JjL0hvcml6b250YWxTdGVwcGVyLnZ1ZSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbjoge1xuICAgICAgICBuZXh0OiAnTmV4dCcsXG4gICAgICAgIGJhY2s6ICdCYWNrJyxcbiAgICAgICAgZmluaXNoOiAnRmluaXNoJ1xuICAgIH0sXG4gICAgZXM6IHtcbiAgICAgICAgbmV4dDogJ1NpZ3VpZW50ZScsXG4gICAgICAgIGJhY2s6ICdBdHLDoXMnLFxuICAgICAgICBmaW5pc2g6ICdGaW5hbGl6YXInXG4gICAgfSxcbiAgICBwdDoge1xuICAgICAgICBuZXh0OiAnUHLDs3hpbW8nLFxuICAgICAgICBiYWNrOiAnVm9sdGFyJyxcbiAgICAgICAgZmluaXNoOiAnRmluYWxpemFyJ1xuICAgIH0sXG4gICAgamE6IHtcbiAgICAgICAgbmV4dDogJ+asoeOBuCcsXG4gICAgICAgIGJhY2s6ICfmiLvjgosnLFxuICAgICAgICBmaW5pc2g6ICflrozkuoYnXG4gICAgfSxcbiAgICBoZToge1xuICAgICAgICBuZXh0OiAn15TXkdeQJyxcbiAgICAgICAgYmFjazogJ9eX15bXqNeUJyxcbiAgICAgICAgZmluaXNoOiAn16HXmdeV150nXG4gICAgfSxcbiAgICBjbjoge1xuICAgICAgICBuZXh0OiAn5LiL5LiA5q2lJyxcbiAgICAgICAgYmFjazogJ+i/lOWbnicsXG4gICAgICAgIGZpbmlzaDogJ+WujOaIkCdcbiAgICB9LFxuICAgIHJ1OiB7XG4gICAgICAgIG5leHQ6ICfQktC/0LXRgNC10LQnLFxuICAgICAgICBiYWNrOiAn0J3QsNC30LDQtCcsXG4gICAgICAgIGZpbmlzaDogJ9CT0L7RgtC+0LLQvidcbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvVHJhbnNsYXRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RlcHBlci1ib3hcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0b3BcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImRpdmlkZXItbGluZVwiLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiAoMTAwIC8gX3ZtLnN0ZXBzLmxlbmd0aCkgKiAoX3ZtLnN0ZXBzLmxlbmd0aCAtIDEpIC0gMTAgKyBcIiVcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzdGVwcy13cmFwcGVyXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS50b3BCdXR0b25zXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBfdm0uY3VycmVudFN0ZXAuaW5kZXggPiAwXG4gICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RlcHBlci1idXR0b24tdG9wIHByZXZpb3VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmJhY2tTdGVwKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwibWF0ZXJpYWwtaWNvbnNcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImtleWJvYXJkX2Fycm93X2xlZnRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uX2woX3ZtLnN0ZXBzLCBmdW5jdGlvbihzdGVwLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcInN0ZXBcIiwgX3ZtLmlzU3RlcEFjdGl2ZShpbmRleCwgc3RlcCldLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgd2lkdGg6IDEwMCAvIF92bS5zdGVwcy5sZW5ndGggKyBcIiVcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNpcmNsZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwibWF0ZXJpYWwtaWNvbnMgbWQtMThcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3Moc3RlcC5jb21wbGV0ZWQgPyBcImRvbmVcIiA6IHN0ZXAuaWNvbikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdGVwLXRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImg0XCIsIFtfdm0uX3YoX3ZtLl9zKHN0ZXAudGl0bGUpKV0pLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcImg1XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RlcC1zdWJ0aXRsZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHN0ZXAuc3VidGl0bGUpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS50b3BCdXR0b25zXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdGVwcGVyLWJ1dHRvbi10b3AgbmV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAhX3ZtLmNhbkNvbnRpbnVlID8gXCJkZWFjdGl2YXRlZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ubmV4dFN0ZXAoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJtYXRlcmlhbC1pY29uc1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwia2V5Ym9hcmRfYXJyb3dfcmlnaHRcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0sXG4gICAgICAgIDJcbiAgICAgIClcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudFwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidHJhbnNpdGlvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIFwiZW50ZXItYWN0aXZlLWNsYXNzXCI6IF92bS5lbnRlckFuaW1hdGlvbixcbiAgICAgICAgICAgICAgXCJsZWF2ZS1hY3RpdmUtY2xhc3NcIjogX3ZtLmxlYXZlQW5pbWF0aW9uLFxuICAgICAgICAgICAgICBtb2RlOiBcIm91dC1pblwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfdm0ua2VlcEFsaXZlXG4gICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICBcImtlZXAtYWxpdmVcIixcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoX3ZtLnN0ZXBzW192bS5jdXJyZW50U3RlcC5pbmRleF0uY29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgdGFnOiBcImNvbXBvbmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkTmV4dDogX3ZtLm5leHRCdXR0b25bX3ZtLmN1cnJlbnRTdGVwLm5hbWVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50LXN0ZXBcIjogX3ZtLmN1cnJlbnRTdGVwXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYW4tY29udGludWVcIjogX3ZtLnByb2NlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5nZS1uZXh0XCI6IF92bS5jaGFuZ2VOZXh0QnRuVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBfYyhfdm0uc3RlcHNbX3ZtLmN1cnJlbnRTdGVwLmluZGV4XS5jb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICAgIHRhZzogXCJjb21wb25lbnRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWROZXh0OiBfdm0ubmV4dEJ1dHRvbltfdm0uY3VycmVudFN0ZXAubmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIFwiY3VycmVudC1zdGVwXCI6IF92bS5jdXJyZW50U3RlcFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY2FuLWNvbnRpbnVlXCI6IF92bS5wcm9jZWVkLFxuICAgICAgICAgICAgICAgICAgICBcImNoYW5nZS1uZXh0XCI6IF92bS5jaGFuZ2VOZXh0QnRuVmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgICksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IGNsYXNzOiBbXCJib3R0b21cIiwgX3ZtLmN1cnJlbnRTdGVwLmluZGV4ID4gMCA/IFwiXCIgOiBcIm9ubHktbmV4dFwiXSB9LFxuICAgICAgW1xuICAgICAgICBfdm0uY3VycmVudFN0ZXAuaW5kZXggPiAwXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0ZXBwZXItYnV0dG9uIHByZXZpb3VzXCIsXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmJhY2tTdGVwKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJtYXRlcmlhbC1pY29uc1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcImtleWJvYXJkX2Fycm93X2xlZnRcIilcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcInRyYW5zbGF0ZVwiKShcImJhY2tcIiwgX3ZtLmxvY2FsZSkpKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgIFwic3RlcHBlci1idXR0b24gbmV4dFwiLFxuICAgICAgICAgICAgICAhX3ZtLmNhbkNvbnRpbnVlID8gXCJkZWFjdGl2YXRlZFwiIDogXCJcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0ubmV4dFN0ZXAoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwidHJhbnNsYXRlXCIpKFxuICAgICAgICAgICAgICAgICAgICBfdm0uZmluYWxTdGVwID8gXCJmaW5pc2hcIiA6IFwibmV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBfdm0ubG9jYWxlXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJtYXRlcmlhbC1pY29uc1wiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwia2V5Ym9hcmRfYXJyb3dfcmlnaHRcIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgICAgICApXG4gICAgICBdXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0zZWU4NjI0NlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtM2VlODYyNDZcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL25vZGVfbW9kdWxlcy92dWUtc3RlcHBlci9zcmMvSG9yaXpvbnRhbFN0ZXBwZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdGVwT25lLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNWJhNGU0NGRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdGVwT25lLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1N0ZXBPbmUudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTViYTRlNDRkXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNWJhNGU0NGRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU3RlcE9uZS52dWVcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtYm9keSBuby1jYXJkLWJvcmRlclwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj5Db21wYW55IEluZm9ybWF0aW9uPC9oND5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXN1YnRpdGxlXCI+IHBsZWFzZSBmaWxsIGJlbG93IGZvcm0gZm9yIHlvdXIgY29tcGFueSBpbmZvIDwvaDU+XG4gICAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtLWhvcml6b250YWwgbS10LTMwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+Q29tcGFueSBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJDb25zdGVsbGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZ0X3RocmVzaG9sZFwiPkZ1bGwgVGltZSBUaHJlc2hvbGQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpZD1cImZ0X3RocmVzaG9sZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9XCI1OFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbS1iLTMwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJtci1zbS0yXCIgZm9yPVwicmV2aWV3X3BlcmlvZFwiPlJldmlldyBQZXJpb2Q8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImN1c3RvbS1zZWxlY3QgbXItc20tMlwiIGlkPVwicmV2aWV3X3BlcmlvZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCIgc2VsZWN0ZWQ+V2Vla2x5PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIiBzZWxlY3RlZD5CaSBXZWVrbHk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiM1wiIHNlbGVjdGVkPk1vbnRobHk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNFwiIHNlbGVjdGVkPkJpIE1vbnRobHk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCB7dmFsaWRhdGlvbk1peGlufSBmcm9tICd2dWVsaWRhdGUnXG4gICAgaW1wb3J0IHtyZXF1aXJlZCwgZW1haWx9IGZyb20gJ3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycydcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFsnY2xpY2tlZE5leHQnLCAnY3VycmVudFN0ZXAnXSxcbiAgICAgICAgbWl4aW5zOiBbdmFsaWRhdGlvbk1peGluXSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZm9ybToge1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGRlbW9FbWFpbDogJycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0aW9uczoge1xuICAgICAgICAgICAgZm9ybToge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZW1vRW1haWw6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgJHY6IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF2YWwuJGludmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nhbi1jb250aW51ZScsIHt2YWx1ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2FuLWNvbnRpbnVlJywge3ZhbHVlOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xpY2tlZE5leHQodmFsKSB7XG4gICAgICAgICAgICAgICAgaWYodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHYuZm9ybS4kdG91Y2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICBpZighdGhpcy4kdi4kaW52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nhbi1jb250aW51ZScsIHt2YWx1ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjYW4tY29udGludWUnLCB7dmFsdWU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9wYWdlcy9TdGVwT25lLnZ1ZSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wYXRjaENoaWxkcmVuID0gcGF0Y2hDaGlsZHJlbjtcbmV4cG9ydHMuaCA9IGg7XG5cbmZ1bmN0aW9uIGlzVW5kZWYodikge1xuICByZXR1cm4gdiA9PT0gbnVsbCB8fCB2ID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzRGVmKHYpIHtcbiAgcmV0dXJuIHYgIT09IG51bGwgJiYgdiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBzYW1lVnZhbChvbGRWdmFsLCB2dmFsKSB7XG4gIHJldHVybiB2dmFsLnRhZyA9PT0gb2xkVnZhbC50YWcgJiYgdnZhbC5rZXkgPT09IG9sZFZ2YWwua2V5O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVWbSh2dmFsKSB7XG4gIHZhciBWbSA9IHZ2YWwudGFnO1xuICB2dmFsLnZtID0gbmV3IFZtKHtcbiAgICBkYXRhOiB2dmFsLmFyZ3NcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZ2YWwodnZhbCkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZ2YWwuYXJncyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICB2dmFsLnZtW2tdID0gdnZhbC5hcmdzW2tdO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gIHZhciBpLCBrZXk7XG4gIHZhciBtYXAgPSB7fTtcblxuICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgIGtleSA9IGNoaWxkcmVuW2ldLmtleTtcbiAgICBpZiAoaXNEZWYoa2V5KSkgbWFwW2tleV0gPSBpO1xuICB9XG5cbiAgcmV0dXJuIG1hcDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ob2xkQ2gsIG5ld0NoKSB7XG4gIHZhciBvbGRTdGFydElkeCA9IDA7XG4gIHZhciBuZXdTdGFydElkeCA9IDA7XG4gIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICB2YXIgb2xkU3RhcnRWdmFsID0gb2xkQ2hbMF07XG4gIHZhciBvbGRFbmRWdmFsID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gIHZhciBuZXdTdGFydFZ2YWwgPSBuZXdDaFswXTtcbiAgdmFyIG5ld0VuZFZ2YWwgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICB2YXIgb2xkS2V5VG9JZHgsIGlkeEluT2xkLCBlbG1Ub01vdmU7XG5cbiAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICBpZiAoaXNVbmRlZihvbGRTdGFydFZ2YWwpKSB7XG4gICAgICBvbGRTdGFydFZ2YWwgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkRW5kVnZhbCkpIHtcbiAgICAgIG9sZEVuZFZ2YWwgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgfSBlbHNlIGlmIChzYW1lVnZhbChvbGRTdGFydFZ2YWwsIG5ld1N0YXJ0VnZhbCkpIHtcbiAgICAgIHBhdGNoVnZhbChvbGRTdGFydFZ2YWwsIG5ld1N0YXJ0VnZhbCk7XG4gICAgICBvbGRTdGFydFZ2YWwgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgIG5ld1N0YXJ0VnZhbCA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgIH0gZWxzZSBpZiAoc2FtZVZ2YWwob2xkRW5kVnZhbCwgbmV3RW5kVnZhbCkpIHtcbiAgICAgIHBhdGNoVnZhbChvbGRFbmRWdmFsLCBuZXdFbmRWdmFsKTtcbiAgICAgIG9sZEVuZFZ2YWwgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICBuZXdFbmRWdmFsID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgIH0gZWxzZSBpZiAoc2FtZVZ2YWwob2xkU3RhcnRWdmFsLCBuZXdFbmRWdmFsKSkge1xuICAgICAgcGF0Y2hWdmFsKG9sZFN0YXJ0VnZhbCwgbmV3RW5kVnZhbCk7XG4gICAgICBvbGRTdGFydFZ2YWwgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgIG5ld0VuZFZ2YWwgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgfSBlbHNlIGlmIChzYW1lVnZhbChvbGRFbmRWdmFsLCBuZXdTdGFydFZ2YWwpKSB7XG4gICAgICBwYXRjaFZ2YWwob2xkRW5kVnZhbCwgbmV3U3RhcnRWdmFsKTtcbiAgICAgIG9sZEVuZFZ2YWwgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICBuZXdTdGFydFZ2YWwgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzVW5kZWYob2xkS2V5VG9JZHgpKSBvbGRLZXlUb0lkeCA9IGNyZWF0ZUtleVRvT2xkSWR4KG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgIGlkeEluT2xkID0gaXNEZWYobmV3U3RhcnRWdmFsLmtleSkgPyBvbGRLZXlUb0lkeFtuZXdTdGFydFZ2YWwua2V5XSA6IG51bGw7XG5cbiAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICBjcmVhdGVWbShuZXdTdGFydFZ2YWwpO1xuICAgICAgICBuZXdTdGFydFZ2YWwgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcblxuICAgICAgICBpZiAoc2FtZVZ2YWwoZWxtVG9Nb3ZlLCBuZXdTdGFydFZ2YWwpKSB7XG4gICAgICAgICAgcGF0Y2hWdmFsKGVsbVRvTW92ZSwgbmV3U3RhcnRWdmFsKTtcbiAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV3U3RhcnRWdmFsID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3JlYXRlVm0obmV3U3RhcnRWdmFsKTtcbiAgICAgICAgICBuZXdTdGFydFZ2YWwgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgIGFkZFZ2YWxzKG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4KTtcbiAgfSBlbHNlIGlmIChuZXdTdGFydElkeCA+IG5ld0VuZElkeCkge1xuICAgIHJlbW92ZVZ2YWxzKG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRWdmFscyh2dmFscywgc3RhcnRJZHgsIGVuZElkeCkge1xuICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgY3JlYXRlVm0odnZhbHNbc3RhcnRJZHhdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVWdmFscyh2dmFscywgc3RhcnRJZHgsIGVuZElkeCkge1xuICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgdmFyIGNoID0gdnZhbHNbc3RhcnRJZHhdO1xuXG4gICAgaWYgKGlzRGVmKGNoKSkge1xuICAgICAgY2gudm0uJGRlc3Ryb3koKTtcbiAgICAgIGNoLnZtID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hWdmFsKG9sZFZ2YWwsIHZ2YWwpIHtcbiAgaWYgKG9sZFZ2YWwgPT09IHZ2YWwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2dmFsLnZtID0gb2xkVnZhbC52bTtcbiAgdXBkYXRlVnZhbCh2dmFsKTtcbn1cblxuZnVuY3Rpb24gcGF0Y2hDaGlsZHJlbihvbGRDaCwgY2gpIHtcbiAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICBpZiAob2xkQ2ggIT09IGNoKSB1cGRhdGVDaGlsZHJlbihvbGRDaCwgY2gpO1xuICB9IGVsc2UgaWYgKGlzRGVmKGNoKSkge1xuICAgIGFkZFZ2YWxzKGNoLCAwLCBjaC5sZW5ndGggLSAxKTtcbiAgfSBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICByZW1vdmVWdmFscyhvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaCh0YWcsIGtleSwgYXJncykge1xuICByZXR1cm4ge1xuICAgIHRhZzogdGFnLFxuICAgIGtleToga2V5LFxuICAgIGFyZ3M6IGFyZ3NcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3Z2YWwuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbW1vbiA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jb21tb24ucmVnZXgpKCdhbHBoYScsIC9eW2EtekEtWl0qJC8pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvYWxwaGEuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIHdpdGhQYXJhbXMgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ3dlYicgPyByZXF1aXJlKCcuL3dpdGhQYXJhbXNCcm93c2VyJykud2l0aFBhcmFtcyA6IHJlcXVpcmUoJy4vcGFyYW1zJykud2l0aFBhcmFtcztcbnZhciBfZGVmYXVsdCA9IHdpdGhQYXJhbXM7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3dpdGhQYXJhbXMuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy53aXRoUGFyYW1zID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgcm9vdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB7fTtcblxudmFyIGZha2VXaXRoUGFyYW1zID0gZnVuY3Rpb24gZmFrZVdpdGhQYXJhbXMocGFyYW1zT3JDbG9zdXJlLCBtYXliZVZhbGlkYXRvcikge1xuICBpZiAoX3R5cGVvZihwYXJhbXNPckNsb3N1cmUpID09PSAnb2JqZWN0JyAmJiBtYXliZVZhbGlkYXRvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG1heWJlVmFsaWRhdG9yO1xuICB9XG5cbiAgcmV0dXJuIHBhcmFtc09yQ2xvc3VyZShmdW5jdGlvbiAoKSB7fSk7XG59O1xuXG52YXIgd2l0aFBhcmFtcyA9IHJvb3QudnVlbGlkYXRlID8gcm9vdC52dWVsaWRhdGUud2l0aFBhcmFtcyA6IGZha2VXaXRoUGFyYW1zO1xuZXhwb3J0cy53aXRoUGFyYW1zID0gd2l0aFBhcmFtcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3dpdGhQYXJhbXNCcm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbnZhciBfZGVmYXVsdCA9ICgwLCBfY29tbW9uLnJlZ2V4KSgnYWxwaGFOdW0nLCAvXlthLXpBLVowLTldKiQvKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2FscGhhTnVtLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbnZhciBfZGVmYXVsdCA9ICgwLCBfY29tbW9uLnJlZ2V4KSgnbnVtZXJpYycsIC9eWzAtOV0qJC8pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbnVtZXJpYy5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdChtaW4sIG1heCkge1xuICByZXR1cm4gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICAgIHR5cGU6ICdiZXR3ZWVuJyxcbiAgICBtaW46IG1pbixcbiAgICBtYXg6IG1heFxuICB9LCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gISgwLCBfY29tbW9uLnJlcSkodmFsdWUpIHx8ICghL1xccy8udGVzdCh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlKSAmJiArbWluIDw9ICt2YWx1ZSAmJiArbWF4ID49ICt2YWx1ZTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvYmV0d2Vlbi5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgZW1haWxSZWdleCA9IC8oXiR8XigoW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQpLztcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jb21tb24ucmVnZXgpKCdlbWFpbCcsIGVtYWlsUmVnZXgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvZW1haWwuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbW1vbiA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICB0eXBlOiAnaXBBZGRyZXNzJ1xufSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICghKDAsIF9jb21tb24ucmVxKSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIG5pYmJsZXMgPSB2YWx1ZS5zcGxpdCgnLicpO1xuICByZXR1cm4gbmliYmxlcy5sZW5ndGggPT09IDQgJiYgbmliYmxlcy5ldmVyeShuaWJibGVWYWxpZCk7XG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cbnZhciBuaWJibGVWYWxpZCA9IGZ1bmN0aW9uIG5pYmJsZVZhbGlkKG5pYmJsZSkge1xuICBpZiAobmliYmxlLmxlbmd0aCA+IDMgfHwgbmliYmxlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChuaWJibGVbMF0gPT09ICcwJyAmJiBuaWJibGUgIT09ICcwJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghbmliYmxlLm1hdGNoKC9eXFxkKyQvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBudW1lcmljID0gK25pYmJsZSB8IDA7XG4gIHJldHVybiBudW1lcmljID49IDAgJiYgbnVtZXJpYyA8PSAyNTU7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9pcEFkZHJlc3MuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbW1vbiA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcblxudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gX2RlZmF1bHQoKSB7XG4gIHZhciBzZXBhcmF0b3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICc6JztcbiAgcmV0dXJuICgwLCBfY29tbW9uLndpdGhQYXJhbXMpKHtcbiAgICB0eXBlOiAnbWFjQWRkcmVzcydcbiAgfSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCEoMCwgX2NvbW1vbi5yZXEpKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcGFydHMgPSB0eXBlb2Ygc2VwYXJhdG9yID09PSAnc3RyaW5nJyAmJiBzZXBhcmF0b3IgIT09ICcnID8gdmFsdWUuc3BsaXQoc2VwYXJhdG9yKSA6IHZhbHVlLmxlbmd0aCA9PT0gMTIgfHwgdmFsdWUubGVuZ3RoID09PSAxNiA/IHZhbHVlLm1hdGNoKC8uezJ9L2cpIDogbnVsbDtcbiAgICByZXR1cm4gcGFydHMgIT09IG51bGwgJiYgKHBhcnRzLmxlbmd0aCA9PT0gNiB8fCBwYXJ0cy5sZW5ndGggPT09IDgpICYmIHBhcnRzLmV2ZXJ5KGhleFZhbGlkKTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxudmFyIGhleFZhbGlkID0gZnVuY3Rpb24gaGV4VmFsaWQoaGV4KSB7XG4gIHJldHVybiBoZXgudG9Mb3dlckNhc2UoKS5tYXRjaCgvXlswLTlhLWZdezJ9JC8pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbWFjQWRkcmVzcy5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdChsZW5ndGgpIHtcbiAgcmV0dXJuICgwLCBfY29tbW9uLndpdGhQYXJhbXMpKHtcbiAgICB0eXBlOiAnbWF4TGVuZ3RoJyxcbiAgICBtYXg6IGxlbmd0aFxuICB9LCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gISgwLCBfY29tbW9uLnJlcSkodmFsdWUpIHx8ICgwLCBfY29tbW9uLmxlbikodmFsdWUpIDw9IGxlbmd0aDtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbWF4TGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIF9kZWZhdWx0KGxlbmd0aCkge1xuICByZXR1cm4gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICAgIHR5cGU6ICdtaW5MZW5ndGgnLFxuICAgIG1pbjogbGVuZ3RoXG4gIH0sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiAhKDAsIF9jb21tb24ucmVxKSh2YWx1ZSkgfHwgKDAsIF9jb21tb24ubGVuKSh2YWx1ZSkgPj0gbGVuZ3RoO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9taW5MZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbW1vbiA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICB0eXBlOiAncmVxdWlyZWQnXG59LCBfY29tbW9uLnJlcSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9yZXF1aXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdChwcm9wKSB7XG4gIHJldHVybiAoMCwgX2NvbW1vbi53aXRoUGFyYW1zKSh7XG4gICAgdHlwZTogJ3JlcXVpcmVkSWYnLFxuICAgIHByb3A6IHByb3BcbiAgfSwgZnVuY3Rpb24gKHZhbHVlLCBwYXJlbnRWbSkge1xuICAgIHJldHVybiAoMCwgX2NvbW1vbi5yZWYpKHByb3AsIHRoaXMsIHBhcmVudFZtKSA/ICgwLCBfY29tbW9uLnJlcSkodmFsdWUpIDogdHJ1ZTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvcmVxdWlyZWRJZi5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdChwcm9wKSB7XG4gIHJldHVybiAoMCwgX2NvbW1vbi53aXRoUGFyYW1zKSh7XG4gICAgdHlwZTogJ3JlcXVpcmVkVW5sZXNzJyxcbiAgICBwcm9wOiBwcm9wXG4gIH0sIGZ1bmN0aW9uICh2YWx1ZSwgcGFyZW50Vm0pIHtcbiAgICByZXR1cm4gISgwLCBfY29tbW9uLnJlZikocHJvcCwgdGhpcywgcGFyZW50Vm0pID8gKDAsIF9jb21tb24ucmVxKSh2YWx1ZSkgOiB0cnVlO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9yZXF1aXJlZFVubGVzcy5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdChlcXVhbFRvKSB7XG4gIHJldHVybiAoMCwgX2NvbW1vbi53aXRoUGFyYW1zKSh7XG4gICAgdHlwZTogJ3NhbWVBcycsXG4gICAgZXE6IGVxdWFsVG9cbiAgfSwgZnVuY3Rpb24gKHZhbHVlLCBwYXJlbnRWbSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gKDAsIF9jb21tb24ucmVmKShlcXVhbFRvLCB0aGlzLCBwYXJlbnRWbSk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL3NhbWVBcy5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgdXJsUmVnZXggPSAvXig/Oig/Omh0dHBzP3xmdHApOlxcL1xcLykoPzpcXFMrKD86OlxcUyopP0ApPyg/Oig/ISg/OjEwfDEyNykoPzpcXC5cXGR7MSwzfSl7M30pKD8hKD86MTY5XFwuMjU0fDE5MlxcLjE2OCkoPzpcXC5cXGR7MSwzfSl7Mn0pKD8hMTcyXFwuKD86MVs2LTldfDJcXGR8M1swLTFdKSg/OlxcLlxcZHsxLDN9KXsyfSkoPzpbMS05XVxcZD98MVxcZFxcZHwyWzAxXVxcZHwyMlswLTNdKSg/OlxcLig/OjE/XFxkezEsMn18MlswLTRdXFxkfDI1WzAtNV0pKXsyfSg/OlxcLig/OlsxLTldXFxkP3wxXFxkXFxkfDJbMC00XVxcZHwyNVswLTRdKSl8KD86KD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSg/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykqKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZl17Mix9KSkpKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jb21tb24ucmVnZXgpKCd1cmwnLCB1cmxSZWdleCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy91cmwuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbW1vbiA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcblxudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gX2RlZmF1bHQoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCB2YWxpZGF0b3JzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbGlkYXRvcnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICAgIHR5cGU6ICdvcidcbiAgfSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9ycy5sZW5ndGggPiAwICYmIHZhbGlkYXRvcnMucmVkdWNlKGZ1bmN0aW9uICh2YWxpZCwgZm4pIHtcbiAgICAgIHJldHVybiB2YWxpZCB8fCBmbi5hcHBseShfdGhpcywgYXJncyk7XG4gICAgfSwgZmFsc2UpO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9vci5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdCgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhbGlkYXRvcnMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsaWRhdG9yc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAoMCwgX2NvbW1vbi53aXRoUGFyYW1zKSh7XG4gICAgdHlwZTogJ2FuZCdcbiAgfSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9ycy5sZW5ndGggPiAwICYmIHZhbGlkYXRvcnMucmVkdWNlKGZ1bmN0aW9uICh2YWxpZCwgZm4pIHtcbiAgICAgIHJldHVybiB2YWxpZCAmJiBmbi5hcHBseShfdGhpcywgYXJncyk7XG4gICAgfSwgdHJ1ZSk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL2FuZC5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiBfZGVmYXVsdCh2YWxpZGF0b3IpIHtcbiAgcmV0dXJuICgwLCBfY29tbW9uLndpdGhQYXJhbXMpKHtcbiAgICB0eXBlOiAnbm90J1xuICB9LCBmdW5jdGlvbiAodmFsdWUsIHZtKSB7XG4gICAgcmV0dXJuICEoMCwgX2NvbW1vbi5yZXEpKHZhbHVlKSB8fCAhdmFsaWRhdG9yLmNhbGwodGhpcywgdmFsdWUsIHZtKTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvbm90LmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIF9kZWZhdWx0KG1pbikge1xuICByZXR1cm4gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICAgIHR5cGU6ICdtaW5WYWx1ZScsXG4gICAgbWluOiBtaW5cbiAgfSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuICEoMCwgX2NvbW1vbi5yZXEpKHZhbHVlKSB8fCAoIS9cXHMvLnRlc3QodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgJiYgK3ZhbHVlID49ICttaW47XG4gIH0pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL21pblZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jb21tb24gPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIF9kZWZhdWx0KG1heCkge1xuICByZXR1cm4gKDAsIF9jb21tb24ud2l0aFBhcmFtcykoe1xuICAgIHR5cGU6ICdtYXhWYWx1ZScsXG4gICAgbWF4OiBtYXhcbiAgfSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuICEoMCwgX2NvbW1vbi5yZXEpKHZhbHVlKSB8fCAoIS9cXHMvLnRlc3QodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgJiYgK3ZhbHVlIDw9ICttYXg7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzL21heFZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY29tbW9uID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuXG52YXIgX2RlZmF1bHQgPSAoMCwgX2NvbW1vbi5yZWdleCkoJ2ludGVnZXInLCAvXi0/WzAtOV0qJC8pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWVsaWRhdGUvbGliL3ZhbGlkYXRvcnMvaW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NvbW1vbiA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jb21tb24ucmVnZXgpKCdkZWNpbWFsJywgL15bLV0/XFxkKihcXC5cXGQrKT8kLyk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZWxpZGF0ZS9saWIvdmFsaWRhdG9ycy9kZWNpbWFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0uX20oMClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZCBjYXJkLWJvZHkgbm8tY2FyZC1ib3JkZXJcIiB9LCBbXG4gICAgICAgICAgX2MoXCJoNFwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtdGl0bGVcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCJDb21wYW55IEluZm9ybWF0aW9uXCIpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImg1XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1zdWJ0aXRsZVwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIiBwbGVhc2UgZmlsbCBiZWxvdyBmb3JtIGZvciB5b3VyIGNvbXBhbnkgaW5mbyBcIilcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZm9ybVwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0taG9yaXpvbnRhbCBtLXQtMzBcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihcIkNvbXBhbnkgTmFtZVwiKV0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uc3RlbGxhdGlvblwiIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJmdF90aHJlc2hvbGRcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCJGdWxsIFRpbWUgVGhyZXNob2xkXCIpXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIm51bWJlclwiLCBpZDogXCJmdF90aHJlc2hvbGRcIiwgdmFsdWU6IFwiNThcIiB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgbS1iLTMwXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJtci1zbS0yXCIsIGF0dHJzOiB7IGZvcjogXCJyZXZpZXdfcGVyaW9kXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJSZXZpZXcgUGVyaW9kXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInNlbGVjdFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImN1c3RvbS1zZWxlY3QgbXItc20tMlwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwicmV2aWV3X3BlcmlvZFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwib3B0aW9uXCIsIHsgYXR0cnM6IHsgdmFsdWU6IFwiMVwiLCBzZWxlY3RlZDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiV2Vla2x5XCIpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIm9wdGlvblwiLCB7IGF0dHJzOiB7IHZhbHVlOiBcIjJcIiwgc2VsZWN0ZWQ6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkJpIFdlZWtseVwiKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJvcHRpb25cIiwgeyBhdHRyczogeyB2YWx1ZTogXCIzXCIsIHNlbGVjdGVkOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJNb250aGx5XCIpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIm9wdGlvblwiLCB7IGF0dHJzOiB7IHZhbHVlOiBcIjRcIiwgc2VsZWN0ZWQ6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkJpIE1vbnRobHlcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTViYTRlNDRkXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi01YmE0ZTQ0ZFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU3RlcE9uZS52dWVcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdGVwVHdvLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzQwYzk1MzNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdGVwVHdvLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1N0ZXBUd28udnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTc0MGM5NTMzXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNzQwYzk1MzNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvU3RlcFR3by52dWVcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDJyZW0gM3JlbTsgdGV4dC1hbGlnbjogbGVmdDtcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPlVzZXJuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IDpjbGFzcz1cIlsnaW5wdXQnLCAoJHYuZm9ybS51c2VybmFtZS4kZXJyb3IpID8gJ2lzLWRhbmdlcicgOiAnJ11cIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGV4dCBpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJmb3JtLnVzZXJuYW1lXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIHYtaWY9XCIkdi5mb3JtLnVzZXJuYW1lLiRlcnJvclwiIGNsYXNzPVwiaGVscCBpcy1kYW5nZXJcIj5UaGlzIHVzZXJuYW1lIGlzIGludmFsaWQ8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgOmNsYXNzPVwiWydpbnB1dCcsICgkdi5mb3JtLmRlbW9FbWFpbC4kZXJyb3IpID8gJ2lzLWRhbmdlcicgOiAnJ11cIiAgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVtYWlsIGlucHV0XCIgdi1tb2RlbD1cImZvcm0uZGVtb0VtYWlsXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIHYtaWY9XCIkdi5mb3JtLmRlbW9FbWFpbC4kZXJyb3JcIiBjbGFzcz1cImhlbHAgaXMtZGFuZ2VyXCI+VGhpcyBlbWFpbCBpcyBpbnZhbGlkPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPk1lc3NhZ2U8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgOmNsYXNzPVwiWyd0ZXh0YXJlYScsICgkdi5mb3JtLm1lc3NhZ2UuJGVycm9yKSA/ICdpcy1kYW5nZXInIDogJyddXCIgIHBsYWNlaG9sZGVyPVwiVGV4dGFyZWFcIiB2LW1vZGVsPVwiZm9ybS5tZXNzYWdlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHt2YWxpZGF0aW9uTWl4aW59IGZyb20gJ3Z1ZWxpZGF0ZSdcbiAgICBpbXBvcnQge3JlcXVpcmVkLCBlbWFpbH0gZnJvbSAndnVlbGlkYXRlL2xpYi92YWxpZGF0b3JzJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczogWydjbGlja2VkTmV4dCcsICdjdXJyZW50U3RlcCddLFxuICAgICAgICBtaXhpbnM6IFt2YWxpZGF0aW9uTWl4aW5dLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZGVtb0VtYWlsOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRpb25zOiB7XG4gICAgICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlbW9FbWFpbDoge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAkdjoge1xuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXZhbC4kaW52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2FuLWNvbnRpbnVlJywge3ZhbHVlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjYW4tY29udGludWUnLCB7dmFsdWU6IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGlja2VkTmV4dCh2YWwpIHtcbiAgICAgICAgICAgICAgICBpZih2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdi5mb3JtLiR0b3VjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLiR2LiRpbnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2FuLWNvbnRpbnVlJywge3ZhbHVlOiB0cnVlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nhbi1jb250aW51ZScsIHt2YWx1ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1N0ZXBUd28udnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljU3R5bGU6IHsgcGFkZGluZzogXCIycmVtIDNyZW1cIiwgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZpZWxkXCIgfSwgW1xuICAgICAgICBfYyhcImxhYmVsXCIsIHsgc3RhdGljQ2xhc3M6IFwibGFiZWxcIiB9LCBbX3ZtLl92KFwiVXNlcm5hbWVcIildKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250cm9sXCIgfSwgW1xuICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZm9ybS51c2VybmFtZSxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0udXNlcm5hbWVcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY2xhc3M6IFtcImlucHV0XCIsIF92bS4kdi5mb3JtLnVzZXJuYW1lLiRlcnJvciA/IFwiaXMtZGFuZ2VyXCIgOiBcIlwiXSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJUZXh0IGlucHV0XCIgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uZm9ybS51c2VybmFtZSB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5mb3JtLCBcInVzZXJuYW1lXCIsICRldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX3ZtLiR2LmZvcm0udXNlcm5hbWUuJGVycm9yXG4gICAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJoZWxwIGlzLWRhbmdlclwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiVGhpcyB1c2VybmFtZSBpcyBpbnZhbGlkXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmllbGRcIiB9LCBbXG4gICAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJsYWJlbFwiIH0sIFtfdm0uX3YoXCJFbWFpbFwiKV0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRyb2xcIiB9LCBbXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IF92bS5mb3JtLmRlbW9FbWFpbCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uZGVtb0VtYWlsXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGNsYXNzOiBbXCJpbnB1dFwiLCBfdm0uJHYuZm9ybS5kZW1vRW1haWwuJGVycm9yID8gXCJpcy1kYW5nZXJcIiA6IFwiXCJdLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcIkVtYWlsIGlucHV0XCIgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uZm9ybS5kZW1vRW1haWwgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0uZm9ybSwgXCJkZW1vRW1haWxcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfdm0uJHYuZm9ybS5kZW1vRW1haWwuJGVycm9yXG4gICAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJoZWxwIGlzLWRhbmdlclwiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiVGhpcyBlbWFpbCBpcyBpbnZhbGlkXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmllbGRcIiB9LCBbXG4gICAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJsYWJlbFwiIH0sIFtfdm0uX3YoXCJNZXNzYWdlXCIpXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udHJvbFwiIH0sIFtcbiAgICAgICAgICBfYyhcInRleHRhcmVhXCIsIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmZvcm0ubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0ubWVzc2FnZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjbGFzczogW1widGV4dGFyZWFcIiwgX3ZtLiR2LmZvcm0ubWVzc2FnZS4kZXJyb3IgPyBcImlzLWRhbmdlclwiIDogXCJcIl0sXG4gICAgICAgICAgICBhdHRyczogeyBwbGFjZWhvbGRlcjogXCJUZXh0YXJlYVwiIH0sXG4gICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLmZvcm0ubWVzc2FnZSB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5mb3JtLCBcIm1lc3NhZ2VcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi03NDBjOTUzM1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNzQwYzk1MzNcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL1N0ZXBUd28udnVlXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInNlY3Rpb25cIiwgeyBzdGF0aWNDbGFzczogXCJzZWN0aW9uXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2x1bW5zXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sdW1uIGlzLTggaXMtb2Zmc2V0LTJcIiB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiaG9yaXpvbnRhbC1zdGVwcGVyXCIsIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHsgc3RlcHM6IF92bS5kZW1vU3RlcHMsIFwidG9wLWJ1dHRvbnNcIjogdHJ1ZSB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIFwiY29tcGxldGVkLXN0ZXBcIjogX3ZtLmNvbXBsZXRlU3RlcCxcbiAgICAgICAgICAgICAgICBcImFjdGl2ZS1zdGVwXCI6IF92bS5pc1N0ZXBBY3RpdmUsXG4gICAgICAgICAgICAgICAgXCJzdGVwcGVyLWZpbmlzaGVkXCI6IF92bS5hbGVydFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTM0ZmZmNDY4XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0zNGZmZjQ2OFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvV2l6YXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYm9vdHN0cmFwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9iaXRlL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDExMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9