// @flow weak
import moment from 'moment';
import { selectSkill } from '../services/api';
import {
    REQUEST_SELECT_SKILL,
    RECEIVED_SELECT_SKILL,
    ERROR_SELECT_SKILL,
} from "../constants/skillType";
import { errorBadRequest } from './errorActions';

function requestSelectSkill(time = moment().format()) {
    return {
        type:       REQUEST_SELECT_SKILL,
        isFetching: true,
        time
    };
}
function receivedSelectSkill(skills, time = moment().format()) {
    return {
        type:       RECEIVED_SELECT_SKILL,
        isFetching: false,
        skills,
        time
    };
}
function errorSelectSkill(time = moment().format()) {
    return {
        type:       ERROR_SELECT_SKILL,
        isFetching: false,
        time
    };
}

export function getSelectSkillIfNeed(): (...any) => Promise<any> {
    return (
        dispatch: (any) => any,
        getState: () => boolean,
    ): any => {
        if(shouldGetSelectSkill(getState())) {
            return dispatch(getSelectSkill());
        }
        return Promise.resolve('already fetching skills...');
    }
}

function shouldGetSelectSkill(
    state: any
): boolean {
    const isFetching = state.skill.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getSelectSkill() {
    return dispatch => {
        dispatch(requestSelectSkill());
        selectSkill()
            .then(res => {
                if (res.status !== 200)
                    return dispatch(errorBadRequest(res.status));
                dispatch(receivedSelectSkill(res.data));
            })
            .catch(error => {
                dispatch(errorSelectSkill(error));
                dispatch(errorBadRequest(400));
            });
    };
};
