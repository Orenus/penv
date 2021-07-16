import ProcessEnv from '../ProcessEnv'
import { JSON_MANDATORY, JSON_REGEX_VALIDATOR } from './json.mocks';
import '../validators/validatorsReg'

const mockLoad = jest.fn();
jest.mock('../ProcessEnvLoader', () => {
    return jest.fn().mockImplementation(() => {
        return { load: mockLoad };
    });
});

describe('testing the ProcessEnv mandatory functions', () => {

    test('should yields error when mandatory isn\'t provided', () => {
        mockLoad.mockReturnValueOnce(JSON_MANDATORY);
        const res = new ProcessEnv().load();
        const expectedKey = Object.keys(JSON_MANDATORY)[0];
        const receivedKey = Object.keys(res)[0];
        expect(expectedKey).toEqual(receivedKey);

        const receivedErrors = res[receivedKey].errors;
        const expectedErrors = [{ message: `Missing mandatory value for environment variable ${expectedKey}` }];
        expect(expectedErrors).toEqual(receivedErrors?.map(e => ({ message: e.message })));
    })

    test('should yield no error when mandatory is provided', () => {
        mockLoad.mockReturnValueOnce(JSON_MANDATORY);
        const res = new ProcessEnv().load();
        const expectedKey = Object.keys(JSON_MANDATORY)[0];
        const receivedKey = Object.keys(res)[0];
        expect(expectedKey).toEqual(receivedKey);

        const receivedErrors = null;
        const expectedErrors = null;
        expect(expectedErrors).toEqual(receivedErrors);
    })
});

describe('testing the ProcessEnv regex validation functions', () => {

    test('should yields error when regex validation fails', () => {
        mockLoad.mockReturnValueOnce(JSON_REGEX_VALIDATOR);
        const res = new ProcessEnv().load();
        const expectedKey = Object.keys(JSON_REGEX_VALIDATOR)[0];
        const receivedKey = Object.keys(res)[0];
        expect(expectedKey).toEqual(receivedKey);

        const receivedErrors = res[receivedKey].errors;
        const expectedErrors = [{ message: `Invalid value (undefined) for environment variable ${expectedKey}` }];
        expect(expectedErrors).toEqual(receivedErrors?.map(e => ({ message: e.message })));
    })

    test('should yields no error when regex validation succeeds', () => {
        mockLoad.mockReturnValueOnce(JSON_REGEX_VALIDATOR);
        const expectedKey = Object.keys(JSON_REGEX_VALIDATOR)[0];
        process.env[expectedKey] = 'AB';
        const res = new ProcessEnv().load();
        const receivedKey = Object.keys(res)[0];
        expect(expectedKey).toEqual(receivedKey);

        const receivedErrors = null;
        const expectedErrors = null;
        expect(expectedErrors).toEqual(receivedErrors);
    })
});
