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
    REQUEST_DASHBOARD_INFO,
    RECEIVED_DASHBOARD_INFO,
    ERROR_DASHBOARD_INFO,
    REQUEST_CHANGE_PASSWORD,
    RECEIVED_CHANGE_PASSWORD,
    ERROR_CHANGE_PASSWORD,
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
    evaluate: [],
    dashboardInfo: {},
    isPasswordChanged: false,
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
                evaluate,
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
                evaluate,
            };

        case ERROR_FREELANCER_DETAIL:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_DASHBOARD_INFO:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_DASHBOARD_INFO:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                dashboardInfo: action && action.dashboardInfo ? action && action.dashboardInfo : initialState.dashboardInfo,
            };

        case ERROR_DASHBOARD_INFO:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
            };

        case REQUEST_CHANGE_PASSWORD:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_CHANGE_PASSWORD:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isPasswordChanged: true,
            };

        case ERROR_CHANGE_PASSWORD:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                isPasswordChanged: false,
            };

        default:
            return { ...state };
    }
}
