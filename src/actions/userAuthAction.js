// @flow
import auth                   from '../services/auth';
import { postLogin }          from "../services/api";

import {
    DISCONNECT_USER,
    REQUEST_LOG_USER,
    RECEIVED_LOG_USER,
    ERROR_LOG_USER,
} from '../constants/userAuthType'
import moment from "moment";

/**
 *
 * set user isAuthenticated to false and clear all app localstorage:
 *
 * @export
 * @returns {action} action
 */
export function disconnectUser() {
    auth.clearAllAppStorage();
    return {
        type: DISCONNECT_USER
    };
}

/**
 *
 * check if user is connected by looking at locally stored
 * - token
 * - user fonrmation
 *
 * @export
 * @returns {action} action
 */

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

/**
 *
 *  user login
 *
 * @param {string} login user login
 * @param {string} password password
 * @returns {Promise<any>} promised action
 */
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

// function requestRegisterUser(time = moment().format()) {
//     return {
//         type:       REQUEST_REG_USER,
//         isFetching: true,
//         time
//     };
// }
// function receivedRegisterUser(data, time = moment().format()) {
//     return {
//         type:       RECEIVED_REG_USER,
//         isFetching: false,
//         data,
//         time
//     };
// }
// function errorRegisterUser(time = moment().format()) {
//     return {
//         type:       ERROR_REG_USER,
//         isFetching: false,
//         time
//     };
// }
//
// export function registerUser(
//     username: string,
//     email: string,
//     password: string,
//     confirm_password: string,
// ): (...any) => Promise<any> {
//     return (
//         dispatch: (any) => any,
//         getState: () => boolean,
//     ): any => {
//         if(shouldRegUser(getState())) {
//             return dispatch(regUser(
//                 username,
//                 email,
//                 password,
//                 confirm_password,
//             ));
//         }
//         return Promise.resolve('already logged in...');
//     }
// }
//
// function shouldRegUser(
//     state: any
// ): boolean {
//     const isRegistering = state.userAuth.isRegistering;
//     if (isRegistering) {
//         return false;
//     }
//     return true;
// }
//
// function regUser(
//     username,
//     email,
//     password,
//     confirm_password,
// ) {
//     return dispatch => {
//         dispatch(requestRegisterUser());
//         postRegister(
//             username,
//             email,
//             password,
//             confirm_password,
//         )
//             .then(
//                 data => dispatch(receivedRegisterUser(data)))
//             .catch(
//                 error => dispatch(errorRegisterUser(error))
//             );
//     };
// };
//
// // get user info
// function getUserInfoData(accessToken) {
//     return dispatch => {
//         dispatch(requestUserInfo());
//         getUserInfo(accessToken)
//             .then(
//                 res => {
//                     if (res.status !== 200)
//                         return dispatch(errorUserInfo());
//                     return dispatch(receivedUserInfo(res.data));
//                 }
//             )
//             .catch(
//                 error => dispatch(errorUserInfo())
//             );
//     };
// };
//
// export function fetchUserInfoDataIfNeeded(): (...any) => Promise<any> {
//     return (
//         dispatch: (any) => any,
//         getState: () => boolean
//     ): any => {
//         if (shouldGetUserInfo(getState())) {
//             const accessToken = auth.getToken();
//             if (accessToken) {
//                 const isTokenExpired =  auth.isExpiredToken(auth.getToken());
//                 if (!isTokenExpired)
//                     return dispatch(getUserInfoData(accessToken));
//             }
//             return dispatch(errorUserInfo());
//         }
//         return Promise.resolve('already logged in...');
//     };
// }
//
// export function resetUserStates(time = moment().format()) {
//     return {
//         type: RESET_USER_STATES,
//         time
//     };
// }
//
// function shouldGetUserInfo(
//     state: any
// ): boolean {
//     const isLogging = state.userAuth.isFetching;
//     if (isLogging) {
//         return false;
//     }
//     return true;
// }
