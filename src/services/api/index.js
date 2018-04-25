// @flow weak

import request                          from '../promisedHttpRequest';
import {
    userProfile,
    postEditInfoProfile
}                                       from './infoProfile';
import { selectProvince }               from './province';
import {
    postExperience,
    listExperience,
    deleteExperience,
}                                       from "./experience";

let API_URI = process.env.REACT_APP_API_URI;

export const postLogin = (email, password) => {
    const url = `${API_URI}login`;
    return request.post(url, { email, password });
};

export const postRegister = (name, email, password) => {
    const url = `${API_URI}register`;
    return request.post(url, { name, email, password });
};

export const postImg = (img) => {
    const url = `${API_URI}postImg`;
    return request.post(url, img);
};

export {
    userProfile,
    postEditInfoProfile,
    selectProvince,
    postExperience,
    listExperience,
    deleteExperience,
}
