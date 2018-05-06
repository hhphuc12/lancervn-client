// @flow weak
import moment from 'moment';
import { userCategory, listFreelancer } from '../services/api';
import {
    ERROR_USER_CATEGORY,
    RECEIVED_USER_CATEGORY,
    REQUEST_USER_CATEGORY,
    REQUEST_LIST_FREELANCER,
    RECEIVED_LIST_FREELANCER,
    ERROR_LIST_FREELANCER,
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
};

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
};
