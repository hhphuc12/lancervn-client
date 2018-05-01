// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../../../actions/viewAction';
import * as languageActions    from '../../../../actions/languageActions';
import Language               from './Language';
import * as errorActions      from "../../../../actions/errorActions";

const mapStateToProps = (state) => {
    return {
        // containers:
        currentView:  state.views.currentView,

        languages: state.language.languages,
        isDataChanged: state.language.isDataChanged,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions : bindActionCreators(
            {
                ...viewsActions,
                ...languageActions,
                ...errorActions,
            },
            dispatch
        )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Language);
