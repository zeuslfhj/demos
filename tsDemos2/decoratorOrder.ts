function classDec(constructor:new (...args: any[]) => any) {
    console.log('in class decorator');
}

function propertyDec(proto: any, name: string) {
    console.log('in property decorator');
}

function methodDec(target:any, key: string, descriptor: PropertyDescriptor) {
    console.log(`in method ${key} decorator`);
}

function accessorDec(target:any, key: string, descriptor: PropertyDescriptor) {
    console.log('in accessor decorator');
}

function paramDec(target:any, key: string, parameterIndex: number) {
    console.log(`in param ${key} decorator`);
}

@classDec
class Greeter2 {
    @propertyDec
    message: string;

    constructor(@paramDec msg: string) {
        this.message = msg;
    }
    
    @methodDec
    greet(@paramDec name: string) {
        return `Hello ${name}, ${this.message}`;
    }

    @accessorDec
    get msg() {
        return this.message
    }

    @methodDec
    greet2(@paramDec name: string) {
        return `Hello ${name}, ${this.message}`;
    }
}

const greeter = new Greeter2('world');
// console.log(greeter.greet(greeter.msg));