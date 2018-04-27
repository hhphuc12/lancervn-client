// @flow weak
import moment from 'moment';
import { postProject, listProject, deleteProject } from '../services/api';
import {
    REQUEST_ADD_PROJECT,
    RECEIVED_ADD_PROJECT,
    ERROR_ADD_PROJECT,
    REQUEST_LIST_PROJECT,
    RECEIVED_LIST_PROJECT,
    ERROR_LIST_PROJECT,
    RESET_DATA_CHANGE_STATE,
    REQUEST_DELETE_PROJECT,
    RECEIVED_DELETE_PROJECT,
    ERROR_DELETE_PROJECT,
} from "../constants/projectDoneType";
import { errorBadRequest } from './errorActions';
import auth from "../services/auth";

function requestAddProject(time = moment().format()) {
    return {
        type:       REQUEST_ADD_PROJECT,
        isFetching: true,
        time
    };
}
function receivedAddProject(time = moment().format()) {
    return {
        type:       RECEIVED_ADD_PROJECT,
        isFetching: false,
        time
    };
}
function errorAddProject(time = moment().format()) {
    return {
        type:       ERROR_ADD_PROJECT,
        isFetching: false,
        time
    };
}

export function addProjectIfNeed(project): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldAddProject(getState())) {
            return dispatch(addProject(project));
        }
        return Promise.resolve('already adding project...');
    }
}

function shouldAddProject(
    state: any
): boolean {
    const isFetching = state.project.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function addProject(project) {
    return dispatch => {
        dispatch(requestAddProject());
        let userToken = auth.getToken();
        postProject(project, userToken)
            .then(res => {
                if (res.status !== 201)
                    throw res;
                dispatch(receivedAddProject());
            })
            .catch(res => {
                dispatch(errorAddProject(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};

function requestListProject(time = moment().format()) {
    return {
        type:       REQUEST_LIST_PROJECT,
        isFetching: true,
        time
    };
}
function receivedListProject(projects, time = moment().format()) {
    return {
        type:       RECEIVED_LIST_PROJECT,
        isFetching: false,
        projects,
        time
    };
}
function errorListProject(time = moment().format()) {
    return {
        type:       ERROR_LIST_PROJECT,
        isFetching: false,
        time
    };
}

export function getListProjectIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetListProject(getState())) {
            return dispatch(getListProject());
        }
        return Promise.resolve('already fetching project...');
    }
}

function shouldGetListProject(
    state: any
): boolean {
    const isFetching = state.project.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getListProject() {
    return dispatch => {
        dispatch(requestListProject());
        let userToken = auth.getToken();
        listProject(userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedListProject(res.data));
            })
            .catch(err => {
                dispatch(errorListProject());
                dispatch(errorBadRequest(400));
            });
    };
};

export function resetDataChangeState(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
    ): any => {
        return dispatch({ type: RESET_DATA_CHANGE_STATE });
    }
}

function requestDeleteProject(time = moment().format()) {
    return {
        type:       REQUEST_DELETE_PROJECT,
        isFetching: true,
        time
    };
}
function receivedDeleteProject(time = moment().format()) {
    return {
        type:       RECEIVED_DELETE_PROJECT,
        isFetching: false,
        time
    };
}
function errorDeleteProject(time = moment().format()) {
    return {
        type:       ERROR_DELETE_PROJECT,
        isFetching: false,
        time
    };
}

export function deleteProjectIfNeed(id): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldDeleteProject(getState())) {
            return dispatch(delProject(id));
        }
        return Promise.resolve('already adding project...');
    }
}

function shouldDeleteProject(
    state: any
): boolean {
    const isFetching = state.project.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function delProject(id) {
    return dispatch => {
        dispatch(requestDeleteProject());
        let userToken = auth.getToken();
        deleteProject(id, userToken)
            .then(res => {
                if (res.status !== 200)
                    throw res;
                dispatch(receivedDeleteProject());
            })
            .catch(res => {
                dispatch(errorDeleteProject(res.error.message));
                dispatch(errorBadRequest(400));
            });
    };
};
