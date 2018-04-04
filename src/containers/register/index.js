// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../actions/viewAction';
import * as userAuthActions   from '../../actions/userAuthAction';
import Register                  from './Register';
import * as errorActions      from "../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:     state.views.currentView,

        // useAuth:
        isRegistered:    state.userAuth.isRegistered,
        isError:         state.userAuth.isError,
        errorMessage:    state.userAuth.errorMessage,
        isRegistering:   state.userAuth.isRegistering,

        // redux form
        syncValidation: state.form.syncValidation
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
)(Register);
