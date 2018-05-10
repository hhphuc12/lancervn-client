// @flow weak
import {
    REQUEST_POST_JOB,
    RECEIVED_POST_JOB,
    ERROR_POST_JOB,
    REQUEST_JOB_FREELANCE,
    RECEIVED_JOB_FREELANCE,
    ERROR_JOB_FREELANCE,
    REQUEST_JOB_FREELANCE_DETAIL,
    RECEIVED_JOB_FREELANCE_DETAIL,
    ERROR_JOB_FREELANCE_DETAIL,
} from "../constants/jobType";
import moment from "moment/moment";

const initialState = {
    jobs: [],
    isDataChanged: false,
    isFetching: false,
    jobFreelanceDetail: {},
    userProvince: '',
    isExpiredOffer: false,
    userPost: {},
    jobFreelance: [],
    skill: [],
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

        case REQUEST_JOB_FREELANCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_JOB_FREELANCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                jobFreelance: action && action.jobFreelance ? action && action.jobFreelance : initialState.jobFreelance,
            };

        case ERROR_JOB_FREELANCE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_JOB_FREELANCE_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_JOB_FREELANCE_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                jobFreelanceDetail: action && action.jobFreelanceDetail ? action && action.jobFreelanceDetail : initialState.jobFreelanceDetail,
                userProvince: action && action.userProvince ? action && action.userProvince : initialState.userProvince,
                isExpiredOffer: action && action.isExpiredOffer ? action && action.isExpiredOffer : initialState.isExpiredOffer,
                userPost: action && action.userPost ? action && action.userPost : initialState.userPost,
                skill: action && action.skill ? action && action.skill : initialState.skill,
            };

        case ERROR_JOB_FREELANCE_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
