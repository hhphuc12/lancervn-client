// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as categoryActions   from '../../../actions/categoryActions';
import * as packageActions    from '../../../actions/packageActions';
import PostPackage            from './PostPackage';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        categories: state.category.categories,
        isFetching: state._package.isFetching,
        isError: state._package.isError,
        errorMessage: state._package.errorMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...categoryActions,
                ...packageActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPackage);
