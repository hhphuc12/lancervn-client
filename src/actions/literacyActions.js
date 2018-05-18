// @flow weak
import moment from 'moment';
import { postLiteracy, listLiteracy, deleteLiteracy } from '../services/api';
import {
    REQUEST_ADD_LITERACY,
    RECEIVED_ADD_LITERACY,
    ERROR_ADD_LITERACY,
    REQUEST_LIST_LITERACY,
    RECEIVED_LIST_LITERACY,
    ERROR_LIST_LITERACY,
    RESET_DATA_CHANGE_STATE,
    REQUEST_DELETE_LITERACY,
    RECEIVED_DELETE_LITERACY,
    ERROR_DELETE_LITERACY,
} from "../constants/literacyType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestAddLiteracy(time = moment().format()) {
    return {
        type:       REQUEST_ADD_LITERACY,
        isFetching: true,
        time
    };
}
function receivedAddLiteracy(time = moment().format()) {
    return {
        type:       RECEIVED_ADD_LITERACY,
        isFetching: false,
        time
    };
}
function errorAddLiteracy(time = moment().format()) {
    return {
        type:       ERROR_ADD_LITERACY,
        isFetching: false,
        time
    };
}

export function addLiteracyIfNeed(literacy): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldAddLiteracy(getState())) {
            return dispatch(addLiteracy(literacy));
        }
        return Promise.resolve('already adding literacy...');
    }
}

function shouldAddLiteracy(
    state: any
): boolean {
    const isFetching = state.literacy.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function addLiteracy(literacy) {
    return dispatch => {
        dispatch(requestAddLiteracy());
        let userToken = auth.getToken();
        postLiteracy(literacy, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedAddLiteracy());
            })
            .catch(res => {
                dispatch(errorAddLiteracy(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestListLiteracy(time = moment().format()) {
    return {
        type:       REQUEST_LIST_LITERACY,
        isFetching: true,
        time
    };
}
function receivedListLiteracy(literacies, time = moment().format()) {
    return {
        type:       RECEIVED_LIST_LITERACY,
        isFetching: false,
        literacies,
        time
    };
}
function errorListLiteracy(time = moment().format()) {
    return {
        type:       ERROR_LIST_LITERACY,
        isFetching: false,
        time
    };
}

export function getListLiteracyIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetListLiteracy(getState())) {
            return dispatch(getListLiteracy());
        }
        return Promise.resolve('already fetching literacy...');
    }
}

function shouldGetListLiteracy(
    state: any
): boolean {
    const isFetching = state.literacy.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getListLiteracy() {
    return dispatch => {
        dispatch(requestListLiteracy());
        let userToken = auth.getToken();
        listLiteracy(userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedListLiteracy(res.data));
            })
            .catch(err => {
                dispatch(errorListLiteracy());
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

function requestDeleteLiteracy(time = moment().format()) {
    return {
        type:       REQUEST_DELETE_LITERACY,
        isFetching: true,
        time
    };
}
function receivedDeleteLiteracy(time = moment().format()) {
    return {
        type:       RECEIVED_DELETE_LITERACY,
        isFetching: false,
        time
    };
}
function errorDeleteLiteracy(time = moment().format()) {
    return {
        type:       ERROR_DELETE_LITERACY,
        isFetching: false,
        time
    };
}

export function deleteLiteracyIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldDeleteLiteracy(getState())) {
            return dispatch(delLiteracy(id));
        }
        return Promise.resolve('already adding literacy...');
    }
}

function shouldDeleteLiteracy(
    state: any
): boolean {
    const isFetching = state.literacy.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function delLiteracy(id) {
    return dispatch => {
        dispatch(requestDeleteLiteracy());
        let userToken = auth.getToken();
        deleteLiteracy(id, userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedDeleteLiteracy());
            })
            .catch(res => {
                dispatch(errorDeleteLiteracy(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};
