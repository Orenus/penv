// { VAR1 : {
//     description: 'miao',
//     isMandatory: false,
//     type: 'string',
//     acceptValues: ['a', 'b', 'c'],
//     default: 'miao_default',
//     customValidator: {
//         key1: (val: string) => parseInt(val, 10) % 2 === 0,
//         key2: (val: string) => val.length < 3, // any string with up to 2 chars
//         key3: /ABC\d/ // accepting any string that matches 'ABC' and a single digit afterwards
//     },
//     transformations: {
//         key1: (val: string) => `${val}.txt`,
//         key2: (val: string) => parseInt(val, 10) / 2
//     },
//     hidden: false,
//     children: {}
// }
// }

export interface IEnvMapValidationRegEx {
    (val: RegExp): boolean;
}

export interface IEnvMapValidationFunction {
    (val: string): boolean;
}

export interface IEnvMapCustomValidator {
    [propName: string]: IEnvMapValidationFunction | IEnvMapValidationRegEx;
}

export interface IEnvMapTransformationFunction {
    (val: string): any;
}

export interface IEnvMapTransformation {
    [propName: string]: IEnvMapTransformationFunction;
}

export interface IEnvMap {
    readonly description: string;
    readonly isMandatory?: boolean;
    readonly type: string;
    acceptValues?: Array<string | boolean | number>;
    default: string | boolean | number | null;
    customValidator?: IEnvMapCustomValidator;
    transformations?: IEnvMapTransformation;
    hidden?: boolean;
    children?: any;
}

export default interface IEnvsMap {
    [propName: string]: IEnvMap;
}

export enum IEnvMapErrorLevelEnum {
    INFO,
    WARNING,
    ERROR
}

export interface IEnvMapError {
    message: string;
    level: IEnvMapErrorLevelEnum;
}

export interface IEnvMapStatus {
    // readonly status: boolean;
    readonly key: string;
    readonly map: IEnvMap;
    readonly actual: any;
    error?: IEnvMapError | null;
}