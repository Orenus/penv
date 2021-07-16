import IEnvsMap, { IEnvMap, IEnvMapStatus, IEnvMapErrorLevelEnum, IEnvMapError } from './ProcessEnvInterfaces';
import ProcessEnvLoader from './ProcessEnvLoader';
/* eslint-disable no-console */

export default class ProcessEnv {
    __envMap: IEnvsMap | null;
    __envMapFilePath: string;

    constructor(envMapFilePath: string) {
        this.__envMapFilePath = envMapFilePath;
        this.__envMap = null;
    }

    load() {
        const data = new ProcessEnvLoader().load(this.__envMapFilePath);
        this.__process(data);
    }

    list(): string {
        const data = new ProcessEnvLoader().load(this.__envMapFilePath);

        let msg = '';
        for (const k in data) {
            const val = data[k];
            msg += `${k}: ${val.description}\n`
        }
        console.log(msg);
        return msg;
    }

    __validateMandatory(k: string, e: IEnvMap): IEnvMapError | null {
        if (e.isMandatory) {
            if (!process.env[k]) {
                return ({
                    message: `Missing mandatory env var ${k}`,
                    level: IEnvMapErrorLevelEnum.ERROR
                })
            }
        }
        return null;
    }

    __validate(k: string, e: IEnvMap): IEnvMapStatus {
        const status: IEnvMapStatus = {
            key: k,
            map: e,
            actual: process.env[k],
        };

        status.error = this.__validateMandatory(k, e);

        // mandatory breaks it all(?)
        if (status.error) {
            return status;
        }

        return status;
    }

    __process(data: any) {
        const status = Array<IEnvMapStatus>();
        for (const k in data) {
            const val = data[k];
            status.push(this.__validate(k, val));
        }
    }
}