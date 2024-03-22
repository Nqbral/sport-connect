// REGEX RULES
const REGEX_RULES = {
    USER_REGEX: /^[a-zA-Z][a-zA-Z0-9-_]{4,23}$/,
    PWD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    ALPHANUM_REGEX: /^[a-z\d\-_\s]+$/i,
    DIGIT_REGEX: /^\d+$/,
};

export default REGEX_RULES;
