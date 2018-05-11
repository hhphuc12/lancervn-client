// @flow weak
import {
    REQUEST_MAKE_QUOTATION,
    RECEIVED_MAKE_QUOTATION,
    ERROR_MAKE_QUOTATION,
    REQUEST_QUOTATION_STATUS,
    RECEIVED_QUOTATION_STATUS,
    ERROR_QUOTATION_STATUS,
} from "../constants/quotationType";
import moment from "moment/moment";

const initialState = {
    isQuotationMade: false,
    isFetching: false,
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_MAKE_QUOTATION:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_MAKE_QUOTATION:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isMadeByClick: true,
            };

        case ERROR_MAKE_QUOTATION:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_QUOTATION_STATUS:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_QUOTATION_STATUS:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isQuotationMade: action && action.isQuotationMade ? action && action.isQuotationMade : initialState.isQuotationMade,
            };

        case ERROR_QUOTATION_STATUS:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
