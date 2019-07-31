function configurable(value: boolean) {
    return function(target, key: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value
    };
}

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() {
        return this._x;
    }

    @configurable(false)
    get y() {
        return this._y;
    }
}

const point = new Point(10, 10);
// 修改当前类Point的getter函数会报错
// 因为该函数的configurable已经为false
// 该属性不再可以被重新定义
Object.defineProperty(Point.prototype, 'x', {
    get() {
        return 50;
    },
    configurable: false
});

console.log(`x: ${point.x} y: ${point.y}`);