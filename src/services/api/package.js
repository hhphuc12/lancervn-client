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

export const homePackageDetail = id => {
    const url = `${API_URI}home-package-detail?id=${id}`;
    return request.get(url);
};

export const checkPackageBelongToApi = (packageId, token) => {
    const url = `${API_URI}check-package-belong-to?packageId=${packageId}`;
    return request.get(url, token);
};

export const listPackagePosted = token => {
    const url = `${API_URI}package-posted`;
    return request.get(url, token);
};
