// @flow weak
export const validate = values => {
    const errors = {};
    const { firstName, lastName, email, password, confirmPassword } = values;

    if (!firstName) {
        errors.name = 'Họ là bắt buộc';
    }
    if (!lastName) {
        errors.name = 'Chữ lót và tên là bắt buộc';
    }

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
    else if (password.length < 6) {
        errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }

    if (!confirmPassword || password !== confirmPassword) {
        errors.confirmPassword = 'Xác nhận mật khẩu không đúng';
    }

    return errors;
};
