import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

function required(target:Object, propertyKey: string | symbol, parameterIndex: number) {
    console.log('the required decorated is inovked');
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let  requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (const paramIndex of requiredParameters) {
                if (paramIndex > arguments.length || arguments[paramIndex] === undefined) {
                    throw new Error('Missing required arguments.');
                }
            }
        }

        return method.apply(this, arguments);
    }
}

class Greeter {
    greeting: string;
    
    constructor(msg: string) {
        this.greeting = msg;
    }

    @validate
    greet(@required name: string) {
        return `Hello ${name}, ${this.greeting}`;
    }
}

const greeter = new Greeter('world');
console.log(greeter.greet('zero'));
// 没有传入对应的值，因此会报错
// console.log(greeter.greet(undefined));