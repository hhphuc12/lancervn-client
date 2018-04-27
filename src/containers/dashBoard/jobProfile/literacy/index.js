// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as literacyActions   from '../../../../actions/literacyActions';
import Literacy               from './Literacy';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:        state.views.currentView,

        isFetching:         state.literacy.isFetching,
        isError:            state.literacy.isError,
        literacies:         state.literacy.literacies,
        isDataChanged:      state.literacy.isDataChanged,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...literacyActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Literacy);
