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
import JobPosted                from '../containers/dashBoard/jobPosted';
import PostJob                  from '../containers/dashBoard/postJob';
import PostPackage              from '../containers/dashBoard/postPackage';
import JobPostedDetail          from '../containers/dashBoard/jobPosted/detail';
import JobSentQuotation         from '../containers/dashBoard/jobSentQuotation';
import Package                  from '../containers/dashBoard/package';
import PackagePostedDetail      from '../containers/dashBoard/package/postedDetail';
import PackageOrderedDetail     from '../containers/dashBoard/package/orderedDetail';
import PageNotFound             from '../containers/pageNotFound';

const DashRoutes = () => (
    <Switch>
        <Route exact path='/dashboard' component={DashBoard} />
        <Route path='/dashboard/test' component={Test} />
        <Route path='/dashboard/info-profile' component={InfoProfile} />
        <Route path='/dashboard/job-profile' component={JobProfile} />
        <Route path='/dashboard/job-posted' component={JobPosted} />
        <Route path='/dashboard/post-job' component={PostJob} />
        <Route path='/dashboard/post-package' component={PostPackage} />
        <Route path='/dashboard/packages' component={Package} />
        <Route path='/dashboard/job-posted-detail/:id' component={JobPostedDetail} />
        <Route path='/dashboard/job-sent-quotation' component={JobSentQuotation} />
        <Route path='/dashboard/package-posted-detail/:id' component={PackagePostedDetail} />
        <Route path='/dashboard/package-ordered-detail/:id' component={PackageOrderedDetail} />
        <Route component={PageNotFound} />
    </Switch>
);

export default DashRoutes;
