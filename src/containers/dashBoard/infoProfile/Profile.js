// @flow strong

// #region imports
import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import {validate} from './validation';
import { postImg } from "../../../services/api";
import { changePreview } from "../../../helpers";

class Profile extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
        this.onEditStatusChange = this.onEditStatusChange.bind(this);
        this.onSelectAvatar = this.onSelectAvatar.bind(this);
        this.mapUserInfoToState = this.mapUserInfoToState.bind(this);
    }

    static defaultProps = {
        isFetching: false
    };

    state = {
        avatarUri: '',
        firstName: '',
        lastName: '',
        occupation: '',
        email: '',
        address: '',
        province: '',
        zipCode: '',
        phoneNumber: '',
        skype: '',
        description: '',
        disableEdit: true,
    };

    componentDidMount() {
        const {
            enterInfoProfile,
            getInfoProfileIfNeed,
            getSelectProvinceIfNeed,
        } = this.props.actions;
        enterInfoProfile();
        getInfoProfileIfNeed();
        getSelectProvinceIfNeed();
    }

    mapUserInfoToState(info) {
        this.setState({
            avatarUri: info.avatarUri,
            firstName: info.firstName,
            lastName: info.lastName,
            occupation: info.occupation,
            description: info.description,
            phoneNumber: info.phoneNumber,
            email: info.email,
            address: info.address,
            province: info.province,
            zipCode: info.zipCode,
            skype: info.skype,
        });
    }

    componentWillUnmount() {
        this.props.actions.leaveInfoProfile();
    }

    componentWillReceiveProps(nextProps) {
        const newInfo = nextProps.info;
        const oldInfo = this.props.info;
        if (newInfo !== {} && newInfo !== oldInfo) {
            this.mapUserInfoToState(newInfo);
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

    onUpdate = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const {editInfoProfileIfNeed, errorBadRequest} = this.props.actions;
        const {
            avatarUri,
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
        } = this.state;
        try {
            editInfoProfileIfNeed({
                avatarUri,
                firstName,
                lastName,
                occupation,
                email,
                address,
                province: province.value,
                zipCode,
                phoneNumber,
                skype,
                description,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('update profile went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
        this.setState({ disableEdit: !this.state.disableEdit });
    };

    onEditStatusChange = e => {
        e.preventDefault();
        this.setState({ disableEdit: !this.state.disableEdit });
    };

    async onSelectAvatar(e) {
        const avatar = e.target.files[0];
        if (avatar) {
            changePreview(e.target.files[0], '.image-preview');
            let formData = new FormData();
            formData.append("avatar", avatar);
            try {
                await postImg(formData)
                    .then(async res => await this.setState({avatarUri: res.data.imgUri}))
                    .catch(err => console.log({err}));
            } catch (error) {
                console.log('send contact went wrong..., error: ', error);
            }
        }
    }

    render() {
        const { isFetching, provinces } = this.props;
        let {
            avatarUri,
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
        } = this.state;
        const buttonJSX = (
            <div>
                <button
                    className="btn btn-success mr-2"
                    type="button"
                    onClick={this.onUpdate}
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
                <button className="btn btn-light" onClick={this.onEditStatusChange}>Hủy bỏ</button>
            </div>
        );
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-right">
                                    <a href="#" onClick={this.onEditStatusChange}>
                                        <i className="mdi mdi-pen icon-md text-primary"/>
                                    </a>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <div className="image-preview avatar-wrapper">
                                            <img
                                                className="img-thumbnail avatar-profile"
                                                src={avatarUri}
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
                                                value={avatarUri}
                                            />
                                            <span className="input-group-append">
                                                <label
                                                    htmlFor="avatar-preview"
                                                    className="btn btn-info mr-2"
                                                    style={{paddingTop: 12}}
                                                >
                                                    Chọn hình ảnh
                                                </label>
                                            </span>
                                        </div>
                                        <input id="avatar-preview" type="file" onChange={this.onSelectAvatar} disabled={disableEdit}/>
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
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="province">Tỉnh/Thành phố</label>
                                            <Select
                                                id="province"
                                                placeholder=""
                                                closeOnSelect={true}
                                                name="province"
                                                value={province}
                                                options={provinces}
                                                disabled={disableEdit}
                                                onChange={item => { this.setState({ province: item})}}
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
                                    { disableEdit ? null : buttonJSX }
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
