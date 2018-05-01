// @flow weak
import {
    REQUEST_SELECT_CATEGORY,
    RECEIVED_SELECT_CATEGORY,
    ERROR_SELECT_CATEGORY,
    REQUEST_ADD_CATEGORY,
    RECEIVED_ADD_CATEGORY,
    ERROR_ADD_CATEGORY,
} from "../constants/categoryType";
import moment from "moment/moment";

const initialState = {
    userCategories: [],
    categories: [],
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

        default:
            return { ...state };
    }
}
