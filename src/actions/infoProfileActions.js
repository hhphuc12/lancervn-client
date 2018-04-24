// @flow weak
import moment from 'moment';
import auth from '../services/auth';
import { userProfile, postEditInfoProfile, listProvince } from '../services/api';
import {
    REQUEST_INFO_PROFILE,
    RECEIVED_INFO_PROFILE,
    ERROR_INFO_PROFILE,
    REQUEST_EDIT_INFO_PROFILE,
    RECEIVED_EDIT_INFO_PROFILE,
    ERROR_EDIT_INFO_PROFILE,
} from "../constants/infoProfileType";
import { errorBadRequest } from './errorActions';

function requestInfoProfile(time = moment().format()) {
    return {
        type:       REQUEST_INFO_PROFILE,
        isFetching: true,
        time
    };
}
function receivedInfoProfile(info, time = moment().format()) {
    return {
        type:       RECEIVED_INFO_PROFILE,
        isFetching: false,
        info,
        time
    };
}
function errorInfoProfile(time = moment().format()) {
    return {
        type:       ERROR_INFO_PROFILE,
        isFetching: false,
        time
    };
}

export function getInfoProfileIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetInfoProfile(getState())) {
            return dispatch(getInfoProfile());
        }
        return Promise.resolve('already fetching info Profile...');
    }
}

function shouldGetInfoProfile(
    state: any
): boolean {
    const isFetching = state.infoProfile.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getInfoProfile() {
    return dispatch => {
        dispatch(requestInfoProfile());
        let userToken = auth.getToken();
        userProfile(userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedInfoProfile(res.data));
            })
            .catch(error => {
                dispatch(errorInfoProfile(error));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestEditInfoProfile(time = moment().format()) {
    return {
        type:       REQUEST_EDIT_INFO_PROFILE,
        isFetching: true,
        time
    };
}
function receivedEditInfoProfile(time = moment().format()) {
    return {
        type:       RECEIVED_EDIT_INFO_PROFILE,
        isFetching: false,
        time
    };
}
function errorEditInfoProfile(msg, time = moment().format()) {
    return {
        type:       ERROR_EDIT_INFO_PROFILE,
        isFetching: false,
        msg,
        time
    };
}

export function editInfoProfileIfNeed(profile): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldEditProfile(getState())) {
            return dispatch(editInfoProfile(profile));
        }
        return Promise.resolve('already editing info profile...');
    }
}

function shouldEditProfile(
    state: any
): boolean {
    const isFetching = state.infoProfile.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function editInfoProfile(profile) {
    return dispatch => {
        dispatch(requestEditInfoProfile());
        let userToken = auth.getToken();
        postEditInfoProfile(profile, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedEditInfoProfile());
            })
            .catch(res => {
                dispatch(errorEditInfoProfile(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}
