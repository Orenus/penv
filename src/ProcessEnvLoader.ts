import IEnvsMap from './ProcessEnvInterfaces';
import fs from 'fs';
import JSON5 from 'json5';
import YAML from 'yaml';

const DEFAULT_ENV_MAP_FILE_NAME = ".envMap"
const POSSIBLE_ENV_MAP_EXTENSIONS = ['yml', 'yaml', 'json'];

export default class ProcessEnvLoader {

    load(filePath: string | null = null): IEnvsMap {
        let theFilePath = filePath;

        // when file path is not provided at all, lets try to look for it ourselves.
        if (theFilePath === null || theFilePath === '') {
            theFilePath = this.__searchForDefaultFile();
            if (!theFilePath) {
                throw new Error('Missing find default envMap file. Please define one in your project root or provide a path using the ProcessEnv constructor.');
            }
        }

        const fileExt = theFilePath.split('.').pop();
        const raw: Buffer = fs.readFileSync(theFilePath as fs.PathOrFileDescriptor);
        if (fileExt === 'json') {
            return JSON5.parse(raw.toString());
        }
        // else the only option at tne moment is yaml...
        return YAML.parse(raw.toString());
    }

    __searchForDefaultFile(): string | null {
        for (const fileExt of POSSIBLE_ENV_MAP_EXTENSIONS) {
            const fileName = `${DEFAULT_ENV_MAP_FILE_NAME}.${fileExt}`;
            if (fs.existsSync(fileName)) {
                return fileName;
            }
        }
        return null;
    }
}