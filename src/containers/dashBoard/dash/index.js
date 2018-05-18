// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as userAuthActions   from '../../../actions/userAuthAction';
import DashBoard              from './DashBoard';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        currentView:  state.views.currentView,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...viewsActions,
                ...userAuthActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
