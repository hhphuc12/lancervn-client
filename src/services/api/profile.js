// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const userProfile = token => {
    const url = `${API_URI}user-profile`;
    return request.get(url, token);
};

export const editProfile = user => {
    const url = `${API_URI}admin/edit-profile`;
    return request.post(url, { user });
};
