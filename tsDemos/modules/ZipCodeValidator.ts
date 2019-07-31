import { StringValidator } from './Validator';
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

// 可选的其他导出方式
// export { ZipCodeValidator };
// export { ZipCodeValidator as mainValidator };