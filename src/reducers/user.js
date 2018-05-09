// @flow weak
import {
    REQUEST_USER_CATEGORY,
    RECEIVED_USER_CATEGORY,
    ERROR_USER_CATEGORY,
    REQUEST_LIST_FREELANCER,
    RECEIVED_LIST_FREELANCER,
    ERROR_LIST_FREELANCER,
    REQUEST_FREELANCER_DETAIL,
    RECEIVED_FREELANCER_DETAIL,
    ERROR_FREELANCER_DETAIL,
} from "../constants/userType";
import moment from "moment/moment";

const initialState = {
    userCategories: [],
    listFreelancer: [],
    isFetching: false,
    avatarUri: '',
    name: '',
    province: '',
    occupation: '',
    description: '',
    category: [],
    experience: [],
    projectDone: [],
    literacy: [],
    language:[],
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_USER_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_USER_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                userCategories: action && action.userCategories ? action && action.userCategories : initialState.userCategories,
            };

        case ERROR_USER_CATEGORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_LIST_FREELANCER:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_LIST_FREELANCER:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                listFreelancer: action && action.listFreelancer ? action && action.listFreelancer : initialState.listFreelancer,
            };

        case ERROR_LIST_FREELANCER:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_FREELANCER_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_FREELANCER_DETAIL:
            const freelancer = action && action.freelancer ? action && action.freelancer : initialState.freelancer;
            const {
                avatarUri,
                name,
                province,
                occupation,
                description,
                category,
                experience,
                projectDone,
                literacy,
                language,
            } = freelancer;
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                avatarUri,
                name,
                province,
                occupation,
                description,
                category,
                experience,
                projectDone,
                literacy,
                language,
            };

        case ERROR_FREELANCER_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        default:
            return { ...state };
    }
}
