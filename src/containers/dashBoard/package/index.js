// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../actions/viewAction';
import * as packageActions    from '../../../actions/packageActions';
import * as orderActions      from '../../../actions/orderActions';
import ListPackage            from './ListPackage';
import * as errorActions      from "../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        packageOrdered: state.order.packageOrdered,
        packagePosted: state._package.packagePosted,
        orders: state._package.orders,
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
)(ListPackage);
