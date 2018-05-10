// @flow weak
import moment from 'moment';
import { listPackage, postPackageApi, homePackageDetail } from '../services/api';
import {
    REQUEST_POST_PACKAGE,
    RECEIVED_POST_PACKAGE,
    ERROR_POST_PACKAGE,
    REQUEST_LIST_PACKAGE,
    RECEIVED_LIST_PACKAGE,
    ERROR_LIST_PACKAGE,
    REQUEST_HOME_PACKAGE_DETAIL,
    RECEIVED_HOME_PACKAGE_DETAIL,
    ERROR_HOME_PACKAGE_DETAIL,
} from "../constants/packageType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestPostPackage(time = moment().format()) {
    return {
        type:       REQUEST_POST_PACKAGE,
        isFetching: true,
        time
    };
}
function receivedPostPackage(time = moment().format()) {
    return {
        type:       RECEIVED_POST_PACKAGE,
        isFetching: false,
        time
    };
}
function errorPostPackage(time = moment().format()) {
    return {
        type:       ERROR_POST_PACKAGE,
        isFetching: false,
        time
    };
}

export function postPackageIfNeed(_package): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldPostPackage(getState())) {
            return dispatch(postPackage(_package));
        }
        return Promise.resolve('already adding package...');
    }
}

function shouldPostPackage(
    state: any
): boolean {
    const isFetching = state._package.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function postPackage(_package) {
    return dispatch => {
        dispatch(requestPostPackage());
        let userToken = auth.getToken();
        postPackageApi(_package, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedPostPackage());
            })
            .catch(res => {
                dispatch(errorPostPackage(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestListPackages(time = moment().format()) {
    return {
        type:       REQUEST_LIST_PACKAGE,
        isFetching: true,
        time
    };
}
function receivedListPackages(packages, time = moment().format()) {
    return {
        type:       RECEIVED_LIST_PACKAGE,
        isFetching: false,
        packages,
        time
    };
}
function errorListPackages(time = moment().format()) {
    return {
        type:       ERROR_LIST_PACKAGE,
        isFetching: false,
        time
    };
}

export function getListPackageIfNeed(page, categoryName): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetListPackage(getState())) {
            return dispatch(getListPackage(page, categoryName));
        }
        return Promise.resolve('already fetching job freelance...');
    }
}

function shouldGetListPackage(
    state: any
): boolean {
    const isFetching = state._package.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getListPackage(page, categoryName) {
    return dispatch => {
        dispatch(requestListPackages());
        listPackage(page, categoryName)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedListPackages(res.data.docs));
            })
            .catch(res => {
                dispatch(errorListPackages(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestHomePackageDetail(time = moment().format()) {
    return {
        type:       REQUEST_HOME_PACKAGE_DETAIL,
        isFetching: true,
        time
    };
}
function receivedHomePackageDetail(_package, userPost, userProvince, process, dataNeed, time = moment().format()) {
    return {
        type:       RECEIVED_HOME_PACKAGE_DETAIL,
        isFetching: false,
        _package,
        userPost,
        userProvince,
        process,
        dataNeed,
        time
    };
}
function errorHomePackageDetail(time = moment().format()) {
    return {
        type:       ERROR_HOME_PACKAGE_DETAIL,
        isFetching: false,
        time
    };
}

export function getHomePackageDetailIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetHomePackageDetail(getState())) {
            return dispatch(getHomePackageDetail(id));
        }
        return Promise.resolve('already fetching package detail...');
    }
}

function shouldGetHomePackageDetail(
    state: any
): boolean {
    const isFetching = state._package.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getHomePackageDetail(id) {
    return dispatch => {
        dispatch(requestHomePackageDetail());
        homePackageDetail(id)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                const {
                    _package,
                    userPost,
                    userProvince,
                    process,
                    dataNeed,
                } = res.data;
                dispatch(receivedHomePackageDetail(_package, userPost, userProvince, process, dataNeed));
            })
            .catch(res => {
                dispatch(errorHomePackageDetail(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}
