// @flow weak
import moment from 'moment';
import { postJobApi } from '../services/api';
import {
    REQUEST_POST_JOB,
    RECEIVED_POST_JOB,
    ERROR_POST_JOB,
} from "../constants/jobType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestPostJob(time = moment().format()) {
    return {
        type:       REQUEST_POST_JOB,
        isFetching: true,
        time
    };
}
function receivedPostJob(time = moment().format()) {
    return {
        type:       RECEIVED_POST_JOB,
        isFetching: false,
        time
    };
}
function errorPostJob(time = moment().format()) {
    return {
        type:       ERROR_POST_JOB,
        isFetching: false,
        time
    };
}

export function postJobIfNeed(job): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldPostJob(getState())) {
            return dispatch(postJob(job));
        }
        return Promise.resolve('already adding job...');
    }
}

function shouldPostJob(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function postJob(job) {
    return dispatch => {
        dispatch(requestPostJob());
        let userToken = auth.getToken();
        postJobApi(job, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedPostJob());
            })
            .catch(res => {
                dispatch(errorPostJob(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};
