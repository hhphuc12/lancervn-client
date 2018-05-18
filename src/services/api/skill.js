// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const selectSkill = () => {
    const url = `${API_URI}list-select-skill`;
    return request.get(url);
};
