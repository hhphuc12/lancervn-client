// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as userAuthActions   from '../../../actions/userAuthAction';
import * as profileActions    from '../../../actions/infoProfileActions';
import Profile                from './Profile';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        isError:         state.profile.isError,
        errorMessage:    state.profile.errorMessage,
        isFetching:      state.profile.isFetching,
        isCategoryAdded: state.profile.isCategoryAdded,

        info:            state.profile.info,
        syncValidation:  state.form.syncValidation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...userAuthActions,
                ...profileActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
