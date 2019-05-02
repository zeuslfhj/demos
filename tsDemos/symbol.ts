let sym1 = Symbol("key");
let sym2 = Symbol("key");

// 比对symbol是否相同
console.log(`sym1 === sym2 ${sym1 === sym2}, sym1 == sym2 ${sym1 == sym2}`);

// 测试数组的拼接
const obj: Object = {};
const arr: Array<number> = [1,2,3,4];
const arr2: Array<number> = [5,6,7];
console.log(`is instanceof array: ${Array[Symbol.hasInstance](arr)}`);
console.log(`arr concat`, arr.concat(arr2));

Object.defineProperty(arr2, Symbol.isConcatSpreadable, {
    configurable: true,
    enumerable: false,
    value: false
})
console.log(`arr concat when isConcatSpreadable is false`, arr.concat(arr2));


// 自定义迭代方法
const iterable1: any = new Object();

iterable1[Symbol.iterator] = function* () {
    yield 'custom iterator start';
    yield 1;
    yield 2;
    yield 3;
    yield 'custom iterator end';
};

console.log([...iterable1]);


// Symbol.match的匹配， string.prototype.match方法等使用
/**
 * if you set Symbol.match to false, the isRegExp check (that uses the match property) will indicate that the object is not a regular expression object. The methods startsWith and endsWith won't throw a TypeError as a consequence.
 */
const fooReg: RegExp = /foo/;
try{
    console.log('/foo/'.startsWith(fooReg));
}catch(e) { console.log('/foo/匹配会得到异常'); }
Object.defineProperty(fooReg, Symbol.match, {
    configurable: true,
    value: false
});
console.log('Symbol.match foo result', '/foo/'.startsWith(fooReg));
console.log('Symbol.match baz result:', '/baz/'.endsWith(fooReg));

Object.defineProperty(fooReg, Symbol.match, {
    value: (...args) => {
        console.log(...args);
        return false;
    }
});
console.log('Symbol.match foo result', '/foo/'.startsWith('foo'));


/* Symbol.replace使用，自定义replace方法 */
const replacer = {
    [Symbol.replace]: (str: string) => {
        return `s/${str}/customContent/g`;
    }
};
  
console.log('foo'.replace(replacer));


/* Symbol.search使用 自定义搜索内容*/
const searcher = {
    [Symbol.search]: (str: string) => {
        return str.indexOf('foo');
    }
};

console.log('foo'.search(searcher));

/* Symbol.species 示例*/
class Array1 extends Array {
    static get [Symbol.species]() { return Array; }
}

const a: Array<number> = new Array1(1, 2, 3);
const mapped = a.map(x => x * x);

console.log('mapped value', mapped);
console.log(mapped instanceof Array1);
// expected output: false
console.log(mapped instanceof Array);
// expected output: true

/* Symbol.split 示例*/
const spliter = {
    [Symbol.split](str:string) {
        return [1, 2, str];
    }
};

console.log('custom split content', 'foo'.split(spliter));

/* Symbol.toPrimitive */
const object1 = {
    [Symbol.toPrimitive](hint: string) {
        if (hint === 'number') {
            return 42;
        } else if (hint === 'string') {
            return '444';
        }
        return null;
    }
};
  
console.log('custom toPrimitive with number', +object1);
console.log('custom toPrimitive with string', `string primite ${object1}`);

/* Symbol.stringTagObj 转换 */
const stringTagObj = {
    get [Symbol.toStringTag]() {
        return 'FooClass';
    }
};

class Foo {
get [Symbol.toStringTag]() {
    return 'FooClass ';
}
}

console.log(Object.prototype.toString.call(stringTagObj));
console.log(Object.prototype.toString.call(new Foo()));

/* Symbol.unscopables 示例代码
own and inherited property names are excluded from the with environment bindings of the associated object.
 */
const object3: any = {
    property1: 42
};

with (object3) {
    console.log(`property1: ${property1}`);
}

object3[Symbol.unscopables] = {
    property1: true
};
  
with (object3) {
    try{
        console.log(property1);
        // expected output: Error: property1 is not defined
    } catch (e) {
        console.log('property1 is not defined');
    }
}