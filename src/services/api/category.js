// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const selectCategory = () => {
    const url = `${API_URI}list-select-category`;
    return request.get(url);
};
