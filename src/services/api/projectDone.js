// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postProject = (project, token) => {
    const url = `${API_URI}create-project`;
    return request.post(url, { project }, token);
};

export const listProject = token => {
    const url = `${API_URI}list-project`;
    return request.get(url, token);
};

export const deleteProject = (id, token) => {
    const url = `${API_URI}delete-project`;
    return request.post(url, { id }, token);
};
