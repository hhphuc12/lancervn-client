// @flow weak
import moment from 'moment';
import { userCategory, listFreelancer, freelancerDetail, dashboardInfo } from '../services/api';
import {
    ERROR_USER_CATEGORY,
    RECEIVED_USER_CATEGORY,
    REQUEST_USER_CATEGORY,
    REQUEST_LIST_FREELANCER,
    RECEIVED_LIST_FREELANCER,
    ERROR_LIST_FREELANCER,
    REQUEST_FREELANCER_DETAIL,
    RECEIVED_FREELANCER_DETAIL,
    ERROR_FREELANCER_DETAIL,
    REQUEST_DASHBOARD_INFO,
    RECEIVED_DASHBOARD_INFO,
    ERROR_DASHBOARD_INFO,
} from "../constants/userType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestUserCategory(time = moment().format()) {
    return {
        type:       REQUEST_USER_CATEGORY,
        isFetching: true,
        time
    };
}
function receivedUserCategory(userCategories, time = moment().format()) {
    return {
        type:       RECEIVED_USER_CATEGORY,
        isFetching: false,
        userCategories,
        time
    };
}
function errorUserCategory(time = moment().format()) {
    return {
        type:       ERROR_USER_CATEGORY,
        isFetching: false,
        time
    };
}

export function getUserCategoryIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetUserCategory(getState())) {
            return dispatch(getUserCategory());
        }
        return Promise.resolve('already fetching user categories...');
    }
}

function shouldGetUserCategory(
    state: any
): boolean {
    const isFetching = state.user.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getUserCategory() {
    return dispatch => {
        dispatch(requestUserCategory());
        let userToken = auth.getToken();
        userCategory(userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedUserCategory(res.data));
            })
            .catch(error => {
                dispatch(errorUserCategory(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestListFreelancer(time = moment().format()) {
    return {
        type:       REQUEST_LIST_FREELANCER,
        isFetching: true,
        time
    };
}
function receivedListFreelancer(listFreelancer, time = moment().format()) {
    return {
        type:       RECEIVED_LIST_FREELANCER,
        isFetching: false,
        listFreelancer,
        time
    };
}
function errorListFreelancer(time = moment().format()) {
    return {
        type:       ERROR_LIST_FREELANCER,
        isFetching: false,
        time
    };
}

export function getListFreelancerIfNeed(page, categoryName): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetListFreelancer(getState())) {
            return dispatch(getListFreelancer(page, categoryName));
        }
        return Promise.resolve('already fetching list freelancer...');
    }
}

function shouldGetListFreelancer(
    state: any
): boolean {
    const isFetching = state.user.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getListFreelancer(page, categoryName) {
    return dispatch => {
        dispatch(requestListFreelancer());
        listFreelancer(page, categoryName)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedListFreelancer(res.data.docs));
            })
            .catch(error => {
                dispatch(errorListFreelancer(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestFreelancerDetail(time = moment().format()) {
    return {
        type:       REQUEST_FREELANCER_DETAIL,
        isFetching: true,
        time
    };
}
function receivedFreelancerDetail(freelancer, time = moment().format()) {
    return {
        type:       RECEIVED_FREELANCER_DETAIL,
        isFetching: false,
        freelancer,
        time
    };
}
function errorFreelancerDetail(time = moment().format()) {
    return {
        type:       ERROR_FREELANCER_DETAIL,
        isFetching: false,
        time
    };
}

export function getFreelancerDetailIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetFreelancerDetail(getState())) {
            return dispatch(getFreelancerDetail(id));
        }
        return Promise.resolve('already fetching freelancer detail...');
    }
}

function shouldGetFreelancerDetail(
    state: any
): boolean {
    const isFetching = state.user.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getFreelancerDetail(id) {
    return dispatch => {
        dispatch(requestFreelancerDetail());
        freelancerDetail(id)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedFreelancerDetail(res.data));
            })
            .catch(error => {
                dispatch(errorFreelancerDetail(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestDashboardInfo(time = moment().format()) {
    return {
        type:       REQUEST_DASHBOARD_INFO,
        isFetching: true,
        time
    };
}
function receivedDashboardInfo(dashboardInfo, time = moment().format()) {
    return {
        type:       RECEIVED_DASHBOARD_INFO,
        isFetching: false,
        dashboardInfo,
        time
    };
}
function errorDashboardInfo(time = moment().format()) {
    return {
        type:       ERROR_DASHBOARD_INFO,
        isFetching: false,
        time
    };
}

export function getDashboardInfoIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetDashboardInfo(getState())) {
            return dispatch(getDashboardInfo());
        }
        return Promise.resolve('already fetching dashboard info...');
    }
}

function shouldGetDashboardInfo(
    state: any
): boolean {
    const isFetching = state.user.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getDashboardInfo() {
    return dispatch => {
        dispatch(requestDashboardInfo());
        const userToken = auth.getToken();
        dashboardInfo(userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedDashboardInfo(res.data));
            })
            .catch(error => {
                dispatch(errorDashboardInfo(error));
                dispatch(errorBadRequest(400));
            });
    };
}
