// @flow weak
import {
    REQUEST_INFO_PROFILE,
    RECEIVED_INFO_PROFILE,
    ERROR_INFO_PROFILE,
    REQUEST_EDIT_PROFILE,
    RECEIVED_EDIT_PROFILE,
    ERROR_EDIT_PROFILE
} from "../constants/profileType";
import moment from "moment/moment";

const initialState = {
    info: {},
    isFetching: false,
    isSkillAdded: false,
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

        // case REQUEST_ADD_SKILL:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
        //     };
        //
        // case RECEIVED_ADD_SKILL:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
        //         isSkillAdded: true,
        //         isError: false,
        //         errorMessage: '',
        //     };
        //
        // case ERROR_ADD_SKILL:
        //     return {
        //         ...state,
        //         actionTime: action && action.time ?  action && action.time : currentTime,
        //         isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
        //         isSkillAdded: false,
        //         isError: true,
        //         errorMessage: action && action.msg,
        //     };

        default:
            return { ...state };
    }
}
