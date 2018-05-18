// @flow weak
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
    REQUEST_PACKAGE_ORDERED_DETAIL,
    RECEIVED_PACKAGE_ORDERED_DETAIL,
    ERROR_PACKAGE_ORDERED_DETAIL,
} from "../constants/orderType";
import moment from "moment/moment";

const initialState = {
    isOrderMade: false,
    isFetching: false,
    packageOrdered: [],
    packageOrderedDetail: {},
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_MAKE_ORDER:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_MAKE_ORDER:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isMadeByClick: true,
            };

        case ERROR_MAKE_ORDER:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_ORDER_STATUS:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_ORDER_STATUS:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isOrderMade: action && action.isOrderMade ? action && action.isOrderMade : initialState.isOrderMade,
            };

        case ERROR_ORDER_STATUS:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_PACKAGE_ORDERED:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_PACKAGE_ORDERED:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                packageOrdered: action && action.packageOrdered ? action && action.packageOrdered : initialState.packageOrdered,
            };

        case ERROR_PACKAGE_ORDERED:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_PACKAGE_ORDERED_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_PACKAGE_ORDERED_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                packageOrderedDetail: action && action.packageOrderedDetail ? action && action.packageOrderedDetail : initialState.packageOrderedDetail,
            };

        case ERROR_PACKAGE_ORDERED_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
