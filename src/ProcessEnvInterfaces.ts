// { VAR1 : {
//     description: 'miao',
//     isMandatory: false,
//     type: 'string',
//     acceptValues: ['a', 'b', 'c'],
//     default: 'miao_default',
//     customValidator: /reg ex/ or "VALIDATOR_NAME"
//     transformations: {
//         key1: (val: string) => `${val}.txt`,
//         key2: (val: string) => parseInt(val, 10) / 2
//     },
//     hidden: false,
//     children: {}
// }
// }

export interface IEnvMapValidationRegEx {
    re: RegExp;
}

export interface IEnvMapValidationFunction {
    (val: string): boolean;
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
    customValidator?: string | RegExp; // custom validator name or regex
    transformations?: IEnvMapTransformation;
    hidden?: boolean;
    children?: any;
    finalValue?: any;
}

export default interface IEnvsMap {
    [propName: string]: IEnvMap;
}

export enum EnvMapErrorLevelEnum {
    INFO,
    WARNING,
    ERROR
}

export enum EnvMapErrorTypeEnum {
    MANDATORY,
    VALIDATION,
    INVALID_VALUE
}

export interface IEnvMapError {
    level: EnvMapErrorLevelEnum;
    message: string;
}

export interface IEnvMapErrors {
    [propName: string]: IEnvMapError
}
export interface IEnvMapStatus {
    readonly actual: any;
    errors?: Array<IEnvMapError> | null;
}

export interface IEnvMapStatuses {
    [propName: string]: IEnvMapStatus
}
