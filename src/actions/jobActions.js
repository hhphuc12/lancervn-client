// @flow weak
import moment from 'moment';
import {
    postJobApi,
    jobFreelance,
    jobFreelanceDetail,
    checkJobBelongToApi,
    jobPosted,
    jobPostedDetail,
    browseQuotationApi,
} from '../services/api';
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
    REQUEST_JOB_BELONG_TO,
    RECEIVED_JOB_BELONG_TO,
    ERROR_JOB_BELONG_TO,
    REQUEST_JOB_POSTED,
    RECEIVED_JOB_POSTED,
    ERROR_JOB_POSTED,
    REQUEST_JOB_POSTED_DETAIL,
    RECEIVED_JOB_POSTED_DETAIL,
    ERROR_JOB_POSTED_DETAIL,
    REQUEST_BROWSE_QUOTATION,
    RECEIVED_BROWSE_QUOTATION,
    ERROR_BROWSE_QUOTATION,
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

export function getJobFreelanceIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetJobFreelance(getState())) {
            return dispatch(getJobFreelance());
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

function getJobFreelance() {
    return dispatch => {
        dispatch(requestJobFreelance());
        jobFreelance()
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

function requestCheckJobBeLongTo(time = moment().format()) {
    return {
        type:       REQUEST_JOB_BELONG_TO,
        isFetching: true,
        time
    };
}
function receivedCheckJobBeLongTo(isBelongTo, time = moment().format()) {
    return {
        type:       RECEIVED_JOB_BELONG_TO,
        isFetching: false,
        isBelongTo,
        time
    };
}
function errorCheckJobBeLongTo(time = moment().format()) {
    return {
        type:       ERROR_JOB_BELONG_TO,
        isFetching: false,
        time
    };
}

export function checkJobBelongToIfNeed(jobId): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldCheckJobBelongTo(getState())) {
            return dispatch(checkJobBelongTo(jobId));
        }
        return Promise.resolve('already check job belong to...');
    }
}

function shouldCheckJobBelongTo(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function checkJobBelongTo(jobId) {
    return dispatch => {
        dispatch(requestCheckJobBeLongTo());
        const userToken = auth.getToken();
        checkJobBelongToApi(jobId, userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedCheckJobBeLongTo(res.data.isBelongTo));
            })
            .catch(error => {
                dispatch(errorCheckJobBeLongTo(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestJobPosted(time = moment().format()) {
    return {
        type:       REQUEST_JOB_POSTED,
        isFetching: true,
        time
    };
}
function receivedJobPosted(jobPosted, quotations, time = moment().format()) {
    return {
        type:       RECEIVED_JOB_POSTED,
        isFetching: false,
        jobPosted,
        quotations,
        time
    };
}
function errorJobPosted(time = moment().format()) {
    return {
        type:       ERROR_JOB_POSTED,
        isFetching: false,
        time
    };
}

export function getJobPostedIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetJobPosted(getState())) {
            return dispatch(getJobPosted());
        }
        return Promise.resolve('already fetching job freelance...');
    }
}

function shouldGetJobPosted(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getJobPosted() {
    return dispatch => {
        dispatch(requestJobPosted());
        const userToken = auth.getToken();
        jobPosted(userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedJobPosted(res.data.jobs, res.data.quotations));
            })
            .catch(res => {
                dispatch(errorJobPosted(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestJobPostedDetail(time = moment().format()) {
    return {
        type:       REQUEST_JOB_POSTED_DETAIL,
        isFetching: true,
        time
    };
}
function receivedJobPostedDetail(jobPostedDetail, quotationsDetail, quotationBrowsered, evaluate, time = moment().format()) {
    return {
        type:       RECEIVED_JOB_POSTED_DETAIL,
        isFetching: false,
        jobPostedDetail,
        quotationsDetail,
        quotationBrowsered,
        evaluate,
        time
    };
}
function errorJobPostedDetail(time = moment().format()) {
    return {
        type:       ERROR_JOB_POSTED_DETAIL,
        isFetching: false,
        time
    };
}

export function getJobPostedDetailIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetJobPostedDetail(getState())) {
            return dispatch(getJobPostedDetail(id));
        }
        return Promise.resolve('already fetching job posted detail...');
    }
}

function shouldGetJobPostedDetail(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getJobPostedDetail(id) {
    return dispatch => {
        dispatch(requestJobPostedDetail());
        const userToken = auth.getToken();
        jobPostedDetail(id, userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                const { job, quotations, quotationBrowsered, evaluate } = res.data;
                dispatch(receivedJobPostedDetail(job, quotations, quotationBrowsered, evaluate));
            })
            .catch(res => {
                dispatch(errorJobPostedDetail(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestBrowseQuotation(time = moment().format()) {
    return {
        type:       REQUEST_BROWSE_QUOTATION,
        isFetching: true,
        time
    };
}
function receivedBrowseQuotation(time = moment().format()) {
    return {
        type:       RECEIVED_BROWSE_QUOTATION,
        isFetching: false,
        time
    };
}
function errorBrowseQuotation(time = moment().format()) {
    return {
        type:       ERROR_BROWSE_QUOTATION,
        isFetching: false,
        time
    };
}

export function browseQuotationIfNeed(jobId, quotationId): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldBrowseQuotation(getState())) {
            return dispatch(browseQuotation(jobId, quotationId));
        }
        return Promise.resolve('already fetching job posted detail...');
    }
}

function shouldBrowseQuotation(
    state: any
): boolean {
    const isFetching = state.job.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function browseQuotation(jobId, quotationId) {
    return dispatch => {
        dispatch(requestBrowseQuotation());
        const userToken = auth.getToken();
        browseQuotationApi(jobId, quotationId, userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedBrowseQuotation());
            })
            .catch(res => {
                dispatch(errorBrowseQuotation(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
}
