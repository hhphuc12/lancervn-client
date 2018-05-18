// @flow weak

import request                         from '../promisedHttpRequest';

let API_URI = process.env.REACT_APP_API_URI;

export const makeQuotationApi = (quotation, token) => {
    const url = `${API_URI}make-quotation`;
    return request.post(url, { quotation }, token);
};

export const quotationStatus = (job, token) => {
    const url = `${API_URI}quotation-status?jobId=${job}`;
    return request.get(url, token);
};

export const jobSentQuotation = token => {
    const url = `${API_URI}job-sent-quotation`;
    return request.get(url, token);
};
