// @flow weak
export const validate = values => {
    const errors = {};
    const { email, password } = values;

    if (!email) {
        errors.email = 'Email is required';
    }
    else {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = reg.test(email.toLowerCase());
        if (!isEmail) errors.email = 'Email is invalid';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return errors;
};
