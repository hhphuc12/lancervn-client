// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import {validate} from './validation';

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
                enterProfile,
                getInfoProfileIfNeed,
            }
        } = this.props;
        enterProfile();
        getInfoProfileIfNeed();
    }

    componentWillUnmount() {
        this.props.actions.leaveProfile();
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
        const {info, isFetching, isError, errorMessage} = this.props;
        const {
            firstName,
            lastName,
            occupation,
            email,
            address,
            province,
            zipCode,
            phoneNumber,
            skype,
            description,
            disableEdit,
            isOK
        } = this.state;
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right">
                                    <a href="#" onClick={this.onEnableEdit}>
                                        <i className="mdi mdi-pen icon-md text-primary"/>
                                    </a>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <div className="image_preview avatar-wrapper">
                                            <img
                                                className="img-thumbnail avatar-profile"
                                                src="https://freelancerviet.vn/tmp2/image/thumbnail/thumb_600x600_BaoCaoLan1_vCNQOb6mcY.jpg"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="input-group col-md-8 col-md-offset-2">
                                            <input
                                                type="text"
                                                className="form-control file-upload-info"
                                                disabled
                                                placeholder="Upload Image"
                                                value={this.state.imgUri}
                                            />
                                            <span className="input-group-append">
                                                <label
                                                    htmlFor="avatar-preview"
                                                    className="btn btn-info mr-2"
                                                    style={{paddingTop: 12}}
                                                >
                                                    Choose file
                                                </label>
                                            </span>
                                        </div>
                                        <input id="avatar-preview" type="file"/>
                                    </div>
                                    <br/>
                                    <h4>Thông tin hồ sơ</h4>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field
                                                id="first-name"
                                                type="text"
                                                name="firstName"
                                                label="Họ"
                                                component={this.renderField}
                                                fieldValue={firstName}
                                                disabled={disableEdit}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Field
                                                id="last-name"
                                                type="text"
                                                name="lastName"
                                                label="Chữ lót và tên"
                                                component={this.renderField}
                                                fieldValue={lastName}
                                                disabled={disableEdit}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <Field
                                        id="occupation"
                                        type="text"
                                        name="occupation"
                                        label="Nghề nghiệp chuyên môn"
                                        component={this.renderField}
                                        fieldValue={occupation}
                                        disabled={disableEdit}
                                    />
                                    <br/>
                                    <Field
                                        id="description"
                                        type="text"
                                        name="description"
                                        label="Giới thiệu bản thân"
                                        component={this.renderTextArea}
                                        fieldValue={description}
                                        disabled={disableEdit}
                                    />
                                    <br/>
                                    <h4>Thông tin liên hệ</h4>
                                    <br/>
                                    <Field
                                        id="email"
                                        type="text"
                                        name="email"
                                        label="Email"
                                        component={this.renderField}
                                        fieldValue={email}
                                        disabled={disableEdit}
                                    />
                                    <br/>
                                    <Field
                                        id="address"
                                        type="text"
                                        name="address"
                                        label="Địa chỉ"
                                        component={this.renderField}
                                        fieldValue={address}
                                        disabled={disableEdit}
                                    />
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field
                                                id="province"
                                                type="text"
                                                name="province"
                                                label="Tỉnh/Thành phố"
                                                component={this.renderField}
                                                fieldValue={province}
                                                disabled={disableEdit}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Field
                                                id="zip-code"
                                                type="text"
                                                name="zipCode"
                                                label="Zip code/Post code"
                                                component={this.renderField}
                                                fieldValue={zipCode}
                                                disabled={disableEdit}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field
                                                id="phone-number"
                                                type="text"
                                                name="phoneNumber"
                                                label="Số điện thoại"
                                                component={this.renderField}
                                                fieldValue={phoneNumber}
                                                disabled={disableEdit}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Field
                                                id="skype"
                                                type="text"
                                                name="skype"
                                                label="Skype"
                                                component={this.renderField}
                                                fieldValue={skype}
                                                disabled={disableEdit}
                                            />
                                        </div>
                                    </div>
                                    <br/>
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
    validate,
})(Profile);
