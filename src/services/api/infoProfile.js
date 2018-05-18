// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const userProfile = token => {
    const url = `${API_URI}info-profile`;
    return request.get(url, token);
};

export const postEditInfoProfile = (info, token) => {
    const url = `${API_URI}edit-info-profile`;
    return request.post(url, { info }, token);
};
