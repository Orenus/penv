import { assert } from 'console';
import IEnvsMap, {
    IEnvMap, IEnvMapStatus, IEnvMapStatuses,
    IEnvMapError,
} from './ProcessEnvInterfaces';
import ProcessEnvLoader from './ProcessEnvLoader';
import Validators from './validators/Validators';

export default class ProcessEnv {

    __envMap: IEnvsMap | null = null;
    __envMapFilePath: string | null;
    __envMapStatuses: IEnvMapStatuses | null = null;
    __finalValues: any | null = null;

    constructor(envMapFilePath: string | null = null) {
        this.__envMapFilePath = envMapFilePath;
    }

    get(key: string): any {
        assert(this.__finalValues, 'env has not been processed!');
        return this.__finalValues[key];
    }

    load(): IEnvMapStatuses {
        const data = new ProcessEnvLoader().load(this.__envMapFilePath);
        this.__envMapStatuses = this.__process(data);
        return this.__envMapStatuses;
    }

    list(): string {
        const data = new ProcessEnvLoader().load(this.__envMapFilePath);

        let msg = '';
        for (const k in data) {
            const val = data[k];
            msg += `${k}: ${val.description}\n`
        }
        // console.log(msg);
        return msg;
    }

    __validate(k: string, e: IEnvMap): IEnvMapStatus {
        const status: IEnvMapStatus = {
            actual: process.env[k],
            errors: null
        };

        Validators.instance.validators.forEach(v => {
            const error: IEnvMapError | null = v.validate(k, e);
            if (error) {
                if (!status.errors) {
                    status.errors = [];
                }
                status.errors.push(error);
            }
        })

        return status;
    }

    __process(data: any): IEnvMapStatuses {
        const statuses: IEnvMapStatuses = {};

        for (const k in data) {
            const val = data[k];
            // first validate
            statuses[k] = this.__validate(k, val);
            // then run translators
            // ...
            // then run validator on all translated(?)
            // ...
        }

        return statuses;
    }
}