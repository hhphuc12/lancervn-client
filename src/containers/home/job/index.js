// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as categoryActions   from '../../../actions/categoryActions';
import * as jobActions        from '../../../actions/jobActions';
import Job                    from './Job';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        fullCategories: state.category.fullCategories,
        jobFreelance: state.job.jobFreelance,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...categoryActions,
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
)(Job);
