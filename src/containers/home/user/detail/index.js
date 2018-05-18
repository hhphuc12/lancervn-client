// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as userActions       from '../../../../actions/userActions';
import Detail                 from './Detail';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        listFreelancer: state.user.listFreelancer,
        avatarUri: state.user.avatarUri,
        name: state.user.name,
        province: state.user.province,
        occupation: state.user.occupation,
        description: state.user.description,
        category: state.user.category,
        experience: state.user.experience,
        projectDone: state.user.projectDone,
        literacy: state.user.literacy,
        language: state.user.language,
        evaluate: state.user.evaluate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...userActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
