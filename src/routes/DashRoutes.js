// @flow
/* eslint no-process-env:0 */
import React                    from 'react';
import {
    Route,
    Switch
}                               from 'react-router-dom';
import DashBoard                from '../containers/dashBoard/dash';
import Test                     from '../containers/dashBoard/test';
import InfoProfile              from '../containers/dashBoard/infoProfile';
import JobProfile               from '../containers/dashBoard/jobProfile';
import PageNotFound             from '../containers/pageNotFound';

const DashRoutes = () => (
    <Switch>
        <Route exact path='/dashboard' component={DashBoard} />
        <Route path='/dashboard/test' component={Test} />
        <Route path='/dashboard/info-profile' component={InfoProfile} />
        <Route path='/dashboard/job-profile' component={JobProfile} />
        <Route component={PageNotFound} />
    </Switch>
);

export default DashRoutes;
