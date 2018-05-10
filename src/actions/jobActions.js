// @flow weak
import moment from 'moment';
import { postJobApi, jobFreelance, jobFreelanceDetail } from '../services/api';
import {
    REQUEST_POST_JOB,
    RECEIVED_POST_JOB,
    ERROR_POST_JOB,
    REQUEST_JOB_FREELANCE,
    RECEIVED_JOB_FREELANCE,
    ERROR_JOB_FREELANCE,
    REQUEST_JOB_FREELANCE_DETAIL,
    RECEIVED_JOB_FREELANCE_DETAIL,
    ERROR_JOB_FREELANCE_DETAIL,
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
}

function requestJobFreelance(time = moment().format()) {
    return {
        type:       REQUEST_JOB_FREELANCE,
        isFetching: true,
        time
    };
}
function receivedJobFreelance(jobFreelance, time = moment().format()) {
    return {
        type:       RECEIVED_JOB_FREELANCE,
        isFetching: false,
        jobFreelance,
        time
    };
}
function errorJobFreelance(time = moment().format()) {
    return {
        type:       ERROR_JOB_FREELANCE,
        isFetching: false,
        time
    };
}

export function getJobFreelanceIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetJobFreelance(getState())) {
            return dispatch(getJobFreelance(id));
        }
        return Promise.resolve('already fetching job freelance...');
    }
}

function shouldGetJobFreelance(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getJobFreelance(id) {
    return dispatch => {
        dispatch(requestJobFreelance());
        jobFreelance(id)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedJobFreelance(res.data.docs));
            })
            .catch(res => {
                dispatch(errorJobFreelance(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestJobFreelanceDetail(time = moment().format()) {
    return {
        type:       REQUEST_JOB_FREELANCE_DETAIL,
        isFetching: true,
        time
    };
}
function receivedJobFreelanceDetail(jobFreelanceDetail, userProvince, isExpiredOffer, userPost, skill, time = moment().format()) {
    return {
        type:       RECEIVED_JOB_FREELANCE_DETAIL,
        isFetching: false,
        jobFreelanceDetail,
        userProvince,
        isExpiredOffer,
        userPost,
        skill,
        time
    };
}
function errorJobFreelanceDetail(time = moment().format()) {
    return {
        type:       ERROR_JOB_FREELANCE_DETAIL,
        isFetching: false,
        time
    };
}

export function getJobFreelanceDetailIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetJobFreelanceDetail(getState())) {
            return dispatch(getJobFreelanceDetail(id));
        }
        return Promise.resolve('already fetching job freelance detail...');
    }
}

function shouldGetJobFreelanceDetail(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getJobFreelanceDetail(id) {
    return dispatch => {
        dispatch(requestJobFreelanceDetail());
        jobFreelanceDetail(id)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                const {
                    job,
                    userProvince,
                    isExpiredOffer,
                    userPost,
                    skill,
                } = res.data;
                dispatch(receivedJobFreelanceDetail(job, userProvince, isExpiredOffer, userPost, skill));
            })
            .catch(res => {
                dispatch(errorJobFreelanceDetail(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}
