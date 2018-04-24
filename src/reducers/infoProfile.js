// @flow weak
import {
    REQUEST_INFO_PROFILE,
    RECEIVED_INFO_PROFILE,
    ERROR_INFO_PROFILE,
    REQUEST_EDIT_INFO_PROFILE,
    RECEIVED_EDIT_INFO_PROFILE,
    ERROR_EDIT_INFO_PROFILE,
} from "../constants/infoProfileType";
import moment from "moment/moment";

const initialState = {
    info: {},
    isFetching: false,
    isInfoProfileEdited: false,
    isError: false,
    errorMessage: '',
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_INFO_PROFILE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_INFO_PROFILE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                info: action && action.info ? action && action.info : initialState.info,
            };

        case ERROR_INFO_PROFILE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_EDIT_INFO_PROFILE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_EDIT_INFO_PROFILE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isInfoProfileEdited: true,
                isError: false,
                errorMessage: '',
            };

        case ERROR_EDIT_INFO_PROFILE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isInfoProfileEdited: false,
                isError: true,
                errorMessage: action && action.msg,
            };

        default:
            return { ...state };
    }
}
