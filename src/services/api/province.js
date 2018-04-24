// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const selectProvince = token => {
    const url = `${API_URI}list-select-province`;
    return request.get(url, token);
};
