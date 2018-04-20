// @flow weak
import moment from 'moment';
import auth from '../services/auth';
import { userProfile } from '../services/api';
import {
    REQUEST_INFO_PROFILE,
    RECEIVED_INFO_PROFILE,
    ERROR_INFO_PROFILE,
    REQUEST_EDIT_PROFILE,
    RECEIVED_EDIT_PROFILE,
    ERROR_EDIT_PROFILE
} from "../constants/profileType";
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
        return Promise.resolve('already fetching info profile...');
    }
}

function shouldGetInfoProfile(
    state: any
): boolean {
    const isFetching = state.profile.isFetching;
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

// function requestAddSkill(time = moment().format()) {
//     return {
//         type:       REQUEST_EDIT_PROFILE,
//         isFetching: true,
//         time
//     };
// }
// function receivedAddSkill(time = moment().format()) {
//     return {
//         type:       RECEIVED_EDIT_PROFILE,
//         isFetching: false,
//         time
//     };
// }
// function errorAddSkill(msg, time = moment().format()) {
//     return {
//         type:       ERROR_EDIT_PROFILE,
//         isFetching: false,
//         msg,
//         time
//     };
// }
//
// export function addSkillIfNeed(skill): (...any) => Promise<any> {
//     return (
//         dispatch: (any) => any,
//         getState: () => boolean,
//     ): any => {
//         if(shouldAddSkill(getState())) {
//             return dispatch(addSkill(skill));
//         }
//         return Promise.resolve('already fetching skill...');
//     }
// }
//
// function shouldAddSkill(
//     state: any
// ): boolean {
//     const isFetching = state.skill.isFetching;
//     if (isFetching) {
//         return false;
//     }
//     return true;
// }
//
// function addSkill(skill) {
//     return dispatch => {
//         dispatch(requestAddSkill());
//         postSkill(skill)
//             .then(res => {
//                 if (res.status !== 201)
//                     throw res;
//                 dispatch(receivedAddSkill());
//             })
//             .catch(res => {
//                 dispatch(errorAddSkill(res.error.message));
//                 dispatch(errorBadRequest(400));
//             });
//     };
// };
