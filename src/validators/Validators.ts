import ProcessEnvValidator from './ProcessEnvValidator';

export default class Validators {
    private static sInstance: Validators;

    __validators: Array<ProcessEnvValidator>;
    __prioritySorted = false;

    private constructor() {
        this.__validators = Array<ProcessEnvValidator>();
    }

    public static get instance(): Validators {
        if (!Validators.sInstance) {
            Validators.sInstance = new Validators();
        }

        return Validators.sInstance;
    }

    registerValidator(v: ProcessEnvValidator): void {
        this.__validators.push(v);
    }

    get validators(): ProcessEnvValidator[] {
        if (!this.__prioritySorted) {
            this.__sortPriorities();
        }
        return this.__validators;
    }

    __sortPriorities(): void {
        this.__validators = this.__validators.sort((a, b) => a.__priority - b.__priority);
        let prevValidator: ProcessEnvValidator | null = null;

        // making sure priority are unique (nulls are ignored)
        this.__validators.forEach(v => {
            if (v.__priority != null && v.__priority === prevValidator?.__priority) {
                throw Error(`${v.__name} and ${prevValidator.__name} are defined with the same priority. It must be unique`)
            }
            prevValidator = v;
        })
    }
}