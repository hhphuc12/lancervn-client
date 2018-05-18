// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../actions/viewAction';
import * as userAuthActions     from '../../actions/userAuthAction';
import Home                   from './Home';
import * as errorActions      from "../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        isAuthenticated: state.userAuth.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
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
)(Home);
