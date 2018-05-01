// @flow weak
import moment from 'moment';
import { userCategory } from '../services/api';
import {
    ERROR_USER_CATEGORY,
    RECEIVED_USER_CATEGORY,
    REQUEST_USER_CATEGORY,
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
