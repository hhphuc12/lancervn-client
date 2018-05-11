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
            getJobFreelanceDetailIfNeed,
            getQuotationStatusIfNeed,
        } = this.props.actions;
        const { id } = this.props.match.params;
        enterHomeUserDetail();
        getJobFreelanceDetailIfNeed(id);
        getQuotationStatusIfNeed(id);
    }

    componentWillUnmount() {
        this.props.actions.leaveHomeUserDetail();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMadeByClick === true) {
            swal("Chúc mừng!", "Báo giá của bạn đã được gửi đi!", "success");
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

    onMake = jobId => {
        const { makeQuotationIfNeed, errorBadRequest } = this.props.actions;
        const { price, message } = this.state;
        try {
            makeQuotationIfNeed({
                priceExpected: price,
                message,
                job: jobId,
            });
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('make quotation went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };

    render() {
        const {
            jobFreelanceDetail,
            userProvince,
            isExpiredOffer,
            userPost,
            skill,
            isFetching,
            isQuotationMade,
            isMadeByClick,
        } = this.props;
        const {
            name,
            category,
            content,
            deadlineOffer,
            province,
            priceExpected,
            prioritize,
        } = jobFreelanceDetail;
        const {
            firstName,
            lastName,
            avatarUri,
            email,
            skype,
        } = userPost;
        const userPostName = `${firstName} ${lastName}`;
        const { price, message } = this.state;

        const quotationJSX = (
            <div className="category">
                <span className="media-cloud-title">Báo giá cho công việc này?</span>
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
                        label="Lời nhắn với khách hàng (thuyết phục khách hàng chọn bạn)"
                        component={this.renderTextArea}
                        fieldValue={message}
                    />
                    <button
                        className="btn btn-success mr-2"
                        type="button"
                        onClick={() => this.onMake(jobFreelanceDetail._id)}
                        disabled={isFetching}
                    >
                        {
                            isFetching ?
                                <span>
                                    <i className="fa fa-spinner fa-pulse fa-fw"/>
                                </span>
                                :
                                <span>
                                    Gửi báo giá
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
                                    <address className="row-job-detail-header">
                                        <i className="mdi mdi-map-marker-radius"/>
                                        {`${province}`}
                                    </address>
                                    <p className="row-job-detail-header">
                                        <i className="mdi mdi-calendar-clock"/>
                                        {`Hạn gửi báo giá: ${dateFormater(deadlineOffer)}`}
                                    </p>
                                </div>
                            </div>
                            <br/>
                            <div style={{ display: 'inline-flex' }}>
                                <div className="row">
                                    <p className="row-job-detail-header" style={{ color: '#000' }}>
                                        <i className="mdi mdi-cash-multiple"/>
                                        {`₫${moneyFormater(priceExpected)}`}
                                    </p>
                                    <div>
                                        {
                                            isExpiredOffer ?
                                                (<span className="offer expired-offer">Hết hạn báo giá</span>)
                                                : (<span className="offer receiving-offer">Đang nhận báo giá</span>)
                                        }
                                    </div>
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
                                    <p className="user-post-title">Người đăng:</p>
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
                                    <span className="media-cloud-title">Yêu cầu của khách hàng:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(content)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Ưu tiên:</span>
                                    <div dangerouslySetInnerHTML={{__html: formatDescription(prioritize)}}/>
                                </div>
                                <br/>
                                <div className="category">
                                    <span className="media-cloud-title">Yêu cầu kỹ năng:</span>
                                    {
                                        skill.map((s, index) => (
                                            <span className="cloud-tag" key={index}>{s}</span>
                                        ))
                                    }
                                </div>
                                <br/>
                                <br/>
                                <div style={{ height: 1, backgroundColor: "#888", margin: '0 4rem' }}/>
                                <br/>
                                <br/>
                                {
                                    isMadeByClick || isQuotationMade ?
                                        (
                                            <div className="text-center">
                                                <span className="offer receiving-offer">Đã gửi báo giá</span>
                                            </div>
                                        )
                                        :
                                        quotationJSX
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
