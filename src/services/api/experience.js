// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const postExperience = (experience, token) => {
    const url = `${API_URI}create-experience`;
    return request.post(url, { experience }, token);
};

export const listExperience = token => {
    const url = `${API_URI}list-experience`;
    return request.get(url, token);
};

export const deleteExperience = (id, token) => {
    const url = `${API_URI}delete-experience`;
    return request.post(url, { id }, token);
};
