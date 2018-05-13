// @flow weak

import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as viewsActions        from '../../../../actions/viewAction';
import * as jobActions          from '../../../../actions/jobActions';
import Detail                   from './Detail';
import * as errorActions        from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        jobPostedDetail: state.job.jobPostedDetail,
        quotationsDetail: state.job.quotationsDetail,
        quotationBrowsered: state.job.quotationBrowsered,
        isQuotationBrowsered: state.job.isQuotationBrowsered,
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
