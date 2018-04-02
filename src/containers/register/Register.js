// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import { Field, reduxForm }     from 'redux-form';
import {Link}                   from 'react-router-dom';
import { validate }             from './validation';
// import auth                  from '../../services/auth';
// #endregion

// #region flow types
type Props = {
    // react-router 4:
    match: any,
    location: any,
    history: any,

    // containers props:
    currentView: string,
    errorMessage: string,
    enterRegister: () => void,
    leaveRegister: () => void,

    // userAuth:
    isAuthenticated: boolean,
    isError: boolean,
    isFetching: boolean,
    isRegistering: boolean,
    registerUser: (
        username: string,
        email: string,
        password: string,
        confirm_password: string,
    ) => any,
};

type State = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    isOK: boolean
};
// #endregion

class Register extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
    }

    // #region propTypes
    static propTypes = {
        // react-router 4:
        match:            PropTypes.object.isRequired,
        location:         PropTypes.object.isRequired,
        history:          PropTypes.object.isRequired,

        // containers props:
        currentView:      PropTypes.string.isRequired,
        enterRegister:    PropTypes.func.isRequired,
        leaveRegister:    PropTypes.func.isRequired,
        errorBadRequest:  PropTypes.func.isRequired,

        // userAuth:
        isAuthenticated:  PropTypes.bool,
        isAccountCreated: PropTypes.bool,
        isError:          PropTypes.bool,
        errorMessage:     PropTypes.string,
        isFetching:       PropTypes.bool,
        isRegistering:    PropTypes.bool,
        registerUser:     PropTypes.func.isRequired,

    };
    // #endregion

    static defaultProps = {
        isFetching:      false,
        isRegistering:   true
    };

    state = {
        username:         '',
        email:            '',
        password:         '',
        confirmPassword:  '',
        isSuccess:        false,
        isOK:             true
    };


    // #region lifecycle methods
    componentDidMount() {
        const { enterRegister, history, isAuthenticated} = this.props;
        if(isAuthenticated) {
            history.push('/');
        }
        else {
            enterRegister();
        }
    }

    componentWillUnmount() {
        const { leaveRegister } = this.props;
        leaveRegister();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAccountCreated)
            this.setState({ isSuccess: true });
        if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
            this.setState({ isOK: false });
        } else {
            this.setState({ isOK: true });
        }
    }

    renderField = ({ input, placeholder, type, fieldValue, trans, icon, meta: { touched, error, warning } }) => {
        return (
            <div className="form-group">
                <input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    className={`form-control has-icon ${icon}`}
                    id={trans(placeholder)}
                    value={fieldValue}
                    onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
                />
                {touched && ((error && <span className="text-danger">{trans(error)}</span>) ||
                    (warning && <span className="text-danger">{trans(warning)}</span>))}
            </div>
        )
    };

    render() {
        const { username, email, password, confirmPassword, isOK, isSuccess } = this.state;
        const { isRegistering, isError, errorMessage } = this.props;
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth register-full-bg">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <h2>Đăng ký</h2>
                                    <form className="pt-4">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"/>
                                                <i className="mdi mdi-account" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                                <i className="mdi mdi-eye" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword2">Nhập lại mật khẩu</label>
                                                <input type="password" className="form-control" id="exampleInputPassword2" />
                                                <i className="mdi mdi-eye" />
                                            </div>
                                            <div className="mt-2 w-75 mx-auto">
                                                <div className="form-check form-check-flat">
                                                    <label className="form-check-label">
                                                        <input type="checkbox" className="form-check-input" />
                                                        Tôi đã đọc kỹ và đồng ý với điều khoản sử dụng của LancerVN
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <a className="btn btn-block btn-primary btn-lg font-weight-medium"
                                                   href="../../index.html">Register</a>
                                            </div>
                                            <div className="mt-3 text-center">
                                                {'Bạn đã có tài khoản? '}
                                                <Link to='/login' className="auth-link text-black">Đăng nhập</Link>
                                            </div>
                                        </form>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // #endregion

    // #region on login button click callback
    handlesOnRegister = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const { registerUser, errorBadRequest } = this.props;
        const { username, email, password, confirmPassword } = this.state;
        try {
            registerUser(username, email, password, confirmPassword);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('register went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };
    // #endregion

    // #region on go back home button click callback
    goHome = (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const { history } = this.props;
        history.push({ pathname: '/' });
    };
    // #endregion

    goToLogin = (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const { history } = this.props;
        history.push({ pathname: '/login' });
    }
}

export default reduxForm({
    form: 'syncValidation',
    validate,
})(Register);
