import chalk from 'chalk';

/************ method decorate ****************/
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

function h(
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log(`h: called, propertyKey is: ${propertyKey}`);
}

class C {
    @f()
    @g()
    @h
    method() {
        console.log('output method');
    }
}

const c = new C();
// c.method();

/************* class decorator */

console.log(chalk.yellow('--------------- sperator line ----------------'));
function sealed(constructor: Function) {
    console.log('function has sealed');
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

/**
 * 虽然编译会报错，但是编译依旧能够完成，并能够正常执行
 * Greeter如果加上了@sealed，运行时会产生报错
 * 如果没加，则会正常运行
 * */
// Greeter.prototype.sayHi = function() {
//     return 'Hi, ' + this.greeting;
// };
const greet = new Greeter('world');
console.log(greet.greet());
// console.log(greet.sayHi());

console.log(chalk.yellow('--------------- sperator line ----------------'));
function classDecorator<
    T extends {new(...args:any[]):{}}
>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class GreeterExt {
    property = 'property';
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

const greetExt = new GreeterExt('world');
// newProperty虽然编译的时候报错，但是能够正常运行
console.log('greet with decorator', greetExt);