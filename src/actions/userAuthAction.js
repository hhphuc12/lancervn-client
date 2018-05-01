// @flow
import auth                   from '../services/auth';
import {
    postLogin,
    postRegister,
}                             from "../services/api";

import {
    LOG_OUT_USER,
    REQUEST_LOG_USER,
    RECEIVED_LOG_USER,
    ERROR_LOG_USER,
    REQUEST_REG_USER,
    RECEIVED_REG_USER,
    ERROR_REG_USER,
} from '../constants/userAuthType'
import moment from "moment";

export function onLogout() {
    auth.clearAllAppStorage();
    return {
        type: LOG_OUT_USER
    };
}

function requestLoginUser(time = moment().format()) {
    return {
        type:       REQUEST_LOG_USER,
        isFetching: true,
        time
    };
}
function receivedLoginUser(data, time = moment().format()) {
    return {
        type:       RECEIVED_LOG_USER,
        isFetching: false,
        data,
        time
    };
}

function errorLoginUser(msg, time = moment().format()) {
    return {
        type:       ERROR_LOG_USER,
        isFetching: false,
        msg,
        time
    }
}

function logUser(email, password) {
    return dispatch => {
        dispatch(requestLoginUser());
        postLogin(email, password)
            .then(
                res => {
                    if(res.status !== 200)
                        throw res;

                    dispatch(receivedLoginUser(res.data))
                }
            )
            .catch(
                res => dispatch(errorLoginUser(res.error.message))
            );
    };
};

export function logUserIfNeed(
    email: string,
    password: string
): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean
    ): any => {
        if (shouldLogUser(getState())) {
            return dispatch(logUser(email, password));
        }
        return Promise.resolve('Already logged in!');
    };
}

function shouldLogUser(
    state: any
): boolean {
    const isLogging = state.userAuth.isLogging;
    if (isLogging) {
        return false;
    }
    return true;
}

function requestRegisterUser(time = moment().format()) {
    return {
        type:       REQUEST_REG_USER,
        isFetching: true,
        time
    };
}
function receivedRegisterUser(time = moment().format()) {
    return {
        type:       RECEIVED_REG_USER,
        isFetching: false,
        time
    };
}
function errorRegisterUser(msg, time = moment().format()) {
    return {
        type:       ERROR_REG_USER,
        isFetching: false,
        msg,
        time
    }
}

function regUser(firstName, lastName, email, password) {
    return dispatch => {
        dispatch(requestRegisterUser());
        postRegister(firstName, lastName, email, password)
            .then(
                res => {
                    if(res.status !== 201)
                        throw res;

                    dispatch(receivedRegisterUser())
                }
            )
            .catch(
                res => dispatch(errorRegisterUser(res.error.message))
            );
    };
};

export function regUserIfNeed(
    firstName: string,
    lastName: string,
    email: string,
    password: string
): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean
    ): any => {
        if (shouldRegUser(getState())) {
            return dispatch(regUser(firstName, lastName, email, password));
        }
        return Promise.resolve('Already registered!');
    };
}

function shouldRegUser(
    state: any
): boolean {
    const isRegistering = state.userAuth.isRegistering;
    if (isRegistering) {
        return false;
    }
    return true;
}

// export function resetUserStates(time = moment().format()) {
//     return {
//         type: RESET_USER_STATES,
//         time
//     };
// }
