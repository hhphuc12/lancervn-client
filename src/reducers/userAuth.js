// @flow weak
import moment                 from 'moment';
import auth                   from '../services/auth';

import {
    DISCONNECT_USER,
    START_EDIT_PROFILE,
    STOP_EDIT_PROFILE,
    CHECK_IF_USER_IS_AUTHENTICATED,
    ERROR_LOG_USER,
    RECEIVED_LOG_USER,
    REQUEST_LOG_USER,
    RECEIVED_REG_USER,
    REQUEST_REG_USER,
    ERROR_LOG_PLATFORM,
    RECEIVED_USER_INFO,
    REQUEST_USER_INFO,
    ERROR_USER_INFO,
    RESET_USER_STATES,
} from '../constants/userAuthType'
import { userDataKey } from "../constants/common";

// --------------------------------
// REDUCER USER AUTH
// --------------------------------
const user = auth.getUserInforByField();
const initialState = {
    // actions details
    isFetching:      false,
    isLogging:       false,
    time:            '',

    // userInfos
    /* eslint-disable no-mixed-operators */
    email: user && user.email || '',

    token: auth.getToken(),
    isAuthenticated: auth.isAuthenticated(),   // authentication status (token based auth)
    isError: false,
    errorMessage: ''
};

export default function (
    state = initialState,
    action
) {
const currentTime = moment().format();

switch (action.type) {

    case CHECK_IF_USER_IS_AUTHENTICATED:
        return {
            ...state,
            actionTime:      currentTime,
            isAuthenticated: action.isAuthenticated,
            token:           action.token || initialState.token,
            id:              action.user && action.user.id         ? action.user.id:        initialState.id,
            login:           action.user && action.user.login      ? action.user.login:     initialState.login,
            firstname:       action.user && action.user.firstname  ? action.user.firstname: initialState.firstname,
            lastname:        action.user && action.user.lastname   ? action.user.lastname:  initialState.firstname
        };

    case DISCONNECT_USER:
        return {
            ...state,
            actionTime:      currentTime,
            isAuthenticated: false,
            isError:         false,
            token:           initialState.token,
            id:              initialState.id,
            uid:             initialState.uid,
            coin:            initialState.coin,
            point:           initialState.point,
            email:           initialState.email,
            isCheckin:       initialState.isCheckin,
            nickname:        initialState.nickname,
            valueCheckin:    initialState.valueCheckin,
            avatar:          initialState.avatar
        };

    // user login (get token and userInfo)
    case REQUEST_LOG_USER:
        return {
            ...state,
            actionTime: currentTime,
            isLogging:  true
        };

    case RECEIVED_LOG_USER:
        auth.setToken(action.data.token);
        localStorage.setItem(userDataKey, JSON.stringify(action.data));
        return {
            ...state,
            actionTime:      currentTime,
            isAuthenticated: true,
            token:           action.data,
            isError: false,
            errorMessage: '',
            isLogging:       false,
            id: action && action.data && action.data._id,
            name: action && action.data && action.data.name,
            phoneNumber: action && action.data && action.data.phoneNumber,
            email: action && action.data && action.data.email,
            password: action && action.data && action.data.password,
            occupation: action && action.data && action.data.occupation,
        };

    case ERROR_LOG_USER:
        return {
            ...state,
            actionTime:         currentTime,
            isAuthenticated:    false,
            isLogging:          false,
            isError:            true,
            errorMessage:       action && action.msg,
        };

    default:
        return state;
    }
}
