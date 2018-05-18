// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import swal from 'sweetalert';
import { formatDescription, dateFormater, moneyFormater } from "../../../../helpers";

class Detail extends PureComponent<Props, State> {
    state = {
        price: '',
        message: '',
    };

    componentDidMount() {
        const {
            enterHomeUserDetail,
            getHomePackageDetailIfNeed,
            getOrderStatusIfNeed,
            checkPackageBelongToIfNeed,
        } = this.props.actions;
        const { id } = this.props.match.params;
        enterHomeUserDetail();
        getHomePackageDetailIfNeed(id);
        getOrderStatusIfNeed(id);
        checkPackageBelongToIfNeed(id);
    }

    componentWillUnmount() {
        this.props.actions.leaveHomeUserDetail();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMadeByClick === true) {
            swal("Chúc mừng!", "Bạn đã đặt hàng cho gói công việc này!", "success");
        }
    }

    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
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
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    renderTextArea = ({input, label, id, fieldValue, meta: {touched, error, warning}}) => {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <textarea
                    {...input}
                    className={'form-control'}
                    id={id}
                    rows='10'
                    value={fieldValue}
                    onChange={e => this.setState({[input.name]: e.target.value})}
                />
                {touched && ((error && <label className="text-danger" style={{marginTop: 5}}>{`* ${error}`}</label>) ||
                    (warning && <label className="text-danger" style={{marginTop: 5}}>{`* ${warning}`}</label>))}
            </div>
        )
    };

    onMake = packageId => {
        const { makeOrderIfNeed, errorBadRequest } = this.props.actions;
        const { price, message } = this.state;
        try {
            makeOrderIfNeed({
                priceExpected: price,
                message,
                _package: packageId,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('make order went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    render() {
        const {
            _package,
            userPost,
            userProvince,
            process,
            dataNeed,
            isFetching,
            isOrderMade,
            isMadeByClick,
            isBelongTo,
        } = this.props;
        const {
            name,
            expectedResult,
            target,
            priceExpected,
            category,
        } = _package;
        const {
            firstName,
            lastName,
            avatarUri,
            email,
            skype,
        } = userPost;
        const userPostName = `${firstName} ${lastName}`;
        const { price, message } = this.state;

        const orderJSX = (
            <div className="category">
                <span className="media-cloud-title">Đặt hàng gói công việc này?</span>
                <form style={{ marginTop: '1rem' }}>
                    <Field
                        id="price"
                        type="number"
                        name="price"
                        label="Mức giá bạn đưa ra"
                        component={this.renderField}
                        fieldValue={price}
                    />
                    <Field
                        id="message"
                        type="text"
                        name="message"
                        label="Lời nhắn với nhà cung cấp"
                        component={this.renderTextArea}
                        fieldValue={message}
                    />
                    <button
                        className="btn btn-success mr-2"
                        type="button"
                        onClick={() => this.onMake(_package._id)}
                        disabled={isFetching}
                    >
                        {
                            isFetching ?
                                <span>
                                    <i className="fa fa-spinner fa-pulse fa-fw"/>
                                </span>
                                :
                                <span>
                                    Đặt hàng
                                </span>
                        }
                    </button>
                </form>
            </div>
        );

        return (
            <div>
                <section className="section-main section-top-banner no-overlay">
                    <div className="container" style={{ padding: '3rem' }}>
                        <div className="profile-box">
                            <h1 className="profile-name">
                                {name}
                            </h1>
                            <div style={{ display: 'inline-flex' }}>
                                <div className="row">
                                    <p className="row-job-detail-header">
                                        <i className="mdi mdi-table-large"/>
                                        {category}
                                    </p>
                                    <p className="row-job-detail-header" style={{ color: '#000' }}>
                                        <i className="mdi mdi-cash-multiple"/>
                                        {`₫${moneyFormater(priceExpected)}`}
                                    </p>
                                    <p className="row-job-detail-header">
                                        <i className="mdi mdi-calendar-clock"/>
                                        {`Thời gian thực hiện ước tính: 15 ngày`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container home-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-xl-block d-md-block col-job-filter">
                            <div className="sidebar">
                                <div className="box user-post-wrapper">
                                    <p className="user-post-title">Người cung cấp:</p>
                                    <img
                                        src={avatarUri}
                                        alt={userPostName}
                                        className="avatar avatar-profile job-avatar-profile"
                                    />
                                    <h1 className="job-user-post-name">
                                        {userPostName}
                                    </h1>
                                    <address>
                                        <i className="mdi mdi-map-marker-radius"/>
                                        {`${userProvince}, VN`}
                                    </address>
                                    <p>
                                        <i className="mdi mdi-email"/>
                                        {email}
                                    </p>
                                    <p>
                                        <i className="mdi mdi-skype"/>
                                        {skype}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="freelancer-content">
                                <div className="category">
                                    <span className="media-cloud-title">Đối tượng khách hàng:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(target)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Khách hàng sẽ nhận được:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(expectedResult)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Quy trình thực hiện:</span>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        {
                                            process.map((p, index) => (
                                                <div className="step" key={index}>
                                                    <div>
                                                        <div className="circle">{index}</div>
                                                        <div className="line"/>
                                                    </div>
                                                    <div className="step-item">
                                                        <div className="title">{p}</div>
                                                        <div className="body"/>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Bạn cần cung cấp:</span>
                                    <ul>
                                        {
                                            dataNeed.map((d, index) => (
                                                <li key={index} style={{ fontSize: '1rem' }}>
                                                    <i className="mdi mdi-checkbox-marked-outline text-primary" style={{ fontSize: '1.5rem', paddingRight: '0.5rem' }}/>
                                                    <span>{d}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <br/>
                                <br/>
                                <div style={{ height: 1, backgroundColor: "#888", margin: '0 4rem' }}/>
                                <br/>
                                <br/>
                                {
                                    !isBelongTo ?
                                        (
                                            <div>
                                                {
                                                    isMadeByClick || isOrderMade ?
                                                        (
                                                            <div className="text-center">
                                                                <span className="offer receiving-offer">Đã đặt hàng</span>
                                                            </div>
                                                        )
                                                        :
                                                        orderJSX
                                                }
                                            </div>
                                        )
                                        : null
                                }
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
})(Detail);
