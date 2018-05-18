// @flow weak
import moment from 'moment';
import { makeQuotationApi, quotationStatus, jobSentQuotation } from '../services/api';
import {
    REQUEST_MAKE_QUOTATION,
    RECEIVED_MAKE_QUOTATION,
    ERROR_MAKE_QUOTATION,
    REQUEST_QUOTATION_STATUS,
    RECEIVED_QUOTATION_STATUS,
    ERROR_QUOTATION_STATUS,
    REQUEST_JOB_SENT_QUOTATION,
    RECEIVED_JOB_SENT_QUOTATION,
    ERROR_JOB_SENT_QUOTATION,
} from "../constants/quotationType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestMakeQuotation(time = moment().format()) {
    return {
        type:       REQUEST_MAKE_QUOTATION,
        isFetching: true,
        time
    };
}
function receivedMakeQuotation(time = moment().format()) {
    return {
        type:       RECEIVED_MAKE_QUOTATION,
        isFetching: false,
        time
    };
}
function errorMakeQuotation(time = moment().format()) {
    return {
        type:       ERROR_MAKE_QUOTATION,
        isFetching: false,
        time
    };
}

export function makeQuotationIfNeed(quotation): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldMakeQuotation(getState())) {
            return dispatch(makeQuotation(quotation));
        }
        return Promise.resolve('already making quotation...');
    }
}

function shouldMakeQuotation(
    state: any
): boolean {
    const isFetching = state.quotation.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function makeQuotation(quotation) {
    return dispatch => {
        dispatch(requestMakeQuotation());
        const userToken = auth.getToken();
        makeQuotationApi(quotation, userToken)
            .then(res => {
                if (res.status !== 201)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedMakeQuotation());
            })
            .catch(error => {
                dispatch(errorMakeQuotation(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestQuotationStatus(time = moment().format()) {
    return {
        type:       REQUEST_QUOTATION_STATUS,
        isFetching: true,
        time
    };
}
function receivedQuotationStatus(isQuotationMade, time = moment().format()) {
    return {
        type:       RECEIVED_QUOTATION_STATUS,
        isFetching: false,
        isQuotationMade,
        time
    };
}
function errorQuotationStatus(time = moment().format()) {
    return {
        type:       ERROR_QUOTATION_STATUS,
        isFetching: false,
        time
    };
}

export function getQuotationStatusIfNeed(jobId): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetQuotationStatus(getState())) {
            return dispatch(getQuotationStatus(jobId));
        }
        return Promise.resolve('already fetching quotation status...');
    }
}

function shouldGetQuotationStatus(
    state: any
): boolean {
    const isFetching = state.quotation.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getQuotationStatus(jobId) {
    return dispatch => {
        dispatch(requestQuotationStatus());
        const userToken = auth.getToken();
        quotationStatus(jobId, userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedQuotationStatus(res.data.isMade));
            })
            .catch(error => {
                dispatch(errorQuotationStatus(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestJobSentQuotation(time = moment().format()) {
    return {
        type:       REQUEST_JOB_SENT_QUOTATION,
        isFetching: true,
        time
    };
}
function receivedJobSentQuotation(jobSentQuotation, time = moment().format()) {
    return {
        type:       RECEIVED_JOB_SENT_QUOTATION,
        isFetching: false,
        jobSentQuotation,
        time
    };
}
function errorJobSentQuotation(time = moment().format()) {
    return {
        type:       ERROR_JOB_SENT_QUOTATION,
        isFetching: false,
        time
    };
}

export function getJobSentQuotationIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetJobSentQuotation(getState())) {
            return dispatch(getJobSentQuotation());
        }
        return Promise.resolve('already fetching quotation status...');
    }
}

function shouldGetJobSentQuotation(
    state: any
): boolean {
    const isFetching = state.quotation.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getJobSentQuotation() {
    return dispatch => {
        dispatch(requestJobSentQuotation());
        const userToken = auth.getToken();
        jobSentQuotation(userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedJobSentQuotation(res.data));
            })
            .catch(error => {
                dispatch(errorJobSentQuotation(error));
                dispatch(errorBadRequest(400));
            });
    };
}
