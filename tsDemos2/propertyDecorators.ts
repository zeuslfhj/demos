import 'reflect-metadata';

const fomratMetadataKey = Symbol('format');

function format(formatString: string) {
    return Reflect.metadata(fomratMetadataKey, formatString);
}

// function format(formatString:string ) {
//     return function(target:any, propertyKey: string) {
//         Reflect.defineMetadata(fomratMetadataKey, formatString, target, propertyKey);
//     }
// }

function getFormat(target:any, propertyKey: string) {
    return Reflect.getMetadata(fomratMetadataKey, target, propertyKey);
}

class Greeter {
    // @Reflect.metadata(
    //     fomratMetadataKey,
    //     'Hello, %s'
    // )
    @format(
        fomratMetadataKey,
        'Hello, %s'
    )
    greeting: string;

    constructor(msg: string) {
        this.greeting = msg;
    }

    greet() {
        let formatString = getFormat(this, 'greeting');
        return formatString.replace('%s', this.greeting);
    }
}

const greeter = new Greeter('world');
Object.defineProperty(greeter, 'greeting', {
    value: 'hello world123123'
});
console.log(greeter.greet());