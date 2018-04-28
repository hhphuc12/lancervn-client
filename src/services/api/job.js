// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postJobApi = (job, token) => {
    const url = `${API_URI}post-job`;
    return request.post(url, { job }, token);
};
