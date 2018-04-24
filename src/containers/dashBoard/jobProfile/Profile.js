// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import Experience from './experience';
import ProjectDone from './projectDone';
import Category from './category';
import Literacy from './literacy';
import Language from './language';
import {postImg} from "../../../services/api";
import {changePreview} from "../../../helpers";

class Profile extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
        this.onEnableEdit = this.onEnableEdit.bind(this);
    }

    static defaultProps = {
        isFetching: false
    };

    state = {
        name: '',
        description: '',
        disableEdit: true,
        isOK: true
    };

    componentDidMount() {
        const {
            actions: {
                enterJobProfile,
                getInfoProfileIfNeed,
            }
        } = this.props;
        enterJobProfile();
        getInfoProfileIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveJobProfile();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.isCategoryAdded)
            history.push('/dashboard/categories');
        if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
            this.setState({isOK: false});
        } else {
            this.setState({isOK: true});
        }
    }

    renderField = ({input, label, id, type, fieldValue, disabled, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    {...input}
                    type={type}
                    className={'form-control'}
                    id={id}
                    value={fieldValue}
                    disabled={disabled}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    renderTextArea = ({input, label, id, fieldValue, disabled, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <textarea
                    {...input}
                    className={'form-control'}
                    id={id}
                    rows='10'
                    disabled={disabled}
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    onAdd = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const {addCategoryIfNeed, errorBadRequest} = this.props.actions;
        const {name, description} = this.state;
        try {
            addCategoryIfNeed({
                name,
                description,
                isParent: true,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('login went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    onEnableEdit = e => {
        e.preventDefault();
        this.setState({ disableEdit: !this.state.disableEdit });
    };

    render() {
        return (
            <div className="content-wrapper">
                <Category/>
                <Experience/>
                <ProjectDone/>
                <Literacy/>
                <Language/>
            </div>
        );
    }
}

export default Profile;
