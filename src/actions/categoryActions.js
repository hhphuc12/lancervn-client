// @flow weak
import moment from 'moment';
import { selectCategory } from '../services/api';
import {
    REQUEST_SELECT_CATEGORY,
    RECEIVED_SELECT_CATEGORY,
    ERROR_SELECT_CATEGORY,
} from "../constants/categoryType";
import { errorBadRequest } from './errorActions';

function requestSelectCategory(time = moment().format()) {
    return {
        type:       REQUEST_SELECT_CATEGORY,
        isFetching: true,
        time
    };
}
function receivedSelectCategory(categories, time = moment().format()) {
    return {
        type:       RECEIVED_SELECT_CATEGORY,
        isFetching: false,
        categories,
        time
    };
}
function errorSelectCategory(time = moment().format()) {
    return {
        type:       ERROR_SELECT_CATEGORY,
        isFetching: false,
        time
    };
}

export function getSelectCategoryIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetSelectCategory(getState())) {
            return dispatch(getSelectCategory());
        }
        return Promise.resolve('already fetching categorys...');
    }
}

function shouldGetSelectCategory(
    state: any
): boolean {
    const isFetching = state.category.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getSelectCategory() {
    return dispatch => {
        dispatch(requestSelectCategory());
        selectCategory()
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedSelectCategory(res.data));
            })
            .catch(error => {
                dispatch(errorSelectCategory(error));
                dispatch(errorBadRequest(400));
            });
    };
};
