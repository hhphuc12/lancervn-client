// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postEvaluateApi = (evaluate, token) => {
    const url = `${API_URI}post-evaluate`;
    return request.post(url, { evaluate }, token);
};
