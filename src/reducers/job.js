// @flow weak
import {
    REQUEST_POST_JOB,
    RECEIVED_POST_JOB,
    ERROR_POST_JOB,
} from "../constants/jobType";
import moment from "moment/moment";

const initialState = {
    jobs: [],
    isDataChanged: false,
    isFetching: false,
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_POST_JOB:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_POST_JOB:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isDataChanged: true,
            };

        case ERROR_POST_JOB:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isDataChanged: false,
            };

        // case REQUEST_LIST_EXPERIENCE:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
        //     };
        //
        // case RECEIVED_LIST_EXPERIENCE:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
        //         isError: false,
        //         experiences: action && action.experiences,
        //     };
        //
        // case ERROR_LIST_EXPERIENCE:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
        //         isError: true,
        //     };
        //
        // case RESET_DATA_CHANGE_STATE:
        //     return {
        //         ...state,
        //         isDataChanged: false,
        //     };
        //
        // case REQUEST_DELETE_EXPERIENCE:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
        //     };
        //
        // case RECEIVED_DELETE_EXPERIENCE:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
        //         isDataChanged: true,
        //     };
        //
        // case ERROR_DELETE_EXPERIENCE:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
        //         isDataChanged: false,
        //     };

        default:
            return { ...state };
    }
}
