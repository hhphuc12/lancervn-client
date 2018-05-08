// @flow
/* eslint no-process-env:0 */
import React                    from 'react';
import {
    Route,
    Switch
}                               from 'react-router-dom';
import Home                     from '../containers/home/homePage';
import User                     from '../containers/home/user';
import Job                      from '../containers/home/job';
import Package                  from '../containers/home/package';
import PageNotFound             from '../containers/pageNotFound';

const DashRoutes = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/freelancer' component={User} />
        <Route path='/job-freelance' component={Job} />
        <Route path='/packages' component={Package} />
        <Route component={PageNotFound} />
    </Switch>
);

export default DashRoutes;
