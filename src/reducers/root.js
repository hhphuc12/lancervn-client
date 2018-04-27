// @flow weak
import { routerReducer }                 from 'react-router-redux';
import { combineReducers }               from 'redux';
import { reducer as reduxFormReducer }   from 'redux-form';
import views                             from './views';
import userAuth                          from './userAuth';
import infoProfile                       from './infoProfile';
import province                          from './province'
import experience                        from './experience';
import project                           from './projectDone';
import category                          from './category';
import error                             from './error';

export const reducers = {
    views,
    userAuth,
    infoProfile,
    province,
    experience,
    project,
    category,
    error,
};

export default combineReducers({
    ...reducers,
    routing: routerReducer,
    form: reduxFormReducer,
});
