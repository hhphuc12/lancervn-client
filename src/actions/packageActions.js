// @flow weak
import moment from 'moment';
import { postPackageApi, } from '../services/api';
import {
    REQUEST_POST_PACKAGE,
    RECEIVED_POST_PACKAGE,
    ERROR_POST_PACKAGE,
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
