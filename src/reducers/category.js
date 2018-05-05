// @flow weak
import {
    REQUEST_SELECT_CATEGORY,
    RECEIVED_SELECT_CATEGORY,
    ERROR_SELECT_CATEGORY,
    REQUEST_ADD_CATEGORY,
    RECEIVED_ADD_CATEGORY,
    ERROR_ADD_CATEGORY,
    REQUEST_FULL_CATEGORY,
    RECEIVED_FULL_CATEGORY,
    ERROR_FULL_CATEGORY,
} from "../constants/categoryType";
import moment from "moment/moment";

const initialState = {
    userCategories: [],
    categories: [],
    fullCategories: [],
    isFetching: false,
    isCategoryAdded: false,
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_SELECT_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_SELECT_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                categories: action && action.categories ? action && action.categories : initialState.categories,
            };

        case ERROR_SELECT_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_ADD_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_ADD_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isCategoryAdded: true,
            };

        case ERROR_ADD_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isCategoryAdded: false,
            };

        case REQUEST_FULL_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_FULL_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                fullCategories: action && action.fullCategories ? action && action.fullCategories : initialState.fullCategories,
            };

        case ERROR_FULL_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
