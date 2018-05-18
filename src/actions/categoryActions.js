// @flow weak
import moment from 'moment';
import { postCategory, selectCategory, fullCategory } from '../services/api';
import {
    REQUEST_SELECT_CATEGORY,
    RECEIVED_SELECT_CATEGORY,
    ERROR_SELECT_CATEGORY,
    REQUEST_ADD_CATEGORY,
    RECEIVED_ADD_CATEGORY,
    ERROR_ADD_CATEGORY,
    REQUEST_FULL_CATEGORY,
    RECEIVED_FULL_CATEGORY,
    ERROR_FULL_CATEGORY,
} from "../constants/categoryType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestSelectCategory(time = moment().format()) {
    return {
        type:       REQUEST_SELECT_CATEGORY,
        isFetching: true,
        time
    };
}
function receivedSelectCategory(categories, time = moment().format()) {
    return {
        type:       RECEIVED_SELECT_CATEGORY,
        isFetching: false,
        categories,
        time
    };
}
function errorSelectCategory(time = moment().format()) {
    return {
        type:       ERROR_SELECT_CATEGORY,
        isFetching: false,
        time
    };
}

export function getSelectCategoryIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetSelectCategory(getState())) {
            return dispatch(getSelectCategory());
        }
        return Promise.resolve('already fetching categories...');
    }
}

function shouldGetSelectCategory(
    state: any
): boolean {
    const isFetching = state.category.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getSelectCategory() {
    return dispatch => {
        dispatch(requestSelectCategory());
        selectCategory()
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedSelectCategory(res.data));
            })
            .catch(error => {
                dispatch(errorSelectCategory(error));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestAddCategory(time = moment().format()) {
    return {
        type:       REQUEST_ADD_CATEGORY,
        isFetching: true,
        time
    };
}
function receivedAddCategory(time = moment().format()) {
    return {
        type:       RECEIVED_ADD_CATEGORY,
        isFetching: false,
        time
    };
}
function errorAddCategory(time = moment().format()) {
    return {
        type:       ERROR_ADD_CATEGORY,
        isFetching: false,
        time
    };
}

export function addCategoryIfNeed(category): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldAddCategory(getState())) {
            return dispatch(addCategory(category));
        }
        return Promise.resolve('already adding category...');
    }
}

function shouldAddCategory(
    state: any
): boolean {
    const isFetching = state.category.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function addCategory(category) {
    return dispatch => {
        dispatch(requestAddCategory());
        let userToken = auth.getToken();
        postCategory(category, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedAddCategory());
            })
            .catch(res => {
                dispatch(errorAddCategory(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestFullCategory(time = moment().format()) {
    return {
        type:       REQUEST_FULL_CATEGORY,
        isFetching: true,
        time
    };
}
function receivedFullCategory(fullCategories, time = moment().format()) {
    return {
        type:       RECEIVED_FULL_CATEGORY,
        isFetching: false,
        fullCategories,
        time
    };
}
function errorFullCategory(time = moment().format()) {
    return {
        type:       ERROR_FULL_CATEGORY,
        isFetching: false,
        time
    };
}

export function getFullCategoryIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetFullCategory(getState())) {
            return dispatch(getFullCategory());
        }
        return Promise.resolve('already fetching categories...');
    }
}

function shouldGetFullCategory(
    state: any
): boolean {
    const isFetching = state.category.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getFullCategory() {
    return dispatch => {
        dispatch(requestFullCategory());
        fullCategory()
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedFullCategory(res.data));
            })
            .catch(error => {
                dispatch(errorFullCategory(error));
                dispatch(errorBadRequest(400));
            });
    };
};
