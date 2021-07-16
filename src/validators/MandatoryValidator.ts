import ProcessEnvValidator from './ProcessEnvValidator';
import { IEnvMap, IEnvMapError, EnvMapErrorLevelEnum } from '../ProcessEnvInterfaces';
import { ValidatorNamesEnum, ValidatorsPrioritiesEnum } from './validatorsDecl';

export default class MandatoryValidator extends ProcessEnvValidator {
    constructor() {
        super(ValidatorNamesEnum.MANDATORY, ValidatorsPrioritiesEnum.MANDATORY);
    }

    validate(key: string, envMap: IEnvMap): IEnvMapError | null {
        if (envMap.isMandatory) {
            if (!process.env[key]) {
                return ({
                    message: `Missing mandatory value for environment variable ${key}`,
                    level: EnvMapErrorLevelEnum.ERROR
                })
            }
        }
        return null;
    }
}