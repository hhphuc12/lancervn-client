// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const makeOrderApi = (order, token) => {
    const url = `${API_URI}make-order`;
    return request.post(url, { order }, token);
};

export const orderStatus = (packageId, token) => {
    const url = `${API_URI}order-status?packageId=${packageId}`;
    return request.get(url, token);
};
