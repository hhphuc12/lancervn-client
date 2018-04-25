// @flow weak
import moment from 'moment';
import { postExperience, listExperience } from '../services/api';
import {
    REQUEST_ADD_EXPERIENCE,
    RECEIVED_ADD_EXPERIENCE,
    ERROR_ADD_EXPERIENCE,
    REQUEST_LIST_EXPERIENCE,
    RECEIVED_LIST_EXPERIENCE,
    ERROR_LIST_EXPERIENCE,
    RESET_DATA_CHANGE_STATE,
} from "../constants/experienceType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestAddExperience(time = moment().format()) {
    return {
        type:       REQUEST_ADD_EXPERIENCE,
        isFetching: true,
        time
    };
}
function receivedAddExperience(time = moment().format()) {
    return {
        type:       RECEIVED_ADD_EXPERIENCE,
        isFetching: false,
        time
    };
}
function errorAddExperience(time = moment().format()) {
    return {
        type:       ERROR_ADD_EXPERIENCE,
        isFetching: false,
        time
    };
}

export function addExperienceIfNeed(experience): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldAddExperience(getState())) {
            return dispatch(addExperience(experience));
        }
        return Promise.resolve('already adding experience...');
    }
}

function shouldAddExperience(
    state: any
): boolean {
    const isFetching = state.experience.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function addExperience(experience) {
    return dispatch => {
        dispatch(requestAddExperience());
        let userToken = auth.getToken();
        postExperience(experience, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedAddExperience());
            })
            .catch(res => {
                dispatch(errorAddExperience(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestListExperience(time = moment().format()) {
    return {
        type:       REQUEST_LIST_EXPERIENCE,
        isFetching: true,
        time
    };
}
function receivedListExperience(experiences, time = moment().format()) {
    return {
        type:       RECEIVED_LIST_EXPERIENCE,
        isFetching: false,
        experiences,
        time
    };
}
function errorListExperience(time = moment().format()) {
    return {
        type:       ERROR_LIST_EXPERIENCE,
        isFetching: false,
        time
    };
}

export function getListExperienceIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetListExperience(getState())) {
            return dispatch(getListExperience());
        }
        return Promise.resolve('already fetching experience...');
    }
}

function shouldGetListExperience(
    state: any
): boolean {
    const isFetching = state.experience.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getListExperience() {
    return dispatch => {
        dispatch(requestListExperience());
        let userToken = auth.getToken();
        listExperience(userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedListExperience(res.data));
            })
            .catch(err => {
                dispatch(errorListExperience());
                dispatch(errorBadRequest(400));
            });
    };
};

export function resetDataChangeState(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
    ): any => {
        return dispatch({ type: RESET_DATA_CHANGE_STATE });
    }
}
