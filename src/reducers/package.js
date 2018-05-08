// @flow weak
import {
    REQUEST_POST_PACKAGE,
    RECEIVED_POST_PACKAGE,
    ERROR_POST_PACKAGE,
    REQUEST_LIST_PACKAGE,
    RECEIVED_LIST_PACKAGE,
    ERROR_LIST_PACKAGE,
} from "../constants/packageType";
import moment from "moment/moment";

const initialState = {
    packages: [],
    isDataChanged: false,
    isFetching: false,
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
            };

        case ERROR_LIST_PACKAGE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
