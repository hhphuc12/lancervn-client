// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as categoryActions   from '../../../../actions/categoryActions';
import * as userActions       from '../../../../actions/userActions';
import Category               from './Category';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        isFetching: state.category.isFetching,
        categories: state.category.categories,
        userCategories: state.user.userCategories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...categoryActions,
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
)(Category);
