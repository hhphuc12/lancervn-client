// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {validate} from './validation';
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
    enterLogin: () => void,
    leaveLogin: () => void,

    // userAuth:
    isAuthenticated: boolean,
    isError: boolean,
    isFetching: boolean,
    isLogging: boolean,
    disconnectUser: () => any,
    logUserIfNeeded: (username: string, password: string) => any
};

type State = {
    username: string,
    password: string,
    isOK: boolean
};

// #endregion

class Login extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
    }

    static propTypes = {
        // react-router 4:
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,

        // containers props:
        currentView: PropTypes.string.isRequired,
        enterLogin: PropTypes.func.isRequired,
        leaveLogin: PropTypes.func.isRequired,
        errorBadRequest: PropTypes.func.isRequired,

        // userAuth:
        isAuthenticated: PropTypes.bool,
        isError: PropTypes.bool,
        errorMessage: PropTypes.string,
        isFetching: PropTypes.bool,
        isLogging: PropTypes.bool,
        disconnectUser: PropTypes.func.isRequired,
        logUserIfNeeded: PropTypes.func.isRequired,

    };

    static defaultProps = {
        isFetching: false,
        isLogging: true
    };

    state = {
        username: '',
        password: '',
        isOK: true
    };

    componentDidMount() {
        const {enterLogin} = this.props;
        enterLogin();
    }

    componentWillUnmount() {
        const {leaveLogin} = this.props;
        leaveLogin();
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props;
        if (nextProps.isAuthenticated)
            history.push('/');
        if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
            this.setState({isOK: false});
        } else {
            this.setState({isOK: true});
        }
    }

    renderField = ({input, placeholder, type, fieldValue, trans, icon, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    className={`form-control has-icon ${icon}`}
                    id={trans(placeholder)}
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value.trim()})}
                />
                {touched && ((error && <span className="text-danger">{trans(error)}</span>) ||
                    (warning && <span className="text-danger">{trans(warning)}</span>))}
            </div>
        )
    };

    render() {
        const {username, password, isOK} = this.state;
        const {isLogging, isError, errorMessage} = this.props;
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth login-full-bg">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <h2>Đăng nhập</h2>
                                    <form className="pt-5">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input type="email" className="form-control"
                                                       id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                                <i className="mdi mdi-account" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                                <input type="password" className="form-control"
                                                       id="exampleInputPassword1"/>
                                                <i className="mdi mdi-eye /" />
                                            </div>
                                            <div className="mt-5">
                                                <a className="btn btn-block btn-primary btn-lg font-weight-medium"
                                                   href="../../index.html">Đăng nhập</a>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <a href="#" className="auth-link text-black">Quên mật khẩu?</a>
                                            </div>
                                            <div className="mt-3 text-center">
                                                {'Bạn chưa có tài khoản? '}
                                                <Link to='/register' className="auth-link text-black">Đăng ký ngay</Link>
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

    handlesOnLogin = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const {logUserIfNeeded, errorBadRequest} = this.props;
        const {username, password} = this.state;
        try {
            logUserIfNeeded(username, password);
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('login went wrong..., error: ', error);
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
        const {history} = this.props;
        history.push({pathname: '/'});
    }
    // #endregion
}

export default reduxForm({
    form: 'syncValidation',
    validate,
})(Login);
