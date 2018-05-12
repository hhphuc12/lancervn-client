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

export const jobFreelanceDetail = id => {
    const url = `${API_URI}job-freelance-detail?id=${id}`;
    return request.get(url);
};

export const checkJobBelongToApi = (jobId, token) => {
    const url = `${API_URI}check-job-belong-to?jobId=${jobId}`;
    return request.get(url, token);
};

export const jobPosted = token => {
    const url = `${API_URI}job-posted`;
    return request.get(url, token);
};

export const jobPostedDetail = (id, token) => {
    const url = `${API_URI}job-posted-detail?id=${id}`;
    return request.get(url, token);
};
