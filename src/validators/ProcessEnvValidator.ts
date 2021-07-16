
import { IEnvMapError, IEnvMap } from '../ProcessEnvInterfaces';
import { ValidatorsPrioritiesEnum } from './validatorsDecl';

export default abstract class ProcessEnvValidator {
    __name: string;
    __priority: number;

    constructor(name: string, priority: number = ValidatorsPrioritiesEnum.VALIDATOR_NO_PRIORITY) {
        this.__name = name;
        this.__priority = priority;
    }

    abstract validate(key: string, envMap: IEnvMap): IEnvMapError | null;
}