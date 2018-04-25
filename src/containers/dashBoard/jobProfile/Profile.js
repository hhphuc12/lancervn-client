// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import Experience from './experience';
import ProjectDone from './projectDone';
import Category from './category';
import Literacy from './literacy';
import Language from './language';

class Profile extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.enterJobProfile();
    }

    componentWillUnmount() {
        this.props.actions.leaveJobProfile();
    }

    render() {
        return (
            <div className="content-wrapper">
                <Category/>
                <Experience/>
                <ProjectDone/>
                <Literacy/>
                <Language/>
            </div>
        );
    }
}

export default Profile;
