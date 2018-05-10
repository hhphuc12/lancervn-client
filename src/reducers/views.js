// @flow weak
import {
    ENTER_HOME_PAGE,
    LEAVE_HOME_PAGE,
    ENTER_HOME_USER,
    LEAVE_HOME_USER,
    ENTER_HOME_USER_DETAIL,
    LEAVE_HOME_USER_DETAIL,
    ENTER_HOME_JOB_DETAIL,
    LEAVE_HOME_JOB_DETAIL,
    ENTER_HOME_PACKAGE,
    LEAVE_HOME_PACKAGE,
    ENTER_LOGIN_VIEW,
    LEAVE_LOGIN_VIEW,
    ENTER_REGISTER_VIEW,
    LEAVE_REGISTER_VIEW,
    ENTER_DASHBOARD_VIEW,
    LEAVE_DASHBOARD_VIEW,
    ENTER_INFO_PROFILE_VIEW,
    LEAVE_INFO_PROFILE_VIEW,
    ENTER_JOB_PROFILE_VIEW,
    LEAVE_JOB_PROFILE_VIEW,
    ENTER_JOB_POSTED_VIEW,
    LEAVE_JOB_POSTED_VIEW,
    ENTER_ADD_JOB_VIEW,
    LEAVE_ADD_JOB_VIEW,
    ENTER_ADD_PACKAGE_VIEW,
    LEAVE_ADD_PACKAGE_VIEW,
    ENTER_PAGE_NOT_FOUND_VIEW,
    LEAVE_PAGE_NOT_FOUND_VIEW,
    ENTER_PAGE_BAD_REQUEST_VIEW,
    LEAVE_PAGE_BAD_REQUEST_VIEW,
} from '../constants/viewTypes';

const initialState = {
    currentView:  'home',
    enterTime:    null,
    leaveTime:    null
};

export default function views(state: Object = initialState, action: Object) {
    switch (action.type) {
        case ENTER_PAGE_BAD_REQUEST_VIEW:
        case ENTER_PAGE_NOT_FOUND_VIEW:
        case ENTER_LOGIN_VIEW:
        case ENTER_REGISTER_VIEW:
        case ENTER_DASHBOARD_VIEW:
        case ENTER_INFO_PROFILE_VIEW:
        case ENTER_JOB_PROFILE_VIEW:
        case ENTER_JOB_POSTED_VIEW:
        case ENTER_ADD_JOB_VIEW:
        case ENTER_HOME_PAGE:
        case ENTER_HOME_USER:
        case ENTER_ADD_PACKAGE_VIEW:
        case ENTER_HOME_PACKAGE:
        case ENTER_HOME_USER_DETAIL:
        case ENTER_HOME_JOB_DETAIL:
            // can't enter if you are already inside
            if (state.currentView !== action.currentView) {
                return {
                    ...state,
                    currentView:  action.currentView,
                    enterTime:    action.enterTime,
                    leaveTime:    action.leaveTime
                };
            }
            return state;
        case LEAVE_PAGE_BAD_REQUEST_VIEW:
        case LEAVE_PAGE_NOT_FOUND_VIEW:
        case LEAVE_DASHBOARD_VIEW:
        case LEAVE_REGISTER_VIEW:
        case LEAVE_LOGIN_VIEW:
        case LEAVE_INFO_PROFILE_VIEW:
        case LEAVE_JOB_PROFILE_VIEW:
        case LEAVE_JOB_POSTED_VIEW:
        case LEAVE_ADD_JOB_VIEW:
        case LEAVE_HOME_PAGE:
        case LEAVE_HOME_USER:
        case LEAVE_ADD_PACKAGE_VIEW:
        case LEAVE_HOME_PACKAGE:
        case LEAVE_HOME_USER_DETAIL:
        case LEAVE_HOME_JOB_DETAIL:
            // can't leave if you aren't already inside
            if (state.currentView === action.currentView) {
                return {
                    ...state,
                    currentView:  action.currentView,
                    enterTime:    action.enterTime,
                    leaveTime:    action.leaveTime
                };
            }
            return state;

        default:
            return state;
    }
}
