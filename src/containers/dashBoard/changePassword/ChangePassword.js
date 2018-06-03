// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostJob extends PureComponent<Props, State> {
    componentDidMount() {
        this.props.actions.enterChangePassword();
    }

    componentWillUnmount() {
        this.props.actions.leaveChangePassword();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.isDataChanged)
            history.push('/dashboard/job-posted');
    }

    state = {
        oldPass: '',
        newPass: '',
        confirmNewPass: '',
    };

    renderField = ({input, label, id, type, fieldValue, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    {...input}
                    type={type}
                    className={'form-control'}
                    id={id}
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{ marginTop: 5 }}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{ marginTop: 5 }}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    onChangePass = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const { changePassIfNeed, errorBadRequest } = this.props.actions;
        const {
            oldPass,
            newPass,
            confirmNewPass,
        } = this.state;
        try {
            changePassIfNeed({
                oldPass,
                newPass,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('change password went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    render() {
        const { isFetching } = this.props;
        const {
            oldPass,
            newPass,
            confirmNewPass,
        } = this.state;
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Cập nhật mật khẩu</h4>
                                <form className="forms-sample">
                                    <Field
                                        id="oldPass"
                                        type="password"
                                        name="oldPass"
                                        label="Mật khẩu cũ"
                                        component={this.renderField}
                                        fieldValue={oldPass}
                                    />
                                    <Field
                                        id="newPass"
                                        type="password"
                                        name="newPass"
                                        label="Mật khẩu mới"
                                        component={this.renderField}
                                        fieldValue={newPass}
                                    />
                                    <Field
                                        id="confirmNewPass"
                                        type="password"
                                        name="confirmNewPass"
                                        label="Xác nhận mật khẩu mới"
                                        component={this.renderField}
                                        fieldValue={confirmNewPass}
                                    />
                                    <button
                                        className="btn btn-success mr-2"
                                        type="button"
                                        onClick={this.onChangePass}
                                        disabled={isFetching}
                                    >
                                        {
                                            isFetching ?
                                                <span>
                                                    <i className="fa fa-spinner fa-pulse fa-fw"/>
                                                </span>
                                                :
                                                <span>
                                                    Cập nhật
                                                </span>
                                        }
                                    </button>
                                    <button className="btn btn-light">Hủy bỏ</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'syncValidation',
})(PostJob);
