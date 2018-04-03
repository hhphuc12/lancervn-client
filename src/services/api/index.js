// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postLogin = (email, password) => {
    const url = `${API_URI}login`;
    return request.post(url, { email, password });
};
