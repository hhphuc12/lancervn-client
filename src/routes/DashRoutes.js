// @flow
/* eslint no-process-env:0 */
import React                    from 'react';
import {
    Route,
    Switch
}                               from 'react-router-dom';
import DashBoard                from '../containers/dashBoard/dash';

export const MainRoutes = () => (
    <Switch>
        <Route path='/' component={DashBoard} />
    </Switch>
);

export default MainRoutes;
