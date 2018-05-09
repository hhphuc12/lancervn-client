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
import UserDetail               from '../containers/home/user/detail';
import PageNotFound             from '../containers/pageNotFound';

const DashRoutes = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/freelancers' component={User} />
        <Route path='/job-freelance' component={Job} />
        <Route path='/packages' component={Package} />
        <Route path='/freelancer/:id' component={UserDetail} />
        <Route component={PageNotFound} />
    </Switch>
);

export default DashRoutes;
