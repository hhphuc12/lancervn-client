// @flow weak
import {
    REQUEST_POST_EVALUATE,
    RECEIVED_POST_EVALUATE,
    ERROR_POST_EVALUATE,
    RESET_POST_EVALUATE_STATE,
} from "../constants/evaluateType";
import moment from "moment/moment";

const initialState = {
    isFetching: false,
    isPostedEvaluate: false,
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_POST_EVALUATE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_POST_EVALUATE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isPostedEvaluate: true,
            };

        case ERROR_POST_EVALUATE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isPostedEvaluate: false,
            };

        case RESET_POST_EVALUATE_STATE:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isPostedEvaluate: false,
            };

        default:
            return { ...state };
    }
}
