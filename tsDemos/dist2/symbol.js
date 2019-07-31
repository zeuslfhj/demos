var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e, _f;
var chalk = require('chalk');
console.log(chalk.red('-------- symbol equality ---------'));
var sym1 = Symbol("key");
var sym2 = Symbol("key");
// 比对symbol是否相同
console.log("sym1 === sym2 " + (sym1 === sym2) + ", sym1 == sym2 " + (sym1 == sym2));
console.log(chalk.red('\n\n--------- Symbol.hasInstance -------'));
// 测试数组的拼接
var obj = {};
var arr = [1, 2, 3, 4];
var arr2 = [5, 6, 7];
var MyArray = /** @class */ (function () {
    function MyArray() {
    }
    MyArray[Symbol.hasInstance] = function (instance) {
        return Array.isArray(instance);
    };
    return MyArray;
}());
console.log("is instanceof array: " + Array[Symbol.hasInstance](arr));
console.log("is instanceof array: " + (arr instanceof MyArray));
console.log(chalk.red('\n\n--------- Symbol.isConcatSpreadable -------'));
console.log("arr concat", arr.concat(arr2));
Object.defineProperty(arr2, Symbol.isConcatSpreadable, {
    configurable: true,
    enumerable: false,
    value: false
});
console.log("arr concat when isConcatSpreadable is false", arr.concat(arr2));
// Array-like
var x = [1, 2, 3];
var fakeArray = (_a = {},
    _a[Symbol.isConcatSpreadable] = true,
    _a.length = 2,
    _a[0] = 'hello',
    _a[1] = 'world',
    _a); // [1, 2, 3, "hello", "world"]
console.log('output fake array11', x.concat(fakeArray));
console.log(chalk.red('\n\n--------- Symbol.iterator -------'));
// 自定义迭代方法
var iterable1 = new Object();
iterable1[Symbol.iterator] = function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, 'custom iterator start'];
            case 1:
                _a.sent();
                return [4 /*yield*/, 1];
            case 2:
                _a.sent();
                return [4 /*yield*/, 2];
            case 3:
                _a.sent();
                return [4 /*yield*/, 3];
            case 4:
                _a.sent();
                return [4 /*yield*/, 'custom iterator end'];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
};
console.log(iterable1.slice());
for (var _i = 0, iterable1_1 = iterable1; _i < iterable1_1.length; _i++) {
    var a_1 = iterable1_1[_i];
    console.log(a_1);
}
console.log(chalk.red('\n\n--------- Symbol.match -------'));
// Symbol.match的匹配， string.prototype.match方法等使用
/**
 * if you set Symbol.match to false, the isRegExp check (that uses the match property) will indicate that the object is not a regular expression object. The methods startsWith and endsWith won't throw a TypeError as a consequence.
 */
var fooReg = /foo/;
try {
    console.log('/foo/'.startsWith(fooReg));
}
catch (e) {
    console.log('/foo/匹配会得到异常');
}
Object.defineProperty(fooReg, Symbol.match, {
    configurable: true,
    value: false
});
console.log('Symbol.match foo result', '/foo/'.startsWith(fooReg));
console.log('Symbol.match baz result:', '/baz/'.endsWith(fooReg));
var fooReg2 = /foo/;
console.log('Symbol.match foo result222' + '/foo/'.match(fooReg2));
Object.defineProperty(fooReg2, Symbol.match, {
    value: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args);
        return false;
    }
});
console.log('Symbol.match foo result111', '/foo/'.match(fooReg2));
console.log('Symbol.match foo result', '/foo/'.startsWith('foo'));
console.log(chalk.red('\n\n--------- Symbol.replace -------'));
/* Symbol.replace使用，自定义replace方法 */
var replacer = (_b = {},
    _b[Symbol.replace] = function (str) {
        return "s/" + str + "/customContent/g";
    },
    _b);
console.log('foo'.replace(replacer));
console.log(chalk.red('\n\n--------- Symbol.search -------'));
/* Symbol.search使用 自定义搜索内容*/
var searcher = (_c = {},
    _c[Symbol.search] = function (str) {
        return str.indexOf('foo');
    },
    _c);
console.log('foo'.search(searcher));
console.log(chalk.red('\n\n--------- Symbol.species -------'));
/* Symbol.species 示例*/
var Array1 = /** @class */ (function (_super) {
    __extends(Array1, _super);
    function Array1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Array1, Symbol.species, {
        get: function () { return Array; },
        enumerable: true,
        configurable: true
    });
    return Array1;
}(Array));
var a = new Array1(1, 2, 3);
var mapped = a.map(function (x) { return x * x; });
console.log('mapped value', mapped);
console.log(mapped instanceof Array1);
// expected output: false
console.log(mapped instanceof Array);
// expected output: true
console.log(chalk.red('\n\n--------- Symbol.split -------'));
/* Symbol.split 示例*/
var spliter = (_d = {},
    _d[Symbol.split] = function (str) {
        return [1, 2, str];
    },
    _d);
console.log('custom split content', 'foo'.split(spliter));
console.log(chalk.red('\n\n--------- Symbol.toPrimitive -------'));
/* Symbol.toPrimitive */
var object1 = (_e = {
        a: 12
    },
    _e[Symbol.toPrimitive] = function (hint) {
        if (hint === 'number') {
            return 42;
        }
        else if (hint === 'string') {
            return this.a;
        }
        return null;
    },
    _e);
console.log('custom toPrimitive with number', +object1);
console.log('custom toPrimitive with string', "string primite " + object1);
console.log(chalk.red('\n\n--------- Symbol.stringTagObj -------'));
/* Symbol.stringTagObj 转换 */
var stringTagObj = (_f = {},
    Object.defineProperty(_f, Symbol.toStringTag, {
        get: function () {
            return 'FooClass';
        },
        enumerable: true,
        configurable: true
    }),
    _f);
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Object.defineProperty(Foo.prototype, Symbol.toStringTag, {
        get: function () {
            return 'FooClass ';
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
console.log(Object.prototype.toString.call(stringTagObj));
console.log(Object.prototype.toString.call(new Foo()));
console.log(chalk.red('\n\n--------- Symbol.unscopables -------'));
/* Symbol.unscopables 示例代码
own and inherited property names are excluded from the with environment bindings of the associated object.
 */
var object3 = {
    property1: 42
};
with (object3) {
    console.log("property1: " + property1);
}
object3[Symbol.unscopables] = {
    property1: true
};
with (object3) {
    try {
        console.log(property1);
        // expected output: Error: property1 is not defined
    }
    catch (e) {
        console.log('property1 is not defined');
    }
}
