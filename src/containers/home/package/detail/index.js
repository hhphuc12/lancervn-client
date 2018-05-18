// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as packageActions    from '../../../../actions/packageActions';
import * as orderActions      from '../../../../actions/orderActions';
import Detail                 from './Detail';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        _package: state._package._package,
        userPost: state._package.userPost,
        userProvince: state._package.userProvince,
        process: state._package.process,
        dataNeed: state._package.dataNeed,
        isFetching: state.order.isFetching,
        isOrderMade: state.order.isOrderMade,
        isMadeByClick: state.order.isMadeByClick,
        isBelongTo: state._package.isBelongTo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...packageActions,
                ...orderActions,
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
