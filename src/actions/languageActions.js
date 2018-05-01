// @flow weak
import moment from 'moment';
import { postLanguage, listLanguage, deleteLanguage } from '../services/api';
import {
    REQUEST_ADD_LANGUAGE,
    RECEIVED_ADD_LANGUAGE,
    ERROR_ADD_LANGUAGE,
    REQUEST_LIST_LANGUAGE,
    RECEIVED_LIST_LANGUAGE,
    ERROR_LIST_LANGUAGE,
    RESET_DATA_CHANGE_STATE,
    REQUEST_DELETE_LANGUAGE,
    RECEIVED_DELETE_LANGUAGE,
    ERROR_DELETE_LANGUAGE,
} from "../constants/languageType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestAddLanguage(time = moment().format()) {
    return {
        type:       REQUEST_ADD_LANGUAGE,
        isFetching: true,
        time
    };
}
function receivedAddLanguage(time = moment().format()) {
    return {
        type:       RECEIVED_ADD_LANGUAGE,
        isFetching: false,
        time
    };
}
function errorAddLanguage(time = moment().format()) {
    return {
        type:       ERROR_ADD_LANGUAGE,
        isFetching: false,
        time
    };
}

export function addLanguageIfNeed(language): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldAddLanguage(getState())) {
            return dispatch(addLanguage(language));
        }
        return Promise.resolve('already adding language...');
    }
}

function shouldAddLanguage(
    state: any
): boolean {
    const isFetching = state.language.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function addLanguage(language) {
    return dispatch => {
        dispatch(requestAddLanguage());
        let userToken = auth.getToken();
        postLanguage(language, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedAddLanguage());
            })
            .catch(res => {
                dispatch(errorAddLanguage(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestListLanguage(time = moment().format()) {
    return {
        type:       REQUEST_LIST_LANGUAGE,
        isFetching: true,
        time
    };
}
function receivedListLanguage(languages, time = moment().format()) {
    return {
        type:       RECEIVED_LIST_LANGUAGE,
        isFetching: false,
        languages,
        time
    };
}
function errorListLanguage(time = moment().format()) {
    return {
        type:       ERROR_LIST_LANGUAGE,
        isFetching: false,
        time
    };
}

export function getListLanguageIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetListLanguage(getState())) {
            return dispatch(getListLanguage());
        }
        return Promise.resolve('already fetching language...');
    }
}

function shouldGetListLanguage(
    state: any
): boolean {
    const isFetching = state.language.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getListLanguage() {
    return dispatch => {
        dispatch(requestListLanguage());
        let userToken = auth.getToken();
        listLanguage(userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedListLanguage(res.data));
            })
            .catch(err => {
                dispatch(errorListLanguage());
                dispatch(errorBadRequest(400));
            });
    };
};

export function resetDataChangeState(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
    ): any => {
        return dispatch({ type: RESET_DATA_CHANGE_STATE });
    }
}

function requestDeleteLanguage(time = moment().format()) {
    return {
        type:       REQUEST_DELETE_LANGUAGE,
        isFetching: true,
        time
    };
}
function receivedDeleteLanguage(time = moment().format()) {
    return {
        type:       RECEIVED_DELETE_LANGUAGE,
        isFetching: false,
        time
    };
}
function errorDeleteLanguage(time = moment().format()) {
    return {
        type:       ERROR_DELETE_LANGUAGE,
        isFetching: false,
        time
    };
}

export function deleteLanguageIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldDeleteLanguage(getState())) {
            return dispatch(delLanguage(id));
        }
        return Promise.resolve('already deleting language...');
    }
}

function shouldDeleteLanguage(
    state: any
): boolean {
    const isFetching = state.language.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function delLanguage(id) {
    return dispatch => {
        dispatch(requestDeleteLanguage());
        let userToken = auth.getToken();
        deleteLanguage(id, userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedDeleteLanguage());
            })
            .catch(res => {
                dispatch(errorDeleteLanguage(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};
