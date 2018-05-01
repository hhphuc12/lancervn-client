// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postLanguage = (language, token) => {
    const url = `${API_URI}add-language`;
    return request.post(url, { language }, token);
};

export const listLanguage = token => {
    const url = `${API_URI}list-language`;
    return request.get(url, token);
};

export const deleteLanguage = (id, token) => {
    const url = `${API_URI}delete-language`;
    return request.post(url, { id }, token);
};
