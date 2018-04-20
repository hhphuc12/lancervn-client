// @flow weak
import { routerReducer }                 from 'react-router-redux';
import { combineReducers }               from 'redux';
import { reducer as reduxFormReducer }   from 'redux-form';
import views                             from './views';
import userAuth                          from './userAuth';
import profile                           from './profile';
import error                             from './error';

export const reducers = {
    views,
    userAuth,
    profile,
    error,
};

export default combineReducers({
    ...reducers,
    routing: routerReducer,
    form: reduxFormReducer,
});
