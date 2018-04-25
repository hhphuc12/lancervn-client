// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as experienceActions from '../../../../actions/experienceActions';
import Experience             from './Experience';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:    state.views.currentView,

        isFetching:     state.experience.isFetching,
        isError:        state.experience.isError,
        experiences:    state.experience.experiences,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...experienceActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Experience);
