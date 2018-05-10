// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as jobActions        from '../../../../actions/jobActions';
import Detail                 from './Detail';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        jobFreelanceDetail: state.job.jobFreelanceDetail,
        userProvince: state.job.userProvince,
        isExpiredOffer: state.job.isExpiredOffer,
        userPost: state.job.userPost,
        skill: state.job.skill,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
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
)(Detail);
