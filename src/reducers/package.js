// @flow weak
import {
    REQUEST_POST_PACKAGE,
    RECEIVED_POST_PACKAGE,
    ERROR_POST_PACKAGE,
    REQUEST_LIST_PACKAGE,
    RECEIVED_LIST_PACKAGE,
    ERROR_LIST_PACKAGE,
    REQUEST_HOME_PACKAGE_DETAIL,
    RECEIVED_HOME_PACKAGE_DETAIL,
    ERROR_HOME_PACKAGE_DETAIL,
    REQUEST_PACKAGE_BELONG_TO,
    RECEIVED_PACKAGE_BELONG_TO,
    ERROR_PACKAGE_BELONG_TO,
    REQUEST_PACKAGE_POSTED,
    RECEIVED_PACKAGE_POSTED,
    ERROR_PACKAGE_POSTED,
    REQUEST_PACKAGE_POSTED_DETAIL,
    RECEIVED_PACKAGE_POSTED_DETAIL,
    ERROR_PACKAGE_POSTED_DETAIL,
} from "../constants/packageType";
import moment from "moment/moment";

const initialState = {
    packages: [],
    _package: {},
    userPost: {},
    userProvince: '',
    process: [],
    dataNeed: [],
    isDataChanged: false,
    isFetching: false,
    isBelongTo: false,
    packagePosted: [],
    orders: [],
    packageDetail: {},
    ordersDetail: [],
    pages: 1,
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_POST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_POST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isDataChanged: true,
            };

        case ERROR_POST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isDataChanged: false,
            };

        case REQUEST_LIST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_LIST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                packages: action && action.packages ? action && action.packages : initialState.packages,
                pages: action && action.pages ? action && action.pages : initialState.pages,
            };

        case ERROR_LIST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_HOME_PACKAGE_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
            };

        case RECEIVED_HOME_PACKAGE_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                _package: action && action._package ? action && action._package : initialState._package,
                userPost: action && action.userPost ? action && action.userPost : initialState.userPost,
                userProvince: action && action.userProvince ? action && action.userProvince : initialState.userProvince,
                process: action && action.process ? action && action.process : initialState.process,
                dataNeed: action && action.dataNeed ? action && action.dataNeed : initialState.dataNeed,
            };

        case ERROR_HOME_PACKAGE_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_PACKAGE_BELONG_TO:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_PACKAGE_BELONG_TO:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isBelongTo: action && action.isBelongTo ? action && action.isBelongTo : initialState.isBelongTo,
            };

        case ERROR_PACKAGE_BELONG_TO:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_PACKAGE_POSTED:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_PACKAGE_POSTED:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                packagePosted: action && action.packagePosted ? action && action.packagePosted : initialState.packagePosted,
                orders: action && action.orders ? action && action.orders : initialState.orders,
            };

        case ERROR_PACKAGE_POSTED:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_PACKAGE_POSTED_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_PACKAGE_POSTED_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                packageDetail: action && action.packageDetail ? action && action.packageDetail : initialState.packageDetail,
                ordersDetail: action && action.ordersDetail ? action && action.ordersDetail : initialState.ordersDetail,
            };

        case ERROR_PACKAGE_POSTED_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
