// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postLiteracy = (literacy, token) => {
    const url = `${API_URI}create-literacy`;
    return request.post(url, { literacy }, token);
};

export const listLiteracy = token => {
    const url = `${API_URI}list-literacy`;
    return request.get(url, token);
};

export const deleteLiteracy = (id, token) => {
    const url = `${API_URI}delete-literacy`;
    return request.post(url, { id }, token);
};
