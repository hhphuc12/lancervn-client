// @flow
/* eslint no-process-env:0 */
import React                    from 'react';
import {
    Route,
    Switch
}                               from 'react-router-dom';
import DashBoard                from '../containers/dashBoard/dash';
import Test                     from '../containers/dashBoard/test';
import Profile                  from '../containers/dashBoard/profile';
import PageNotFound             from '../containers/pageNotFound';

const DashRoutes = () => (
    <Switch>
        <Route exact path='/dashboard' component={DashBoard} />
        <Route path='/dashboard/test' component={Test} />
        <Route path='/dashboard/profile' component={Profile} />
        <Route component={PageNotFound} />
    </Switch>
);

export default DashRoutes;
