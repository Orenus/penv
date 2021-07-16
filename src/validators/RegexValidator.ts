import ProcessEnvValidator from './ProcessEnvValidator';
import { IEnvMap, IEnvMapError, EnvMapErrorLevelEnum } from '../ProcessEnvInterfaces';
import { ValidatorNamesEnum, ValidatorsPrioritiesEnum } from './validatorsDecl';

export default class RegexValidator extends ProcessEnvValidator {
    constructor() {
        super(ValidatorNamesEnum.REGEX, ValidatorsPrioritiesEnum.REGEX);
    }

    validate(key: string, envMap: IEnvMap): IEnvMapError | null {
        if (envMap.customValidator?.constructor.name === 'RegExp') {
            const re: RegExp = envMap.customValidator as RegExp;
            if (!process.env[key]?.match(re)) {
                return ({
                    message: `Invalid value (${process.env[key]}) for environment variable ${key}`,
                    level: EnvMapErrorLevelEnum.ERROR
                })
            }
        }

        return null;
    }
}