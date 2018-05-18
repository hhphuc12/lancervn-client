// @flow weak

import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as viewsActions        from '../../../../actions/viewAction';
import * as projectDoneActions  from '../../../../actions/projectDoneActions';
import * as categoryActions     from '../../../../actions/categoryActions';
import Project                  from './Project';
import * as errorActions        from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        isFetching:         state.project.isFetching,
        isError:            state.project.isError,
        projects:           state.project.projects,
        categories:         state.category.categories,
        isDataChanged:      state.project.isDataChanged,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...projectDoneActions,
                ...categoryActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);
