// @flow weak
import moment from 'moment';
import { postEvaluateApi } from '../services/api';
import {
    RECEIVED_POST_EVALUATE,
    REQUEST_POST_EVALUATE,
    ERROR_POST_EVALUATE,
    RESET_POST_EVALUATE_STATE,
} from "../constants/evaluateType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestPostEvaluate(time = moment().format()) {
    return {
        type:       REQUEST_POST_EVALUATE,
        isFetching: true,
        time
    };
}
function receivedPostEvaluate(time = moment().format()) {
    return {
        type:       RECEIVED_POST_EVALUATE,
        isFetching: false,
        time
    };
}
function errorPostEvaluate(time = moment().format()) {
    return {
        type:       ERROR_POST_EVALUATE,
        isFetching: false,
        time
    };
}

export function postEvaluateIfNeed(evaluate): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldPostEvaluate(getState())) {
            return dispatch(postEvaluate(evaluate));
        }
        return Promise.resolve('already posting evaluate...');
    }
}

function shouldPostEvaluate(
    state: any
): boolean {
    const isFetching = state.evaluate.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function postEvaluate(evaluate) {
    return dispatch => {
        dispatch(requestPostEvaluate());
        const userToken = auth.getToken();
        postEvaluateApi(evaluate, userToken)
            .then(res => {
                if (res.status !== 201)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedPostEvaluate());
            })
            .catch(error => {
                dispatch(errorPostEvaluate(error));
                dispatch(errorBadRequest(400));
            });
    };
};

export function resetPostEvaluateState(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        return dispatch({
            type:       RESET_POST_EVALUATE_STATE,
            isFetching: false,
            time: moment().format()
        });
    }
}
