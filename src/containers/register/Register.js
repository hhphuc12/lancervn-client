// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {validate} from './validation';

class Register extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
    }

    static defaultProps = {
        isRegistering: false,
    };

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isOK: true
    };

    componentDidMount() {
        this.props.actions.enterRegister();
    }

    componentWillUnmount() {
        this.props.actions.leaveRegister();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.isRegistered)
            history.push('/login');
        if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
            this.setState({ isOK: false });
        } else {
            this.setState({ isOK: true });
        }
    }

    renderField = ({input, label, id, type, fieldValue, icon, meta: {touched, error, warning}}) => {
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
                <i className={`mdi ${icon}`}/>
                {touched && ((error && <label className="text-danger">{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger">{`* ${warning}`}</label>))}
            </div>
        )
    };

    onRegister = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const { regUserIfNeed, errorBadRequest } = this.props.actions;
        const { firstName, lastName, email, password } = this.state;
        try {
            regUserIfNeed(firstName.trim(), lastName.trim(), email.trim(), password.trim());
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('register went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    goHome = (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const {history} = this.props;
        history.push({pathname: '/'});
    };

    render() {
        const { firstName, lastName, email, password, confirmPassword, isOK } = this.state;
        const { isRegistering, isError, errorMessage } = this.props;
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth register-full-bg">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <h2>Đăng ký</h2>
                                    {
                                        isError ? <label className="text-danger">{`* ${errorMessage}`}</label> : null
                                    }
                                    <form className="pt-5">
                                        <Field
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            label="Họ"
                                            component={this.renderField}
                                            icon="mdi-account"
                                            fieldValue={firstName}
                                        />
                                        <Field
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            label="Chữ lót và tên"
                                            component={this.renderField}
                                            icon="mdi-account"
                                            fieldValue={lastName}
                                        />
                                        <Field
                                            id="email"
                                            type="email"
                                            name="email"
                                            label="Email"
                                            component={this.renderField}
                                            icon="mdi-email"
                                            fieldValue={email}
                                        />
                                        <Field
                                            id="password"
                                            type="password"
                                            name="password"
                                            label="Mật khẩu"
                                            component={this.renderField}
                                            icon="mdi-eye"
                                            fieldValue={password}
                                        />
                                        <Field
                                            id="confirm-password"
                                            type="password"
                                            name="confirmPassword"
                                            label="Nhập lại mật khẩu"
                                            component={this.renderField}
                                            icon="mdi-eye"
                                            fieldValue={confirmPassword}
                                        />
                                        <div className="mt-5">
                                            <button
                                                className="btn btn-block btn-primary btn-lg font-weight-medium"
                                                onClick={this.onRegister}
                                                disabled={isOK || isRegistering}
                                            >
                                                {
                                                    isRegistering ?
                                                        <span>
                                                            <i className="fa fa-spinner fa-pulse fa-fw"/>
                                                        </span>
                                                        :
                                                        <span>
                                                            Đăng ký
                                                        </span>
                                                }
                                            </button>
                                        </div>
                                        <div className="mt-3 text-center">
                                            {'Bạn đã có tài khoản? '}
                                            <Link to='/login' className="auth-link text-black">Đăng nhập</Link>
                                        </div>
                                    </form>
                                </div>
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
    validate,
})(Register);
