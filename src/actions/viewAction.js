// @flow
import moment from 'moment';
import {
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
    ENTER_PAGE_NOT_FOUND_VIEW,
    LEAVE_PAGE_NOT_FOUND_VIEW,
    ENTER_PAGE_BAD_REQUEST_VIEW,
    LEAVE_PAGE_BAD_REQUEST_VIEW,
} from "../constants/viewTypes";

export function enterDashboard(time: string = moment().format()) {
    return {
        type:         ENTER_DASHBOARD_VIEW,
        currentView:  'DashBoard',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveDashboard(time: string = moment().format()) {
    return {
        type:         LEAVE_DASHBOARD_VIEW,
        currentView:  'DashBoard',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterPageNotFound(time: string = moment().format()) {
    return {
        type:         ENTER_PAGE_NOT_FOUND_VIEW,
        currentView:  'PageNotFound',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leavePageNotFound(time: string = moment().format()) {
    return {
        type:         LEAVE_PAGE_NOT_FOUND_VIEW,
        currentView:  'PageNotFound',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterLogin(time: string = moment().format()) {
    return {
        type:         ENTER_LOGIN_VIEW,
        currentView:  'Login',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveLogin(time: string = moment().format()) {
    return {
        type:         LEAVE_LOGIN_VIEW,
        currentView:  'Login',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterRegister(time: string = moment().format()) {
    return {
        type:         ENTER_REGISTER_VIEW,
        currentView:  'Register',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveRegister(time: string = moment().format()) {
    return {
        type:         LEAVE_REGISTER_VIEW,
        currentView:  'Register',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterInfoProfile(time: string = moment().format()) {
    return {
        type:         ENTER_INFO_PROFILE_VIEW,
        currentView:  'InfoProfile',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveInfoProfile(time: string = moment().format()) {
    return {
        type:         LEAVE_INFO_PROFILE_VIEW,
        currentView:  'InfoProfile',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterJobProfile(time: string = moment().format()) {
    return {
        type:         ENTER_JOB_PROFILE_VIEW,
        currentView:  'JobProfile',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveJobProfile(time: string = moment().format()) {
    return {
        type:         LEAVE_JOB_PROFILE_VIEW,
        currentView:  'JobProfile',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterJobPosted(time: string = moment().format()) {
    return {
        type:         ENTER_JOB_POSTED_VIEW,
        currentView:  'JobPosted',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leaveJobPosted(time: string = moment().format()) {
    return {
        type:         LEAVE_JOB_POSTED_VIEW,
        currentView:  'JobPosted',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterPostJob(time: string = moment().format()) {
    return {
        type:         ENTER_ADD_JOB_VIEW,
        currentView:  'AddJob',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leavePostJob(time: string = moment().format()) {
    return {
        type:         LEAVE_ADD_JOB_VIEW,
        currentView:  'AddJob',
        enterTime:    null,
        leaveTime:    time
    };
}

export function enterPageBadRequest(time: string = moment().format()) {
    return {
        type:         ENTER_PAGE_BAD_REQUEST_VIEW,
        currentView:  'PageBadRequest',
        enterTime:    time,
        leaveTime:    null
    };
}

export function leavePageBadRequest(time: string = moment().format()) {
    return {
        type:         LEAVE_PAGE_BAD_REQUEST_VIEW,
        currentView:  'PageBadRequest',
        enterTime:    null,
        leaveTime:    time
    };
}
