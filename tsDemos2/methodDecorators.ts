function enumerable(value:boolean) {
    return function (target:any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!descriptor) {
            console.log('current descriptor is', descriptor);
        }
        // 直接修改或者return一个对象都可以
        // descriptor.enumerable = value;
        return {
            enumerable: value
        };
    };
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return `Hello, ${this.greeting}`;
    }

    @enumerable(true)
    sayHi() {
        return `Hi, ${this.greet}`;
    }
}

const greet = new Greeter('world');

const keys = [];
for (const key in greet) {
    keys.push(key);
}

console.log(`greet enumerable keys: ${keys.join(',')}`);