// @flow weak
import { routerReducer }                 from 'react-router-redux';
import { combineReducers }               from 'redux';
import { reducer as reduxFormReducer }   from 'redux-form';
import views                             from './views';
import userAuth                          from './userAuth';
import infoProfile                       from './infoProfile';
import province                          from './province';
import error                             from './error';

export const reducers = {
    views,
    userAuth,
    infoProfile,
    province,
    error,
};

export default combineReducers({
    ...reducers,
    routing: routerReducer,
    form: reduxFormReducer,
});
