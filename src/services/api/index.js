// @flow weak

import request                          from '../promisedHttpRequest';
import {
    userProfile,
    postEditInfoProfile
}                                       from './infoProfile';
import { selectProvince }               from './province';
import {
    selectCategory,
    postCategory,
    userCategory,
}                                       from './category';
import { selectSkill }                  from './skill';
import {
    postExperience,
    listExperience,
    deleteExperience,
}                                       from "./experience";
import {
    postLanguage,
    listLanguage,
    deleteLanguage,
}                                       from "./language";
import {
    postProject,
    listProject,
    deleteProject,
}                                       from "./projectDone";
import {
    postLiteracy,
    listLiteracy,
    deleteLiteracy,
}                                       from './literacy';
import {
    postJobApi,
}                                       from './job';

let API_URI = process.env.REACT_APP_API_URI;

export const postLogin = (email, password) => {
    const url = `${API_URI}login`;
    return request.post(url, { email, password });
};

export const postRegister = (firstName, lastName, email, password) => {
    const url = `${API_URI}register`;
    return request.post(url, { firstName, lastName, email, password });
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
    postProject,
    listProject,
    deleteProject,
    selectCategory,
    postLiteracy,
    listLiteracy,
    deleteLiteracy,
    selectSkill,
    postJobApi,
    postCategory,
    userCategory,
    postLanguage,
    listLanguage,
    deleteLanguage,
}
