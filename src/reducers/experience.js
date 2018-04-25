// @flow weak
import {
    REQUEST_ADD_EXPERIENCE,
    RECEIVED_ADD_EXPERIENCE,
    ERROR_ADD_EXPERIENCE,
    REQUEST_LIST_EXPERIENCE,
    RECEIVED_LIST_EXPERIENCE,
    ERROR_LIST_EXPERIENCE,
    RESET_DATA_CHANGE_STATE,
} from "../constants/experienceType";
import moment from "moment/moment";

const initialState = {
    experiences: [],
    isExperienceAdded: false,
    isFetching: false,
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_ADD_EXPERIENCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_ADD_EXPERIENCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isExperienceAdded: true,
            };

        case ERROR_ADD_EXPERIENCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isExperienceAdded: false,
            };

        case REQUEST_LIST_EXPERIENCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_LIST_EXPERIENCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isError: false,
                experiences: action && action.experiences,
            };

        case ERROR_LIST_EXPERIENCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isError: true,
            };

        case RESET_DATA_CHANGE_STATE:
            return {
                ...state,
                isExperienceAdded: false,
            };

        default:
            return { ...state };
    }
}
