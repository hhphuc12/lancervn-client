// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const listFreelancer = (page, categoryName, search) => {
    const url = `${API_URI}list-freelancer?page=${page}&categoryName=${categoryName}&search=${search}`;
    return request.get(url);
};

export const freelancerDetail = id => {
    const url = `${API_URI}freelancer-detail?id=${id}`;
    return request.get(url);
};

export const dashboardInfo = token => {
    const url = `${API_URI}dashboard-info`;
    return request.get(url, token);
};

export const changePassword = (passObj, token) => {
    const url = `${API_URI}change-password`;
    return request.post(url, { passObj }, token);
};
