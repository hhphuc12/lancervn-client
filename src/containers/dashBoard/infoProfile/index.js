// @flow weak

import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as viewsActions        from '../../../actions/viewAction';
import * as userAuthActions     from '../../../actions/userAuthAction';
import * as infoProfileActions  from '../../../actions/infoProfileActions';
import * as provinceActions     from '../../../actions/provinceActions';
import Profile                  from './Profile';
import * as errorActions        from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        isError:         state.infoProfile.isError,
        errorMessage:    state.infoProfile.errorMessage,
        isFetching:      state.infoProfile.isFetching,
        isCategoryAdded: state.infoProfile.isCategoryAdded,

        info:            state.infoProfile.info,
        provinces:       state.province.provinces,
        syncValidation:  state.form.syncValidation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...userAuthActions,
                ...infoProfileActions,
                ...provinceActions,
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
