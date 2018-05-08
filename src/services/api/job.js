// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postJobApi = (job, token) => {
    const url = `${API_URI}post-job`;
    return request.post(url, { job }, token);
};

export const jobFreelance = (page, categoryName) => {
    const url = `${API_URI}job-freelance?page=${page}&categoryName=${categoryName}`;
    return request.get(url);
};
