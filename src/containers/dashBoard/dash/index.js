// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as userAuthActions   from '../../../actions/userAuthAction';
import * as userActions       from '../../../actions/userActions';
import DashBoard              from './DashBoard';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        currentView:  state.views.currentView,

        dashboardInfo: state.user.dashboardInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...viewsActions,
                ...userActions,
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
