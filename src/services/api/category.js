// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const selectCategory = () => {
    const url = `${API_URI}list-select-category`;
    return request.get(url);
};

export const postCategory = (category, token) => {
    const url = `${API_URI}add-category`;
    return request.post(url, { category }, token);
};

export const userCategory = token => {
    const url = `${API_URI}user-category`;
    return request.get(url, token);
};
