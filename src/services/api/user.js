// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const listFreelancer = (page, categoryName) => {
    const url = `${API_URI}list-freelancer?page=${page}&categoryName=${categoryName}`;
    console.log({ url });
    return request.get(url);
};
