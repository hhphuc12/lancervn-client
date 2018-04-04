// @flow weak
export const validate = values => {
    const errors = {};
    const { email, password } = values;

    if (!email) {
        errors.email = 'Địa chỉ email là bắt buộc';
    }
    else {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = reg.test(email.toLowerCase());
        if (!isEmail) errors.email = 'Địa chỉ email không hợp lệ';
    }

    if (!password) {
        errors.password = 'Mật khẩu là bắt buộc';
    }

    return errors;
};
