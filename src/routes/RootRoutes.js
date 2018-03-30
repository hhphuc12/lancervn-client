// @flow
/* eslint no-process-env:0 */
import React                    from 'react';
import {
    Route,
    Switch
}                               from 'react-router-dom';
import Login                    from '../containers/login';
import Register                 from '../containers/register';

export const MainRoutes = () => (
    <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
    </Switch>
);

export default MainRoutes;
