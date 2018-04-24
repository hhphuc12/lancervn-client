// @flow weak
import moment from 'moment';
import { selectProvince } from '../services/api';
import {
    REQUEST_SELECT_PROVINCE,
    RECEIVED_SELECT_PROVINCE,
    ERROR_SELECT_PROVINCE,
} from "../constants/provinceType";
import { errorBadRequest } from './errorActions';

function requestSelectProvince(time = moment().format()) {
    return {
        type:       REQUEST_SELECT_PROVINCE,
        isFetching: true,
        time
    };
}
function receivedSelectProvince(provinces, time = moment().format()) {
    return {
        type:       RECEIVED_SELECT_PROVINCE,
        isFetching: false,
        provinces,
        time
    };
}
function errorSelectProvince(time = moment().format()) {
    return {
        type:       ERROR_SELECT_PROVINCE,
        isFetching: false,
        time
    };
}

export function getSelectProvinceIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetSelectProvince(getState())) {
            return dispatch(getSelectProvince());
        }
        return Promise.resolve('already fetching provinces...');
    }
}

function shouldGetSelectProvince(
    state: any
): boolean {
    const isFetching = state.province.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getSelectProvince() {
    return dispatch => {
        dispatch(requestSelectProvince());
        selectProvince()
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedSelectProvince(res.data));
            })
            .catch(error => {
                dispatch(errorSelectProvince(error));
                dispatch(errorBadRequest(400));
            });
    };
};
