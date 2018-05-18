// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const listFreelancer = (page, categoryName) => {
    const url = `${API_URI}list-freelancer?page=${page}&categoryName=${categoryName}`;
    return request.get(url);
};

export const freelancerDetail = (id) => {
    const url = `${API_URI}freelancer-detail?id=${id}`;
    return request.get(url);
};
