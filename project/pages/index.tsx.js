(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("monobase"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "monobase"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("monobase")) : factory(root["React"], root["monobase"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})((typeof window !== 'undefined' ? window : this), function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_monobase__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../.linaria-cache/project/components/examples/Button.linaria.css":
/*!************************************************************************!*\
  !*** ../.linaria-cache/project/components/examples/Button.linaria.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///../.linaria-cache/project/components/examples/Button.linaria.css?");

/***/ }),

/***/ "../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js":
/*!********************************************************************************!*\
  !*** ../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ \"../node_modules/@emotion/memoize/dist/memoize.browser.esm.js\");\n\n\nvar reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23\n\nvar index = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (prop) {\n  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111\n  /* o */\n  && prop.charCodeAt(1) === 110\n  /* n */\n  && prop.charCodeAt(2) < 91;\n}\n/* Z+1 */\n);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (index);\n\n\n//# sourceURL=webpack:///../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js?");

/***/ }),

/***/ "../node_modules/@emotion/memoize/dist/memoize.browser.esm.js":
/*!********************************************************************!*\
  !*** ../node_modules/@emotion/memoize/dist/memoize.browser.esm.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction memoize(fn) {\n  var cache = {};\n  return function (arg) {\n    if (cache[arg] === undefined) cache[arg] = fn(arg);\n    return cache[arg];\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (memoize);\n\n\n//# sourceURL=webpack:///../node_modules/@emotion/memoize/dist/memoize.browser.esm.js?");

/***/ }),

/***/ "../node_modules/linaria/lib/core/css.js":
/*!***********************************************!*\
  !*** ../node_modules/linaria/lib/core/css.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction css() {\n  throw new Error('Using the \"css\" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly.');\n}\n\nmodule.exports = css;\n//# sourceMappingURL=css.js.map\n\n//# sourceURL=webpack:///../node_modules/linaria/lib/core/css.js?");

/***/ }),

/***/ "../node_modules/linaria/lib/core/cx.js":
/*!**********************************************!*\
  !*** ../node_modules/linaria/lib/core/cx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction cx() {\n  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {\n    classNames[_key] = arguments[_key];\n  }\n\n  return classNames.filter(Boolean).join(' ');\n}\n\nmodule.exports = cx;\n//# sourceMappingURL=cx.js.map\n\n//# sourceURL=webpack:///../node_modules/linaria/lib/core/cx.js?");

/***/ }),

/***/ "../node_modules/linaria/lib/index.js":
/*!********************************************!*\
  !*** ../node_modules/linaria/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.css = __webpack_require__(/*! ./core/css */ \"../node_modules/linaria/lib/core/css.js\");\nexports.cx = __webpack_require__(/*! ./core/cx */ \"../node_modules/linaria/lib/core/cx.js\");\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///../node_modules/linaria/lib/index.js?");

/***/ }),

/***/ "../node_modules/linaria/lib/react/index.js":
/*!**************************************************!*\
  !*** ../node_modules/linaria/lib/react/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.styled = __webpack_require__(/*! ./styled */ \"../node_modules/linaria/lib/react/styled.js\");\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///../node_modules/linaria/lib/react/index.js?");

/***/ }),

/***/ "../node_modules/linaria/lib/react/styled.js":
/*!***************************************************!*\
  !*** ../node_modules/linaria/lib/react/styled.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nvar React = __webpack_require__(/*! react */ \"react\"); // eslint-disable-line import/no-extraneous-dependencies\n\n\nvar _require = __webpack_require__(/*! @emotion/is-prop-valid */ \"../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js\"),\n    validAttr = _require.default;\n\nvar _require2 = __webpack_require__(/*! ../index */ \"../node_modules/linaria/lib/index.js\"),\n    cx = _require2.cx;\n\nvar warnIfInvalid = function warnIfInvalid(value, componentName) {\n  if (true) {\n    if (typeof value === 'string' || // eslint-disable-next-line no-self-compare\n    typeof value === 'number' && isFinite(value)) {\n      return;\n    }\n\n    var stringified = typeof value === 'object' ? JSON.stringify(value) : String(value); // eslint-disable-next-line no-console\n\n    console.warn(\"An inteprolation evaluated to '\" + stringified + \"' in the component '\" + componentName + \"', which is probably a mistake. You should explicitly cast or transform the value to a string.\");\n  }\n};\n\nfunction styled(tag) {\n  return function (options) {\n    if (true) {\n      if (Array.isArray(options)) {\n        // We received a strings array since it's used as a tag\n        throw new Error('Using the \"styled\" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly. See https://github.com/callstack/linaria#setup');\n      }\n    }\n\n    var render = function render(props, ref) {\n      var _props$as = props.as,\n          component = _props$as === void 0 ? tag : _props$as,\n          className = props.class,\n          rest = _objectWithoutPropertiesLoose(props, [\"as\", \"class\"]);\n\n      var filteredProps; // Check if it's an HTML tag and not a custom element\n\n      if (typeof component === 'string' && component.indexOf('-') === -1) {\n        filteredProps = {}; // eslint-disable-next-line guard-for-in\n\n        for (var _key in rest) {\n          if (_key === 'as' || validAttr(_key)) {\n            // Don't pass through invalid attributes to HTML elements\n            filteredProps[_key] = rest[_key];\n          }\n        }\n      } else {\n        filteredProps = rest;\n      }\n\n      filteredProps.ref = ref;\n      filteredProps.className = cx(filteredProps.className || className, options.class);\n      var vars = options.vars;\n\n      if (vars) {\n        var style = {}; // eslint-disable-next-line guard-for-in\n\n        for (var name in vars) {\n          var _vars$name = vars[name],\n              result = _vars$name[0],\n              _vars$name$ = _vars$name[1],\n              unit = _vars$name$ === void 0 ? '' : _vars$name$;\n          var value = typeof result === 'function' ? result(props) : result;\n          warnIfInvalid(value, options.name);\n          style[\"--\" + name] = \"\" + value + unit;\n        }\n\n        filteredProps.style = Object.assign(style, filteredProps.style);\n      }\n      /* $FlowFixMe */\n\n\n      if (tag.__linaria && tag !== component) {\n        // If the underlying tag is a styled component, forward the `as` prop\n        // Otherwise the styles from the underlying component will be ignored\n        filteredProps.as = component;\n        return React.createElement(tag, filteredProps);\n      }\n\n      return React.createElement(component, filteredProps);\n    };\n\n    var Result = React.forwardRef ? React.forwardRef(render) : // React.forwardRef won't available on older React versions and in Preact\n    // Fallback to a innerRef prop in that case\n    function (_ref) {\n      var innerRef = _ref.innerRef,\n          rest = _objectWithoutPropertiesLoose(_ref, [\"innerRef\"]);\n\n      return render(rest, innerRef);\n    };\n    Result.displayName = options.name; // These properties will be read by the babel plugin for interpolation\n\n    /* $FlowFixMe */\n\n    Result.__linaria = {\n      className: options.class,\n      extends: tag\n    };\n    return Result;\n  };\n}\n\nif (true) {\n  module.exports = new Proxy(styled, {\n    get: function get(o, prop) {\n      return o(prop);\n    }\n  });\n} else {}\n//# sourceMappingURL=styled.js.map\n\n//# sourceURL=webpack:///../node_modules/linaria/lib/react/styled.js?");

/***/ }),

/***/ "../node_modules/linaria/react.js":
/*!****************************************!*\
  !*** ../node_modules/linaria/react.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable import/no-unresolved */\n\nmodule.exports = __webpack_require__(/*! ./lib/react */ \"../node_modules/linaria/lib/react/index.js\");\n\n\n//# sourceURL=webpack:///../node_modules/linaria/react.js?");

/***/ }),

/***/ "./components/Template.tsx":
/*!*********************************!*\
  !*** ./components/Template.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Template; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var monobase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! monobase */ \"monobase\");\n/* harmony import */ var monobase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(monobase__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Template(_ref) {\n  var children = _ref.children;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"html\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"head\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n    charSet: \"utf-8\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(monobase__WEBPACK_IMPORTED_MODULE_1__[\"StyleSheet\"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"body\", null, children, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(monobase__WEBPACK_IMPORTED_MODULE_1__[\"Development\"], null)));\n}\n\n//# sourceURL=webpack:///./components/Template.tsx?");

/***/ }),

/***/ "./components/examples/Button.tsx":
/*!****************************************!*\
  !*** ./components/examples/Button.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var monobase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! monobase */ \"monobase\");\n/* harmony import */ var monobase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(monobase__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var linaria_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! linaria/react */ \"../node_modules/linaria/react.js\");\n/* harmony import */ var linaria_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(linaria_react__WEBPACK_IMPORTED_MODULE_2__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\nvar StyledButton =\n/*#__PURE__*/\nObject(linaria_react__WEBPACK_IMPORTED_MODULE_2__[\"styled\"])(\"div\")({\n  name: \"StyledButton\",\n  \"class\": \"s1i4yep2\"\n});\n\nfunction Button() {\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(0),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      count = _React$useState2[0],\n      setCount = _React$useState2[1];\n\n  var onClick = function onClick() {\n    return setCount(count + 1);\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledButton, {\n    onClick: onClick\n  }, \"Count: \", count);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(monobase__WEBPACK_IMPORTED_MODULE_1__[\"Dynamic\"])(Button));\n\n__webpack_require__(/*! ../.linaria-cache/project/components/examples/Button.linaria.css */ \"../.linaria-cache/project/components/examples/Button.linaria.css\");\n\n//# sourceURL=webpack:///./components/examples/Button.tsx?");

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return render; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var components_Template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Template */ \"./components/Template.tsx\");\n/* harmony import */ var components_examples_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/examples/Button */ \"./components/examples/Button.tsx\");\n\n\n\nfunction render(project, styles) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Template__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    style: {\n      textAlign: \"center\"\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Example, {\n    title: \"Button\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_examples_Button__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null))));\n}\n\nfunction Example(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n    style: {\n      textAlign: \"center\",\n      padding: \"80px 10px\"\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n    style: {\n      fontSize: 30,\n      fontWeight: 700,\n      margin: 0,\n      paddingBottom: 40,\n      lineHeight: 1\n    }\n  }, props.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    style: {\n      textAlign: \"center\"\n    }\n  }, props.children));\n}\n\n//# sourceURL=webpack:///./pages/index.tsx?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi pages/index.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! pages/index.tsx */\"./pages/index.tsx\");\n\n\n//# sourceURL=webpack:///multi_pages/index.tsx?");

/***/ }),

/***/ "monobase":
/*!**************************************************************************************************!*\
  !*** external {"root":"monobase","commonjs2":"monobase","commonjs":"monobase","amd":"monobase"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_monobase__;\n\n//# sourceURL=webpack:///external_%7B%22root%22:%22monobase%22,%22commonjs2%22:%22monobase%22,%22commonjs%22:%22monobase%22,%22amd%22:%22monobase%22%7D?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack:///external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?");

/***/ })

/******/ });
});