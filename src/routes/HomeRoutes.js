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
import JobDetail                from '../containers/home/job/detail';
import PackageDetail            from '../containers/home/package/detail';
import PageNotFound             from '../containers/pageNotFound';

const DashRoutes = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/freelancers' component={User} />
        <Route path='/jobs-freelance' component={Job} />
        <Route path='/packages' component={Package} />
        <Route path='/freelancer/:id' component={UserDetail} />
        <Route path='/job-freelance/:id' component={JobDetail} />
        <Route path='/package/:id' component={PackageDetail} />
        <Route component={PageNotFound} />
    </Switch>
);

export default DashRoutes;
