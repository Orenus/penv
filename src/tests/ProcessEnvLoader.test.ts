import ProcessEnvLoader from '../ProcessEnvLoader'
import fs from 'fs';
import { JSON_DUMMY, JSON_DUMMY_WITH_COMMENT } from './json.mocks';
import { YAML_DUMMY, YAML_DUMMY_WITH_COMMENT } from './yaml.mocks';


jest.mock('fs');

const DEFAULT_ENV_MAP_FILE_NAME = ".envMap"
const POSSIBLE_ENV_MAP_EXTENSIONS = ['yml', 'yaml', 'json'];


describe('testing the ProcessEnvLoader class', () => {

    const mockFile = (ext: string, expectedFileContent: string) => {
        fs.existsSync = jest.fn().mockImplementation((val) => {
            if (val.split('.').pop() === ext) {
                return true;
            }
            return false;
        })
        fs.readFileSync = jest.fn().mockReturnValueOnce(expectedFileContent);
    }

    test('should fail to find default file', () => {
        fs.existsSync = jest.fn().mockReturnValue(false);

        expect(() => {
            new ProcessEnvLoader().load();
        }).toThrowError();
    })

    test('should attempt loading yaml file', () => {
        mockFile('yaml', YAML_DUMMY);
        const actual = new ProcessEnvLoader().load();
        const expected = { yaml: { key1: 'val1' } };
        expect(expected).toEqual(actual);
    })

    test('should attempt loading yml file', () => {
        mockFile('yml', YAML_DUMMY);
        const actual = new ProcessEnvLoader().load();
        const expected = { yaml: { key1: 'val1' } };
        expect(expected).toEqual(actual);
    })

    test('should attempt loading json file', () => {
        mockFile('json', JSON_DUMMY);
        const actual = new ProcessEnvLoader().load();
        const expected = { json: { key1: 'val1' } };
        expect(expected).toEqual(actual);
    })

    test('should load yml file with comments', () => {
        mockFile('yml', YAML_DUMMY_WITH_COMMENT);
        const actual = new ProcessEnvLoader().load();
        const expected = { yaml: { key1: 'val1' } };
        expect(expected).toEqual(actual);
    })

    test('should load json file with comments', () => {
        mockFile('json', JSON_DUMMY_WITH_COMMENT);
        const actual = new ProcessEnvLoader().load();
        const expected = { json: { key1: 'val1' } };
        expect(expected).toEqual(actual);
    })
});
