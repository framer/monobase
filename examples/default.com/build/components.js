/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_1 = __webpack_require__(5);
exports.Dynamic = dynamic_1.Dynamic;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(8);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(6));
__export(__webpack_require__(7));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var monobase_1 = __webpack_require__(1);
var style = {
    width: 100,
    height: 40,
    display: "inline-block",
    backgroundColor: "yellow",
    font: "14px/38px Helvetica",
    userSelect: "none",
    textAlign: "center",
    borderRadius: "40px",
    margin: 10
};
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 0;
        _this.onClick = function () {
            _this.value++;
            _this.forceUpdate();
        };
        return _this;
    }
    Button.prototype.render = function () {
        return (React.createElement("div", { style: style, onClick: this.onClick },
            "Button ",
            this.value));
    };
    return Button;
}(React.Component));
exports.default = monobase_1.Dynamic(Button);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
// function hashString(str) {
//   let hash = 5381,
//     i = str.length;
//   while (i) {
//     hash = (hash * 33) ^ str.charCodeAt(--i);
//   }
//   /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
//    * integers. Since we want the results to be always positive, convert the
//    * signed int to an unsigned by doing an unsigned bitshift. */
//   return hash >>> 0;
// }
// const getHash = (f: Function) => {
//   return hashString(f.toString());
// };
exports.Dynamic = function (Component) {
    // const name = `${Component.name}-${getHash(Component)}`;
    var f = function (props) {
        return (React.createElement("span", { "data-component": Component.name },
            React.createElement(Component, __assign({ suppressHydrationWarning: true }, props))));
    };
    f["dynamicName"] = Component.name;
    f["dynamicComponent"] = Component;
    // console.log(name);
    return f;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var monobase_1 = __webpack_require__(1);
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = Date.now();
        _this.update = function () {
            _this.time = Date.now();
            _this.forceUpdate();
        };
        return _this;
    }
    Timer.prototype.componentDidMount = function () {
        setInterval(this.update, 500);
    };
    Timer.prototype.render = function () {
        return React.createElement("span", null,
            "This time: ",
            this.time);
    };
    return Timer;
}(React.Component));
exports.default = monobase_1.Dynamic(Timer);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var monobase_1 = __webpack_require__(1);
var style = {
    width: 100,
    height: 40,
    display: "inline-block",
    backgroundColor: "green",
    font: "14px/38px Helvetica",
    userSelect: "none",
    textAlign: "center",
    borderRadius: "40px",
    margin: 10
};
var MouseLocation = /** @class */ (function (_super) {
    __extends(MouseLocation, _super);
    function MouseLocation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.point = { x: 0, y: 0 };
        _this.onMouseMove = function (event) {
            _this.point = { x: event.clientX, y: event.clientY };
            _this.forceUpdate();
        };
        return _this;
    }
    MouseLocation.prototype.componentDidMount = function () {
        document.addEventListener("mousemove", this.onMouseMove);
    };
    MouseLocation.prototype.render = function () {
        return (React.createElement("div", { style: style },
            this.point.x,
            ", ",
            this.point.y));
    };
    return MouseLocation;
}(React.Component));
exports.default = monobase_1.Dynamic(MouseLocation);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(10);
// function isClassComponent(component) {
//   return typeof component === "function" &&
//     !!component.prototype.isReactComponent
//     ? true
//     : false;
// }
// function isFunctionComponent(component) {
//   return typeof component === "function" &&
//     String(component).includes("return React.createElement")
//     ? true
//     : false;
// }
// function isReactComponent(component) {
//   return isClassComponent(component) || isFunctionComponent(component)
//     ? true
//     : false;
// }
var hydrate = function () {
    for (var i = 0; i < module["i"]; i++) {
        var modules = __webpack_require__(i);
        for (var _i = 0, _a = Object.keys(modules); _i < _a.length; _i++) {
            var key = _a[_i];
            // const dynamicComponent = modules[key]["dynamicComponent"];
            var _b = modules[key], dynamicName = _b.dynamicName, dynamicComponent = _b.dynamicComponent;
            if (dynamicComponent && dynamicName) {
                hydrateComponent(dynamicName, dynamicComponent);
            }
        }
    }
};
var hydrateComponent = function (name, Component) {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-component='" + name + "']"));
    if (elements) {
        console.log("hydrate", name, elements);
    }
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element = elements_1[_i];
        ReactDOM.hydrate(React.createElement(Component), element);
    }
};
hydrate();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })
/******/ ]);