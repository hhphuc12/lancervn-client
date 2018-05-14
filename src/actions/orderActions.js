// @flow weak
import moment from 'moment';
import { makeOrderApi, orderStatus, packageOrdered } from '../services/api';
import {
    REQUEST_MAKE_ORDER,
    RECEIVED_MAKE_ORDER,
    ERROR_MAKE_ORDER,
    REQUEST_ORDER_STATUS,
    RECEIVED_ORDER_STATUS,
    ERROR_ORDER_STATUS,
    REQUEST_PACKAGE_ORDERED,
    RECEIVED_PACKAGE_ORDERED,
    ERROR_PACKAGE_ORDERED,
} from "../constants/orderType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestMakeOrder(time = moment().format()) {
    return {
        type:       REQUEST_MAKE_ORDER,
        isFetching: true,
        time
    };
}
function receivedMakeOrder(time = moment().format()) {
    return {
        type:       RECEIVED_MAKE_ORDER,
        isFetching: false,
        time
    };
}
function errorMakeOrder(time = moment().format()) {
    return {
        type:       ERROR_MAKE_ORDER,
        isFetching: false,
        time
    };
}

export function makeOrderIfNeed(order): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldMakeOrder(getState())) {
            return dispatch(makeOrder(order));
        }
        return Promise.resolve('already making order...');
    }
}

function shouldMakeOrder(
    state: any
): boolean {
    const isFetching = state.order.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function makeOrder(order) {
    return dispatch => {
        dispatch(requestMakeOrder());
        const userToken = auth.getToken();
        makeOrderApi(order, userToken)
            .then(res => {
                if (res.status !== 201)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedMakeOrder());
            })
            .catch(error => {
                dispatch(errorMakeOrder(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestOrderStatus(time = moment().format()) {
    return {
        type:       REQUEST_ORDER_STATUS,
        isFetching: true,
        time
    };
}
function receivedOrderStatus(isOrderMade, time = moment().format()) {
    return {
        type:       RECEIVED_ORDER_STATUS,
        isFetching: false,
        isOrderMade,
        time
    };
}
function errorOrderStatus(time = moment().format()) {
    return {
        type:       ERROR_ORDER_STATUS,
        isFetching: false,
        time
    };
}

export function getOrderStatusIfNeed(packageId): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetOrderStatus(getState())) {
            return dispatch(getOrderStatus(packageId));
        }
        return Promise.resolve('already fetching order status...');
    }
}

function shouldGetOrderStatus(
    state: any
): boolean {
    const isFetching = state.order.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getOrderStatus(packageId) {
    return dispatch => {
        dispatch(requestOrderStatus());
        const userToken = auth.getToken();
        orderStatus(packageId, userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedOrderStatus(res.data.isOrdered));
            })
            .catch(error => {
                dispatch(errorOrderStatus(error));
                dispatch(errorBadRequest(400));
            });
    };
}

function requestPackageOrdered(time = moment().format()) {
    return {
        type:       REQUEST_PACKAGE_ORDERED,
        isFetching: true,
        time
    };
}
function receivedPackageOrdered(packageOrdered, time = moment().format()) {
    return {
        type:       RECEIVED_PACKAGE_ORDERED,
        isFetching: false,
        packageOrdered,
        time
    };
}
function errorPackageOrdered(time = moment().format()) {
    return {
        type:       ERROR_PACKAGE_ORDERED,
        isFetching: false,
        time
    };
}

export function getPackageOrderedIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetPackageOrdered(getState())) {
            return dispatch(getPackageOrdered());
        }
        return Promise.resolve('already fetching package ordered...');
    }
}

function shouldGetPackageOrdered(
    state: any
): boolean {
    const isFetching = state.order.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getPackageOrdered() {
    return dispatch => {
        dispatch(requestPackageOrdered());
        const userToken = auth.getToken();
        packageOrdered(userToken)
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedPackageOrdered(res.data));
            })
            .catch(error => {
                dispatch(errorPackageOrdered(error));
                dispatch(errorBadRequest(400));
            });
    };
}
