// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postPackageApi = (_package, token) => {
    const url = `${API_URI}post-package`;
    return request.post(url, { _package }, token);
};

export const listPackage = (page, categoryName) => {
    const url = `${API_URI}list-package?page=${page}&categoryName=${categoryName}`;
    return request.get(url);
};
