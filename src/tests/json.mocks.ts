
export const JSON_DUMMY =
    `{
        json: {
            key1: 'val1'
        }
    }`;

export const JSON_DUMMY_WITH_COMMENT =
    `{
        /* some comment 
        block here */
        json: {
            key1: 'val1' // comment
        }
    }`;


export const JSON_MANDATORY = {
    MANDATORY_VAR: {
        isMandatory: true
    },
    NON_MANDATORY_VAR: {
        isMandatory: false
    }
}

export const JSON_REGEX_VALIDATOR = {
    VALIDATED_VAR: {
        customValidator: /^AB$/
    }
}