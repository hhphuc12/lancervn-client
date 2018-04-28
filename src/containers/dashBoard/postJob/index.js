// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as categoryActions   from '../../../actions/categoryActions';
import * as skillActions      from '../../../actions/skillActions';
import * as provinceActions   from '../../../actions/provinceActions';
import * as jobActions        from '../../../actions/jobActions';
import PostJob                from './PostJob';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        categories: state.category.categories,
        skills: state.skill.skills,
        provinces: state.province.provinces,
        isFetching: state.job.isFetching,
        isError: state.job.isError,
        errorMessage: state.job.errorMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...categoryActions,
                ...skillActions,
                ...provinceActions,
                ...jobActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostJob);
